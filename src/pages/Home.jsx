import React, { useState, useEffect } from 'react';
import { Play, Activity, User, Compass, Palmtree, ShoppingCart, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const mainBlocks = [
    { id: 'connect', title: '連接腦機', sub: '核心檢測與實時監測', icon: LinkIcon, path: '/test', color: 'from-blue-600 to-indigo-600', large: true },
    { id: 'garden', title: '伊甸心園', sub: '音頻、遊戲與心理調節', icon: Palmtree, path: '/garden', color: 'from-purple-600 to-pink-600' },
    { id: 'map', title: '心理地圖', sub: '健康日誌與趨勢分析', icon: Compass, path: '/map', color: 'from-emerald-600 to-teal-600' },
    { id: 'profile', title: '個人信息', sub: '帳戶設置與個人數據', icon: User, path: '/profile', color: 'from-amber-600 to-orange-600' },
    { id: 'mall', title: '健康商城', sub: '會員方案與福利購買', icon: ShoppingCart, path: '/mall', color: 'from-red-800 to-red-950' },
];

export default function Home() {
    return (
        <div className="space-y-12 max-w-5xl mx-auto px-2">
            {/* High-Impact Hero / Welcome */}
            <div className="text-center space-y-4 pt-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight"
                >
                    Brain<span className="text-blue-600 italic">Fit</span>
                </motion.h1>
                <p className="text-slate-500 font-bold max-w-lg mx-auto uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                    Next-Gen Brain-Computer Interface Portal
                </p>
                <div className="w-12 h-1.5 bg-blue-600 mx-auto rounded-full mt-4" />
            </div>

            {/* Hub Portal - Grid Layout with BCI Centered/Prominent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {/* Connect BCI - Centered & Prominent */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14 shadow-2xl shadow-blue-100 transition-all cursor-pointer sm:col-span-2 border-2 border-blue-50 bg-white"
                >
                    <Link to="/test" className="flex flex-col items-center text-center gap-6 relative z-10">
                        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl group-hover:rotate-6 transition-transform">
                            <LinkIcon size={64} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl sm:text-5xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                                連接腦機
                            </h3>
                            <p className="text-slate-400 font-bold text-sm sm:text-base uppercase tracking-widest italic">核心檢測與實時監測</p>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 font-black animate-bounce mt-4">
                            立即開啟 <ChevronRight size={20} />
                        </div>
                    </Link>
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 translate-x-12" />
                </motion.div>

                {/* Sub-Blocks */}
                {mainBlocks.slice(1).map((block, idx) => (
                    <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-slate-100 transition-all cursor-pointer bg-white"
                    >
                        <Link to={block.path} className="flex items-center gap-6 relative z-10">
                            <div className={`p-5 sm:p-6 rounded-[1.8rem] bg-gradient-to-br ${block.color} text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                                <block.icon size={32} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 text-left space-y-1">
                                <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {block.title}
                                </h3>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest line-clamp-1">{block.sub}</p>
                            </div>
                            <ChevronRight size={24} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            <footer className="text-center py-8">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">Taiwan BCI Advanced Intelligence</p>
            </footer>
        </div>
    );
}
