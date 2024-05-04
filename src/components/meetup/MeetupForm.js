import { useRef } from "react";

function MeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <div className="w-1/4 min-w-[300px] flex justify-center rounded-lg bg-white shadow-lg py-10 mx-auto mt-[10vh]">
      <form
        className="grid grid-cols-1 gap-4 p-4 text-left"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col">
          <label
            className="text-sm font-semibold text-gray-700"
            htmlFor="title"
          >
            Meetup Title
          </label>
          <input
            type="text"
            required
            id="title"
            ref={titleInputRef}
            className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={props.title}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-semibold text-gray-700"
            htmlFor="image"
          >
            Meetup Image
          </label>
          <input
            type="url"
            required
            id="image"
            ref={imageInputRef}
            className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={props.image}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-semibold text-gray-700"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            required
            id="address"
            ref={addressInputRef}
            className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={props.address}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-semibold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
            className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={props.description}
          ></textarea>
        </div>
        <div className="justify-self-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            {props.id ? "Update Meetup" : "Add Meetup"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MeetupForm;
