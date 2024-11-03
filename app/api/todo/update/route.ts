"use server"

import db from "@/lib/db"

interface TodoUpdateProps {
    id: string,
    title?: string,
    description?: string,
    deadLine?: Date
}


export const PUT = async (data: TodoUpdateProps) => {
    try {
        const id = data.id;
        const title = data.title;
        const description = data.description;
        const deadLine = data.deadLine;

        const todo = await db.todo.update({
            where: { id },
            data: { title, description, deadLine }
        })

        return Response.json({ todo })


    } catch (err) { console.log(err) }
}