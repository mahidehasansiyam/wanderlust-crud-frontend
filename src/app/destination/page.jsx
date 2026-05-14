import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Destination =async () => {
  const res = await fetch('http://localhost:5000/data');
  const data = await res.json()
  console.log(data);
  return (
    <div className='max-w-6xl mx-auto'>
      <h2>All destination : {data.length}</h2>
      <div className='grid grid-cols-3 gap-3 my-10'> 
        {
          data.map((i) => {
            return (
              <div key={i._id} className="border">
                <Image
                  className=""
                  alt={i.destinationName}
                  src={i.imageUrl}
                  height={400}
                  width={400}
                />

                <div className="p-2">
                  <div className="flex items-center gap-1">
                     <span>{i.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div>
                        <h2 className="text-xl font-bold">{i.destinationName}</h2>
                      </div>
                      <div className="flex gap-1 items-center">
                         {i.duration}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">$ {i.price}</h3>
                    </div>
                  </div>
                  <Link href={`/destination/${i._id}`}>
                    <Button variant="ghost" className={'mt-1 text-cyan-500'}>
                      {' '}
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Destination;