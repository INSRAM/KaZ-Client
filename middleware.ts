import { NextRequest, NextResponse } from 'next/server';


export default function middleware(request: NextRequest) {
    const cookie = request.cookies.get('token');

    const isStaticAsset = request.nextUrl.pathname.match(/\.(css|js)$/); // Add other extensions if needed

    if (!cookie && !['/user/signup', '/user/login'].includes(request.nextUrl.pathname) && !isStaticAsset) {
        request.nextUrl.pathname = '/user/login'
        return NextResponse.redirect(request.nextUrl);
    }
    else if (cookie && ['/user/signup', '/user/login'].includes(request.nextUrl.pathname) && !isStaticAsset) {
        request.nextUrl.pathname = '/'
        return NextResponse.redirect(request.nextUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}