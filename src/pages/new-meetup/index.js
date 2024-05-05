import { Fragment, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetup/MeetupForm";
import Loader from "@/components/ui/Loader";

function NewMeetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function addMeetupHandler(enteredMeetupData) {
    setIsLoading(true);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push("/");
    } else {
      const data = await response.json();
      console.log(data.message);
    }
    setIsLoading(false);
  }

  return (
    <Fragment>
      <Head>
        <title>+New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
      )}
    </Fragment>
  );
}

export default NewMeetupPage;
