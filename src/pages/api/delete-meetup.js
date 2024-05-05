import connectDB from "../db";
const { ObjectId } = require("mongodb");

async function deleteDocument(client, document) {
  const db = client.db();
  await db.collection("meetups").deleteOne({ _id: document._id });
}

async function handler(req, res) {
  if (req.method === "DELETE") {
    const data = req.body;

    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed!" });
      return;
    }

    try {
      await deleteDocument(client, { _id: new ObjectId(data) });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Deleting data failed!" });
      return;
    }

    res.status(201).json({ message: "Meetup deleted!"});
  }
}

export default handler;