import React, { useState, useEffect } from 'react';
import { Music, Gamepad, BookOpen, Video, Palette, Play, ChevronRight, Zap, Target, Wind, Coffee, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const tabs = [
    { id: 'music', label: '音樂', icon: Music, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'games', label: '遊戲', icon: Gamepad, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'audio', label: '有聲書', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'video', label: '影片', icon: Video, color: 'text-red-500', bg: 'bg-red-50' },
];

const CONTENT_LIBRARY = {
    music: {
        decompression: [{ name: '深海冥想曲', sub: '壓力釋放 • 15min' }, { name: '阿爾法波森林', sub: '緩解焦慮 • 10min' }],
        cheerful: [{ name: '陽光午後', sub: '提升情緒 • 5min' }, { name: '快樂多巴胺', sub: '專注提升 • 8min' }],
        soothing: [{ name: '雨後清晨', sub: '放鬆穩定 • 20min' }, { name: '月光搖籃', sub: '助眠修復 • 30min' }],
        default: [{ name: '一般調節音樂 1', sub: '自然音效' }, { name: '一般調節音樂 2', sub: '白噪音' }]
    },
    games: {
        'tug-of-war': [{ name: '意念拔河比賽', sub: '專注度訓練 • 實時對抗', icon: Target }],
        default: [{ name: '情緒消消樂', sub: '反應能力' }, { name: '星空記憶', sub: '專注鍛鍊' }]
    },
    audio: {
        whispers: [{ name: '輕聲細語：星際漫遊', sub: '疲勞修復 • 睡眠誘導', icon: Coffee }],
        default: [{ name: '心靈讀本', sub: '智慧分享' }, { name: '寓言故事', sub: '放鬆思考' }]
    },
    video: {
        default: [{ name: '極光延時', sub: '視覺放鬆' }, { name: '深海探秘', sub: '深度沈浸' }]
    }
};

const MODE_LABELS = {
    decompression: '減壓音樂庫',
    cheerful: '歡快音樂庫',
    soothing: '舒緩音樂庫',
    'tug-of-war': '專注訓練：意念拔河',
    whispers: '疲勞修復：輕聲細語',
};

export default function SecretGarden() {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('music');
    const [mode, setMode] = useState(null);
    const [operatingItem, setOperatingItem] = useState(null);

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        const modeParam = searchParams.get('mode');
        if (tabParam) setActiveTab(tabParam);
        if (modeParam) setMode(modeParam);
    }, [searchParams]);

    const handleItemClick = (item) => {
        setOperatingItem(item.name);
        setTimeout(() => setOperatingItem(null), 3000);
    };

    const activeItems = CONTENT_LIBRARY[activeTab]?.[mode] || CONTENT_LIBRARY[activeTab]?.default || [];

    return (
        <div className="space-y-8 pb-32 max-w-5xl mx-auto px-2">

            {/* Operational Feedback Overlay */}
            <AnimatePresence>
                {operatingItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 font-black"
                    >
                        <Zap size={20} className="text-amber-400 animate-pulse" />
                        正在為您開啟：{operatingItem} ...
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center gap-6 px-4">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-[2rem] shadow-xl shadow-pink-100 italic">
                    <Brain size={40} />
                </div>
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">秘密調節花園</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Psychological Regulation Hub</p>
                </div>
            </div>

            {/* Smart Routing Hint */}
            <AnimatePresence>
                {mode && !operatingItem && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-blue-600 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-blue-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <Zap size={20} className="text-amber-400" />
                            </div>
                            <div>
                                <h4 className="font-black">推薦模式：{MODE_LABELS[mode] || mode}</h4>
                                <p className="text-xs text-blue-100 font-bold">已根據您的測評結果自動過濾內容</p>
                            </div>
                        </div>
                        <button onClick={() => setMode(null)} className="text-xs underline font-bold opacity-60 hover:opacity-100">清除建議</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modern Tab Navigation */}
            <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setMode(null); }}
                        className={`flex items-center gap-3 px-10 py-5 rounded-[2rem] whitespace-nowrap transition-all duration-300 font-black ${activeTab === tab.id
                                ? `${tab.bg} ${tab.color} shadow-2xl shadow-slate-200 scale-105 ring-2 ring-current ring-offset-2`
                                : 'bg-white text-slate-300 hover:bg-slate-50'
                            }`}
                    >
                        <tab.icon size={22} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content List */}
            <motion.div
                key={activeTab + mode}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 min-h-[500px] border-4 border-white shadow-2xl shadow-slate-200"
            >
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-slate-800">
                        {tabs.find(t => t.id === activeTab).label}精選內容
                    </h2>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 tracking-widest uppercase italic">
                        <Wind size={14} /> 當前環境：穩定專注
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeItems.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            onClick={() => handleItemClick(item)}
                            className={`p-8 rounded-[2.5rem] flex items-center justify-between group transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-blue-200 ${operatingItem === item.name ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-50/50 hover:bg-blue-600'
                                }`}
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors shadow-sm relative overflow-hidden">
                                    {item.icon ? <item.icon size={32} /> : <Play size={32} fill="currentColor" />}
                                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className={`text-xl font-black transition-colors ${operatingItem === item.name ? 'text-white' : 'text-slate-700 group-hover:text-white'}`}>
                                        {operatingItem === item.name ? '啟動中...' : item.name}
                                    </h3>
                                    <p className={`text-xs font-bold uppercase tracking-widest transition-colors ${operatingItem === item.name ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-100'}`}>
                                        {item.sub}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={24} className={`transition-colors ${operatingItem === item.name ? 'text-white' : 'text-slate-200 group-hover:text-white'}`} />
                        </motion.div>
                    ))}

                    {activeItems.length === 0 && (
                        <div className="col-span-full h-64 flex flex-col items-center justify-center text-slate-300 italic font-bold">
                            暫無建議內容
                        </div>
                    )}
                </div>
            </motion.div>

            <footer className="text-center pb-8">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">Secret Garden Intelligence</p>
            </footer>
        </div>
    );
}
