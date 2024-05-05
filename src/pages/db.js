import { MongoClient } from "mongodb";

async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://elif:test123@cluster0.ehz8iuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}

export default connectDB;
