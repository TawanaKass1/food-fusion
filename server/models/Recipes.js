import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  Recipename: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Recipes", RecipeSchema);
