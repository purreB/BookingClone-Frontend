import 'server-only';

import { NextResponse } from 'next/server';

function getBackendBaseUrl(): string {
  const baseUrl = process.env.BACKEND_URL ?? process.env.BACKEND_BASE_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error('Missing BACKEND_URL (or BACKEND_BASE_URL) environment variable');
  }
  return baseUrl.replace(/\/$/, '');
}

export async function backendFetch(path: string, init?: RequestInit): Promise<Response> {
  const baseUrl = getBackendBaseUrl();
  return await fetch(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
}

export async function proxyJsonResponse(res: Response): Promise<NextResponse> {
  const text = await res.text();
  const contentType = res.headers.get('content-type') ?? 'application/json';

  return new NextResponse(text, {
    status: res.status,
    headers: { 'content-type': contentType },
  });
}

