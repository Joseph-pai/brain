import { Link, useLocation } from 'react-router-dom';
import { Home, Link as LinkIcon, Compass, Palmtree, User, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', label: '首頁', icon: Home, color: 'bg-blue-600' },
    { path: '/test', label: '連接腦機', icon: LinkIcon, color: 'bg-indigo-600' },
    { path: '/garden', label: '伊甸心園', icon: Palmtree, color: 'bg-purple-600' },
    { path: '/map', label: '心理地圖', icon: Compass, color: 'bg-teal-600' },
    { path: '/mall', label: '健康商城', icon: ShoppingCart, color: 'bg-red-800' },
];

export default function BottomNav() {
    const location = useLocation();
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white/95 backdrop-blur-2xl border border-slate-200/50 rounded-full shadow-2xl z-[100] px-4 py-2">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative flex flex-col items-center py-1 group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-2.5 rounded-2xl transition-all ${isActive
                                    ? `${item.color} text-white shadow-lg`
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <item.icon size={20} />
                            </motion.div>
                            <span className={`text-[9px] mt-1 font-bold ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="navTab"
                                    className="absolute -bottom-1 w-1 h-1 bg-slate-800 rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
