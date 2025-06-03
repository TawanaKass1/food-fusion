import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Button from "./Button";
import TextInput from "./TextInput";

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: black;
`;

const Span = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 90};
`;

const TextButton = styled.div`
    width: 100%;
    text-align: end;
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    font-weight: 500;
    &:hover {
        color: grey;
    }
`;

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 8px;
`;

const SuccessText = styled.div`
    color: green;
    font-size: 14px;
    margin-top: 8px;
`;

const LockoutMessage = styled.div`
    color: orange;
    font-size: 14px;
    margin-top: 8px;
`;

const ButtonWrapper = styled.div`
    align-self: flex-start;
`;

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [lockoutTime, setLockoutTime] = useState(null);

    useEffect(() => {
        const storedAttempts = localStorage.getItem('failedAttempts');
        const storedLockout = localStorage.getItem('lockoutTime');

        if (storedAttempts) setFailedAttempts(parseInt(storedAttempts));

        if (storedLockout) {
            const lockoutEnd = new Date(parseInt(storedLockout));
            if (lockoutEnd > new Date()) {
                setIsLockedOut(true);
                setLockoutTime(lockoutEnd);
            } else {
                localStorage.removeItem('lockoutTime');
                localStorage.removeItem('failedAttempts');
            }
        }
    }, []);

    useEffect(() => {
        if (!isLockedOut || !lockoutTime) return;

        const timer = setInterval(() => {
            const now = new Date();
            if (now >= lockoutTime) {
                setIsLockedOut(false);
                setFailedAttempts(0);
                setLockoutTime(null);
                localStorage.removeItem('lockoutTime');
                localStorage.removeItem('failedAttempts');
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isLockedOut, lockoutTime]);

    const handleSignIn = async () => {
        setStatus(null);

        if (isLockedOut) {
            const remainingTime = Math.ceil((lockoutTime - new Date()) / 60000);
            setStatus({ type: 'lockout', message: `Account locked. Try again in ${remainingTime} min.` });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/user/signin", { email, password });

            if (response.data.success) {
                localStorage.removeItem('failedAttempts');
                localStorage.removeItem('lockoutTime');
                localStorage.setItem('token', response.data.token);
                setStatus({ type: 'success', message: 'Login successful!' });
                window.location.href = '/';
            } else {
                const newAttempts = failedAttempts + 1;
                setFailedAttempts(newAttempts);
                localStorage.setItem('failedAttempts', newAttempts.toString());

                if (newAttempts >= 3) {
                    const lockEnd = new Date();
                    lockEnd.setMinutes(lockEnd.getMinutes() + 3);
                    localStorage.setItem('lockoutTime', lockEnd.getTime().toString());
                    setIsLockedOut(true);
                    setLockoutTime(lockEnd);
                    setStatus({ type: 'lockout', message: 'Account locked for 3 minutes due to too many failed attempts.' });
                } else {
                    setStatus({ type: 'error', message: response.data.message || `Login failed. ${3 - newAttempts} attempts left.` });
                }
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Something went wrong. Please try again.'
            });
        }
    };

    return (
        <Container>
            <div>
                <Title>Welcome to Food Fusion Culinary Platform</Title>
                <Span>Please login with your details here</Span>
            </div>

            <div>
                <TextInput
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLockedOut}
                />
                <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLockedOut}
                />
                <TextButton>Forgot Password?</TextButton>

                <ButtonWrapper>
                    <Button onClick={handleSignIn} text="Sign In" disabled={isLockedOut} />
                </ButtonWrapper>

                {status?.type === 'error' && <ErrorText>{status.message}</ErrorText>}
                {status?.type === 'success' && <SuccessText>{status.message}</SuccessText>}
                {status?.type === 'lockout' && <LockoutMessage>{status.message}</LockoutMessage>}
            </div>
        </Container>
    );
};

export default SignIn;
