import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";
import {UserNav} from "@/components/user-nav.tsx";
import Image from "next/image";
import picture from "@/assets/logo.png"
import SignOut from "@/app/candidate/components/signout-button.tsx";
import {Button} from "@/components/ui/button";

export default function NavBar({studentNav}: {studentNav: boolean}) {
    return (
        <nav className="flex py-3 px-2 bg-background items-center">
            <Link href={studentNav ? "/candidate/profile" : "/recruit/home"}>
                <Image src={picture} alt={"logo"} width={100} height={50} />
            </Link>
            <div className="flex items-center ml-auto space-x-4 pr-2">
                {studentNav && <Button asChild variant={"link"}>
                            <Link href="https://www.ppg.com/en-US" target="_blank">Check out PPG!</Link>
                        </Button>}
                <ModeToggle/>
                {
                    !studentNav &&
                    <UserNav />
                }

            </div>
            {studentNav &&
                <SignOut />}

    </nav>
    )
}