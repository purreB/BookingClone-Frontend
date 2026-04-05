// React Query hooks
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { fetchBookingsByUser, fetchHotels, type Booking, type Hotel } from './api';
import { createHotel } from './api/hotels-client';
import { bookingKeys, hotelKeys } from './queryKeys';
import type { CreateHotelInput } from './validations';

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

export function useCreateHotel(
  accessToken: string | null,
): UseMutationResult<void, Error, CreateHotelInput> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateHotelInput) => {
      if (!accessToken) {
        throw new Error('Not authenticated');
      }
      await createHotel(input, accessToken);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: hotelKeys.lists() });
    },
  });
}