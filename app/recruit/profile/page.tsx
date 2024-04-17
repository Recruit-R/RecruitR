//This is the page that displays the coordinator or recruiter profile information
import validateUser from "@/app/api/validateUser";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import { getRecruiterData } from "./actions";
import ClientComponent from "./client-component";
import ProfileSkeleton from "./profile-skeleton";

async function getUser() {
    const authToken = cookies().get('firebaseIdToken')!.value;
    return validateUser(authToken);
}

async function UserProfileLoader() {
    const userAuth = await getUser();
    const recruiterData = await getRecruiterData(userAuth.uid);
    return <ClientComponent useData={recruiterData} />
}


async function UserProfileLoading({ useData }: { useData?: any; }) {
    if (useData) {
        return <ClientComponent useData={useData} />
    }

    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <UserProfileLoader />
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
        <UserProfileLoading useData={useData} />
    )
}