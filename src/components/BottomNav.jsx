import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Link as LinkIcon, FileText, Map, Brain, User, ShoppingCart } from 'lucide-react';

const navItems = [
    { path: '/', label: '首頁', icon: Home },
    { path: '/test', label: '測試', icon: LinkIcon },
    { path: '/map', label: '地圖', icon: Map },
    { path: '/garden', label: '花園', icon: Brain },
    { path: '/profile', label: '我的', icon: User },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 lg:hidden z-50 px-2">
            <div className="flex justify-around items-center h-20">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full text-[10px] font-bold transition-all ${isActive ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'
                            }`
                        }
                    >
                        <div className={`p-1 rounded-xl transition-colors ${path === window.location.pathname ? 'bg-blue-50' : ''}`}>
                            <Icon size={24} />
                        </div>
                        <span className="mt-1">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
