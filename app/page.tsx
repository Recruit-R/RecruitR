'use client'
import Link from "next/link";
import {Button} from "@/components/ui/button.tsx";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      set up welcome page for recruiter
      <div>
        <span className="text-lg font-semibold">temp routing buttons for development</span>
        <ul>
          <li>
            <Link className="" href={"/recruit/home"}><Button variant={"outline"}>
              Recruiter Dashboard
            </Button></Link>
          </li>
          <li>
            <Link className="" href={'/auth/signup'}>
              <Button variant={"outline"}>
                Signup
              </Button>
            </Link>
          </li>
          <li>
            <Link className="" href={'/auth/login'}><Button variant={"outline"}>
              Login
            </Button></Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
