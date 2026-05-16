import BookingDelete from '@/components/BookingDelete';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
    const user = session?.user;

  // get token from better auth in server component *****************
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  // console.log(data);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">My Bookings</h1>
      <div className="space-y-5">
        {data.map(booking => (
          <div key={booking._id} className="flex gap-5 border p-5 min-w-3xl">
            <Image
              src={booking.destinationimageUrl}
              alt={booking.destinationName}
              height={200}
              width={200}
            />
            <div>
              <h1 className="font-bold text-2xl">{booking.destinationName}</h1>
              <p>
                {new Date(booking.departureDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <p>Booking Id: {booking._id}</p>

              <p className="text-3xl font-bold text-cyan-500">
                ${booking.destinationprice}
              </p>
              <BookingDelete bookingId={booking._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

