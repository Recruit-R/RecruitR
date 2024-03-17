"use client";
import Roles from "@/app/types/roles";
import { GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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

export async function refresh(currentUser: User): Promise<boolean> {
    return currentUser
        .getIdToken(true) // true will force token refresh
        .then(async () => {
            setAuthToken(await currentUser.getIdToken(true))
            return true;
        })
        .catch(() => {
            console.error("Error refreshing token");
            return false;
        })
}

type EmailAccountProps = {
    email: string;
    password: string;
};

type AuthContextType = {
    currentUser: User | null;
    isCoordinator: boolean;
    isRecruiter: boolean;
    isLoading: boolean;
    getAuthToken: () => string | undefined;
    refresh: (currentUser: User) => Promise<boolean>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loginGoogle: () => Promise<void>;
    loginEmail: ({ email, password }: EmailAccountProps) => Promise<void>;
    createAccountEmail: ({ email, password }: EmailAccountProps) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isCoordinator, setIsCoordinator] = useState<boolean>(false);
    const [isRecruiter, setIsRecruiter] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // Triggers when App is started
    useEffect(() => {
        if (!auth) return;

        // Triggers on auth change (user signin/signout)
        return auth.onAuthStateChanged(async (user) => {
            setIsLoading(true);

            // if user logging out
            if (!user) {
                setCurrentUser(null);
                setIsCoordinator(false);
                setIsRecruiter(false);
                removeAuthToken();
                setIsLoading(false);
                return;
            }

            const token = await user.getIdToken(true);
            if (user) {
                setCurrentUser(user);

                // Check user role
                const tokenValues = await user.getIdTokenResult();
                setIsRecruiter(tokenValues.claims.role === Roles.RECRUITER);
                setIsCoordinator(tokenValues.claims.role === Roles.COORDINATOR);

                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

                console.log("isNewUser", isNewUser);

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
                            name: user.displayName,
                        }),
                    });
                } else {
                    userResponse = await fetch(`/api/users`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                console.log('user response', userResponse);
                // check user role and update states
                if (userResponse.ok) {
                    const userJson = await userResponse.json();
                    console.log('userjson:', userJson);
                    setIsCoordinator(userJson.role === Roles.COORDINATOR);
                    setIsRecruiter(userJson.role === Roles.RECRUITER);


                    // set auth token
                    setAuthToken(await user.getIdToken(true).then((res) => {
                        setIsLoading(false);
                        return res;
                    }));
                } else {
                    console.error("Could not get user info, returned error code:", userResponse.status);
                }

            }
        });
    }, []);


    useEffect(() => {
        // on auth change, redirect to correct page
        console.log('rerouting', isCoordinator, isRecruiter);
        if (isCoordinator || isRecruiter) {
            router.push('/recruit/home');
        } else {
            router.push('/candidate/profile');
        }
    }, [isCoordinator, isRecruiter, router]);


    function createAccountEmail({ email, password }: EmailAccountProps): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
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
                    console.error("signing in with email and password failed");
                    reject(error);
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
                })
                .catch(() => {
                    console.error("signing in with google failed");
                    reject();
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
                .catch(() => {
                    console.error("signing out failed");
                    reject();
                });
        });
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isCoordinator,
                isRecruiter,
                isLoading,
                getAuthToken,
                refresh,
                setIsLoading,
                loginGoogle,
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
