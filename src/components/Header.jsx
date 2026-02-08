import React from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Battery, Signal, Zap } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                    <Zap size={20} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-xl font-black italic viange-gradient-text">VIANGE</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">BCI Intelligence</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 font-bold">
                        <Signal size={14} />
                        <span className="text-[10px] uppercase">Stable</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-2 text-slate-400 font-bold">
                        <Battery size={14} />
                        <span className="text-[10px] uppercase">85%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-green-500 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Connect</span>
                </div>
            </div>
        </header>
    );
}
