import BookingCard from '@/components/BookingCard';
import Delete from '@/components/Delete';
import UpdateModal from '@/components/UpdateModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const DestinationDetails = async ({ params }) => {
  const { id } = await params;
  // console.log(id);

  // get token from better auth in server component *****************
   const { token } = await auth.api.getToken({
     headers: await headers(),
   });
  console.log(token);

  const res = await fetch(`http://localhost:5000/data/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  // console.log(data);


  const { destinationName, imageUrl, country, duration, price, description } =
    data;
  console.log(data);
  return (
    <div className="max-w-5xl mx-auto border rounded-lg shadow-md p-5 my-3">
      <div className="flex  items-center gap-3 justify-end mt-5 mb-3">
        <UpdateModal data={data}></UpdateModal>
        <Delete data={data}></Delete>
      </div>
      <Image
        className=" object-cover"
        alt={destinationName}
        src={imageUrl}
        height={400}
        width={400}
      />

      <div className="p-2">
        <div className="flex items-center gap-1">
          <span>{country}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <div>
              <h2 className="text-xl font-bold">{destinationName}</h2>
            </div>
            <div className="flex gap-1 items-center">{duration}</div>
            <h3 className="text-2xl font-bold">$ {price}</h3>
          </div>

          <div> <BookingCard data={data}></BookingCard> </div>
        </div>

        <h1 className="mt-10 text-2xl font-bold">Overview</h1>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default DestinationDetails;
