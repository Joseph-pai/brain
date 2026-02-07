import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar for Desktop */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen relative pb-16 lg:pb-0">
                <Header />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>

                {/* Bottom Nav for Mobile */}
                <BottomNav />
            </div>
        </div>
    );
}
