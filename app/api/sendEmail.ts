import { firestore } from "@/firebase/server";

export default function sendEmail(email: string, subject: string, html: string) {
    return firestore!.collection("mail").add({
        to: email,
        message: {
            subject: subject,
            html: html,
        },
    });
}