import connectDB from "../db";

async function insertDocument(client, document) {
  const db = client.db();
  await db.collection('meetups').insertOne(document);
}
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to DB failed!' });
      return;
    }

    try {
      await insertDocument(client, data);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;