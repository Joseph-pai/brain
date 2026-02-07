import React, { useState } from 'react';
import { Music, Gamepad, BookOpen, Video, Palette, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    { id: 'music', label: '音樂', icon: Music, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'games', label: '遊戲', icon: Gamepad, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'audio', label: '有聲書', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'video', label: '影片', icon: Video, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'draw', label: '塗鴉畫布', icon: Palette, color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function SecretGarden() {
    const [activeTab, setActiveTab] = useState('music');

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center gap-2 px-2">
                <span className="text-3xl">🌸</span>
                <h1 className="text-3xl font-bold text-slate-800">秘密花園</h1>
            </div>

            {/* Modern Tab Navigation */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 px-2 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${activeTab === tab.id
                                ? `${tab.bg} ${tab.color} font-bold shadow-sm ring-1 ring-inset ring-current/20`
                                : 'bg-white text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 min-h-[400px]"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-800">
                        {tabs.find(t => t.id === activeTab).label}列表
                    </h2>
                    <span className="text-xs text-slate-400">目前環境：穩定專注</span>
                </div>

                {activeTab === 'draw' ? (
                    <div className="flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-slate-100 rounded-3xl h-[300px] bg-slate-50">
                        <Palette size={48} className="text-slate-300" />
                        <p className="text-slate-400 font-medium">點擊開始創作您的心情塗鴉</p>
                        <button className="px-8 py-3 bg-white rounded-2xl shadow-md font-bold text-slate-700">新畫板</button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 shadow-sm transition-colors">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-700">調節項目名稱 {i}</h3>
                                        <p className="text-xs text-slate-400">推薦給您的當前狀態</p>
                                    </div>
                                </div>
                                <span className="text-slate-300 group-hover:text-blue-500 transition-colors">❯</span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
