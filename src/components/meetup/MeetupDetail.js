import Image from "next/image";
import React, { useState } from "react";
import Loader from "../ui/Loader";
import { useRouter } from "next/router";

const MeetupDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const deleteMeetupHandler = () => {
    setIsLoading(true);

    const response = fetch("/api/delete-meetup", {
      method: "DELETE",
      body: JSON.stringify(props.id),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    router.push("/");
  };

  return (
    <section className="flex flex-col gap-3 bg-white p-10 rounded-lg shadow-lg justify-center w-2/5 items-center m-auto my-[10vh]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Image
            src={props.image}
            alt={props.title}
            width={500}
            height={300}
            className="rounded-lg mt-2"
          />
          <h1 className="text-2xl font-bold capitalize">{props.title}</h1>
          <address className="text-gray-700 capitalize">
            {props.address}
          </address>
          <p className="text-gray-800">{props.description}</p>
          <div className="flex gap-3">
            <button
              className="bg-rose-700 text-white font-semibold p-2 rounded-md text-center"
              onClick={deleteMeetupHandler}
            >
              Delete Meetup
            </button>

            <button
              className="bg-[#7469B6] text-white font-semibold p-2 rounded-md text-center"
              onClick={() => router.push(`/${props.id}/edit`)}
            >
              Update Meetup
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default MeetupDetail;
