import React, { useState, useEffect } from 'react';
import { Play, Activity, Zap, Brain, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaveformChart from '../components/WaveformChart';
import { generateWaveformData, BRAINWAVE_TYPES } from '../utils/mockData';
import { motion } from 'framer-motion';

export default function Home() {
    const [waveData, setWaveData] = useState(generateWaveformData(30));

    useEffect(() => {
        const interval = setInterval(() => {
            setWaveData(prev => [...prev.slice(1), generateWaveformData(1)[0]]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 pb-8">
            {/* Hero Section - Vibrant & Professional */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Hello, Joseph</h2>
                    <p className="opacity-90 mb-8 max-w-xs text-lg">Your cognitive state is currently at peak focus. Ready to maintain it?</p>

                    <Link to="/test" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                        <Play size={20} className="mr-3 fill-current transition-transform group-hover:rotate-12" />
                        Start Deep Analysis
                    </Link>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[10%] w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
            </motion.div>

            {/* Real-time Preview Section */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Activity className="text-blue-500 wave-pulse" size={20} />
                            Live Brainwave Activity
                        </h3>
                        <p className="text-sm text-slate-500">Real-time mock feed (Alpha & Beta dominant)</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full animate-pulse">
                        CONNECTED
                    </span>
                </div>

                <WaveformChart data={waveData} />

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-6">
                    {BRAINWAVE_TYPES.map(wave => (
                        <div key={wave.id} className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: wave.color }} />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{wave.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-6 border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-slate-500 text-sm font-medium">Cognitive Score</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">92%</div>
                    <div className="text-xs text-green-600 font-bold mt-1">Excellent Balance</div>
                </div>

                <div className="glass-card p-6 border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Zap size={20} />
                        </div>
                        <span className="text-slate-500 text-sm font-medium">Focus Index</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">8.4</div>
                    <div className="text-xs text-blue-600 font-bold mt-1">High Beta Activity</div>
                </div>

                <div className="glass-card p-6 border-l-4 border-l-purple-500">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Brain size={20} />
                        </div>
                        <span className="text-slate-500 text-sm font-medium">Mood State</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">Flow</div>
                    <div className="text-xs text-purple-600 font-bold mt-1">Low Stress Levels</div>
                </div>
            </div>
        </div>
    );
}
