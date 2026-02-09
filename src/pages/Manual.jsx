import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Link as LinkIcon, Compass, Palmtree, ShoppingCart, User, Activity, Zap, ChevronRight, FileText, History, Info } from 'lucide-react';

const sections = [
    {
        title: '主界面功能',
        icon: BookOpen,
        content: [
            { label: '連接腦機', desc: '用於連接腦機設備並進行腦電波檢測' },
            { label: '個人信息', desc: '查看和編輯用戶個人資料' },
            { label: '心理地圖', desc: '查看心理健康數據和趨勢' },
            { label: '伊甸心園', desc: '心理調節內容庫，包含多種調節方式' },
            { label: '健康商城', desc: '提供付費健康方案' },
        ],
    },
    {
        title: '腦健康測試',
        icon: Activity,
        content: [
            { label: '3分鐘測試', desc: '設備連接成功後，點擊開始3分鐘腦電波測試。' },
            { label: '多維指標', desc: '包含焦慮、抑鬱、壓力、疲勞、注意力、睡眠等六大維度。' },
            { label: '結果解讀', desc: '提供正負能量雷達圖，異常指標以紅字突出顯示，並附帶專業建議。' },
        ],
    },
    {
        title: '伊甸心園 (心理調節)',
        icon: Palmtree,
        content: [
            { label: '🎵 音樂', desc: '提供各類旋律，支持播放、暫停、停止功能。' },
            { label: '🎮 遊戲', desc: '放鬆與情緒調節遊戲，助您緩解心理壓力。' },
            { label: '📖 有聲書', desc: '心理健康相關資源，隨時隨地聆聽。' },
            { label: '📺 視頻', desc: '冥想指導、放鬆技巧等影音內容。' },
            { label: '🎨 塗鴉', desc: '數字畫布，通過繪畫表達情感，釋放壓力。' },
        ],
    },
    {
        title: '智能關聯調節',
        icon: Zap,
        content: [
            { label: '自動推薦', desc: '點擊測試報告中的異常指標，系統會自動跳轉至相應的調節模塊。' },
            { label: '導航路徑', desc: '例如：點擊抑鬱指標 -> 進入伊甸心園 -> 跳轉至專屬修復音樂列表。' },
        ],
    },
    {
        title: '心理地圖',
        icon: Compass,
        content: [
            { label: '健康日曆', desc: '以日曆形式記錄每日情緒與健康狀態。' },
            { label: '心情日記', desc: '文字記錄每日感悟與心情變化。' },
            { label: '歷史對比', desc: '查看歷史測試報告，分析健康趨勢折線圖。' },
        ],
    }
];

export default function Manual() {
    const [activeSection, setActiveSection] = useState(0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <header className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block p-3 bg-blue-100 text-blue-600 rounded-2xl mb-2"
                >
                    <BookOpen size={32} />
                </motion.div>
                <h1 className="text-3xl font-black text-slate-800">使用說明書</h1>
                <p className="text-slate-500 font-medium italic">從設備連接到心理調節的完整交互指南</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Navigation */}
                <div className="md:col-span-4 space-y-2">
                    {sections.map((section, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveSection(idx)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all font-bold ${activeSection === idx
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                                : 'bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <section.icon size={20} />
                            <span>{section.title}</span>
                            {activeSection === idx && <ChevronRight size={16} className="ml-auto" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 border border-slate-50 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-slate-100 rounded-xl text-blue-600">
                                    {React.createElement(sections[activeSection].icon, { size: 24 })}
                                </div>
                                <h2 className="text-2xl font-black text-slate-800">{sections[activeSection].title}</h2>
                            </div>

                            <div className="space-y-4">
                                {sections[activeSection].content.map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-800">{item.label}</p>
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <footer className="text-center pt-8 opacity-50">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    © 2026 Taiwan BCI Advanced Intelligence | v2.0
                </p>
            </footer>
        </div>
    );
}
