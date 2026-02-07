import React from 'react';
import { Share2, Download, Table as TableIcon, Activity, ChevronRight, Info, BookOpen, Music, Gamepad, Video } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarComponent, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const REPORT_DATA = {
    score: 68,
    indicators: [
        { id: 'anxiety', label: '焦慮', range: '40~60', min: 9, max: 59, avg: 26, status: '較低', link: 'music', subtype: 'cheerful' },
        { id: 'depression', label: '抑鬱', range: '40~60', min: 21, max: 55, avg: 40, status: '較低', link: 'music', subtype: 'calming' },
        { id: 'focus', label: '專注度', range: '40~60', min: 10, max: 100, avg: 68, status: '偏高', link: 'games', subtype: 'tug-of-war' },
        { id: 'relaxation', label: '放鬆度', range: '40~60', min: 40, max: 100, avg: 72, status: '偏高', link: 'music', subtype: 'soothing' },
        { id: 'consumption', label: '腦和諧度', range: '40~60', min: 26, max: 94, avg: 64, status: '較高', link: 'garden' },
        { id: 'flow', label: '心流', range: '40~60', min: 21, max: 88, avg: 70, status: '較強', link: 'garden' },
        { id: 'fatigue', label: '疲勞', range: '40~60', min: 3, max: 60, avg: 29, status: '較低', link: 'audio', subtype: 'whispers' },
        { id: 'stress', label: '壓力', range: '40~60', min: 10, max: 55, avg: 28, status: '較低', link: 'music', subtype: 'decompression' },
        { id: 'mood', label: '綜合情緒', range: '40~60', min: 53, max: 81, avg: 68, status: '較高', link: 'garden' },
    ]
};

const radarData = REPORT_DATA.indicators.map(i => ({ name: i.label, val: i.avg }));

export default function Report() {
    const navigate = useNavigate();

    const handleIndicatorClick = (indicator) => {
        if (indicator.link) {
            const query = indicator.subtype ? `?tab=${indicator.link}&mode=${indicator.subtype}` : `?tab=${indicator.link}`;
            navigate(`/garden${query}`);
        }
    };

    return (
        <div className="space-y-8 pb-32 max-w-7xl mx-auto px-2">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100">
                <div className="space-y-2 text-center sm:text-left">
                    <h1 className="text-4xl font-black">測評詳情</h1>
                    <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Assessment Detailed Analysis</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center gap-2 font-bold transition-all border border-white/20">
                        <Download size={18} /> 導出 PDF
                    </button>
                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center gap-2 font-bold transition-all border border-white/20">
                        <TableIcon size={18} /> 導出 Excel
                    </button>
                </div>
            </div>

            {/* Radar & Table Section */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Radar Chart */}
                <div className="xl:col-span-5 glass-card p-10 flex flex-col items-center">
                    <div className="flex items-center gap-3 self-start mb-8">
                        <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                        <h2 className="text-2xl font-black text-slate-800 italic">測評雷達圖</h2>
                    </div>

                    <div className="w-full aspect-square max-w-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }} />
                                <RadarComponent
                                    name="數據"
                                    dataKey="val"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fill="#3B82F6"
                                    fillOpacity={0.6}
                                />
                                <RadarComponent
                                    name="正常"
                                    dataKey="val"
                                    data={[
                                        { name: '焦慮', val: 50 }, { name: '抑鬱', val: 50 },
                                        { name: '專注度', val: 50 }, { name: '放鬆度', val: 50 },
                                        { name: '腦和諧度', val: 50 }, { name: '心流', val: 50 },
                                        { name: '疲勞', val: 50 }, { name: '壓力', val: 50 },
                                        { name: '綜合情緒', val: 50 },
                                    ]}
                                    stroke="#10B981"
                                    strokeWidth={1}
                                    fill="#10B981"
                                    fillOpacity={0.2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center gap-8 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-blue-500/60" />
                            <span className="text-xs font-bold text-slate-500">當前數值</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/30" />
                            <span className="text-xs font-bold text-slate-500">標準範圍</span>
                        </div>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="xl:col-span-7 glass-card p-8 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                    <th className="pb-4 px-4">指標</th>
                                    <th className="pb-4 px-4">標準範圍</th>
                                    <th className="pb-4 px-4">最低值</th>
                                    <th className="pb-4 px-4">最大值</th>
                                    <th className="pb-4 px-4">平均值</th>
                                    <th className="pb-4 px-4">判定</th>
                                    <th className="pb-4 px-4">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REPORT_DATA.indicators.map((ind, i) => (
                                    <motion.tr
                                        key={ind.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group bg-slate-50/50 hover:bg-blue-50 transition-colors rounded-2xl cursor-pointer"
                                        onClick={() => handleIndicatorClick(ind)}
                                    >
                                        <td className="py-4 px-4 font-black text-slate-700 rounded-l-2xl">{ind.label}</td>
                                        <td className="py-4 px-4 font-bold text-slate-400">{ind.range}</td>
                                        <td className="py-4 px-4 font-bold text-slate-600">{ind.min}</td>
                                        <td className="py-4 px-4 font-bold text-slate-600">{ind.max}</td>
                                        <td className="py-4 px-4 font-black text-blue-600">{ind.avg}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${ind.status.includes('偏高') || ind.status.includes('較強') || ind.status.includes('較高')
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {ind.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 rounded-r-2xl text-slate-300 group-hover:text-blue-600 text-center">
                                            <ChevronRight size={18} />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Trend Section (Bottom part of screenshot) */}
            <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                    <h2 className="text-2xl font-black text-slate-800 italic">專注度走勢圖</h2>
                </div>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            { time: '0m', val: 40 }, { time: '0.5m', val: 60 }, { time: '1m', val: 55 },
                            { time: '1.5m', val: 80 }, { time: '2m', val: 75 }, { time: '2.5m', val: 90 },
                            { time: '3m', val: 68 }
                        ]}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={3} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recommendation Hint */}
            <div className="bg-amber-50 rounded-[2.5rem] p-8 border-2 border-amber-100/50 flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-white rounded-3xl shadow-xl shadow-amber-200/50 text-amber-500">
                    <Brain size={48} />
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                    <h4 className="text-xl font-black text-slate-800">智慧調節建議</h4>
                    <p className="text-slate-600 font-medium">
                        系統檢測到您的 <span className="text-blue-600 font-bold">專注度偏高</span> 但 <span className="text-amber-600 font-bold">放鬆度不足</span>。建議前往秘密花園進行 5 分鐘的舒緩音樂調節。
                    </p>
                </div>
                <button
                    onClick={() => navigate('/garden?tab=music&mode=soothing')}
                    className="px-10 py-4 bg-amber-500 text-white rounded-[2rem] font-black shadow-lg shadow-amber-100 hover:bg-amber-600 transition-all whitespace-nowrap"
                >
                    立即調節
                </button>
            </div>
        </div>
    );
}
