import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Link as LinkIcon, Map, Brain, User, ShoppingCart } from 'lucide-react';

const navItems = [
    { path: '/', label: '首頁', icon: Home, color: 'bg-orange-600' },
    { path: '/test', label: '連接腦機', icon: LinkIcon, color: 'bg-red-900' },
    { path: '/garden', label: '秘密花園', icon: Brain, color: 'bg-purple-600' },
    { path: '/map', label: '心理地圖', icon: Map, color: 'bg-teal-600' },
    { path: '/mall', label: '健康商城', icon: ShoppingCart, color: 'bg-red-950' },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-2xl border border-slate-200/50 rounded-[2.5rem] shadow-2xl z-[100] px-4">
            <div className="flex justify-around items-center h-20">
                {navItems.map(({ path, label, icon: Icon, color }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full transition-all duration-500 group ${isActive ? 'scale-110' : 'opacity-40 hover:opacity-100 hover:scale-105'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`p-2.5 rounded-2xl transition-all duration-500 ${isActive ? `${color} text-white shadow-lg shadow-orange-100 rotate-6` : 'text-slate-400'
                                    }`}>
                                    <Icon size={24} strokeWidth={isActive ? 3 : 2} />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-widest mt-1.5 truncate ${isActive ? 'text-red-950' : 'text-slate-400'
                                    }`}>
                                    {label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
