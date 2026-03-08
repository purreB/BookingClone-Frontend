import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const bookingSchema = z.object({
  hotelId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
});