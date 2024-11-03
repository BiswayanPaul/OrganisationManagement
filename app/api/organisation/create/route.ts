"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { OrganisationSchema } from "@/utils/schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const session = await auth();
    console.log(session);
    const email = session?.user?.email;
    console.log(email);

    const data = await req.json();
    console.log(data);

    if (!email) {
        return NextResponse.json({ "error": "Not Authenticated" }, { status: 401 }); // Change to 401
    }

    try {
        const unvalid_name = data.name;
        console.log(unvalid_name);
        const validate = OrganisationSchema.safeParse({ name: unvalid_name });

        if (!validate.success) {
            console.log(validate.error);
            return NextResponse.json({ "error": "Invalid Input" }, { status: 400 }); // Keep as 400
        }

        const { name } = validate.data;

        const existingOrg = await db.organisation.findFirst({
            where: { name }
        });

        if (existingOrg) {
            return NextResponse.json({ "error": "Organisation with same title already exists" }, { status: 400 }); // Keep as 400
        }

        const user = await db.user.findFirst({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ "error": "Invalid User" }, { status: 404 }); // Change to 404
        }

        const userId = user?.id;

        const org = await db.organisation.create({
            data: {
                name,
                members: {
                    create: {
                        userId,
                        role: "ADMIN"
                    }
                },
            }
        });

        return NextResponse.json({ org }, { status: 201 }); // Change to 201

    } catch (err) {
        console.error(err);
        return NextResponse.json({ "error": err }, { status: 500 }); // Keep as 500
    }
};
