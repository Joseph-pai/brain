import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="flex-1 flex flex-col min-h-screen relative pb-24 sm:pb-32">
                <Header />

                <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 lg:p-12 overflow-y-auto">
                    <Outlet />
                </main>

                {/* Navigation for both mobile and tablet-ish views */}
                <BottomNav />
            </div>
        </div>
    );
}
