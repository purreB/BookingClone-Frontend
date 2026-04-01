import { requestJson } from "@/lib/api/client";

export interface Hotel {
  id: string;
  name?: string;
  // Allow backend shape to evolve without breaking the UI immediately.
  [key: string]: unknown;
}

export interface Booking {
  id: string;
  [key: string]: unknown;
}

export async function fetchHotels(): Promise<Hotel[]> {
  return await requestJson<Hotel[]>("/api/hotels");
}

export async function fetchBookingsByUser(userId: string): Promise<Booking[]> {
  return await requestJson<Booking[]>(`/api/bookings?userId=${encodeURIComponent(userId)}`);
}