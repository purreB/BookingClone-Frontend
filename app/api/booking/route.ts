import { NextRequest, NextResponse } from 'next/server';

import { flattenError, z } from 'zod';

import { backendFetch, proxyJsonResponse } from '@/lib/server/backend';
import { CreateBookingInputSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const json: unknown = await request.json();
  const parsed = CreateBookingInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid request body', details: flattenError(parsed.error) } },
      { status: 422 },
    );
  }

  const res = await backendFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(parsed.data),
  });
  return await proxyJsonResponse(res);
}

const CancelBookingSchema = z.object({ id: z.string().min(1) });

export async function DELETE(request: NextRequest) {
  const json: unknown = await request.json();
  const parsed = CancelBookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid request body', details: flattenError(parsed.error) } },
      { status: 422 },
    );
  }

  const res = await backendFetch(`/api/bookings/${encodeURIComponent(parsed.data.id)}`, { method: 'DELETE' });
  return await proxyJsonResponse(res);
}