import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Basic auth check - redirect to login if not authenticated
  const token = request.cookies.get('auth-token');
  if (!token && !request.nextUrl.pathname.startsWith('/(auth)')) {
    //TODO: Implement proper authentication check and redirect logic
    //return NextResponse.redirect(new URL('/login', request.url));
    NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};