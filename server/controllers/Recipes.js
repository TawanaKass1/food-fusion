import Recipes from "../models/Recipes.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Add a new recipe
export const addRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(createError(401, "Authentication token missing"));

    const decoded = jwt.verify(token, process.env.JWT);
    const userId = decoded.id;

    const { Recipename, ingredients, instructions, img, shared } = req.body;

    if (!Recipename || !ingredients || !instructions) {
      return next(createError(400, "Required fields missing"));
    }

    const recipe = new Recipes({
      Recipename,
      ingredients,
      instructions,
      img,
      shared: shared || false,
      userId,
    });

    const createdRecipe = await recipe.save();
    return res.status(201).json({ success: true, recipe: createdRecipe });
  } catch (err) {
    return next(err);
  }
};

// Get shared recipes 
export const getRecipes = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(createError(401, "Authentication token missing"));

    const decoded = jwt.verify(token, process.env.JWT);
    const userId = decoded.id;

    const sharedRecipes = await Recipes.find({ shared: true });
    const userRecipes = await Recipes.find({ userId });

    return res.status(200).json({ sharedRecipes, userRecipes });
  } catch (err) {
    return next(err);
  }
};

// Update a recipe 
export const updateRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(createError(401, "Authentication token missing"));

    const decoded = jwt.verify(token, process.env.JWT);
    const userId = decoded.id;

    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return next(createError(404, "Recipe not found"));
    if (recipe.userId.toString() !== userId)
      return next(createError(403, "Unauthorized to update this recipe"));

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({ success: true, recipe: updatedRecipe });
  } catch (err) {
    return next(err);
  }
};

// Delete a recipe 
export const deleteRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(createError(401, "Authentication token missing"));

    const decoded = jwt.verify(token, process.env.JWT);
    const userId = decoded.id;

    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return next(createError(404, "Recipe not found"));
    if (recipe.userId.toString() !== userId)
      return next(createError(403, "Unauthorized to delete this recipe"));

    await Recipes.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    return next(err);
  }
};
