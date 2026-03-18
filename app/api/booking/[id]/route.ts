import { NextResponse } from 'next/server';

import { backendFetch, proxyJsonResponse } from '@/lib/server/backend';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params;
  const res = await backendFetch(`/api/bookings/${encodeURIComponent(id)}`, { method: 'DELETE' });
  return await proxyJsonResponse(res);
}

