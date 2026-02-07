import React, { useState, useEffect } from 'react';
import { Bluetooth, Activity, ShieldCheck, Timer, Zap, Brain, Sliders, Battery, Signal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';
import { generateWaveformData } from '../utils/mockData';

const generateRawSignal = (length = 100) => {
    return Array.from({ length }, (_, i) => ({
        time: i,
        val: Math.sin(i * 0.2) * 0.005 + (Math.random() - 0.5) * 0.003
    }));
};

const generateSpectrum = () => {
    return [
        { name: 'Theta', val: Math.random() * 50 },
        { name: 'L-Alpha', val: Math.random() * 40 },
        { name: 'H-Alpha', val: Math.random() * 60 },
        { name: 'L-Beta', val: Math.random() * 30 },
        { name: 'H-Beta', val: Math.random() * 20 },
        { name: 'L-Gamma', val: Math.random() * 10 },
    ];
};

export default function Test() {
    const [isConnected, setIsConnected] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [rawSignal, setRawSignal] = useState(generateRawSignal());
    const [spectrum, setSpectrum] = useState(generateSpectrum());
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (isTesting) {
            interval = setInterval(() => {
                setRawSignal(prev => [...prev.slice(2), ...generateRawSignal(2)]);
                setSpectrum(generateSpectrum());
                setTimer(t => t + 1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isTesting]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 600);
        const secs = Math.floor((s % 600) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        <div className="space-y-6 pb-20 max-w-6xl mx-auto px-2">
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
                                        <motion.rect key={index} fill={['#F87171', '#FB923C', '#FCD34D', '#4ADE80', '#60A5FA', '#A78BFA'][index % 6]} />
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
                        {[
                            { label: '放鬆度', val: 56 },
                            { label: '專注度', val: 69 },
                            { label: '疲勞度', val: 37 },
                            { label: '壓力指數', val: 48 },
                            { label: '焦慮指數', val: 38 },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-4 flex flex-col items-center justify-center space-y-2 border-2 border-white">
                                <span className="text-2xl font-black text-slate-800">{stat.val}</span>
                                <span className="text-[10px] font-bold text-slate-400 italic text-center uppercase tracking-widest">{stat.label}</span>
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
                                onClick={() => setIsTesting(true)}
                                className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
                            >
                                開始檢測
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
