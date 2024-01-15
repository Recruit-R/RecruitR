"use client";
import { getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfVh_A1RSb2S4xNxNDozKzHRv0nxjv-_M",
    authDomain: "recruitr-5a2af.firebaseapp.com",
    projectId: "recruitr-5a2af",
    storageBucket: "recruitr-5a2af.appspot.com",
    messagingSenderId: "48151581853",
    appId: "1:48151581853:web:f7d7278fc5bdff76523074",
    measurementId: "G-8T1V6SZFQS"
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
