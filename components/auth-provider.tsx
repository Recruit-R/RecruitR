"use client";
import { addCandidateData } from "@/app/candidate/profile/actions";
import Roles from "@/app/types/roles";
import { splitName } from "@/lib/utils";
import { AuthError, GoogleAuthProvider, OAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";


export function getAuthToken(): string | undefined {
    let token = Cookies.get("firebaseIdToken");
    return token;
}

export function setAuthToken(token: string): string | undefined {
    const maxAge = 604800;
    // const secure = process.env.NEXT_PUBLIC_APP_ENV !== "emulator";
    return Cookies.set("firebaseIdToken", token, { secure: false, expires: maxAge });
}

export function removeAuthToken(): void {
    return Cookies.remove("firebaseIdToken");
}

type EmailAccountProps = {
    name?: string;
    email: string;
    password: string;
};

type AuthContextType = {
    currentUser: User | null;
    userRole: Roles | null;
    error: React.JSX.Element | null;
    isLoading: boolean;
    getAuthToken: () => string | undefined;
    refresh: (currentUser: User) => Promise<boolean>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loginMicrosoft: () => Promise<void>;
    loginGoogle: () => Promise<void>;
    loginGithub: () => Promise<void>;
    loginEmail: ({ email, password }: EmailAccountProps) => Promise<void>;
    createAccountEmail: ({ email, password }: EmailAccountProps) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<Roles | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<React.JSX.Element | null>(null);
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
                    // set auth token
                    setAuthToken(token);
                    return token;
                });
                setCurrentUser(user);

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

                // check user role and update states
                if (userResponse.ok) {
                    const userJson = await userResponse.json().then((json) => {
                        setIsLoading(false);
                        return json;
                    });
                    await user.getIdToken(true).then((token) => {
                        // set auth token
                        setAuthToken(token);
                    });
                    setUserRole(userJson.role as Roles);

                } else {
                    console.error("Could not get user info, returned error code:", userResponse);
                    removeAuthToken();
                    setIsLoading(false);
                }

            }
        });
    }, []);


    useEffect(() => {
        // on auth change, redirect to correct page
        if (userRole === null) return;
        if (pathname === '/auth/login' || pathname === '/auth/signup') {
            if (userRole === Roles.COORDINATOR || userRole === Roles.RECRUITER) {
                router.push('/recruit/home');
            } else {
                router.push('/candidate/profile');
            }
        } else {
            if (pathname === '/auth/refresh') {
                router.back();
            }
        }
    }, [userRole, router]);

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

    const GeneralAuthFailure = ({ authCode }: { authCode: string }) => {
        return (
            <span>
                An error occurred. Please try again. If the problem persists, please contact support. <br />
                Error code: {authCode}
            </span>
        )
    }

    function parseAuthError(authError: AuthError) {
        if (authError.code === 'auth/email-already-in-use') {
            setError(<SignupFailure />);
        } else if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(authError.code)) {
            setError(<LoginFailure />);
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
                    router.back();
                }
                return true;
            })
            .catch(() => {
                console.error("Error refreshing token");
                return false;
            })
    }

    function createAccountEmail({ name, email, password }: EmailAccountProps): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    updateProfile(res.user, { displayName: name });
                    const sepName = splitName(name);
                    addCandidateData(res.user.uid as string, {
                        first_name: sepName[0],
                        last_name: sepName[1]
                    })
                    resolve();
                })
                .catch((error) => {
                    parseAuthError(error);
                    setIsLoading(false);
                });
        })
    }

    function loginEmail({ email, password: password }: EmailAccountProps): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                    parseAuthError(error);
                    setIsLoading(false);
                });
        })
    }

    function loginGoogle(): Promise<void> {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            if (!auth) {
                reject();
                return;
            }
            signInWithPopup(auth, new GoogleAuthProvider())
                .then((user) => {
                    resolve();
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    parseAuthError(error);
                    setIsLoading(false);
                });
        });
    }

    function loginMicrosoft(): Promise<void> {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            if (!auth) {
                reject();
                return;
            }
            signInWithPopup(auth, new OAuthProvider('microsoft.com'))
                .then((user) => {
                    console.log(user);
                    resolve();
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    parseAuthError(error);
                    setIsLoading(false);
                });
        });
    }

    function loginGithub(): Promise<void> {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            if (!auth) {
                reject();
                return;
            }
            signInWithPopup(auth, new OAuthProvider('github.com'))
                .then((user) => {
                    resolve();
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("signing in with github failed", error);
                    reject();
                    parseAuthError(error);
                    setIsLoading(false);
                });
        });
    }

    function logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            auth.signOut()
                .then(() => {
                    removeAuthToken();
                    resolve();
                })
                .catch((error) => {
                    console.error("signing out failed", error);
                    reject();
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
