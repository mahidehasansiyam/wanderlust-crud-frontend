"use client"
import { authClient } from '@/lib/auth-client';
import { Basic } from './DateField';
import { Button, DateField, Label } from '@heroui/react';
import { useState } from 'react';


// category: 'Beach';
// country: 'Afganistan';
// departureDate: '2026-05-24';
// description: 'yes';
// destinationName: 'Hillside';
// duration: '7';
// imageUrl: 'https://th.bing.com/th/id/OIP.DzLCbWqpj5id2046oQq23AHaE7?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3';
// price: '456';
// _id: '6a01a0fedc73223f75f128e0';

const BookingCard = ({ data }) => {
  const [departureDate, setDepartureDate] = useState(null);
  // console.log(new Date(departureDate));
  // console.log(data);
  const {data: session,} = authClient.useSession(); 
  const user = session?.user;
  // console.log(user);
  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: data._id,
      destinationName: data.destinationName,
      destinationprice: data.price,
      destinationimageUrl: data.imageUrl,
      destinationcountry: data.country,
      departureDate: new Date(departureDate),
    };
    // console.log(bookingData);


    const res = await fetch('http://localhost:5000/bookings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData)
      })
    const result = await res.json();

  }
  return (
    <div className="border-2 shadow-md rounded-lg p-5 hover:shadow-lg">
      <h2>{data.destinationName}</h2>
      <p>Price: $ {data.price}</p>
      <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {segment => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <Button onClick={handleBooking}>Book Now</Button>
    </div>
  );
};

export default BookingCard;