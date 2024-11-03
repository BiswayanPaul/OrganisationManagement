
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import db from "@/lib/db"
import { CredentialSchema, GoogleSigninSchema } from "./utils/schema";
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            authorize: async (credentials) => {
                const validate = CredentialSchema.safeParse(credentials);
                if (!validate.success) {
                    return null;
                }
                const { email, password } = validate.data;

                const user = await db.user.findFirst({
                    where: { email }
                })

                if (!user || !user.password) {
                    return null;
                }

                const matchPassword = await bcrypt.compare(password, user.password);

                if (!matchPassword) {
                    return null;
                }

                return user;
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            return session;
        },
        async signIn({ user, account, profile }) {
            // console.log({ user, account, profile });
            const name = profile?.name;
            const email = profile?.email
            const provider = account?.provider;

            if (provider != "google") return true;

            const validate = GoogleSigninSchema.safeParse({ name, email, provider })

            if (!validate.success) {
                return false;
            }

            if (!user || !user.email) return false;
            const existingUser = await db.user.findFirst({
                where: { email: validate.data.email }
            })

            if (!existingUser) {
                await db.user.create(
                    {
                        data: {
                            name: validate.data.name,
                            email: validate.data.email,
                            provider: validate.data.provider
                        }
                    }
                )
            }
            return true
        }
    },


})