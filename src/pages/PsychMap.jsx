import React from 'react';
import { Calendar as CalendarIcon, Smile, TrendingUp, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const MOCK_TRENDS = [
    { day: 'Mon', score: 65, focus: 40 },
    { day: 'Tue', score: 72, focus: 55 },
    { day: 'Wed', score: 68, focus: 48 },
    { day: 'Thu', score: 85, focus: 75 },
    { day: 'Fri', score: 82, focus: 70 },
    { day: 'Sat', score: 90, focus: 85 },
    { day: 'Sun', score: 88, focus: 80 },
];

export default function PsychMap() {
    return (
        <div className="space-y-6 pb-12">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <span className="p-2 bg-blue-100 rounded-2xl">🗺️</span>
                Psychological Map
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mood Calendar Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <CalendarIcon size={20} className="text-blue-500" />
                            Mood Calendar
                        </h2>
                        <button className="text-slate-400 hover:text-blue-500 transition-colors">
                            <Info size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>
                        ))}
                        {Array.from({ length: 31 }).map((_, i) => {
                            const intensity = i % 5;
                            const colors = ['bg-slate-50', 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-600'];
                            return (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-lg ${colors[intensity]} border border-white/20 transition-transform hover:scale-110 cursor-pointer flex items-center justify-center text-[10px] font-medium text-slate-800`}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Health Trends Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={20} className="text-emerald-500" />
                            Health & Focus Trends
                        </h2>
                    </div>

                    <div className="h-[300px] w-full">
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
                                <Area
                                    type="monotone"
                                    dataKey="focus"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    fillOpacity={0}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-xs font-bold text-slate-500">Neuro Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-xs font-bold text-slate-500">Focus Index</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
