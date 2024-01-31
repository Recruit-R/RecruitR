"use client";
import Roles from "@/app/types/roles";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";

export function getAuthToken(): string | undefined {
    return Cookies.get("firebaseIdToken");
}

export function setAuthToken(token: string): string | undefined {
    return Cookies.set("firebaseIdToken", token, { secure: true });
}

export function removeAuthToken(): void {
    return Cookies.remove("firebaseIdToken");
}

type AuthContextType = {
    currentUser: User | null;
    isCoordinator: boolean;
    isRecruiter: boolean;
    loginGoogle: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isCoordinator, setIsCoordinator] = useState<boolean>(false);
    const [isRecruiter, setIsRecruiter] = useState<boolean>(false);

    // Triggers when App is started
    useEffect(() => {
        if (!auth) return;

        return auth.onAuthStateChanged(async (user) => {
            // Triggers when user signs out
            if (!user) {
                setCurrentUser(null);
                setIsCoordinator(false);
                setIsRecruiter(false);
                removeAuthToken();
                return;
            }

            const token = await user.getIdToken(true);
            if (user) {
                setCurrentUser(user);

                // Check if is coordinator
                const tokenValues = await user.getIdTokenResult();
                setIsRecruiter(tokenValues.claims.role === Roles.RECRUITER);
                setIsCoordinator(tokenValues.claims.role === Roles.COORDINATOR);

                // check if user exists in database 

                const userResponse = await fetch(`/api/users/${user.uid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userResponse.ok) {
                    const userJson = await userResponse.json();
                    if (userJson?.role) {
                        setIsCoordinator(userJson.role === Roles.COORDINATOR);
                        setIsRecruiter(userJson.role === Roles.RECRUITER);
                    }
                    console.log(userJson);
                    console.log(isCoordinator, isRecruiter);
                } else {
                    console.error("Could not get user info");
                }
                setAuthToken(await user.getIdToken(true));
            }
        });
    }, []);

    function loginGoogle(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            signInWithPopup(auth, new GoogleAuthProvider())
                .then((user) => {
                    console.log("Signed in!");
                    resolve();
                })
                .catch(() => {
                    console.error("Something went wrong");
                    reject();
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
                    console.log("Signed out");
                    resolve();
                })
                .catch(() => {
                    console.error("Something went wrong");
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
                loginGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
