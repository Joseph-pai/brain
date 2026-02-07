import React, { useState } from 'react';
import { Compass, Calendar as CalendarIcon, BookOpen, FileText, History, TrendingUp, ChevronLeft, ChevronRight, Download, Share2, Star, ShieldCheck, Activity, Brain, Target, Sliders, Zap, Wind, Smile, Meh, Frown, MessageSquare, Plus, Trash2, Edit2, Check, X as XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, PolarRadiusAxis } from 'recharts';

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
        { id: 'relaxation', label: '放鬆度', avg: 45, status: '不足', group: 'pos' },
        { id: 'focus', label: '專注度', avg: 74, status: '秀', group: 'pos' },
        { id: 'flow', label: '心流指標', avg: 80, status: '極佳', group: 'pos' },
        { id: 'fatigue', label: '疲勞度', avg: 70, status: '過高', group: 'neg' },
        { id: 'stress', label: '壓力', avg: 30, status: '正常', group: 'neg' },
        { id: 'anxiety', label: '焦慮', avg: 48, status: '正常', group: 'neg' }
    ],
    analysis: '根據最新的深度掃描，您的「正向性能」表現雖然有亮點（如心流進入快），但指標中的「放鬆度」明顯偏低（45分），且「疲勞度」已攀升至 70 分的警戒線。建議立即調低工作強度。'
};

const MOCK_HISTORY_DATA = [
    {
        id: 'hist_1',
        date: '2026.02.06 14:30',
        displayDate: '2026/02/06 測評報告',
        score: 82,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 85, status: '優秀', group: 'pos' },
            { id: 'focus', label: '專注度', avg: 78, status: '良好', group: 'pos' },
            { id: 'flow', label: '心流指標', avg: 82, status: '優秀', group: 'pos' },
            { id: 'fatigue', label: '疲勞度', avg: 20, status: '極低', group: 'neg' },
            { id: 'stress', label: '壓力', avg: 15, status: '極低', group: 'neg' },
            { id: 'anxiety', label: '焦慮', avg: 35, status: '正常', group: 'neg' }
        ],
        analysis: '昨天的整體表現極其穩定，正向指標均處於健康區間，壓力與焦慮極低，是非常理想的身心平衡狀態。'
    },
    {
        id: 'hist_2',
        date: '2026.02.05 10:15',
        displayDate: '2026/02/05 測評報告',
        score: 42,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 30, status: '極低', group: 'pos' },
            { id: 'focus', label: '專注度', avg: 40, status: '匱乏', group: 'pos' },
            { id: 'flow', label: '心流指標', avg: 25, status: '微弱', group: 'pos' },
            { id: 'fatigue', label: '疲勞度', avg: 75, status: '極高', group: 'neg' },
            { id: 'stress', label: '壓力', avg: 80, status: '崩潰', group: 'neg' },
            { id: 'anxiety', label: '焦慮', avg: 85, status: '深度', group: 'neg' }
        ],
        analysis: '警報：這是一份典型的「透支」報告。負向指標全部爆表（壓力80/焦慮85），且正向指標全面坍塌。這類數據預示著極高的心理崩潰風險。'
    },
    {
        id: 'hist_3',
        date: '2026.02.04 16:45',
        displayDate: '2026/02/04 測評報告',
        score: 72,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 65, status: '良好', group: 'pos' },
            { id: 'focus', label: '專注度', avg: 88, status: '巔峰', group: 'pos' },
            { id: 'flow', label: '心流指標', avg: 80, status: '優秀', group: 'pos' },
            { id: 'fatigue', label: '疲勞度', avg: 45, status: '一般', group: 'neg' },
            { id: 'stress', label: '壓力', avg: 42, status: '正常', group: 'neg' },
            { id: 'anxiety', label: '焦慮', avg: 40, status: '正常', group: 'neg' }
        ],
        analysis: '您的專注度與心流表現堪稱教科書級別。雖然有一點工作後的疲勞，但正向能量完全足以覆蓋壓力，是效率極高的工作日。'
    },
    {
        id: 'hist_4',
        date: '2026.02.03 09:00',
        displayDate: '2026/02/03 測評報告',
        score: 55,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 48, status: '不足', group: 'pos' },
            { id: 'focus', label: '專注度', avg: 52, status: '及格', group: 'pos' },
            { id: 'flow', label: '心流指標', avg: 45, status: '偏低', group: 'pos' },
            { id: 'fatigue', label: '疲勞度', avg: 52, status: '中等', group: 'neg' },
            { id: 'stress', label: '壓力', avg: 55, status: '中等', group: 'neg' },
            { id: 'anxiety', label: '焦慮', avg: 50, status: '中等', group: 'neg' }
        ],
        analysis: '晨間狀態比較平庸，各項正向指標剛剛跨過合格線。建議進行一些簡單的運動或深呼吸，以激活休眠的大腦。'
    },
    {
        id: 'hist_5',
        date: '2026.02.02 21:20',
        displayDate: '2026/02/02 測評報告',
        score: 38,
        indicators: [
            { id: 'relaxation', label: '放鬆度', avg: 15, status: '極度緊繃', group: 'pos' },
            { id: 'focus', label: '專注度', avg: 30, status: '涣散', group: 'pos' },
            { id: 'flow', label: '心流指標', avg: 20, status: '停滯', group: 'pos' },
            { id: 'fatigue', label: '疲勞度', avg: 85, status: '爆表', group: 'neg' },
            { id: 'stress', label: '壓力', avg: 72, status: '高危', group: 'neg' },
            { id: 'anxiety', label: '焦慮', avg: 80, status: '深度', group: 'neg' }
        ],
        analysis: '檢測到深度負面能量循環。您的放鬆度僅 15 分，配合 80 分的焦慮值，這是一個非常危險的信定，請務必重視心理疏導。'
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

    // Diary State
    const [diaries, setDiaries] = useState(MOCK_DIARY);
    const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
    const [editingDiary, setEditingDiary] = useState(null);
    const [diaryForm, setDiaryForm] = useState({ date: '2026.02.07', mood: '愉快', icon: Smile, color: 'text-emerald-500', note: '' });

    const openAddDiary = () => {
        setEditingDiary(null);
        setDiaryForm({ date: '2026.02.07', mood: '愉快', icon: Smile, color: 'text-emerald-500', note: '' });
        setIsDiaryModalOpen(true);
    };

    const openEditDiary = (entry) => {
        setEditingDiary(entry);
        setDiaryForm({ ...entry });
        setIsDiaryModalOpen(true);
    };

    const saveDiary = () => {
        if (editingDiary) {
            setDiaries(prev => prev.map(d => d === editingDiary ? { ...diaryForm } : d));
        } else {
            setDiaries(prev => [{ ...diaryForm, score: Math.floor(60 + Math.random() * 30) }, ...prev]);
        }
        setIsDiaryModalOpen(false);
    };

    const deleteDiary = (entry) => {
        setDiaries(prev => prev.filter(d => d !== entry));
    };

    const moodOptions = [
        { label: '愉快', icon: Smile, color: 'text-emerald-500' },
        { label: '平淡', icon: Meh, color: 'text-amber-500' },
        { label: '焦慮', icon: Frown, color: 'text-rose-500' },
        { label: '心流', icon: Zap, color: 'text-blue-500' },
        { label: '平靜', icon: Wind, color: 'text-teal-500' },
    ];

    const isAlert = (ind) => {
        if (ind.group === 'pos') return ind.avg < 50;
        if (ind.group === 'neg') return ind.avg > 50;
        return false;
    };

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
            <div className="w-12" />
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
        // Mocking for Feb 2026 (Starts on Sunday)
        const days = Array.from({ length: 35 }, (_, i) => i + 1);

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                {renderHeader('健康日曆', CalendarIcon)}
                <div className="glass-card p-8 bg-white border-2 border-slate-50 overflow-x-auto">
                    <div className="flex items-center justify-between mb-8 min-w-[800px]">
                        <h3 className="text-xl font-black text-slate-800">2026年 2月</h3>
                        <div className="flex gap-2">
                            <button className="p-2 bg-slate-50 rounded-lg"><ChevronLeft size={16} /></button>
                            <button className="p-2 bg-slate-50 rounded-lg"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 min-w-[800px]">
                        {['週日', '週一', '週二', '週三', '週四', '週五', '週六'].map(d => (
                            <div key={d} className="bg-slate-50 p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                        {days.map((d, i) => {
                            const reportForDay = MOCK_HISTORY_DATA.find(r => {
                                const reportDay = parseInt(r.date.split('.')[2]);
                                return reportDay === d;
                            });

                            return (
                                <div key={i} className={`bg-white h-48 sm:h-64 p-3 relative border-t border-l border-slate-50 ${d > 28 ? 'bg-slate-50/30' : ''}`}>
                                    <span className={`text-xs font-bold ${d > 28 ? 'text-slate-300' : 'text-slate-800'}`}>{d <= 28 ? d : ''}</span>

                                    {d <= 28 && reportForDay && (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            onClick={() => {
                                                setSelectedReportId(reportForDay.id);
                                                setActiveModule('history');
                                            }}
                                            className={`mt-2 p-2 rounded-xl border-2 transition-all cursor-pointer h-[calc(100%-24px)] flex flex-col gap-1 overflow-y-auto ${reportForDay.score < 50 ? 'border-rose-100 bg-rose-50/40 hover:bg-rose-50/60' : 'border-blue-100 bg-blue-50/40 hover:bg-blue-50/60'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className={`text-[9px] font-black uppercase ${reportForDay.score < 50 ? 'text-rose-600' : 'text-blue-600'}`}>
                                                    {reportForDay.score < 50 ? '風險提醒' : '健康良好'}
                                                </span>
                                                <span className="text-[10px] font-black">{reportForDay.score}分</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-1 pt-1 opacity-80">
                                                {reportForDay.indicators.map((ind, idx) => (
                                                    <div key={idx} className="flex items-center justify-between border-t border-white/50 pt-0.5">
                                                        <span className="text-[7px] font-bold text-slate-500">{ind.label}</span>
                                                        <span className={`text-[8px] font-black ${isAlert(ind) ? 'text-rose-500' : 'text-slate-700'}`}>{ind.avg}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {d === 7 && !reportForDay && (
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" title="今日測試已完成" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderDiary = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {renderHeader('心情日記', BookOpen)}
            <button
                onClick={openAddDiary}
                className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black italic text-xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 hover:bg-emerald-700 transition-colors"
            >
                <Plus size={24} /> 紀錄此刻心情
            </button>
            <div className="space-y-6">
                {diaries.map((entry, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="glass-card p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group"
                    >
                        <div className="flex-1 space-y-4 relative z-10 w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-400 tracking-[0.2em]">{entry.date}</span>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <entry.icon size={24} className={entry.color} />
                                        <span className={`font-black uppercase tracking-widest ${entry.color}`}>{entry.mood}</span>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEditDiary(entry)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => deleteDiary(entry)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
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
                    </motion.div>
                ))}
            </div>

            {/* Diary Modal */}
            <AnimatePresence>
                {isDiaryModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-black text-slate-800">{editingDiary ? '修改心情' : '新增心情'}</h3>
                                <button onClick={() => setIsDiaryModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600"><XIcon size={24} /></button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">日期</label>
                                    <input
                                        type="text"
                                        value={diaryForm.date}
                                        onChange={(e) => setDiaryForm({ ...diaryForm, date: e.target.value })}
                                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">心情選擇</label>
                                    <div className="flex flex-wrap gap-3">
                                        {moodOptions.map((opt) => (
                                            <button
                                                key={opt.label}
                                                onClick={() => setDiaryForm({ ...diaryForm, mood: opt.label, icon: opt.icon, color: opt.color })}
                                                className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${diaryForm.mood === opt.label ? 'border-blue-500 bg-blue-50' : 'border-slate-50 bg-white hover:border-slate-200'
                                                    }`}
                                            >
                                                <opt.icon size={20} className={opt.color} />
                                                <span className={`text-sm font-black ${opt.color}`}>{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">寫下你的心情...</label>
                                    <textarea
                                        value={diaryForm.note}
                                        onChange={(e) => setDiaryForm({ ...diaryForm, note: e.target.value })}
                                        placeholder="今天感覺如何？"
                                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium focus:border-blue-500 outline-none transition-colors h-32 resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={saveDiary}
                                className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                            >
                                <Check size={24} /> {editingDiary ? '儲存修改' : '發佈日記'}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );

    const renderReportDetail = (report) => {
        const posIndicators = report.indicators.filter(ind => ind.group === 'pos');
        const negIndicators = report.indicators.filter(ind => ind.group === 'neg');

        return (
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
                    {/* Dual Radar Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="glass-card p-6 flex flex-col items-center">
                            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">正向性能指標分析</h3>
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={posIndicators.map(ind => ({ subject: ind.label, A: ind.avg }))}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                        <PolarRadiusAxis
                                            angle={30}
                                            domain={[0, 100]}
                                            tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            axisLine={false}
                                            tickCount={6}
                                        />
                                        <Radar name="性能" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="glass-card p-6 flex flex-col items-center">
                            <h3 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4">負向壓力指標分析</h3>
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={negIndicators.map(ind => ({ subject: ind.label, A: ind.avg }))}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                        <PolarRadiusAxis
                                            angle={30}
                                            domain={[0, 100]}
                                            tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            axisLine={false}
                                            tickCount={6}
                                        />
                                        <Radar name="壓力" dataKey="A" stroke="#FB7185" fill="#FB7185" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Indicators Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {report.indicators.map((ind, i) => {
                            const alerted = isAlert(ind);
                            return (
                                <div key={i} className="glass-card p-6 border-2 border-slate-50 flex flex-col items-center justify-center text-center">
                                    <span className={`text-3xl font-black ${alerted ? 'text-rose-600' : 'text-emerald-600'}`}>{ind.avg}</span>
                                    <span className="text-xs font-black text-slate-800 mt-1">{ind.label}</span>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest mt-2 px-2 py-1 rounded-md ${alerted ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
                                        {ind.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="glass-card p-10 bg-blue-50/50 space-y-4">
                    <h4 className="font-black text-xl text-slate-800 flex items-center gap-2 italic"><Brain size={24} className="text-blue-600" /> 趨勢深度分析</h4>
                    <p className="text-slate-600 font-medium leading-relaxed uppercase whitespace-pre-line">
                        {report.analysis}
                    </p>
                </div>
            </div>
        );
    };

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
