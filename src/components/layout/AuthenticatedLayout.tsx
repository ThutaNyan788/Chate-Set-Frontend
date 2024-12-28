import React from 'react'
import AuthenticatedNav from '@/components/layout/AuthenticatedNav';
import TopNavbar from './TopNavbar';


type Props = {
    children: React.ReactNode;
}



const AuthenticatedLayout = ({ children }: Props) => {
    return (
        <>
            <div className="md:flex min-h-screen bg-background">
                <AuthenticatedNav />
                <main>
                    <TopNavbar></TopNavbar>

                    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
                        {/* child element here */}
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default AuthenticatedLayout