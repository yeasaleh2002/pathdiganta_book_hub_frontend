import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
  // If user hasn't explicitly chosen a language, ignore browser language and default to Bangla
  if (!req.cookies.has('NEXT_LOCALE')) {
    req.headers.delete('accept-language');
  }
  return intlMiddleware(req);
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(bn|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
