import React from 'react'
import AuthenticatedNav from '@/components/layout/AuthenticatedNav';
import TopNavbar from './TopNavbar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';


type Props = {
    children: React.ReactNode;
}

const AuthenticatedLayout = ({ children }: Props) => {

    const isAuthenticated = useAuth();

    if (isAuthenticated !== null && isAuthenticated === false) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div className="md:flex min-h-screen bg-background">
                <AuthenticatedNav />
                <main className=' w-full'>
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