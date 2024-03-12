// import { auth } from '@/firebase/server';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Roles from './app/types/roles';
import { checkEnvironment } from './checkEnvironment';

enum RefreshValue {
    REFRESH = "REFRESH",
    UNAUTHORIZED = "UNAUTHORIZED"
}
const ValidationValue = { ...RefreshValue, ...Roles };

export async function getUserRole(authToken: RequestCookie | undefined): Promise<string> {
    if (!authToken) return ValidationValue.UNAUTHORIZED;
    const baseUrl = checkEnvironment().BASE_URL;
    console.log('mw - base url:', baseUrl);
    console.log('mw - token', authToken.value);
    return await fetch(baseUrl + '/api/validate', {
        headers: { 'Authorization': `Bearer ${authToken.value}` }
    }).then(async (res) => {
        console.log('mw - validation res', res.status);
        if (res.status === 302) {
            return ValidationValue.REFRESH;
        } else if (res.ok) {
            const data = await res.json();
            return ValidationValue[data.role as keyof typeof ValidationValue];
        } else {
            return ValidationValue.UNAUTHORIZED;
        }
    });
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // get path data

    const path = request.nextUrl.pathname;
    console.log('middlware handling ', path);
    console.log('middleware base_url:', checkEnvironment().BASE_URL);
    const authUrl = '/auth/login';
    const recruiterHomeUrl = '/recruit/home';
    const candidateHomeUrl = '/candidate/profile';
    const refreshUrl = '/auth/refresh';
    const coordinatorUrls = ['add-recruiter'];

    // get user role
    const authToken = request.cookies.get('firebaseIdToken');
    let userRole = await getUserRole(authToken);
    console.log('middleware user role:', userRole);

    // handle refresh
    if (userRole === ValidationValue.REFRESH) return NextResponse.redirect(new URL(refreshUrl, request.url));

    if (path === '/') return NextResponse.redirect(new URL(authUrl, request.url));

    // handle auth page rerouting if necessary
    if (path.startsWith('/auth')) {
        if (userRole === ValidationValue.UNAUTHORIZED) {
            return NextResponse.next();
        } else {
            if (userRole === Roles.CANDIDATE) return NextResponse.redirect(new URL(candidateHomeUrl, request.url));
            if (userRole === Roles.RECRUITER || userRole === Roles.COORDINATOR) return NextResponse.redirect(new URL(recruiterHomeUrl, request.url));
        }
    }

    // redirect to auth page if unauthorized
    if (userRole === ValidationValue.UNAUTHORIZED) return NextResponse.redirect(new URL(authUrl, request.url));


    // redirect to respective page if authorized user on wrong page
    const isCandidate = userRole === Roles.CANDIDATE;
    const isRecruiter = userRole === Roles.RECRUITER;
    const isCoordinator = userRole === Roles.COORDINATOR;

    if (isCandidate && path.startsWith('/candidate')) {
        return NextResponse.next();
    } else if ((isRecruiter || isCoordinator) && path.startsWith('/recruit')) {
        if (isRecruiter) {
            if (coordinatorUrls.some((url) => path.includes(url))) {
                return NextResponse.redirect(new URL(recruiterHomeUrl, request.url));
            }
        }
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL(authUrl, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/recruit/:path*',
        '/candidate/:path*',
        '/auth/login/:path*',
        '/auth/signup/:path*',
        '/'
    ],
}