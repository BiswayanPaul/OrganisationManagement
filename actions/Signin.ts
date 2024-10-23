"use server"

import { signIn } from "@/auth"


export async function SignInWithGoogle() {
    await signIn('google');
}


export async function SignInWithCredentials({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
            redirectTo: "/"
        });
        return { success: "Logged in successfully" };
    } catch (error) {
        console.error("SignIn Error:", error);
        return { error: "An unexpected error occurred" };
    }
}
