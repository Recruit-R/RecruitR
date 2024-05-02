import validateUser from "@/app/api/validateUser";
import ClientComponent from "@/app/candidate/profile/components/client-component";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { getCandidateData } from "./actions";
import CandidateSkeleton from "./components/candidate-skeleton";

export const metadata: Metadata = {
    title: "Candidate Profile",
    description: "Profile forms built using the components.",
}

async function CandidateProfileWithSuspense({
    canData,
}: {
    canData?: any;
}) {
    if (canData) {
        return <ClientComponent canData={canData} />
    }

    return (
        <Suspense fallback={<CandidateSkeleton />}>
            <StudentListLoader />
        </Suspense>
    )
}

async function StudentListLoader() {
    const candidateAuth = await getUser();
    const canData = await getCandidateData(candidateAuth.uid);
    return <ClientComponent canData={canData} />
}

async function getUser() {
    const authToken = cookies().get('firebaseIdToken')!.value;
    return validateUser(authToken);
}


export default async function Page() {
    let canData: any | undefined;
    const candidateAuth = await getUser();
    canData = await getCandidateData(candidateAuth.uid);

    return (
        <CandidateProfileWithSuspense canData={canData} />
    )
}