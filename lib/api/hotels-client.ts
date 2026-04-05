import type { CreateHotelInput } from '@/lib/validations';

export class HotelRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HotelRequestError';
  }
}

export async function createHotel(input: CreateHotelInput, accessToken: string): Promise<void> {
  const res = await fetch('/api/hotels', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new HotelRequestError(res.status, text.trim() || res.statusText);
  }
}
