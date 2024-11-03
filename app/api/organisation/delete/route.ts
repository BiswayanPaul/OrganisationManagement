"use server";

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import db from "@/lib/db"

export const DELETE = async (req: Request) => {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    try {
        const { orgId } = await req.json();

        const deleteOrg = await db.organisation.delete({
            where: { id: orgId }
        })

        return NextResponse.json({ deleteOrg });
    } catch (err) {
        return NextResponse.json({ error: err || "Internal Server Error" }, { status: 500 });
    }
};
