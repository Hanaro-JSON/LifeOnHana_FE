import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';
export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  if (!didLogin && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!^$|^/$|_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|signin|columns/.*).*)',
  ],
};
