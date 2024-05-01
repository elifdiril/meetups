const { MongoClient, ObjectId } = require("mongodb");

async function handler(req, res) {
  if (req.method === "DELETE") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://elif:test123@cluster0.ehz8iuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteOne({
      _id: new ObjectId(data),
    });
    client.close();

    res.status(201).json({ message: "Meetup deleted!", result: result });
  }
}

export default handler;