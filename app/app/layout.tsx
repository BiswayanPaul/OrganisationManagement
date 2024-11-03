"use client"

import Sidebar from '@/components/myComponents/Sidebar'
import { Provider } from 'react-redux';
import store from '@/utils/reduxStore';
export default function Layout(
    { children }: Readonly<{
        children: React.ReactNode;
    }>) {


    return (
        <div className='flex w-screen'>
            <Provider store={store}>
                <Sidebar />
                <main>{children}</main>
            </Provider>
        </div>
    )

}