"use client";
import addData from "@/app/api/addData";
import getData from "@/app/api/getData";
import { addCandidateData } from "@/app/candidate/profile/actions";
import Roles from "@/app/types/roles";
import { AuthError, GoogleAuthProvider, OAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth } from "../firebase/client";


export function getAuthToken(): string | undefined {
    let token = Cookies.get("firebaseIdToken");
    return token;
}

export function setAuthToken(token: string): string | undefined {
    if (Cookies.get('firebaseIdToken')) {
        Cookies.remove('firebaseIdToken');
    }
    const maxAge = 604800;
    // const secure = process.env.NEXT_PUBLIC_APP_ENV !== "emulator";
    return Cookies.set("firebaseIdToken", token, { secure: false, expires: maxAge });
}

export function removeAuthToken(): void {
    return Cookies.remove("firebaseIdToken");
}

type EmailAccountProps = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
};

type AuthContextType = {
    currentUser: User | null;
    userRole: Roles | null;
    error: React.JSX.Element | null;
    isLoading: boolean;
    events: string[],
    addEvent: (eventId: string) => void;
    setError: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
    getAuthToken: () => string | undefined;
    refresh: (currentUser: User) => Promise<boolean>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loginMicrosoft: () => Promise<void>;
    loginGoogle: () => Promise<void>;
    loginGithub: () => Promise<void>;
    loginEmail: ({ email, password }: EmailAccountProps) => Promise<void>;
    createAccountEmail: ({ firstName, lastName, email, password }: EmailAccountProps) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<Roles | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<React.JSX.Element | null>(null);
    // const [userEventsRef, setUserEvents] = useState<string[]>([]);
    const userEventsRef = useRef<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();


    // Triggers when App is started
    useEffect(() => {
        if (!auth) return;

        // Triggers on auth change (user signin/signout)
        return auth.onAuthStateChanged(async (user) => {
            setIsLoading(true);

            // if user logging out
            if (!user) {
                setCurrentUser(null);
                setUserRole(null);
                removeAuthToken();
                setIsLoading(false);
                return;
            }

            if (user) {
                const token = await user.getIdToken(true).then((token) => {
                    return token;
                });

                // Check user role
                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

                // make new user in db if user is new, get user role
                let userResponse;
                if (isNewUser) {
                    userResponse = await fetch(`/api/users`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            uid: user.uid,
                            email: user.email,
                            name: user.displayName ?? "john doe",
                        }),
                    });
                } else {
                    userResponse = await fetch(`/api/users?` + new URLSearchParams({
                        uid: user.uid,
                    }), {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                if (userResponse.status === 409) {
                    userResponse = await fetch(`/api/users?` + new URLSearchParams({
                        uid: user.uid,
                    }), {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                // check user role and update states
                if (userResponse.ok) {
                    const userJson = await userResponse.json().then((json) => {
                        return json;
                    });
                    await user.getIdToken(true).then((token) => {
                        // set auth token
                        setAuthToken(token);
                    });
                    if (userEventsRef.current.length > 0) {
                        getData({ collection_name: 'users', document_id: user.uid as string }).then((data) => {
                            let newList = userEventsRef.current;
                            if (data && data.events !== undefined) {
                                const userEvents = data.events as string[];
                                newList = [...userEventsRef.current, ...userEvents];
                            }
                            addData('users', user.uid as string, { events: Array.from(new Set(newList)) });

                        });
                    }
                    setCurrentUser(user);
                    setUserRole(userJson.role as Roles);

                } else {
                    console.error("Could not get user info, returned error code:", userResponse);
                    removeAuthToken();
                    parseAuthError({ code: 'auth/internal-error', message: 'Could not get user info' } as AuthError);
                }
            }
        });
    }, []);


    useEffect(() => {
        // on auth change, redirect to correct page
        if (userRole === null) return;
        if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup')) {
            if (userRole === Roles.COORDINATOR || userRole === Roles.RECRUITER) {
                router.push('/recruit/home');
            } else {
                router.push('/candidate/profile');
            }
        } else {
            if (pathname === '/auth/refresh') {
                router.push('/auth/login');
            }
        }
    }, [userRole, router]);

    // useEffect(() => {
    //     if (currentUser !== null && userEventsRef.current.length > 0) {
    //         getData({ collection_name: 'users', document_id: currentUser?.uid as string }).then((data) => {
    //             let newList = userEventsRef.current;
    //             if (data && data.events !== undefined) {
    //                 const userEvents = data.events as string[];
    //                 newList = [...userEventsRef.current, ...userEvents];
    //             }
    //             addData('users', currentUser?.uid as string, { events: Array.from(new Set(newList)) });

    //         });
    //     }
    // }, [userEventsRef.current, currentUser])


    function addEvent(eventId: string) {
        userEventsRef.current = [...userEventsRef.current, eventId]
    }

    const LoginFailure = () => {
        return (
            <div className='text-center'>
                <span>Incorrect email or password. <br />Try again or </span>
                <Link className='underline' href="/auth/signup" >
                    sign up instead
                </Link>
            </div>
        )
    }

    const SignupFailure = () => {
        return (
            <div className='text-center'>
                <span>An account with this email already exists. <br /> Please </span>
                <Link className='underline' href="/auth/login" >
                    login instead
                </Link>
            </div>
        )
    }

    const AccountExistsFailure = () => {
        return (
            <span>
                An account with this credential already exists. Please login with the same provider you used to create the account.
            </span>
        )
    }

    const PopupClosedFailure = () => {
        return (
            <span>
                The popup was closed before authentication could be completed. Please try again.
            </span>
        )
    }

    const GeneralAuthFailure = ({ authCode }: { authCode: string }) => {
        return (
            <span>
                An error occurred. Please try again. If the problem persists, please contact support. <br />
                Error code: {authCode}
            </span>
        )
    }

    function parseAuthError(authError: AuthError) {
        setIsLoading(false);
        if (authError.code === 'auth/email-already-in-use') {
            setError(<SignupFailure />);
        } else if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(authError.code)) {
            setError(<LoginFailure />);
        } else if (authError.code === 'auth/account-exists-with-different-credential') {
            setError(<AccountExistsFailure />)
        } else if (authError.code === 'auth/popup-closed-by-user') {
            setError(<PopupClosedFailure />);
        } else {
            setError(<GeneralAuthFailure authCode={authError.code} />);
        }
    }


    async function refresh(currentUser: User): Promise<boolean> {
        return currentUser
            .getIdToken(true) // true will force token refresh
            .then(async (token) => {
                setAuthToken(token)
                if (pathname === '/auth/refresh') {
                    console.log('refreshing from refresh function', userRole)

                    router.back();
                }
                return true;
            })
            .catch(() => {
                console.error("Error refreshing token");
                return false;
            })
    }

    function createAccountEmail({ firstName, lastName, email, password }: EmailAccountProps): Promise<void> {
        return new Promise((resolve) => {
            if (!auth) {
                setError(<GeneralAuthFailure authCode="auth/not-initialized" />);
                return;
            }
            if (firstName === undefined || lastName === undefined || firstName === "" || lastName === "") {
                setError(<span>Please enter your first and last name.</span>);
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    updateProfile(res.user, { displayName: firstName + " " + lastName });
                    addCandidateData(res.user.uid as string, {
                        first_name: firstName,
                        last_name: lastName
                    })
                    resolve();
                })
                .catch((error) => {
                    parseAuthError(error);
                });
        })
    }

    function loginEmail({ email, password: password }: EmailAccountProps): Promise<void> {
        return new Promise((resolve) => {
            if (!auth) {
                setError(<GeneralAuthFailure authCode="auth/not-initialized" />);
                return;
            }
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    parseAuthError(error);
                });
        })
    }

    function loginGoogle(): Promise<void> {
        return new Promise((resolve) => {
            setIsLoading(true);
            if (!auth) {
                setError(<GeneralAuthFailure authCode="auth/not-initialized" />);
                return;
            }
            signInWithPopup(auth, new GoogleAuthProvider())
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    parseAuthError(error);
                });
        });
    }

    function loginMicrosoft(): Promise<void> {
        return new Promise((resolve) => {
            setIsLoading(true);
            if (!auth) {
                setError(<GeneralAuthFailure authCode="auth/not-initialized" />);
                return;
            }
            signInWithPopup(auth, new OAuthProvider('microsoft.com'))
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    parseAuthError(error);
                });
        });
    }

    function loginGithub(): Promise<void> {
        return new Promise((resolve) => {
            setIsLoading(true);
            if (!auth) {
                setError(<GeneralAuthFailure authCode="auth/not-initialized" />);
                return;
            }
            signInWithPopup(auth, new OAuthProvider('github.com'))
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error("signing in with github failed", error);
                    parseAuthError(error);
                });
        });
    }

    function logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                setError(<GeneralAuthFailure authCode="auth/not-initialized" />);
                return;
            }
            removeAuthToken();
            auth.signOut()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userRole,
                isLoading,
                error,
                events: userEventsRef.current,
                addEvent,
                setError,
                getAuthToken,
                refresh,
                setIsLoading,
                loginGoogle,
                loginMicrosoft,
                loginGithub,
                loginEmail,
                createAccountEmail,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
