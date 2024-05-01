import { Inter } from "next/font/google";
import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetup/MeetupList";
import { MongoClient } from "mongodb";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name='description'
        content='Browse a huge list of highly active React meetups!'
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://elif:test123@cluster0.ehz8iuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
