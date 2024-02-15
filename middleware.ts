// import { auth } from '@/firebase/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Roles from './app/types/roles';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('firebaseIdToken');
    const urlTag = request.nextUrl.pathname.split('/')[1];
    let authUrl = '/auth/login';
    if (!authToken) return NextResponse.redirect(new URL(authUrl, request.url));
    const userRole: string | null = await fetch(process.env.API_URL + '/api/validate', {
        headers:
        {
            'Authorization': `Bearer ${authToken.value}`
        }
    })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                return data.role;
            } else {
                return null;
            }
        });

    if (!userRole) return NextResponse.redirect(new URL(authUrl, request.url));

    const isCandidate = userRole === Roles.CANDIDATE;
    const isRecruiter = userRole === Roles.RECRUITER || userRole === Roles.COORDINATOR;
    if (isCandidate && urlTag === 'candidate' || isRecruiter && urlTag === 'recruit') {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(authUrl, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/recruit/:path*',
        '/candidate/:path*',
    ],
}