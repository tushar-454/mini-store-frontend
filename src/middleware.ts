import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { BASE_URL } from './constant';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  const email = token?.email;
  if (!email) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  const res = await fetch(`${BASE_URL}/auth/user/${email}`);
  const { data } = await res.json();
  if (!data || !data?.role) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (data?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/invoice', '/invoice/:path*'],
};
