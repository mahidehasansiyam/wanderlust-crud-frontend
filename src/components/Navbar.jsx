"use client";


import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar =  () => {
 const {data: session,} = authClient.useSession(); 
  const user = session?.user;
  
  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <nav className="flex justify-between bg-white p-5">
      <ul className="flex gap-3">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/destination'}>Destinations</Link>
        </li>
        <li>
          <Link href={'/my-bookings'}>My Bookings</Link>
        </li>

        <li>
          <Link href={'/data'}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={'/assets/Wanderlast.png'}
          height={150}
          width={150}
          alt="logo"
        />
      </div>

      <ul className="flex items-center gap-3">
        <li>
          <Link href={'/profile'}>Profile</Link>
        </li>

        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  alt="John Doe"
                  src={user?.image}
                />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </li>
            <li>
              <Button
                onClick={handleSignOut}
                variant="danger"
                className={'rounded-none'}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/login'}>Login</Link>
            </li>
            <li>
              <Link href={'/signUp'}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
