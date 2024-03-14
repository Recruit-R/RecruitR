import Reset from "./components/ClientComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset password forms built using the components.",
}

export default async function ResetPage() {
    return (<Reset/>)
}