"use client"

import { Button } from "@/components/ui/button";
import { Organisation } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [organisations, setOrganisations] = useState<{ id: string; name: string; createdAt: Date }[]>([]);

    useEffect(() => {
        const getRes = async () => {
            try {
                const res = await fetch("/api/organisation/get", {
                    method: "GET",
                    credentials: "include"
                });

                if (!res.ok) {
                    const text = await res.text();
                    console.error(`HTTP error! status: ${res.status}, response: ${text}`);
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data);

                const organisationData = data.userOrganisations.map((org: Organisation) => ({
                    id: org.id,
                    name: org.name,
                    createdAt: org.createdAt
                }));
                setOrganisations(organisationData);
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
            }
        };
        getRes();
    }, []);

    const calculateDaysSinceCreation = (createdAt: Date) => {
        const today = new Date();
        const creationDate = new Date(createdAt);
        const timeDiff = today.getTime() - creationDate.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    };

    const handleClick = (id: string) => {
        console.log(`Organization ID clicked: ${id}`);
    };

    const deleteOrganisation = (id: string) => {
        console.log(`Delete organization ID: ${id}`);
    };

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {organisations.map((org, index) => (
                <div key={index} className="flex flex-col bg-white shadow-md rounded p-4">
                    <Button
                        className="shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition-shadow mb-2"
                        onClick={() => handleClick(org.id)}
                        variant="outline"
                    >
                        <h2 className="text-xl font-bold">{org.name}</h2>
                        <p className="text-gray-600"> Created {calculateDaysSinceCreation(org.createdAt)} days ago</p>
                    </Button>
                    <Button
                        onClick={() => deleteOrganisation(org.id)}
                        variant="destructive"
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
}
