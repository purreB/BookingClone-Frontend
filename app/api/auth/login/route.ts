import { NextResponse } from 'next/server';

import { backendFetch, proxyJsonResponse } from '@/lib/server/backend';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.text();
  const res = await backendFetch('/api/Auth/login', {
    method: 'POST',
    body,
  });
  return await proxyJsonResponse(res);
}
