"use server"

import db from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = async () => {

    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const user = await db.user.findFirst({
        where: { email }
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    const userOrganisations = await db.userOrganisation.findMany({
        where: { userId },
        include: {
            organisation: true
        }
    });

    const organisations = userOrganisations.map(userOrg => userOrg.organisation);

    return NextResponse.json({ userOrganisations: organisations || [] });
}
