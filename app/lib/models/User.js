import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  // username: { type: String, required: true, unique: true },
  // password:{type:String,required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  favorites: [
    {
      type: Object,
      // by default an empty array stands
      default:[]
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
