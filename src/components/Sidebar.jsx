import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, FileText, Map, Flower2, Settings } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/test', label: 'Brainwave Test', icon: Activity },
    { path: '/report', label: 'Analysis Report', icon: FileText },
    { path: '/map', label: 'Psych Map', icon: Map },
    { path: '/garden', label: 'Secret Garden', icon: Flower2 },
];

export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <span className="p-1 bg-blue-100 rounded-lg">🧠</span>
                    BrainFit
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`
                        }
                    >
                        <Icon size={20} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                    <Settings size={20} />
                    Settings
                </NavLink>
            </div>
        </aside>
    );
}
