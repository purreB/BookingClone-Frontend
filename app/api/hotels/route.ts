import { NextResponse } from 'next/server';

import { backendFetch, proxyJsonResponse } from '@/lib/server/backend';

export async function GET(): Promise<NextResponse> {
  const res = await backendFetch('/api/hotel', { method: 'GET' });
  return await proxyJsonResponse(res);
}

