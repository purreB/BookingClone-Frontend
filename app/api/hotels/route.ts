import { type NextRequest, NextResponse } from 'next/server';
import { flattenError } from 'zod';

import { backendFetch, proxyJsonResponse } from '@/lib/server/backend';
import { CreateHotelSchema } from '@/lib/validations';

export async function GET(): Promise<NextResponse> {
  const res = await backendFetch('/api/hotel', { method: 'GET' });
  return await proxyJsonResponse(res);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.toLowerCase().startsWith('bearer ')) {
    return NextResponse.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing or invalid Authorization header. Expected Bearer token.',
        },
      },
      { status: 401 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request body must be JSON',
        },
      },
      { status: 422 },
    );
  }

  const parsed = CreateHotelSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: flattenError(parsed.error),
        },
      },
      { status: 422 },
    );
  }

  const res = await backendFetch('/api/hotel', {
    method: 'POST',
    body: JSON.stringify(parsed.data),
    headers: { authorization: authHeader },
  });
  return await proxyJsonResponse(res);
}

