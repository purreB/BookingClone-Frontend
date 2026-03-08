import React from 'react';

export function HotelCard({ hotel }: { hotel: { name: string; location: string } }) {
  return (
    <div className="border rounded p-4">
      <h3>{hotel.name}</h3>
      <p>{hotel.location}</p>
    </div>
  );
}