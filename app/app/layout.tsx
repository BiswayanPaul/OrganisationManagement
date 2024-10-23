"use client"

import Sidebar from '@/components/myComponents/Sidebar'

export default function Layout(
    { children }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <div className='flex'>
            <Sidebar />
            <main>{children}</main>
        </div>
    )

}