import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetup/MeetupForm";
import Loader from "@/components/ui/Loader";
import { useNotificationContext } from "@/context/NotificationContext";

function NewMeetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotificationContext();

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
      showNotification({
        status: "success",
        title: "Success!",
        message: "Meetup added successfully!",
      });
      router.push("/");
    } else {
      const data = await response.json();
      showNotification({
        status: "error",
        title: "Error!",
        message: data.message,
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="h-screen">
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
    </div>
  );
}

export default NewMeetupPage;
