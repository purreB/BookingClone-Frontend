export const hotelKeys = {
  all: ['hotels'] as const,
  lists: () => [...hotelKeys.all, 'list'] as const,
  list: (filters: { readonly q?: string } = {}) => [...hotelKeys.lists(), filters] as const,
  details: () => [...hotelKeys.all, 'detail'] as const,
  detail: (id: string) => [...hotelKeys.details(), id] as const,
};

export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  listByUser: (userId: string) => [...bookingKeys.lists(), { userId }] as const,
  details: () => [...bookingKeys.all, 'detail'] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
};

