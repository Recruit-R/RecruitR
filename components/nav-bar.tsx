import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";
import {UserNav} from "@/components/user-nav.tsx";
import Image from "next/image";
import picture from "@/assets/logo.png"

export default function NavBar() {
    return (
        <nav className="flex py-3 px-2 bg-background items-center">
            <Link href={"/recruiter/home"}>
                <Image src={picture} alt={"logo"} width={100} height={50} />
            </Link>
            <div className="flex items-center ml-auto space-x-4">
                <ModeToggle/>
                <UserNav />
            </div>

    </nav>
    )
}