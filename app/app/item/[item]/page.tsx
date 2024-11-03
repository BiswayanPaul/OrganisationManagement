"use client";

import { useParams } from "next/navigation";

export default function Item() {
    const params = useParams();

    return (
        <div>
            <h1>Dynamic route: {params.item}</h1>
        </div>
    );
}
