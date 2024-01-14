"use client";
import { getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEhSOpSsVoR69DYZj3ZzD2SrWrYOLC8HU",
    authDomain: "recruitr-security-test.firebaseapp.com",
    projectId: "recruitr-security-test",
    storageBucket: "recruitr-security-test.appspot.com",
    messagingSenderId: "713680458659",
    appId: "1:713680458659:web:31cbd95b48537ecb1f4016",
    measurementId: "G-D8L5NWYPE7"
};

const currentApps = getApps();

let auth: Auth | undefined = undefined;

if (currentApps.length <= 0) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    if (
        process.env.NEXT_PUBLIC_APP_ENV === "emulator" &&
        process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
    ) {
        connectAuthEmulator(
            auth,
            `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`
        );
    }
} else {
    auth = getAuth(currentApps[0]);
    if (
        process.env.NEXT_PUBLIC_APP_ENV === "emulator" &&
        process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
    ) {
        connectAuthEmulator(
            auth,
            `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`
        );
    }
}

export { auth };
