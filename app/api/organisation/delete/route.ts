"use server"

import { auth } from "@/auth";
import { NextResponse } from "next/server";


export const DELETE = async (req: Request) => {
    const session = await auth();
    console.log(session);
    const email = session?.user?.email;
    console.log(email);

    const data = await req.json();
    console.log(data);

    if (!email) {
        return NextResponse.json({ "error": "Not Authenticated" }, { status: 401 }); // Change to 401
    }

    
}