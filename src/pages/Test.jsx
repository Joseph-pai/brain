import React, { useState, useEffect } from 'react';
import { Bluetooth, Activity, ShieldCheck, Timer, Zap, Brain, Sliders, Battery, Signal, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarComponent } from 'recharts';
import { generateWaveformData } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

const generateRawSignal = (length = 100) => {
    return Array.from({ length }, (_, i) => ({
        time: i,
        val: Math.sin(i * 0.2) * 0.005 + (Math.random() - 0.5) * 0.003
    }));
};

const generateSpectrum = () => {
    return [
        { name: 'Theta', val: Math.floor(Math.random() * 100) },
        { name: 'L-Alpha', val: Math.floor(Math.random() * 100) },
        { name: 'H-Alpha', val: Math.floor(Math.random() * 100) },
        { name: 'L-Beta', val: Math.floor(Math.random() * 100) },
        { name: 'H-Beta', val: Math.floor(Math.random() * 100) },
        { name: 'L-Gamma', val: Math.floor(Math.random() * 100) },
    ];
};

export default function Test() {
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [rawSignal, setRawSignal] = useState(generateRawSignal());
    const [spectrum, setSpectrum] = useState(generateSpectrum());
    const [timer, setTimer] = useState(1800); // 180.0 seconds (3 minutes)
    const [stats, setStats] = useState([
        { label: '放鬆度', val: 56, id: 'relaxation' },
        { label: '專注度', val: 69, id: 'focus' },
        { label: '疲勞度', val: 37, id: 'fatigue' },
        { label: '壓力指數', val: 48, id: 'stress' },
        { label: '焦慮指數', val: 38, id: 'anxiety' },
        { label: '心率指標', val: 71, id: 'heart' }
    ]);

    useEffect(() => {
        let interval;
        if (isTesting && timer > 0) {
            interval = setInterval(() => {
                setRawSignal(prev => [...prev.slice(2), ...generateRawSignal(2)]);
                setSpectrum(generateSpectrum());
                setTimer(t => {
                    if (t <= 1) {
                        setIsTesting(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return t - 1;
                });

                // Slowly fluctuate stats for "live" feel
                setStats(prev => prev.map(s => ({
                    ...s,
                    val: Math.max(10, Math.min(100, s.val + (Math.random() > 0.5 ? 1 : -1)))
                })));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isTesting, timer]);

    const formatTime = (t) => {
        const totalSecs = Math.floor(t / 10);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleIndicatorClick = (val, path = '/garden') => {
        if (val < 50) {
            navigate(path);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-2">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-48 h-48 bg-blue-600 rounded-[3rem] flex items-center justify-center text-white shadow-2xl shadow-blue-200"
                >
                    <Bluetooth size={80} />
                </motion.div>
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800">準備好連接了嗎？</h2>
                    <p className="text-slate-400 font-medium max-w-sm">請確保您的腦機設備已開啟並處於配對模式。</p>
                </div>
                <button
                    onClick={() => setIsConnected(true)}
                    className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                    立即連接設備
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 max-w-6xl mx-auto px-2 relative">

            {/* Completion Report Overlay */}
            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="bg-blue-600 p-8 text-white flex justify-between items-center shrink-0">
                                <div>
                                    <h2 className="text-3xl font-black">整體測評報告</h2>
                                    <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1">Full Health Assessment Report</p>
                                </div>
                                <button onClick={() => setIsFinished(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Radar Chart */}
                                    <div className="glass-card p-6 flex flex-col items-center justify-center">
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">腦電評測維度</h3>
                                        <div className="w-full h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.map(s => ({ name: s.label, val: s.val }))}>
                                                    <PolarGrid stroke="#e2e8f0" />
                                                    <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                                    <RadarComponent name="Result" dataKey="val" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* 6 Indicators */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {stats.map((s) => (
                                            <div
                                                key={s.id}
                                                onClick={() => handleIndicatorClick(s.val)}
                                                className={`p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer ${s.val < 50 ? 'border-orange-100 bg-orange-50/30' : 'border-emerald-100 bg-emerald-50/30'
                                                    }`}
                                            >
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                                <p className={`text-3xl font-black ${s.val < 50 ? 'text-orange-500' : 'text-emerald-500'}`}>{s.val}</p>
                                                {s.val < 50 && (
                                                    <p className="text-[8px] font-bold text-orange-400 mt-1 italic animate-pulse">不合格 • 點擊調節</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Analysis */}
                                <div className="glass-card p-8 bg-blue-50/50 border-2 border-blue-100/50">
                                    <h4 className="flex items-center gap-2 text-xl font-black text-slate-800 mb-4 italic">
                                        <Brain size={24} className="text-blue-600" />
                                        專業解讀分析
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        根據您的 3 分鐘深度掃描，您的 <span className="text-blue-600 font-bold">專注度</span> 表現優異，但 <span className="text-orange-500 font-bold">放鬆度</span> 與 <span className="text-orange-500 font-bold">疲勞值</span> 均顯示出明顯的系統負荷過重。建議您立即前往秘密花園進行 10 分鐘的深海冥想，以平衡您的腦諧度。
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-100 shrink-0">
                                <button
                                    onClick={() => navigate('/garden')}
                                    className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                >
                                    立即前往花園調節 <ChevronRight size={24} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Device Status Bar */}
            <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4 border-2 border-blue-50/50">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-2xl">
                        <Bluetooth size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800">BrainFit V2</h3>
                        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Connected • 實時數據傳輸中</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <Signal size={18} />
                        <span className="text-xs">信號良好</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <Battery size={18} />
                        <span className="text-xs">85%</span>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left: Raw Signal Wave */}
                <div className="glass-card p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">原始信號波</h4>
                    </div>
                    <div className="h-[200px] w-full border-b border-slate-100">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={rawSignal}>
                                <Line
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#3B82F6"
                                    strokeWidth={1.5}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                                <YAxis hide domain={[-0.015, 0.015]} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <h4 className="px-4 py-1.5 bg-blue-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">EEG Power</h4>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spectrum}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                    {spectrum.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.val < 50 ? '#FB923C' : '#10B981'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Indicators & Gauges */}
                <div className="glass-card p-6 space-y-6 bg-blue-50/20">
                    <div className="flex items-center justify-between">
                        <h4 className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">指標數值</h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Summary Gauge */}
                        <div className="col-span-2 sm:col-span-1 glass-card p-4 flex flex-col items-center justify-center space-y-4">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="44" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                                    <circle cx="48" cy="48" r="44" stroke="#3B82F6" strokeWidth="8" fill="transparent" strokeDasharray={276} strokeDashoffset={276 - (276 * 66) / 100} strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-2xl font-black text-slate-800">66</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center italic mt-2">綜合情緒</span>
                        </div>

                        {/* Smaller Indicators */}
                        {stats.slice(0, 5).map((stat, i) => (
                            <div
                                key={i}
                                onClick={() => handleIndicatorClick(stat.val)}
                                className={`glass-card p-4 flex flex-col items-center justify-center space-y-2 border-2 transition-all cursor-pointer ${stat.val < 50 ? 'border-orange-100 hover:bg-orange-50 animate-pulse' : 'border-white hover:bg-emerald-50'
                                    }`}
                            >
                                <span className={`text-2xl font-black ${stat.val < 50 ? 'text-orange-500' : 'text-slate-800'}`}>{stat.val}</span>
                                <span className="text-[10px] font-bold text-slate-400 italic text-center uppercase tracking-widest">{stat.label}</span>
                                {stat.val < 50 && <span className="text-[8px] font-black text-orange-400 -mt-1">點擊調節</span>}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center py-8 space-y-6">
                        <div className="flex items-center gap-4 text-slate-800">
                            <Timer size={24} className="text-blue-600" />
                            <span className="text-4xl font-black font-mono">{formatTime(timer)}</span>
                        </div>

                        {!isTesting ? (
                            <button
                                onClick={() => { setIsTesting(true); setTimer(1800); setIsFinished(false); }}
                                className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
                            >
                                {isFinished ? '重新檢測' : '開始檢測'}
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsTesting(false)}
                                className="w-full py-5 bg-slate-100 text-slate-400 rounded-3xl font-black text-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                停止檢測
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
