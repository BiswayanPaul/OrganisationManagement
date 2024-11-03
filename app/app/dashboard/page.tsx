"use client"

import { Button } from "@/components/ui/button";
import { SidebarState } from "@/utils/types";
import { Organisation } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [organisations, setOrganisations] = useState<{ id: string; name: string; createdAt: Date }[]>([]);
    const isOpen = useSelector((state: { sidebar: SidebarState }) => state.sidebar.isOpen);

    const getRes = async () => {
        try {
            const res = await fetch("/api/organisation/get", {
                method: "GET",
                credentials: "include"
            });

            if (!res.ok) {
                const text = await res.text();
                console.log(`HTTP error! status: ${res.status}, response: ${text}`);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            const organisationData = data.userOrganisations.map((org: Organisation) => ({
                id: org.id,
                name: org.name,
                createdAt: org.createdAt
            }));
            setOrganisations(organisationData);
        } catch (error) {
            console.log("Failed to fetch organizations:", error);
        }
    };

    useEffect(() => {
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

    const deleteOrganisation = async (id: string) => {
        console.log(`Delete organization ID: ${id}`);
        const res = await fetch("/api/organisation/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orgId: id }),
            credentials: "include"
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.log("Error:", errorData);
            toast.error(errorData.error || "An error occurred");
            return;
        }

        const data = await res.json();
        console.log("Organisation deleted:", data);
        toast.success("Organisation created successfully!");

        getRes();
    };

    const width = isOpen ? 'w-[calc(100vw-224px)]' : 'w-[calc(100vw-48px)]';

    return (
        <div className={`flex ${width} justify-center pt-4`}>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {organisations.map((org, index) => (
                    <div key={index} className="flex flex-col bg-white shadow-md rounded p-4">
                        <Button
                            className="shadow-md rounded h-full w-full p-4 cursor-pointer hover:shadow-lg transition-shadow mb-2"
                            onClick={() => handleClick(org.id)}
                            variant="outline"
                        >
                            {/* Ensure name and date are on separate lines */}
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold">{org.name}</h2>
                                <p className="text-gray-600">
                                    Created {calculateDaysSinceCreation(org.createdAt)} days ago
                                </p>
                            </div>
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
        </div>
    );
}
