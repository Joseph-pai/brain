import React from 'react';
import { Activity, Wind, Brain, Zap, Target, Sliders, ChevronRight, TrendingUp, Calendar, ShieldCheck, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const REPORT_DATA = {
    score: 68,
    indicators: [
        { id: 'relaxation', label: '放鬆度', range: '60~80', min: 45, max: 78, avg: 62, status: '良好', link: 'music', subtype: 'soothing' },
        { id: 'focus', label: '專注度', val: 74, range: '50~90', min: 30, max: 88, avg: 74, status: '優秀', link: 'games', subtype: 'tug-of-war' },
        { id: 'fatigue', label: '疲勞度', range: '20~40', min: 15, max: 55, avg: 42, status: '偏高', link: 'audio', subtype: 'whispers' },
        { id: 'stress', label: '壓力', range: '40~60', min: 10, max: 55, avg: 28, status: '較低', link: 'music', subtype: 'decompression' },
        { id: 'anxiety', label: '焦慮', range: '30~50', min: 25, max: 62, avg: 48, status: '正常', link: 'music', subtype: 'decompression' },
    ],
    trend: [
        { day: 'Mon', val: 62 }, { day: 'Tue', val: 68 }, { day: 'Wed', val: 55 },
        { day: 'Thu', val: 72 }, { day: 'Fri', val: 65 }, { day: 'Sat', val: 78 }, { day: 'Sun', val: 68 }
    ]
};

const radarData = REPORT_DATA.indicators.map(ind => ({
    subject: ind.label,
    A: ind.avg,
    fullMark: 100,
}));

export default function Report() {
    const navigate = useNavigate();

    const handleIndicatorClick = (indicator) => {
        if (indicator.link) {
            const query = indicator.subtype ? `?tab=${indicator.link}&mode=${indicator.subtype}` : `?tab=${indicator.link}`;
            navigate(`/garden${query}`);
        }
    };

    return (
        <div className="space-y-10 pb-32 max-w-6xl mx-auto px-2">

            {/* Summary Header */}
            <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-10 sm:p-16 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl" />
                </div>

                <div className="space-y-4 text-center md:text-left relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight italic">綜合腦健康報告</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={14} className="text-blue-400" /> 已驗證 • 真實數據
                        </span>
                        <span className="text-blue-200 text-xs font-bold font-mono">2026.02.07 18:24</span>
                    </div>
                </div>

                <div className="relative flex flex-col items-center z-10">
                    <div className="w-40 h-40 rounded-full border-[12px] border-white/10 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-t-transparent animate-spin-slow" />
                        <span className="text-6xl font-black">{REPORT_DATA.score}</span>
                    </div>
                    <span className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">系統綜合評分</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Detailed Analysis Table */}
                <div className="lg:col-span-2 glass-card p-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 italic">
                            <Activity size={24} className="text-blue-600" /> 詳細指標分析
                        </h2>
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Download size={20} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="py-4 px-4 font-black">評測維度</th>
                                    <th className="py-4 px-4 font-black">參考範圍</th>
                                    <th className="py-4 px-4 font-black">最低</th>
                                    <th className="py-4 px-4 font-black">最高</th>
                                    <th className="py-4 px-4 font-black">平均值</th>
                                    <th className="py-4 px-4 font-black">狀態</th>
                                    <th className="py-4 px-4 font-black text-center">調節</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REPORT_DATA.indicators.map((ind, i) => (
                                    <motion.tr
                                        key={ind.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`group transition-colors rounded-2xl cursor-pointer ${ind.avg < 50
                                            ? 'bg-orange-50/50 hover:bg-orange-100'
                                            : 'bg-slate-50/50 hover:bg-blue-50'
                                            }`}
                                        onClick={() => handleIndicatorClick(ind)}
                                    >
                                        <td className="py-4 px-4 font-black text-slate-700 rounded-l-2xl">{ind.label}</td>
                                        <td className="py-4 px-4 font-bold text-slate-400">{ind.range}</td>
                                        <td className="py-4 px-4 font-bold text-slate-600">{ind.min}</td>
                                        <td className="py-4 px-4 font-bold text-slate-600">{ind.max}</td>
                                        <td className={`py-4 px-4 font-black ${ind.avg < 50 ? 'text-orange-600 animate-pulse' : 'text-blue-600'}`}>{ind.avg}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${ind.avg < 50
                                                ? 'bg-orange-100 text-orange-700'
                                                : ind.status.includes('偏高') || ind.status.includes('較強') || ind.status.includes('較高')
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {ind.avg < 50 ? '需調節' : ind.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 rounded-r-2xl text-slate-300 group-hover:text-current text-center">
                                            <ChevronRight size={18} />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dual Radar visualization */}
                <div className="glass-card p-10 flex flex-col items-center justify-center space-y-8">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">多維度性能與壓力分析</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">正向性能維度</span>
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={REPORT_DATA.indicators.filter(ind => ind.id === 'relaxation' || ind.id === 'focus').map(ind => ({ subject: ind.label, A: ind.avg }))}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                        <Radar name="性能" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4">負向壓力維度</span>
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={REPORT_DATA.indicators.filter(ind => ind.id === 'fatigue' || ind.id === 'stress' || ind.id === 'anxiety').map(ind => ({ subject: ind.label, A: ind.avg }))}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                        <Radar name="壓力" dataKey="A" stroke="#FB7185" fill="#FB7185" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Conclusion */}
            <div className="glass-card p-10 space-y-6 bg-blue-50/30 border-2 border-blue-100/50">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-2xl">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 italic">系統深度分析結論</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expert Intelligence Synthesis</p>
                    </div>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium text-lg">
                    綜合本週數據趨勢，我們觀察到您的大腦在高強度工作期間展現出了極佳的 <span className="text-blue-600 font-bold">專注深度</span>。然而，長期積累的
                    <button onClick={() => navigate('/garden')} className="text-rose-500 font-bold hover:underline mx-1">神經疲勞</button>
                    正逐漸侵蝕您的情緒穩定性。特別是在下午 3:00 至 5:00 期間，
                    <button onClick={() => navigate('/garden')} className="text-rose-500 font-bold hover:underline mx-1">壓力系數</button>
                    有顯著抬升現象。為了防止長期耗竭，建議今天下午點擊進入
                    <button onClick={() => navigate('/garden')} className="text-blue-600 font-bold underline mx-1">伊甸心園</button>
                    進行至少 15 分鐘的音樂調節或沉浸式放鬆，以重置您的基線心理狀態。
                </p>
            </div>

            {/* Bottom Section: Trend */}
            <div className="glass-card p-10 space-y-8">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-blue-600" />
                    <h3 className="text-2xl font-black text-slate-800 italic">近期情緒穩定趨勢</h3>
                </div>
                <div className="h-64 sm:h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={REPORT_DATA.trend}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 700 }} />
                            <YAxis hide domain={[40, 90]} />
                            <Tooltip
                                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900 }}
                            />
                            <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <footer className="text-center pb-8 border-t border-slate-100 pt-8">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">Taiwan BCI Advanced Intelligence Report</p>
            </footer>
        </div>
    );
}
