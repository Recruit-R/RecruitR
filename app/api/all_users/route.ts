import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/firebase/server";

export enum ItemAccess {
    PUBLIC = "PUBLIC",
    STUDENT = "STUDENT",
    RECRUITER = "RECRUITER",
    COORDINATOR = "COORDINATOR",
}

export type Item = {
    id: string;
    title: string;
    access: ItemAccess;
}

export async function GET(request: NextRequest) {
    try {
        if (!firestore) {
            return new NextResponse("Internal Error", { status: 500 });
        }
        const response = await firestore.collection("users").get();
        const items = response.docs.map((doc) => doc.data());
        return NextResponse.json(items);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}