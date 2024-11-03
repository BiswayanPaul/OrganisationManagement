"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { RxViewVertical } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "@/actions/Signout";
import Link from "next/link"; // Import Link from next/link
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/utils/sidebarSlice"; // Adjust the import path
import { SidebarState } from "@/utils/types";
import { Organisation } from "@prisma/client";

export default function Sidebar() {
    const isOpen = useSelector((state: { sidebar: SidebarState }) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    const [selectedOrganisation, setSelectedOrganisation] = useState<string>(""); // Store selected organisation
    const [organisation, setOrganisation] = useState<string[]>([]);
    const [sideBarItem, setSideBarItems] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>(""); // State for selected sidebar item

    const toggleSideBar = () => {
        dispatch(toggleSidebar()); // Dispatch the toggle action
    };

    useEffect(() => {
        // Initial values (optional)
        const sideBarItems = ["item1", "item2", "item3", "item4"];
        setSideBarItems(sideBarItems);

        const getRes = async () => {
            try {
                const res = await fetch("/api/organisation/get", {
                    method: "GET",
                    credentials: "include"
                });

                // Check if the response is OK
                if (!res.ok) {
                    const text = await res.text(); // Get the raw response for logging
                    console.error(`HTTP error! status: ${res.status}, response: ${text}`);
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data);

                // Assuming data.userOrganisations is an array of organization objects
                // Each object in data.userOrganisations has a `name` property
                const organisationNames = data.userOrganisations.map((org: Organisation) => org.name);
                setOrganisation(organisationNames);
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
            }
        }

        getRes();
    }, []);

    const handleSignOut = async () => {
        await SignOut();
    };

    return (
        <div className={cn("flex h-screen transition-all duration-300", isOpen ? "w-56" : "w-12")}>
            <div
                className={cn("bg-white border-r shadow-inner h-screen transition-all duration-300 flex flex-col", isOpen ? "w-44" : "w-0")}
                style={{ overflow: "hidden" }}
            >
                <div className="flex flex-col justify-start items-start gap-3 p-2 flex-grow">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-40">
                            <Button variant="outline">Organisations</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Organisation List</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {organisation.map((org) => (
                                <DropdownMenuCheckboxItem
                                    key={org}
                                    checked={selectedOrganisation === org}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setSelectedOrganisation(org);
                                        } else {
                                            setSelectedOrganisation("");
                                        }
                                    }}
                                >
                                    {org}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div>
                        <ul className="flex flex-col justify-center items-center text-center">
                            {sideBarItem.map((item) => (
                                <li
                                    key={item}
                                    className={cn(
                                        "w-40 p-2 hover:bg-slate-100 hover:cursor-pointer transition-colors duration-200 rounded-md",
                                        selectedItem === item ? "bg-slate-300 hover:bg-slate-300" : "bg-white"
                                    )}
                                    onClick={() => setSelectedItem(item)} // Set selected item on click
                                >
                                    <Link href={`/app/item/${item}`} className="w-full h-full block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button onClick={handleSignOut} variant="secondary">
                    Logout
                </Button>
            </div>
            <div className="flex justify-center pt-2 bg-white h-screen w-12">
                <Button variant="ghost" onClick={toggleSideBar} className="text-black bg-slate-200 h-6 w-5">
                    <RxViewVertical className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
