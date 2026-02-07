import React from 'react';
import { Share2, Download, Filter, Info, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { MOCK_REPORT_DATA, BRAINWAVE_TYPES } from '../utils/mockData';
import { motion } from 'framer-motion';

export default function Report() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Deep Analysis Report</h1>
                    <p className="text-slate-500">Session Date: Feb 7, 2026 • 16:45 PM</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 glass-card text-slate-600 hover:text-blue-600 transition-colors">
                        <Share2 size={18} />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
                        <Download size={18} />
                        <span className="hidden sm:inline">Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Summary Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 glass-card p-8 flex flex-col sm:flex-row items-center gap-8"
                >
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * MOCK_REPORT_DATA.score) / 100} className="text-blue-600 transition-all duration-1000" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-5xl font-black text-slate-800">{MOCK_REPORT_DATA.score}</span>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Health Score</p>
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                            <TrendingUp size={16} className="mr-2" />
                            +4% improvement
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">{MOCK_REPORT_DATA.mood}</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {MOCK_REPORT_DATA.summary}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 flex flex-col"
                >
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Wave Balance Radar</h3>
                    <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_REPORT_DATA.waves}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                                <Radar
                                    name="Current"
                                    dataKey="value"
                                    stroke="var(--color-primary-blue)"
                                    fill="var(--color-primary-blue)"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Individual Analysis Breakdown */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Filter size={20} className="text-blue-600" />
                        Detailed Wave Breakdown
                    </h2>
                    <Info size={18} className="text-slate-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {BRAINWAVE_TYPES.map((wave, idx) => {
                        const score = MOCK_REPORT_DATA.waves.find(w => w.name.toLowerCase() === wave.id.toLowerCase())?.value || 0;
                        return (
                            <motion.div
                                key={wave.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 hover:shadow-2xl transition-all cursor-default group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{wave.label}</h4>
                                        <p className="text-xs text-slate-400 font-medium">{wave.sub}</p>
                                    </div>
                                    <div className="text-2xl font-black text-slate-700" style={{ color: wave.color }}>{score}%</div>
                                </div>

                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-4">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${score}%`, backgroundColor: wave.color }}
                                    />
                                </div>

                                <p className="text-sm text-slate-500 italic">
                                    Optimal range for this state is 60-85%. Your current value is {score > 85 ? 'higher' : score < 60 ? 'lower' : 'within'} the target.
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
