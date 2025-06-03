import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import Users from "../models/Users.js";

dotenv.config();

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 3 * 60 * 1000; // 3 minutes

// REGISTER
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await Users.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      password: hashedPassword,
      img,
      failedAttempts: 0,
      isLocked: false,
    });

    const createdUser = await user.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });

    const { password: _, ...userData } = createdUser._doc;

    return res.status(200).json({ success: true, token, user: userData });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// LOGIN
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
      const waitSeconds = Math.ceil((user.accountLockedUntil - Date.now()) / 1000);
      return res.status(403).json({
        success: false,
        message: `Account locked. Try again in ${waitSeconds} seconds.`
      });
    }

    if (!user.password) {
      return res.status(500).json({ success: false, message: "Password not found in user record" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.accountLockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
      }

      await user.save();

      return res.status(403).json({
        success: false,
        message: "Incorrect password",
        remainingAttempts: Math.max(0, MAX_ATTEMPTS - user.failedLoginAttempts)
      });
    }

    user.failedLoginAttempts = 0;
    user.accountLockedUntil = null;
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d"
    });

    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({ success: true, token, user: userData });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// FORGOT PASSWORD
export const ForgotPassword = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const user = await Users.findOne({ name, email }).exec();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, userId: user._id });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// RESET PASSWORD
export const ResetPassword = async (req, res, next) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res.status(400).json({ success: false, message: "User ID and new password are required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Users.findByIdAndUpdate(userId, {
      password: hashedPassword,
      failedAttempts: 0,
      isLocked: false,
    });

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
