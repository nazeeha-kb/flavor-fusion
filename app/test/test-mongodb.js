const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://nazeeha:QOMn3tFErSY3b1q8@cluster0.4qekwai.mongodb.net/FlavorFusion?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();