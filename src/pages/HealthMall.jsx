import React from 'react';
import { ShoppingBag, Star, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
    { title: '深度睡眠優化', price: '$29.9', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: '考前專注衝刺', price: '$19.9', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: '冥想進階課程', price: '$39.9', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
];

export default function HealthMall() {
    return (
        <div className="space-y-6 pb-20 px-2">
            <h1 className="text-3xl font-bold text-slate-800">健康方案</h1>
            <p className="text-slate-500">專業級腦電波調節方案商城</p>

            <div className="grid grid-cols-1 gap-4">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-6 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-2xl ${plan.bg} ${plan.color}`}>
                                <plan.icon size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">{plan.title}</h3>
                                <p className="text-blue-600 font-black">{plan.price}</p>
                            </div>
                        </div>
                        <button className="p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-black transition-colors">
                            <ShoppingBag size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="bg-blue-600 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl shadow-blue-200">
                <h2 className="text-2xl font-bold">加入 VIP 會員</h2>
                <p className="text-blue-100 italic">獲取所有調節音樂與方案的無限存取權</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black shadow-lg">
                    立即試用
                </button>
            </div>
        </div>
    );
}
