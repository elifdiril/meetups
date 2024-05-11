import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MeetupForm from '../../../components/meetup/MeetupForm';
import Loader from '@/components/ui/Loader';
import { MongoClient, ObjectId } from 'mongodb';
import { useNotificationContext } from '@/context/NotificationContext';

function UpdateMeetupPage(props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [meetupData, setMeetupData] = useState({...props.meetupData});
  const { showNotification } = useNotificationContext();

  async function updateMeetupHandler(enteredMeetupData) {
    setIsLoading(true);
    const response = await fetch(`/api/update-meetup/${router.query.meetupId}`, {
      method: 'PATCH',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Meetup updated successfully!',
      });
      router.push(`/${router.query.meetupId}`);
      setMeetupData(data.result);
    } else {
      showNotification({
        status: 'error',
        title: 'Error!',
        message: data.message,
      });
      console.log(data.message);
    }

    setIsLoading(false);
  }

  return (
    <div className='h-screen'>
      <Head>
        <title>Update Meetup</title>
        <meta
          name='description'
          content='Update your meetups and create amazing networking opportunities.'
        />
      </Head>
      {isLoading ? <Loader /> : <MeetupForm onAddMeetup={updateMeetupHandler} {...meetupData}  />}
    </div>
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