import express from "express";
import {
  addRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} from "../controllers/Recipes.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create a new recipe
router.post("/", verifyToken, addRecipe);

// Get shared + user-owned recipes
router.get("/", verifyToken, getRecipes);

// Update a user's recipe
router.put("/:id", verifyToken, updateRecipe);

// Delete a user's recipe
router.delete("/:id", verifyToken, deleteRecipe);

export default router;
