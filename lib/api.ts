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

async function fetchJson<TResponse>(input: RequestInfo, init?: RequestInit): Promise<TResponse> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return (await res.json()) as TResponse;
}

export async function fetchHotels(): Promise<Hotel[]> {
  return await fetchJson<Hotel[]>("/api/hotels");
}

export async function fetchBookingsByUser(userId: string): Promise<Booking[]> {
  return await fetchJson<Booking[]>(`/api/bookings?userId=${encodeURIComponent(userId)}`);
}