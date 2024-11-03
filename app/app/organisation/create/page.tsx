"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrganisationSchema } from "@/utils/schema";
import { SidebarState } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import z from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function CreateOrg() {

    const isOpen = useSelector((state: { sidebar: SidebarState }) => state.sidebar.isOpen);
    const [loading, setLoading] = useState<boolean>(false);


    const form = useForm<z.infer<typeof OrganisationSchema>>({
        resolver: zodResolver(OrganisationSchema),
        defaultValues: {
            name: ""
        }
    });

    const handleCreateOrg = async (values: z.infer<typeof OrganisationSchema>) => {
        console.log(values);
        setLoading(true);
        try {
            const res = await fetch("/api/organisation/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include"
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log("Error:", errorData);
                toast.error(errorData.error || "An error occurred");
                return;
            }

            const data = await res.json();
            console.log("Organisation Created:", data);
            toast.success("Organisation created successfully!");
            form.reset();
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while creating the organisation.");
        } finally {
            setLoading(false);
        }
    };


    const width = isOpen ? 'w-[calc(100vw-224px)]' : 'w-[calc(100vw-48px)]';

    return (
        <div className={`flex justify-center items-center h-screen ${width} transition-all duration-300`}>
            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>Create An Organisation</CardTitle>
                    <CardDescription>Create your own virtual organisation</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateOrg)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name Of Organisation</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Organisation Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Creating..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );
}
