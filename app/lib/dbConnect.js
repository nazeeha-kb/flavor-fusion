import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("No Mongodb URI defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // checks if connection exists, if does returns it
  if (cached.conn) return cached.conn;
  //   if the connection doesn't exist, this creates a new connection
  if (!cached.promise) {
    cached.promise = mongoose
      // it's a promise meaning it is asynced, so if another call to dbConnect is made - before a new connection is made it reuses the same promise instead of staring samw promise instead of new connection.
      .connect(MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // when the connection resolves - return the mongoose object itself
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
