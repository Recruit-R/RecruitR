//This is the page that displays the coordinator or recruiter profile information
import React, { Suspense, useEffect, useState } from "react";
import { getRecruiterData } from "./actions";
import validateUser from "@/app/api/validateUser";
import { cookies, headers } from "next/headers";
import ClientComponent from "./client-component";

async function getUser() {
    const authToken = cookies().get('firebaseIdToken')!.value;
    return validateUser(authToken);
}

async function UserProfileLoading({
    useData,
}: {
    useData?: any;
}) {
    if (useData) {
        return <ClientComponent useData={useData} />
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
        </Suspense>
    )
}

export default async function Page() {
    let useData: any | undefined;
    if (headers().get("accept")?.includes("text/html")) {
        const userAuth = await getUser();
        useData = await getRecruiterData(userAuth.uid);
    }

    return (
        <UserProfileLoading useData = {useData}/>
    )
}