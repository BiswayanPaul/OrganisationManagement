import db from "@/lib/db"
import { NextResponse } from "next/server";

export const getUserByEmail = async (email: string) => {
    try {
        const user = db.user.findFirst({
            where: { email }
        })

        if (!user) {
            return NextResponse.json("No User Found");
        }

        return user;
    }
    catch (error) {
        console.log(error);
        return NextResponse.json("Something went wrong")
    }
}
export const getUserById = async (id: string) => {
    try {
        const user = db.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json("No User Found");
        }

        return user;
    }
    catch (error) {
        console.log(error);
        return NextResponse.json("Something went wrong")
    }
}