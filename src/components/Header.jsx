import React from 'react';
import { User, Battery, Signal } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                </div>
                <h1 className="text-xl font-bold text-slate-800 hidden sm:block">BrainFit</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Device Status Simulation */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-sm text-blue-700">
                    <Signal size={16} />
                    <span className="font-medium">Connected</span>
                    <Battery size={16} className="ml-1" />
                    <span className="font-medium">85%</span>
                </div>

                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <User size={24} className="text-slate-600" />
                </button>
            </div>
        </header>
    );
}
