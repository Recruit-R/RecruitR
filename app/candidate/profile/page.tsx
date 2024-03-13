import ClientComponent from "@/app/candidate/profile/components/client-component";
import getData from "../../api/getData";
import React, { useState } from "react";
import addData from "@/app/api/addData";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Candidate Profile",
    description: "Profile forms built using the components.",
}



export default async function Page() {
    // const students = await getStudents()
    return (
        <ClientComponent />
    )
}