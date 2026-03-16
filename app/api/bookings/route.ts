import { NextRequest, NextResponse } from 'next/server';

import { backendFetch, proxyJsonResponse } from '@/lib/server/backend';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = request.nextUrl.searchParams.get('userId');
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  const res = await backendFetch(`/api/bookings${query}`, { method: 'GET' });
  return await proxyJsonResponse(res);
}

