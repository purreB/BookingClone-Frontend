// React Query hooks
import { useQuery, type QueryFunctionContext, type UseQueryResult } from '@tanstack/react-query';
import { fetchBookingsByUser, fetchHotels, type Booking, type Hotel } from './api';
import { bookingKeys, hotelKeys } from './queryKeys';

async function hotelsQueryFn(): Promise<Hotel[]> {
  return await fetchHotels();
}

export function useHotels(): UseQueryResult<Hotel[]> {
  return useQuery({
    queryKey: hotelKeys.lists(),
    queryFn: hotelsQueryFn,
    staleTime: 30_000,
  });
}

async function bookingsByUserQueryFn(
  context: QueryFunctionContext<ReturnType<typeof bookingKeys.listByUser>>,
): Promise<Booking[]> {
  const [, , { userId }] = context.queryKey;
  return await fetchBookingsByUser(userId);
}

export function useBookings(userId: string): UseQueryResult<Booking[]> {
  return useQuery({
    queryKey: bookingKeys.listByUser(userId),
    queryFn: bookingsByUserQueryFn,
    enabled: userId.length > 0,
    staleTime: 30_000,
  });
}