// React Query hooks
import { useQuery } from '@tanstack/react-query';
import { fetchHotels, fetchBookings } from './api';

export function useHotels() {
  return useQuery({ queryKey: ['hotels'], queryFn: fetchHotels });
}

export function useBookings(userId: string) {
  return useQuery({ queryKey: ['bookings', userId], queryFn: () => fetchBookings(userId) });
}