import SignOut from "@/app/candidate/components/signout-button.tsx";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav.tsx";
import picture from "@/resources/assets/logo-v2.svg";
import Image from "next/image";
import Link from "next/link";
import {LogoV2} from "@/components/logo-v2.tsx";

export default function NavBar({ studentNav }: { studentNav: boolean }) {
    return (
        <nav className="flex px-2 py-3 md:px-2 bg-background items-center gap-2">
            <Link href={studentNav ? "/candidate/profile" : "/recruit/home"} className='flex flex-row justify-center items-center'>
                {/*<Image src={picture} alt={"logo"} width={50} height={50} />*/}
                <LogoV2 loginPage={false}/>
                <span className='font-roboto text-2xl md:text-3xl font-semibold'>RecruitR</span>
            </Link>
            <div className="flex items-center ml-auto gap-4">
                {studentNav && <Button asChild variant={"link"} className={"hidden md:block"}>
                    <Link href="https://www.ppg.com/en-US" target="_blank">Check out PPG!</Link>
                </Button>}
                <ModeToggle />
                {
                    !studentNav &&
                    <UserNav />
                }

            </div>
            {studentNav &&
                <div>
                    <SignOut />
                </div>
            }

        </nav>
    )
}