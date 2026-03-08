// API utilities
export async function fetchHotels() {
  const res = await fetch('/api/hotels'); // Adjust URL as needed
  return res.json();
}

export async function fetchBookings(userId: string) {
  const res = await fetch(`/api/bookings?userId=${userId}`);
  return res.json();
}