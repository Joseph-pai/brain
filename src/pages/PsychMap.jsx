import React, { useState } from 'react';
import { Calendar as CalendarIcon, FileText, History, TrendingUp, Info, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const MOCK_TRENDS = [
    { day: '週一', score: 65, focus: 40 },
    { day: '週二', score: 72, focus: 55 },
    { day: '週三', score: 68, focus: 48 },
    { day: '週四', score: 85, focus: 75 },
    { day: '週五', score: 82, focus: 70 },
    { day: '週六', score: 90, focus: 85 },
    { day: '週日', score: 88, focus: 80 },
];

const subModules = [
    { id: 'calendar', title: '健康日曆', icon: CalendarIcon, color: 'text-blue-500' },
    { id: 'diary', title: '心情日記', icon: BookOpen, color: 'text-indigo-500' },
    { id: 'latest', title: '最新測試', icon: FileText, color: 'text-green-500' },
    { id: 'history', title: '歷史報告', icon: History, color: 'text-purple-500' },
];

export default function PsychMap() {
    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3 px-2">
                <span className="p-2 bg-blue-100 rounded-2xl">🗺️</span>
                心理地圖
            </h1>

            {/* Module Grid */}
            <div className="grid grid-cols-2 gap-4 px-2">
                {subModules.map(mod => (
                    <motion.button
                        key={mod.id}
                        whileTap={{ scale: 0.95 }}
                        className="glass-card p-6 flex flex-col items-center gap-3"
                    >
                        <div className={`p-3 rounded-xl bg-slate-50 ${mod.color}`}>
                            <mod.icon size={24} />
                        </div>
                        <span className="font-bold text-slate-700">{mod.title}</span>
                    </motion.button>
                ))}
            </div>

            {/* Health Trend - 5th sub-feature (Curve Chart) */}
            <div className="px-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={20} className="text-emerald-500" />
                            健康趨勢圖
                        </h2>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_TRENDS}>
                                <defs>
                                    <linearGradient id="gradScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#gradScore)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-xs font-bold text-slate-500">綜合評分</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
