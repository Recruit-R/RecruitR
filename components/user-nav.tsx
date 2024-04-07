'use client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.tsx"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import Link from "next/link";
import { useAuth } from "@/components/auth-provider.tsx";
import { useRouter } from "next/navigation";
import Roles from "@/app/types/roles";

export function UserNav() {
    const auth = useAuth();
    const router = useRouter();
    const name = auth?.currentUser?.displayName ?? "Recruiter Context"
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>{name.split(" ")[0][0].toUpperCase()}{name.split(" ")[1][0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className={"text-xs font-bold leading-none text-muted-foreground"}>
                            {auth?.userRole === Roles.COORDINATOR
                                ? "Coordinator"
                                : auth?.userRole === Roles.RECRUITER
                                    ? "Recruiter"
                                    : "Unknown Role"
                            }
                        </p>
                        <p className="text-sm font-medium leading-none">{auth?.currentUser?.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {auth?.currentUser?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={"/recruit/home"}>
                        <DropdownMenuItem>
                            Home
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/recruit/profile"}>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/recruit/events"}>
                        <DropdownMenuItem>
                            Events
                            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    {auth?.userRole === Roles.COORDINATOR &&
                        <Link href={"/recruit/manage-recruiters"}>
                            <DropdownMenuItem>
                                Manage Recruiters
                                <DropdownMenuShortcut>⇧⌘M</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    }
                    {/*<DropdownMenuItem>*/}
                    {/*    Rapid Sign Up*/}
                    {/*    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
                    {/*</DropdownMenuItem>*/}
                    {/*<DropdownMenuItem>Generate QR Code</DropdownMenuItem>*/}

                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    auth?.logout().then(() => {
                        router.push("/auth/login");
                    }).catch((error: any) => {
                        console.log(error);
                    });
                }}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}