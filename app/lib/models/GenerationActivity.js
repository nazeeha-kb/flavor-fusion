import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const generationActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // when generation happened
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    // number of generations
    recipeCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GenerationActivity =
  models.GenerationActivity ||
  model("GenerationActivity", generationActivitySchema);

export default GenerationActivity;