import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

export default async function Page() {
    return (
        <p className="font-bold">hello edit page</p>
    )
}