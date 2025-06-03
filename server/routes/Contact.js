import express from "express";
import { submitContactForm } from "../controllers/Contact.js";

const router = express.Router();


router.post("/", submitContactForm);

export default router;
