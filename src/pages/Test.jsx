import React, { useState, useEffect } from 'react';
import { Bluetooth, Activity, ShieldCheck, Timer, Zap, Brain, Sliders, Battery, Signal, ChevronRight, X, Heart, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { generateWaveformData } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

const WAVE_COLORS = {
    delta: '#7F1D1D', // Deep Red
    theta: '#F59E0B',
    alpha: '#10B981',
    beta: '#3B82F6',
    gamma: '#8B5CF6',
    stress: '#FB7185'
};

const BANDS = [
    { id: 'delta', label: 'Delta' },
    { id: 'theta', label: 'Theta' },
    { id: 'alpha', label: 'Alpha' },
    { id: 'beta', label: 'Beta' },
    { id: 'gamma', label: 'Gamma' },
    { id: 'stress', label: 'Stress' }
];

const generateRawSignal = (length = 100, isZero = true) => {
    return Array.from({ length }, (_, i) => ({
        time: i,
        delta: isZero ? 0 : 25 + Math.random() * 74,
        theta: isZero ? 0 : 25 + Math.random() * 74,
        alpha: isZero ? 0 : 25 + Math.random() * 74,
        beta: isZero ? 0 : 25 + Math.random() * 74,
        gamma: isZero ? 0 : 25 + Math.random() * 74,
        stress: isZero ? 0 : 25 + Math.random() * 74
    }));
};

const generateSpectrum = (latestData = null, isZero = true) => {
    if (!latestData || isZero) {
        return BANDS.map(b => ({ name: b.label, id: b.id, val: 0, color: WAVE_COLORS[b.id] }));
    }
    return BANDS.map(b => ({
        name: b.label,
        id: b.id,
        val: Math.floor(latestData[b.id]),
        color: WAVE_COLORS[b.id]
    }));
};

export default function Test() {
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const [searchState, setSearchState] = useState('idle'); // 'idle', 'searching', 'list', 'connecting', 'success'
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [isTesting, setIsTesting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [rawSignal, setRawSignal] = useState(generateRawSignal(100, true));
    const [spectrum, setSpectrum] = useState(generateSpectrum(null, true));
    const [activeWave, setActiveWave] = useState('delta');
    const [timer, setTimer] = useState(1800); // 180.0 seconds (3 minutes)

    const [stats, setStats] = useState([
        { label: '放鬆度', val: 0, id: 'relaxation', group: 'pos' },
        { label: '專注度', val: 0, id: 'focus', group: 'pos' },
        { label: '心流指標', val: 0, id: 'flow', group: 'pos' },
        { label: '疲勞度', val: 0, id: 'fatigue', group: 'neg' },
        { label: '壓力指數', val: 0, id: 'stress', group: 'neg' },
        { label: '焦慮指數', val: 0, id: 'anxiety', group: 'neg' }
    ]);

    useEffect(() => {
        let interval;
        if (isTesting && timer > 0) {
            interval = setInterval(() => {
                let latestPoint;
                setRawSignal(prev => {
                    const nextTime = (prev[prev.length - 1]?.time || 0) + 1;
                    latestPoint = {
                        time: nextTime,
                        delta: 25 + Math.random() * 74,
                        theta: 25 + Math.random() * 74,
                        alpha: 25 + Math.random() * 74,
                        beta: 25 + Math.random() * 74,
                        gamma: 25 + Math.random() * 74,
                        stress: 25 + Math.random() * 74
                    };
                    return [...prev.slice(1), latestPoint];
                });

                setSpectrum(prev => generateSpectrum(latestPoint, false));

                setTimer(t => {
                    if (t <= 1) {
                        setIsTesting(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return t - 1;
                });

                setStats(prev => prev.map(s => ({
                    ...s,
                    val: Math.max(10, Math.min(100, s.val + (Math.random() > 0.5 ? 2 : -2)))
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

    const isAlert = (stat) => {
        if (stat.group === 'pos') return stat.val < 50;
        if (stat.group === 'neg') return stat.val > 50;
        return false;
    };

    const handleIndicatorClick = (stat, path = '/garden') => {
        if (isAlert(stat) && stat.val > 0) {
            navigate(path);
        }
    };

    const startSearch = () => {
        setSearchState('searching');
        setTimeout(() => setSearchState('list'), 2000);
    };

    const connectToDevice = (id) => {
        setSelectedDeviceId(id);
        setSearchState('connecting');
        setTimeout(() => {
            setSearchState('success');
            setTimeout(() => {
                setIsConnected(true);
                setSearchState('idle');
            }, 1500);
        }, 1500);
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-2">
                <motion.div
                    animate={searchState === 'searching' ? { scale: [1, 1.1, 1], opacity: [1, 0.5, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-48 h-48 bg-blue-600 rounded-[3rem] flex items-center justify-center text-white shadow-2xl shadow-blue-200"
                >
                    <Bluetooth size={80} />
                </motion.div>
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800">準備好連接了嗎？</h2>
                    <p className="text-slate-400 font-medium max-w-sm">請確保您的腦機設備已開啟並處於配對模式。</p>
                </div>
                <button
                    onClick={startSearch}
                    className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                    立即連接設備
                </button>

                {/* Connection Flow Modal */}
                <AnimatePresence>
                    {searchState !== 'idle' && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="glass-card w-full max-w-sm p-8 space-y-6 text-center"
                            >
                                {searchState === 'searching' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-center">
                                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800">搜尋設備中...</h3>
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Searching for Bluetooth signals</p>
                                    </div>
                                )}

                                {searchState === 'list' && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-slate-800">搜尋到設備</h3>
                                        <div className="space-y-3">
                                            {['BrainFit-X1 (ID: 72A)', 'NeuroLink-V2 (ID: 9B3)', 'SenseLink (ID: 4F1)'].map((name, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => connectToDevice(name)}
                                                    className="w-full p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-2xl font-black transition-all flex justify-between items-center"
                                                >
                                                    {name} <ChevronRight size={18} />
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => setSearchState('idle')} className="text-slate-300 font-black text-xs uppercase tracking-widest hover:text-slate-500">取消</button>
                                    </div>
                                )}

                                {searchState === 'connecting' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-center">
                                            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800">正在連接 {selectedDeviceId}</h3>
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest font-mono">Handshake in progress...</p>
                                    </div>
                                )}

                                {searchState === 'success' && (
                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-100"
                                        >
                                            <ShieldCheck size={48} />
                                        </motion.div>
                                        <h3 className="text-2xl font-black text-slate-800">連接成功</h3>
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Connection established</p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    const posStats = stats.filter(s => s.group === 'pos');
    const negStats = stats.filter(s => s.group === 'neg');

    return (
        <div className="space-y-6 pb-20 max-w-6xl mx-auto px-2 relative">

            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
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
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Dual Radar Charts */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="glass-card p-4 flex flex-col items-center">
                                            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">正向性能指標</h3>
                                            <div className="w-full h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={posStats.map(s => ({ name: s.label, val: s.val }))}>
                                                        <PolarGrid stroke="#e2e8f0" />
                                                        <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                                        <PolarRadiusAxis
                                                            angle={30}
                                                            domain={[0, 100]}
                                                            tick={{ fontSize: 8, fill: '#94a3b8' }}
                                                            axisLine={false}
                                                            tickCount={6}
                                                        />
                                                        <Radar name="Result" dataKey="val" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className="glass-card p-4 flex flex-col items-center">
                                            <h3 className="text-xs font-black text-rose-600 uppercase tracking-widest mb-2">負向壓力指標</h3>
                                            <div className="w-full h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={negStats.map(s => ({ name: s.label, val: s.val }))}>
                                                        <PolarGrid stroke="#e2e8f0" />
                                                        <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                                        <PolarRadiusAxis
                                                            angle={30}
                                                            domain={[0, 100]}
                                                            tick={{ fontSize: 8, fill: '#94a3b8' }}
                                                            axisLine={false}
                                                            tickCount={6}
                                                        />
                                                        <Radar name="Result" dataKey="val" stroke="#FB7185" fill="#FB7185" fillOpacity={0.6} />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Indicator Boxes */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {stats.map((s) => {
                                            const alerted = isAlert(s);
                                            return (
                                                <div
                                                    key={s.id}
                                                    onClick={() => handleIndicatorClick(s)}
                                                    className={`p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer ${alerted ? 'border-rose-100 bg-rose-50/30' : 'border-emerald-100 bg-emerald-50/30'
                                                        }`}
                                                >
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                                    <p className={`text-3xl font-black ${alerted ? 'text-rose-500' : 'text-emerald-500'}`}>{s.val}</p>
                                                    {alerted && (
                                                        <p className="text-[8px] font-bold text-rose-400 mt-1 italic animate-pulse">異常 • 點擊調節</p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="glass-card p-8 bg-blue-50/50 border-2 border-blue-100/50">
                                    <h4 className="flex items-center gap-2 text-xl font-black text-slate-800 mb-4 italic">
                                        <Brain size={24} className="text-blue-600" />
                                        專業解讀分析
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        根據您的深度掃描分析，大腦目前呈現出一種 <span className="text-blue-600 font-bold">非均衡狀態</span>。您的正向性能指標如 <span className="text-emerald-600 font-bold">專注度</span> 維持良好，但負向壓力指標中的
                                        <button onClick={() => navigate('/garden')} className="text-rose-500 font-bold hover:underline mx-1">疲勞值</button> 與
                                        <button onClick={() => navigate('/garden')} className="text-rose-500 font-bold hover:underline mx-1">焦慮感</button>
                                        已越過警戒線。這種「高能耗」模式會加速神經疲勞，建議前往
                                        <button onClick={() => navigate('/garden')} className="text-blue-600 font-bold underline mx-1">伊甸園</button>
                                        進行短暫冥想或聽音樂以調低壓力值。
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="glass-card p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h4 className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">多頻段原始信號</h4>
                        <div className="flex flex-wrap gap-2">
                            {BANDS.map(band => (
                                <button
                                    key={band.id}
                                    onClick={() => setActiveWave(band.id)}
                                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all border-2 ${activeWave === band.id
                                        ? 'text-white border-transparent'
                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                                        }`}
                                    style={{ backgroundColor: activeWave === band.id ? WAVE_COLORS[band.id] : '' }}
                                >
                                    {band.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] w-full border-b border-slate-100">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={rawSignal} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="time"
                                    label={{ value: 'Time (s)', position: 'insideBottom', offset: -10, fontSize: 10, fontWeight: 800 }}
                                    tick={{ fontSize: 9, fill: '#94a3b8' }}
                                />
                                <YAxis
                                    domain={[0, 110]}
                                    label={{ value: 'Amp', angle: -90, position: 'insideLeft', fontSize: 10, fontWeight: 800 }}
                                    tick={{ fontSize: 9, fill: '#94a3b8' }}
                                />
                                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', shadow: 'none', fontWeight: 900, fontSize: '10px' }} />
                                <Line
                                    type="monotone"
                                    dataKey={activeWave}
                                    stroke={WAVE_COLORS[activeWave]}
                                    strokeWidth={3}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <h4 className="px-4 py-1.5 bg-blue-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">EEG Power Distribution</h4>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spectrum}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                                <YAxis hide domain={[0, 100]} />
                                <Bar dataKey="val" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                                    {spectrum.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-6 space-y-6 bg-blue-50/20">
                    <div className="flex items-center justify-between">
                        <h4 className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">指標數值</h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="col-span-2 sm:col-span-1 glass-card p-4 flex flex-col items-center justify-center space-y-4">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                {(() => {
                                    const overallScore = Math.floor(stats.reduce((acc, s) => acc + s.val, 0) / stats.length);
                                    const circumference = 276;
                                    const offset = circumference - (circumference * overallScore) / 100;
                                    return (
                                        <>
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="48" cy="48" r="44" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                                                <circle
                                                    cx="48" cy="48" r="44"
                                                    stroke={overallScore > 0 ? "#0D9488" : "#e2e8f0"}
                                                    strokeWidth="8" fill="transparent"
                                                    strokeDasharray={circumference}
                                                    strokeDashoffset={offset}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-500"
                                                />
                                            </svg>
                                            <span className="absolute text-2xl font-black text-slate-800">{overallScore}</span>
                                        </>
                                    );
                                })()}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center italic mt-2">綜合狀態</span>
                        </div>

                        {stats.map((stat, i) => {
                            const alerted = isAlert(stat);
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleIndicatorClick(stat)}
                                    className={`glass-card p-4 flex flex-col items-center justify-center space-y-2 border-2 transition-all cursor-pointer ${alerted ? 'border-rose-100 hover:bg-rose-50 animate-pulse' : 'border-white hover:bg-emerald-50'
                                        }`}
                                >
                                    <span className={`text-2xl font-black ${alerted ? 'text-rose-500' : 'text-slate-800'}`}>{stat.val}</span>
                                    <span className="text-[10px] font-bold text-slate-400 italic text-center uppercase tracking-widest">{stat.label}</span>
                                    {alerted && <span className="text-[8px] font-black text-rose-400 -mt-1">點擊調節</span>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col items-center justify-center py-8 space-y-6">
                        <div className="flex items-center gap-4 text-slate-800">
                            <Timer size={24} className="text-blue-600" />
                            <span className="text-4xl font-black font-mono">{formatTime(timer)}</span>
                        </div>

                        {!isTesting ? (
                            <button
                                onClick={() => {
                                    setIsTesting(true);
                                    setTimer(1800);
                                    setIsFinished(false);
                                    // Initialize with some base values immediately if starting
                                    setStats(prev => prev.map(s => ({ ...s, val: 30 + Math.floor(Math.random() * 40) })));
                                }}
                                className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
                            >
                                {isFinished || (stats[0].val > 0) ? '重新檢測' : '開始檢測'}
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
