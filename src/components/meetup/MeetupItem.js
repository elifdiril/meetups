import { useRouter } from 'next/router';
import Image from 'next/image';

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push('/' + props.id);
  }

  return (
    <li className="m-4 w-1/3">
      <div className="rounded-lg bg-white shadow-lg p-2">
        <div className='flex justify-center'>
          <Image src={props.image} alt={props.title} width={300} height={200} className='rounded-lg' />
        </div>
        <div className="text-center p-2">
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className="cursor-pointer bg-[#7469B6] text-white font-semibold p-2 rounded-md text-center">
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </div>
    </li>
  );
}

export default MeetupItem;