import express from "express";
import {
  UserRegister,
  UserLogin,
  ForgotPassword,
  ResetPassword
} from "../controllers/Users.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password", ResetPassword);

export default router;
