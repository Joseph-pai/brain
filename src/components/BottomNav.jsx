import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, FileText, Map, Flower2 } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/test', label: 'Test', icon: Activity },
    { path: '/report', label: 'Report', icon: FileText },
    { path: '/map', label: 'Map', icon: Map },
    { path: '/garden', label: 'Garden', icon: Flower2 },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 lg:hidden z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`
                        }
                    >
                        <Icon size={24} className="mb-1" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
