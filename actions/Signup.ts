"use server"
import db from "@/lib/db";
import { SignUpSchema } from "@/utils/schema"; // Make sure this imports the correct Zod schema
import bcrypt from "bcryptjs";
import { z } from "zod"

export async function SignUp(values: z.infer<typeof SignUpSchema>) {
    try {
        const validation = SignUpSchema.safeParse(values);
        if (!validation.success) {
            return { "error": "Invalid Input" }
        }
        const { name, email, password } = validation.data;
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return {
                "error": "User already exist"
            }
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: "credentials"
            },
        });

        return { "success": "User Created", newUser }
    } catch (error) {
        console.error("Sign Up Error:", error);
        return { error }
    }
}
