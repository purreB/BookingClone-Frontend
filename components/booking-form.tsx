import React from 'react';

export function BookingForm() {
  return (
    <form className="space-y-4">
      <input type="date" placeholder="Check-in" />
      <input type="date" placeholder="Check-out" />
      <button type="submit">Book Now</button>
    </form>
  );
}