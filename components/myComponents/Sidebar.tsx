import { cn } from "@/lib/utils";
import { useState } from "react";
import { RxViewVertical } from "react-icons/rx";

import * as React from "react";
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


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [selectedOrganisation, setSelectedOrganisation] = React.useState<string>(""); // Store selected organisation
    const [organisation, setOrganisation] = React.useState<string[]>([]);
    const [sideBarItem, setSideBarItems] = React.useState<string[]>([])

    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    };

    React.useEffect(() => {
        const organisations = ["org1", "org2", "org3"];
        const sideBarItems = ["item1", "item2", "item3", "item4"]
        setOrganisation(organisations);
        setSideBarItems(sideBarItems);
    }, []);

    const handleSignOut = async () => {
        await SignOut();
    }

    return (
        <div className={cn("flex h-screen bg-red-700 transition-all duration-300", isOpen ? "w-52" : "w-8")}>
            <div
                className={cn("bg-white h-screen transition-all duration-300 flex flex-col", isOpen ? "w-44" : "w-0")}
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
                                <li key={item} className="w-44 border p-4 hover:bg-slate-100 hover:cursor-pointer">
                                    <a href="/item">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button onClick={handleSignOut} variant="secondary">Logout</Button>
            </div>
            <div className="flex bg-black h-screen">
                <button onClick={toggleSideBar} className="text-white bg-yellow-600 h-6 w-8">
                    <RxViewVertical className="h-6 w-8" />
                </button>
            </div>
        </div>

    );
}
