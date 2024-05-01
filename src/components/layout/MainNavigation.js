import Link from 'next/link';

function MainNavigation() {

  return (
    <header className="flex justify-between items-center p-4 bg-[#7469B6]">
      <div className="font-extrabold text-lg text-white">React Meetups</div>
      <nav>
        <ul className='flex gap-3 text-[#FFE6E6] font-semibold'>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;