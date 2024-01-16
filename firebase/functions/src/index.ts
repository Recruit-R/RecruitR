import { auth, config } from "firebase-functions";
import { firestore } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase-admin/app";

initializeApp(config().firebase);

export const onUserCreate = auth.user().onCreate(async (user) => {
    if (user.email && user.email === "coordinator@example.com") {
        await firestore().doc(`users/${user.uid}`).create({
            isRecruiter: true,
        });

        const customClaims = {
            role: "coordinator",
        };

        try {
            await getAuth().setCustomUserClaims(user.uid, customClaims);
        } catch (error) {
            console.log(error);
        }
        return;
    }

    if (user.email && user.email === "recruiter@example.com") {
        await firestore().doc(`users/${user.uid}`).create({
            isRecruiter: true,
        });
        return;
    }

    await firestore().doc(`users/${user.uid}`).create({
        isRecruiter: false,
    });
});
