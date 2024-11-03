"use server"

import db from "@/lib/db"
import { TodoSchema } from "@/utils/schema"

interface TodoCreateProps {
    title: string,
    description: string,
    organisationId: string,
    userId: string,
    deadLine: string
}

export const POST = async (data: TodoCreateProps) => {

    try {
        const validate = TodoSchema.safeParse({ data })

        if (!validate.success) {
            return Response.json({ "error": "Invalid Input" })
        }

        const { title, description, organisationId, userId, deadLine } = validate.data;

        const existingTodo = await db.todo.findFirst({
            where: { title }
        })

        if (existingTodo) {
            return Response.json({ "error": "Todo with same title already exist" })
        }

        const todo = await db.todo.create({
            data: {
                title, description, organisationId, userId, deadLine
            }
        })

        return Response.json({ todo })

    } catch (err) { console.log(err) }

}