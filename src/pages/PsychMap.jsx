import React, { useState } from 'react';
import { Compass, Calendar as CalendarIcon, BookOpen, FileText, History, TrendingUp, ChevronLeft, ChevronRight, Download, Share2, Star, ShieldCheck, Activity, Brain, Target, Sliders, Zap, Wind, Smile, Meh, Frown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line } from 'recharts';

const MOCK_TRENDS = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 68 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 82 },
    { day: 'Sat', score: 90 },
    { day: 'Sun', score: 88 },
];

const MOCK_DIARY = [
    { date: '2026.02.07', mood: '愉快', icon: Smile, color: 'text-emerald-500', score: 88, note: '今天完成了繁重的工作，心情很輕鬆。測試顯示放鬆度明顯提升。' },
    { date: '2026.02.06', mood: '疲乏', icon: Meh, color: 'text-amber-500', score: 72, note: '會議太多，專注度維持良好但疲勞感偏高。' },
    { date: '2026.02.05', mood: '焦慮', icon: Frown, color: 'text-rose-500', score: 58, note: '項目進度受阻，壓力指數上升。建議去秘密花園聽放鬆音樂。' },
];

const LATEST_REPORT = {
    date: '2026.02.07 18:24',
    displayDate: '最新檢測報告',
    score: 68,
    indicators: [
        { id: 'relaxation', label: '放鬆度', avg: 62, status: '良好' },
        { id: 'focus', label: '專注度', avg: 74, status: '優秀' },
        { id: 'fatigue', label: '疲勞度', avg: 42, status: '偏高' },
        { id: 'stress', label: '壓力', avg: 28, status: '較低' },
        { id: 'anxiety', label: '焦慮', avg: 48, status: '正常' },
        { id: 'heart', label: '心率指標', avg: 71, status: '穩定' }
    ],
    analysis: '根據您的 3 分鐘深度掃描，您的 專注度 表現優異，但 放鬆度 與 疲勞值 均顯示出明顯的系統負荷過重。建議您立即前往秘密花園進行 10 分鐘的深海冥想，以平衡您的腦諧度。'
};

const MOCK_HISTORY_DATA = [
    {
        id: 'hist_1',
        date: '2026.02.06 14:30',
        displayDate: '2026/02/06 測評報告',
        score: 82,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 85, status: '優秀' },
            { id: 'focus', label: '專注度', avg: 78, status: '良好' },
            { id: 'fatigue', label: '疲勞度', avg: 20, status: '極低' },
            { id: 'stress', label: '壓力', avg: 15, status: '極低' },
            { id: 'anxiety', label: '焦慮', avg: 35, status: '正常' },
            { id: 'heart', label: '心率指標', avg: 68, status: '穩定' }
        ],
        analysis: '昨天的各項指標非常理想，尤其是放鬆度和壓力控制達到了極佳狀態。大腦神經效能處於高位，適合進行創作性與高強度思維工作。'
    },
    {
        id: 'hist_2',
        date: '2026.02.05 10:15',
        displayDate: '2026/02/05 測評報告',
        score: 45,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 30, status: '較差' },
            { id: 'focus', label: '專注度', avg: 40, status: '一般' },
            { id: 'fatigue', label: '疲勞度', avg: 75, status: '极高' },
            { id: 'stress', label: '壓力', avg: 80, status: '偏高' },
            { id: 'anxiety', label: '焦慮', avg: 65, status: '較強' },
            { id: 'heart', label: '心率指標', avg: 88, status: '較快' }
        ],
        analysis: '這是一份偏向警示的報告。數據顯示您當時處於高壓與極度疲勞狀態，心率指標也出現波動。這種情況下大腦處理效率會大幅下降，強烈建議休息。'
    },
    {
        id: 'hist_3',
        date: '2026.02.04 16:45',
        displayDate: '2026/02/04 測評報告',
        score: 72,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 65, status: '良好' },
            { id: 'focus', label: '專注度', avg: 88, status: '優秀' },
            { id: 'fatigue', label: '疲勞度', avg: 35, status: '正常' },
            { id: 'stress', label: '壓力', avg: 42, status: '正常' },
            { id: 'anxiety', label: '焦慮', avg: 40, status: '正常' },
            { id: 'heart', label: '心率指標', avg: 72, status: '穩定' }
        ],
        analysis: '專注度表現極為突出，是典型的「心流」狀態預兆。雖然有輕微疲勞，但整體心理素質非常穩定，工作進展應該相當順利。'
    },
    {
        id: 'hist_4',
        date: '2026.02.03 09:00',
        displayDate: '2026/02/03 測評報告',
        score: 58,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 45, status: '一般' },
            { id: 'focus', label: '專注度', avg: 60, status: '良好' },
            { id: 'fatigue', label: '疲勞度', avg: 52, status: '偏高' },
            { id: 'stress', label: '壓力', avg: 55, status: '中等' },
            { id: 'anxiety', label: '焦慮', avg: 50, status: '中等' },
            { id: 'heart', label: '心率指標', avg: 75, status: '穩定' }
        ],
        analysis: '早起後的檢測顯示狀態尚可，但動力感並非處於峰值。建議在開始重頭工作前進行簡單的深呼吸練習，以進一步提升喚醒度。'
    },
    {
        id: 'hist_5',
        date: '2026.02.02 21:20',
        displayDate: '2026/02/02 測評報告',
        score: 80,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 92, status: '極佳' },
            { id: 'focus', label: '專注度', avg: 35, status: '較低' },
            { id: 'fatigue', label: '疲勞度', avg: 15, status: '極低' },
            { id: 'stress', label: '壓力', avg: 10, status: '極低' },
            { id: 'anxiety', label: '焦慮', avg: 20, status: '平和' },
            { id: 'heart', label: '心率指標', avg: 62, status: '平穩' }
        ],
        analysis: '晚間睡前的數據顯示您已完全放鬆。Alpha 波活動旺盛，這對進入深度睡眠非常有幫助。保持這種心境，明早醒來會更有活力。'
    }
];

const subModules = [
    { id: 'calendar', title: '健康日曆', sub: '每日簽到與檢測統計', icon: CalendarIcon, color: 'from-blue-500 to-indigo-600' },
    { id: 'diary', title: '心情日記', sub: '紀錄心情與大腦數據', icon: BookOpen, color: 'from-emerald-500 to-teal-600' },
    { id: 'latest', title: '最新測試', sub: '當前腦狀態詳細報告', icon: FileText, color: 'from-purple-500 to-pink-600' },
    { id: 'history', title: '歷史報告', sub: '回顧過去的測量趨勢', icon: History, color: 'from-amber-500 to-orange-600' },
];

export default function PsychMap() {
    const [activeModule, setActiveModule] = useState(null);
    const [selectedReportId, setSelectedReportId] = useState(null);

    const renderHeader = (title, Icon, onBack = null) => (
        <div className="flex items-center justify-between mb-8">
            <button
                onClick={onBack || (() => { setActiveModule(null); setSelectedReportId(null); })}
                className="p-3 bg-white shadow-xl shadow-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors"
            >
                <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
                <Icon size={28} className="text-blue-600" />
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
            </div>
            <div className="w-12" /> {/* Spacer */}
        </div>
    );

    const renderPortal = () => (
        <div className="space-y-12">
            <div className="flex items-center gap-6 px-2">
                <div className="p-4 bg-teal-600 text-white rounded-[2rem] shadow-xl shadow-teal-100 italic transform -rotate-6">
                    <Compass size={40} />
                </div>
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">心理地圖</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Psychological Compass Hub</p>
                </div>
            </div>

            {/* Hub Portal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
                {subModules.map((mod, idx) => (
                    <motion.button
                        key={mod.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveModule(mod.id)}
                        className="group relative overflow-hidden glass-card p-10 flex flex-col items-center gap-6 text-center border-2 border-transparent hover:border-blue-100 transition-all shadow-2xl shadow-slate-200/50"
                    >
                        <div className={`p-6 rounded-[1.8rem] bg-gradient-to-br ${mod.color} text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                            <mod.icon size={36} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-slate-800">{mod.title}</h3>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{mod.sub}</p>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-12 group-hover:bg-blue-50/20 transition-colors" />
                    </motion.button>
                ))}
            </div>

            {/* Weekly Trend Chart */}
            <div className="px-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 sm:p-10 space-y-8"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="text-teal-600" />
                            <h3 className="text-2xl font-black text-slate-800 italic">本週健康趨勢圖</h3>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">綜合評分週期</span>
                    </div>

                    <div className="h-64 sm:h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_TRENDS}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 700 }} />
                                <YAxis hide domain={[40, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#0D9488"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorScore)"
                                    label={{ position: 'top', fill: '#0D9488', fontSize: 12, fontWeight: 900, offset: 10 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );

    const renderCalendar = () => {
        const days = Array.from({ length: 35 }, (_, i) => i - 4); // Simple mock April 2026
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                {renderHeader('健康日曆', CalendarIcon)}
                <div className="glass-card p-8 bg-white border-2 border-slate-50">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-800">2026年 4月</h3>
                        <div className="flex gap-2">
                            <button className="p-2 bg-slate-50 rounded-lg"><ChevronLeft size={16} /></button>
                            <button className="p-2 bg-slate-50 rounded-lg"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
                        {['週日', '週一', '週二', '週三', '週四', '週五', '週六'].map(d => (
                            <div key={d} className="bg-slate-50 p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                        {days.map((d, i) => (
                            <div key={i} className={`bg-white h-24 sm:h-32 p-4 relative border-t border-l border-slate-50 ${d <= 0 || d > 30 ? 'bg-slate-50/30' : ''}`}>
                                <span className={`text-xs font-bold ${d <= 0 || d > 30 ? 'text-slate-300' : 'text-slate-800'}`}>{d > 0 && d <= 30 ? d : ''}</span>
                                {d === 7 && (
                                    <div className="absolute inset-0 m-2 mt-8 bg-blue-600/10 rounded-xl p-2 border border-blue-200">
                                        <div className="w-1 h-full bg-blue-600 rounded-full float-left mr-2" />
                                        <p className="text-[8px] font-black text-blue-700 leading-tight">腦神經檢測 (Score: 88)</p>
                                    </div>
                                )}
                                {d === 15 && (
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderDiary = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {renderHeader('心情日記', BookOpen)}
            <button className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black italic text-xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3">
                <MessageSquare size={24} /> 紀錄此刻心情
            </button>
            <div className="space-y-6">
                {MOCK_DIARY.map((entry, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="glass-card p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                    >
                        <div className="flex-1 space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-400 tracking-[0.2em]">{entry.date}</span>
                                <div className="flex items-center gap-2">
                                    <entry.icon size={24} className={entry.color} />
                                    <span className={`font-black uppercase tracking-widest ${entry.color}`}>{entry.mood}</span>
                                </div>
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg">"{entry.note}"</p>
                            <div className="pt-4 flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-slate-400" />
                                    <span className="text-xs font-bold text-slate-400">大腦綜合評分：<span className="text-blue-600 font-black">{entry.score}</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50" />
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const renderReportDetail = (report) => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {renderHeader(report.displayDate, FileText, () => {
                if (activeModule === 'history') {
                    setSelectedReportId(null);
                } else {
                    setActiveModule(null);
                }
            })}

            <div className={`bg-gradient-to-br p-12 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden relative ${report.score >= 80 ? 'from-[#064e3b] to-[#065f46]' :
                    report.score >= 60 ? 'from-[#1e1b4b] to-[#312e81]' :
                        'from-[#7f1d1d] to-[#991b1b]'
                }`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl" />
                </div>
                <div className="space-y-4 text-center md:text-left relative z-10">
                    <h1 className="text-4xl font-black italic">綜合腦狀態評測</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={14} className="text-blue-400" /> 認證數據
                        </span>
                        <span className="text-blue-200 text-xs font-bold font-mono">{report.date}</span>
                    </div>
                </div>
                <div className="relative flex flex-col items-center z-10">
                    <div className="w-32 h-32 rounded-full border-[10px] border-white/10 flex items-center justify-center">
                        <span className="text-5xl font-black">{report.score}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <div className="glass-card p-10 flex flex-col items-center justify-center">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">多維度雷達分析</h3>
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={report.indicators.map(ind => ({ subject: ind.label, A: ind.avg }))}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                <Radar name="測評結果" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 6 Indicators Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {report.indicators.map((ind, i) => (
                        <div key={i} className="glass-card p-6 border-2 border-slate-50 flex flex-col items-center justify-center text-center">
                            <span className={`text-3xl font-black ${ind.avg >= 70 ? 'text-emerald-600' : ind.avg >= 40 ? 'text-blue-600' : 'text-rose-600'}`}>{ind.avg}</span>
                            <span className="text-xs font-black text-slate-800 mt-1">{ind.label}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-2 py-0.5 bg-slate-100 rounded-md">{ind.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-10 bg-blue-50/50 space-y-4">
                <h4 className="font-black text-xl text-slate-800 flex items-center gap-2 italic"><Brain size={24} className="text-blue-600" /> 趨勢深度分析</h4>
                <p className="text-slate-600 font-medium leading-relaxed uppercase">
                    {report.analysis}
                </p>
            </div>
        </div>
    );

    const renderHistoryList = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {renderHeader('歷史報告列表', History)}
            <div className="space-y-4">
                {MOCK_HISTORY_DATA.map((item, i) => (
                    <motion.div
                        whileHover={{ x: 10 }}
                        key={item.id}
                        className="glass-card p-8 flex items-center justify-between group cursor-pointer border-2 border-transparent hover:border-blue-100 transition-all shadow-xl shadow-slate-100/50"
                        onClick={() => setSelectedReportId(item.id)}
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-lg">{item.date.split(' ')[0]} 測評報告</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${item.score >= 80 ? 'text-emerald-600 bg-emerald-50' :
                                            item.score >= 60 ? 'text-blue-600 bg-blue-50' :
                                                'text-rose-600 bg-rose-50'
                                        }`}>綜合得分: {item.score}</span>
                                    <span className="text-[10px] font-black text-slate-300 uppercase italic">ID: 0x{item.id}</span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={24} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-12 pb-32 max-w-6xl mx-auto px-2 pt-6">
            {!activeModule && renderPortal()}
            {activeModule === 'calendar' && renderCalendar()}
            {activeModule === 'diary' && renderDiary()}
            {activeModule === 'latest' && renderReportDetail(LATEST_REPORT)}
            {activeModule === 'history' && (
                selectedReportId
                    ? renderReportDetail(MOCK_HISTORY_DATA.find(r => r.id === selectedReportId))
                    : renderHistoryList()
            )}
        </div>
    );
}
