import React from 'react';
import { User, Battery, Signal } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
                    <span className="text-white font-bold text-lg italic">B</span>
                </div>
                <h1 className="text-xl font-black text-slate-800 hidden sm:block tracking-tight">BrainFit</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Device Status Simulation */}
                <div className="flex items-center gap-3 px-4 py-1.5 bg-blue-50 rounded-2xl text-xs text-blue-700 font-bold border border-blue-100/50">
                    <div className="flex items-center gap-1.5">
                        <Signal size={14} className="animate-pulse" />
                        <span>已連接</span>
                    </div>
                    <div className="w-px h-3 bg-blue-200" />
                    <div className="flex items-center gap-1.5">
                        <Battery size={14} />
                        <span>85%</span>
                    </div>
                </div>

                <div className="p-1.5 bg-slate-100 rounded-xl">
                    <User size={20} className="text-slate-600" />
                </div>
            </div>
        </header>
    );
}
