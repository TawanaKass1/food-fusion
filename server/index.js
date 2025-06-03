// server.js
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import UserRouter from "./routes/Users.js";
import RecipeRouter from "./routes/Recipes.js";
import ContactRouter from "./routes/Contact.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Use modular route handlers
app.use("/api/user", UserRouter);
app.use("/api/recipe", RecipeRouter);
app.use("/api/contact", ContactRouter);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ success: false, status, message });
});

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MONGO DB"))
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });

const startServer = async () => {
  try {
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
