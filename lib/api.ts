// API utilities
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function fetchHotels() {
  const res = await fetch(`${API_URL}/api/hotel`);
  return res.json();
}

export async function fetchBookings(userId: string) {
  const res = await fetch(`${API_URL}/api/bookings?userId=${userId}`);
  return res.json();
}