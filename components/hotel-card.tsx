import React from 'react';

import type { Hotel } from '@/lib/api';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const subtitle =
    (typeof hotel.address === 'string' && hotel.address) ||
    (typeof hotel.location === 'string' && hotel.location) ||
    null;

  return (
    <div className="border rounded p-4">
      <h3>{hotel.name ?? 'Hotel'}</h3>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}