import { promises as fs } from "fs";
import path from "path";
import {    
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"

import { Button } from "@/components/ui/button.tsx"

import useScreenWidth from "@/hooks/use-screen-width.ts";
import { useState } from "react";
import {RecruiterProfileForm} from "@/app/recruit/settings/components/recruiter-profile-form.tsx";
import {AccountForm} from "@/app/recruit/settings/account/account-form.tsx";
import {ProfileForm} from "@/app/recruit/settings/components/profile-form.tsx";

import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator.tsx"
import { SidebarNav } from "@/components/ui/sidebar-nav.tsx"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/recruit/profile/profileform",
      },
  {
    title: "Account",
    href: "/recruit/profile/account",
  },
  {
    title: "Notifications",
    href: "/recruit/profile/notifications"
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div> 
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}

