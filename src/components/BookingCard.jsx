"use client"
import { authClient } from '@/lib/auth-client';
import { Basic } from './DateField';
import { Button, DateField, Label } from '@heroui/react';
import { useState } from 'react';



const BookingCard = ({ data }) => {
  const [departureDate, setDepartureDate] = useState(null);
 
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

    // get token from better auth in client component *****************
    const { data: tokenData } = await authClient.token();
    
    const res = await fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });
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