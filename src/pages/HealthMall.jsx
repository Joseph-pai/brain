import React from 'react';
import { ShoppingCart, Star, ShieldCheck, Zap, Crown, CheckCircle2, Package, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
    {
        id: 'basic',
        name: '基礎健康版',
        price: '免費',
        features: ['實時腦波監控', '基礎日誌記錄', '標準測試報告'],
        color: 'bg-slate-100 text-slate-600',
        badge: '目前方案'
    },
    {
        id: 'pro',
        name: '專業冥想版',
        price: '¥ 99 / 月',
        features: ['所有基礎功能', '解鎖秘密花園進階內容', '詳細健康趨勢分析', '個人化調節建議'],
        color: 'bg-blue-600 text-white',
        highlight: true,
        badge: '最受歡迎'
    },
    {
        id: 'ultimate',
        name: '旗艦醫療版',
        price: '¥ 199 / 月',
        features: ['所有專業功能', '意念拔河競賽完整版', '醫療級數據加密備份', '專家遠程諮詢 (2次/月)'],
        color: 'bg-slate-900 text-white',
        badge: '頂級體驗'
    }
];

export default function HealthMall() {
    return (
        <div className="space-y-12 pb-32 max-w-6xl mx-auto px-2">

            {/* Header / Hero */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 sm:p-20 rounded-[3rem] text-center space-y-6 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-3 px-6 py-2 bg-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-[0.2em] italic border border-blue-500/30"
                >
                    <Crown size={16} /> VIP Exclusive Mall
                </motion.div>

                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">專業健康方案</h1>
                <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm sm:text-lg">
                    解鎖腦機接口的全部潛能。從深度分析到專業調節工具，為您的心理健康保駕護航。
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-slate-300 text-xs font-bold border border-white/10">
                        <CheckCircle2 size={14} className="text-blue-500" /> 全球領先算力
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-slate-300 text-xs font-bold border border-white/10">
                        <CheckCircle2 size={14} className="text-blue-500" /> 毫秒級延遲監控
                    </div>
                </div>
            </div>

            {/* Pricing Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`relative rounded-[2.5rem] p-10 flex flex-col space-y-8 shadow-2xl transition-all ${plan.highlight ? 'ring-4 ring-blue-500/20 bg-white' : 'bg-white'
                            }`}
                    >
                        {plan.badge && (
                            <span className={`absolute top-8 right-8 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${plan.highlight ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                {plan.badge}
                            </span>
                        )}

                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-800">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-slate-900">{plan.price.split(' ')[0]}</span>
                                <span className="text-sm font-bold text-slate-400">{plan.price.split(' ').slice(1).join(' ')}</span>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            {plan.features.map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                                    <Sparkles size={16} className="text-blue-400 flex-shrink-0" />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>

                        <button className={`w-full py-5 rounded-2xl font-black transition-all ${plan.highlight
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}>
                            立即訂閱
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Additional Mall Items Simulation */}
            <div className="px-4 space-y-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-slate-800 italic">健康周邊</h2>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Premium Accessories</p>
                    </div>
                    <button className="text-blue-600 font-black text-sm hover:underline">查看更多 ❯</button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'BCI 專業感應支架', price: '¥ 1,299', icon: Sliders },
                        { name: '便攜收納盒', price: '¥ 199', icon: Package },
                        { name: '替換電極片 (24入)', price: '¥ 499', icon: Activity },
                        { name: '品牌訂製連帽衫', price: '¥ 399', icon: User },
                    ].map((item, i) => (
                        <motion.div
                            key={item.name}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 flex flex-col items-center text-center space-y-4 group cursor-pointer"
                        >
                            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors">
                                <item.icon size={48} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-slate-700 text-sm">{item.name}</h4>
                                <p className="text-blue-600 font-black">{item.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <footer className="text-center py-12">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em] italic">BrainFit Commerce System V1.0</p>
            </footer>
        </div>
    );
}
