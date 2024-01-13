'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      set up welcome page for recruiter
      <div>
        <span className="text-lg font-semibold">temp routing buttons for development</span>
        <ul>
          <li>
            <Link href={"/recruiter/home"}>Recruiter Dashboard</Link>
          </li>
          <li>
            <Link className="rounded-md bg-slate-500" href={'/signup'}>Signup</Link>
          </li>
          <li>
            <Link className="rounded-md bg-slate-500" href={'/login'}>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
