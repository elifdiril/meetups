import connectDB from "@/pages/db";
import { ObjectId } from "mongodb";

async function updateDocument(client, document) {
  const db = client.db();
  await db.collection("meetups").updateOne({ _id: document._id }, { $set: document });
}

async function handler(req, res) {
  if (req.method === "PATCH") {
    const data = req.body;

    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed!" });
      return;
    }

    try {
      await updateDocument(client, {...data, _id: new ObjectId(req.query.meetupId)});
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
 
    res.status(201).json({ message: "Meetup updated!", result: data });
  }
}

export default handler;