import React, { useState } from 'react';
import { ShoppingCart, Star, ShieldCheck, Zap, Crown, CheckCircle2, Package, Sparkles, ChevronRight, BookOpen, Sliders, Activity, User, Eye, Wind, Headphones, Target, Coffee, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MALL_ITEMS = [
    { id: 1, name: 'BCI Pro 腦機頭帶', price: '¥ 26,800', category: '硬體', icon: Sliders, sub: '專業級神經信號採集', highlight: true },
    { id: 2, name: '深層睡眠骨傳導眼罩', price: '¥ 2,980', category: '硬體', icon: Eye, sub: '助眠音頻同步引導' },
    { id: 3, name: '智能冥想坐墊', price: '¥ 4,500', category: '硬體', icon: Wind, sub: '姿態監測與震導提醒' },
    { id: 4, name: '抗藍光智慧護目鏡', price: '¥ 1,850', category: '硬體', icon: Sparkles, sub: '視覺神經保護與調節' },
    { id: 5, name: '舒壓香氛擴散儀', price: '¥ 3,200', category: '硬體', icon: Headphones, sub: '聯動大腦放鬆度散香' },
    { id: 6, name: '21天正念冥想進階課', price: '¥ 999', category: '課程', icon: BookOpen, sub: '從零基礎到專業呼吸' },
    { id: 7, name: '阿爾法波大腦開發', price: '¥ 1,280', category: '課程', icon: Zap, sub: '提升學習效率與記憶' },
    { id: 8, name: '壓力管理大師影音', price: '¥ 850', category: '課程', icon: Video, sub: '職場減壓與情緒控制' },
    { id: 9, name: '專注力優化工作坊', price: '¥ 1,500', category: '課程', icon: Target, sub: '深度工作法實踐引導' },
    { id: 10, name: '1對1神經回饋導師', price: '¥ 3,500', category: '課程', icon: User, sub: '專屬方案定製與諮詢' },
];

const plans = [
    {
        id: 'pro',
        name: '專業冥想版',
        price: '¥ 99 / 月',
        features: ['解鎖秘密花園全內容', '詳細健康趨勢分析', '個人化調節建議'],
        color: 'bg-orange-600 text-white',
        highlight: true
    },
    {
        id: 'ultimate',
        name: '旗艦醫療版',
        price: '¥ 199 / 月',
        features: ['意念拔河完整版', '數據加密備份', '專家諮詢 (2次/月)'],
        color: 'bg-red-800 text-white'
    }
];

export default function HealthMall() {
    const [filter, setFilter] = useState('全部');

    const filteredItems = filter === '全部' ? MALL_ITEMS : MALL_ITEMS.filter(i => i.category === filter);

    return (
        <div className="space-y-12 pb-32 max-w-7xl mx-auto px-2">

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-red-800 to-red-900 p-12 sm:p-20 rounded-[3rem] text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-orange-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-3 px-6 py-2 bg-orange-500/20 text-orange-400 rounded-full text-xs font-black uppercase tracking-[0.2em] italic border border-orange-500/30"
                >
                    <Crown size={16} /> Premium Health Marketplace
                </motion.div>

                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">健康商城</h1>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto text-sm sm:text-lg">
                    探索前沿大腦科技產品與專業心理調節課程。
                </p>
            </div>

            {/* VIP Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {plans.map((plan) => (
                    <motion.div
                        key={plan.id}
                        whileHover={{ scale: 1.02 }}
                        className={`relative rounded-[2.5rem] p-10 space-y-6 shadow-xl ${plan.highlight ? 'bg-white border-2 border-orange-500/10 ring-4 ring-orange-500/5' : 'bg-slate-50/50'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-black text-red-900">{plan.name}</h3>
                            <span className="px-4 py-1.5 bg-orange-600 text-white text-[10px] font-black rounded-xl uppercase">會員專享</span>
                        </div>
                        <p className="text-3xl font-black text-red-950">{plan.price}</p>
                        <div className="space-y-3">
                            {plan.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                                    <CheckCircle2 size={16} className="text-orange-500" /> {f}
                                </div>
                            ))}
                        </div>
                        <button className={`w-full py-5 rounded-2xl font-black transition-all ${plan.highlight ? 'bg-orange-600 text-white shadow-xl shadow-orange-200' : 'bg-red-900 text-white'
                            }`}>立即升級</button>
                    </motion.div>
                ))}
            </div>

            {/* Marketplace Section */}
            <div className="px-4 space-y-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-3xl font-black text-red-900 italic">精選商品 & 課程</h2>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Marketplace Collection</p>
                    </div>

                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 font-black text-xs">
                        {['全部', '硬體', '課程'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-xl transition-all ${filter === cat ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                className="group glass-card p-6 flex flex-col space-y-4 cursor-pointer hover:border-orange-500/20 transition-all border-2 border-transparent"
                            >
                                <div className="relative aspect-square bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:text-orange-600 transition-colors overflow-hidden">
                                    <item.icon size={64} strokeWidth={1.5} />
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-md rounded-lg text-[9px] font-black uppercase text-slate-500 tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-red-900 group-hover:text-orange-600 transition-colors line-clamp-1">{item.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold italic line-clamp-1 uppercase">{item.sub}</p>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-orange-600 font-black text-lg">{item.price}</span>
                                    <button className="p-2.5 bg-red-900 text-white rounded-xl hover:bg-orange-600 transition-colors">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <footer className="text-center py-12">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em] italic">BrainFit Commerce Hub V2.0</p>
            </footer>
        </div>
    );
}
