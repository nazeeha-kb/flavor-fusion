// scripts/createDemoUser.js
// import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../lib/models/User.js";
import dbConnect from "../lib/dbConnect.js";
import "dotenv/config"; // for ESM

// This creates a demo user for testing purposes which user can sing in with

async function createDemoUser() {
  await dbConnect();

  const saltRounds = 10;
  const plainPassword = "demo-user-101";

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const existingUser = await User.findOne({
    email: "demo.app.user.101@gmail.com",
  });

  if (existingUser) {
    console.log("Demo user already exists");
    process.exit(0);
  }

  await User.create({
    email: "demo.app.user.101@gmail.com",
    password: hashedPassword,
  });

  console.log("Demo user created successfully");
  process.exit(0);
}

createDemoUser().catch((err) => {
  console.error(err);
  process.exit(1);
});
