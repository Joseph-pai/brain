import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Link as LinkIcon, FileText, Map, Brain, User, ShoppingCart, Settings } from 'lucide-react';

const navItems = [
    { path: '/', label: '控制儀表板', icon: Home },
    { path: '/test', label: '連接腦機設備', icon: LinkIcon },
    { path: '/map', label: '心理健康地圖', icon: Map },
    { path: '/garden', label: '秘密調節花園', icon: Brain },
    { path: '/mall', label: '專業健康方案', icon: ShoppingCart },
    { path: '/profile', label: '用戶個人信息', icon: User },
];

export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0 shadow-sm">
            <div className="p-8">
                <h1 className="text-3xl font-black text-blue-600 flex items-center gap-3">
                    <span className="p-2 bg-blue-100 rounded-2xl">🧠</span>
                    BrainFit
                </h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 ml-1">Advanced BCI System</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${isActive
                                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100 translate-x-1'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`
                        }
                    >
                        <Icon size={22} className="transition-transform group-hover:scale-110" />
                        <span className="text-sm">{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-slate-100">
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">J</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">Joseph</p>
                        <p className="text-[10px] text-slate-400 font-medium">已連接設備</p>
                    </div>
                    <Settings size={18} className="text-slate-300 hover:text-slate-600 cursor-pointer" />
                </div>
            </div>
        </aside>
    );
}
