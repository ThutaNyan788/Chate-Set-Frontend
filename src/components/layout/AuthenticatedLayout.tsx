import React from 'react'
import AuthenticatedNav from '@/components/layout/AuthenticatedNav';
import TopNavbar from './TopNavbar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AuthenticatedLayout = () => {

    const isAuthenticated = useAuth();

    if (isAuthenticated !== null && isAuthenticated === false) {
        localStorage.removeItem('token');
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
                        <Outlet/>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AuthenticatedLayout  