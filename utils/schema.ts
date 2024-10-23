import z from "zod"

export const CredentialSchema = z.object({
    email: z.string().email({ message: "Not a valid Email" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" })
})

export const SignUpSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }),
    email: z.string().email({ message: "Not a valid Email" }),
    password: z.string().min(6, { message: "Minium 6 characters required" })
})

export const SignInSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string({ message: "Password Required" })
})

export const GoogleSigninSchema = z.object({
    name: z.string().min(1, { message: "Name is Required" }),
    email: z.string().email({ message: "Email is Required" }),
    provider: z.string()
})