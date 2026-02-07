import React, { useState, useEffect } from 'react';
import { Play, Activity, User, Map, Brain, ShoppingCart, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const mainBlocks = [
    { id: 'connect', title: '連接腦機', sub: '核心檢測與實時監測', icon: LinkIcon, path: '/test', color: 'from-blue-600 to-indigo-600' },
    { id: 'garden', title: '秘密花園', sub: '音頻、遊戲與心理調節', icon: Brain, path: '/garden', color: 'from-purple-600 to-pink-600' },
    { id: 'map', title: '心理地圖', sub: '健康日誌與趨勢分析', icon: Map, path: '/map', color: 'from-emerald-600 to-teal-600' },
    { id: 'profile', title: '個人信息', sub: '帳戶設置與個人數據', icon: User, path: '/profile', color: 'from-amber-600 to-orange-600' },
    { id: 'mall', title: '健康商城', sub: '會員方案與福利購買', icon: ShoppingCart, path: '/mall', color: 'from-slate-800 to-slate-950' },
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

            {/* Hub Portal - Large Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {mainBlocks.map((block, idx) => (
                    <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-slate-200 transition-all cursor-pointer ${idx === 0 ? 'sm:col-span-2' : ''
                            }`}
                    >
                        <Link to={block.path} className="flex items-center gap-8 relative z-10">
                            <div className={`p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br ${block.color} text-white shadow-xl group-hover:rotate-6 transition-transform`}>
                                <block.icon size={idx === 0 ? 56 : 40} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 text-left space-y-2">
                                <h3 className="text-2xl sm:text-4xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {block.title}
                                </h3>
                                <p className="text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-widest">{block.sub}</p>
                            </div>
                            <ChevronRight size={32} className="text-slate-200 group-hover:text-blue-600 transition-colors hidden sm:block" />
                        </Link>

                        {/* Decorative Background for first item */}
                        {idx === 0 && (
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-12" />
                        )}
                    </motion.div>
                ))}
            </div>

            <footer className="text-center py-8">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">Taiwan BCI Advanced Intelligence</p>
            </footer>
        </div>
    );
}
