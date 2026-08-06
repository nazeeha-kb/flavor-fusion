import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipe: {
    type: Object,
    required: true,
  },
});

const Favorite = models.Favorite || model("Favorite", favoriteSchema);

export default Favorite;
