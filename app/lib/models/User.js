import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastGeneratedAt: { type: Date, default: null },
});

const User = models.User || model("User", userSchema);

export default User;
