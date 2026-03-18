import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const CreateBookingInputSchema = z
  .object({
    hotelId: z.string().min(1),
    checkIn: z.string().min(1),
    checkOut: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);

    if (Number.isNaN(checkIn.getTime())) {
      ctx.addIssue({ code: 'custom', message: 'Invalid check-in date', path: ['checkIn'] });
    }
    if (Number.isNaN(checkOut.getTime())) {
      ctx.addIssue({ code: 'custom', message: 'Invalid check-out date', path: ['checkOut'] });
    }
    if (!Number.isNaN(checkIn.getTime()) && !Number.isNaN(checkOut.getTime()) && checkOut <= checkIn) {
      ctx.addIssue({
        code: 'custom',
        message: 'Check-out must be after check-in',
        path: ['checkOut'],
      });
    }
  });
export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;