const { MongoClient, ObjectId } = require("mongodb");

async function handler(req, res) {
  if (req.method === "PATCH") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://elif:test123@cluster0.ehz8iuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.updateOne(
      {
        _id: new ObjectId(req.query.meetupId),
      },
      {
        $set: {
          title: data.title,
          address: data.address,
          image: data.image,
          description: data.description,
        },
      }
    );
    client.close();

    res.status(201).json({ message: "Meetup updated!", result: data });
  }
}

export default handler;