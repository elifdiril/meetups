import { Fragment, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../../components/meetup/MeetupForm';
import Loader from '@/components/ui/Loader';
import { MongoClient, ObjectId } from 'mongodb';

function UpdateMeetupPage(props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function updateMeetupHandler(enteredMeetupData) {
    setIsLoading(true);
    const response = await fetch(`/api/update-meetup/${router.query.meetupId}`, {
      method: 'PUT',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);
  }

  return (
    <Fragment>
      <Head>
        <title>Update Meetup</title>
        <meta
          name='description'
          content='Update your meetups and create amazing networking opportunities.'
        />
      </Head>
      {isLoading ? <Loader /> : <NewMeetupForm onAddMeetup={updateMeetupHandler} {...props.meetupData}  />}
    </Fragment>
  );
}

export default UpdateMeetupPage;

export async function getStaticPaths() {
    const client = await MongoClient.connect(
      "mongodb+srv://elif:test123@cluster0.ehz8iuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
  
    const meetupsCollection = db.collection("meetups");
  
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  
    client.close();
  
    return {
      fallback: "blocking",
      paths: meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
    };
  }
  
  export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
  
    const client = await MongoClient.connect(
      "mongodb+srv://elif:test123@cluster0.ehz8iuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
  
    const meetupsCollection = db.collection("meetups");
  
    const selectedMeetup = await meetupsCollection.findOne({
      _id: new ObjectId(meetupId),
    });
  
    client.close();
  
    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
        },
      },
    };
  }