"use server"

import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: { title: string } }) => {
    try {

        const { title } = params;


        console.log(`Fetching   todo with title: ${title}`);


        return NextResponse.json({ message: `Success fetching todo with title: ${title}` });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Failed to fetch the todo' }, { status: 500 });
    }
};
