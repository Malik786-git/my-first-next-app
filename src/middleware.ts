import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // console.log(request.nextUrl.pathname, 'request', request.url);

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    // Real world scenario, you would get the token from the cookies or headers
    // const auth_token = request.cookies.get('session-token')
    console.log(request.headers, 'request headers');

    const { pathname } = request.nextUrl;

    // without matcher...
    // if (!token && (pathname == '/checkout' || pathname == '/merchant')) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    // with matcher...
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

}


export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        // "/((?!_next/static|_next/image|favicon.ico|public/).*)",
        "/merchant:path*",
        "/checkout:path*",
    ],
};
