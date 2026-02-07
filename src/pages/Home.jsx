import React, { useState, useEffect } from 'react';
import { Play, Activity, User, Map, Brain, ShoppingCart, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaveformChart from '../components/WaveformChart';
import { generateWaveformData, BRAINWAVE_TYPES } from '../utils/mockData';
import { motion } from 'framer-motion';

const mainBlocks = [
    { id: 'connect', title: '連接腦機', sub: '設備連接與測試', icon: LinkIcon, path: '/test', color: 'bg-blue-600', text: 'text-white' },
    { id: 'profile', title: '個人信息', sub: '帳戶與個性化設置', icon: User, path: '/profile', color: 'bg-white', text: 'text-slate-800' },
    { id: 'map', title: '心理地圖', sub: '健康趨勢與分析', icon: Map, path: '/map', color: 'bg-white', text: 'text-slate-800' },
    { id: 'garden', title: '秘密花園', sub: '音樂與心理調節', icon: Brain, path: '/garden', color: 'bg-white', text: 'text-slate-800' },
    { id: 'mall', title: '健康方案', sub: '專業方案與商城', icon: ShoppingCart, path: '/mall', color: 'bg-white', text: 'text-slate-800' },
];

export default function Home() {
    const [waveData, setWaveData] = useState(generateWaveformData(30));

    useEffect(() => {
        const interval = setInterval(() => {
            setWaveData(prev => [...prev.slice(1), generateWaveformData(1)[0]]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 pb-20">
            {/* Header / Greetings */}
            <div className="px-2">
                <h1 className="text-3xl font-bold text-slate-900">早安，Joseph</h1>
                <p className="text-slate-500">今天想如何調節您的心情？</p>
            </div>

            {/* Main Navigation Grid - 5 Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Large Connect Block */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sm:col-span-2 relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-xl shadow-blue-200"
                >
                    <Link to="/test" className="flex items-center justify-between relative z-10 w-full">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black">連接腦機</h2>
                            <p className="text-blue-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                點擊開始實時監測
                            </p>
                        </div>
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <LinkIcon size={32} />
                        </div>
                    </Link>
                    <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                </motion.div>

                {/* Sub Blocks */}
                <div className="grid grid-cols-2 sm:col-span-2 gap-4">
                    {mainBlocks.slice(1).map((block) => {
                        const Icon = block.icon;
                        return (
                            <motion.div
                                key={block.id}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`glass-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer aspect-square sm:aspect-auto`}
                            >
                                <Link to={block.path} className="w-full h-full flex flex-col items-center justify-center space-y-3">
                                    <div className={`p-4 rounded-2xl bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                                        <Icon size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-slate-800">{block.title}</h3>
                                        <p className="text-[10px] text-slate-400 hidden sm:block uppercase tracking-widest">{block.sub}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Mini Waveform Preview for Dashboard */}
            <div className="glass-card p-6 mt-8">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 italic">
                        <Activity size={18} className="text-red-500 animate-pulse" />
                        實時腦波狀態預覽
                    </h3>
                    <Link to="/test" className="text-xs text-blue-500 font-bold hover:underline">查看詳情</Link>
                </div>
                <div className="h-[150px]">
                    <WaveformChart data={waveData} />
                </div>
            </div>
        </div>
    );
}
