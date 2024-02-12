import SignOut from "@/app/candidate/components/signout-button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex p-4 bg-background items-center">
            <Link href={"/recruiter/home"}>LogoPlaceholder</Link>
            <div className="ml-auto space-x-4 px-4">
                <Link
                    href={"/recruiter/events"}
                    className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Events
                </Link>
                <SignOut />
                <Link href={"/recruiter/profile"}>ProfImg</Link>
            </div>
            <ModeToggle />
        </nav>
    )
}