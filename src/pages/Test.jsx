import React from 'react';
import { Bluetooth, Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Test() {
    return (
        <div className="space-y-6 pb-20 px-2">
            <h1 className="text-3xl font-bold text-slate-800">連接腦機</h1>

            <div className="flex flex-col items-center justify-center p-12 bg-blue-50 rounded-3xl min-h-[50vh] text-center border-2 border-dashed border-blue-200">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-24 h-24 bg-blue-600 rounded-full mb-8 flex items-center justify-center text-white shadow-xl shadow-blue-200"
                >
                    <Bluetooth size={48} />
                </motion.div>

                <h2 className="text-2xl font-bold text-blue-900 mb-2">準備好連接設備嗎？</h2>
                <p className="text-blue-600/70 mb-8 max-w-sm">
                    請開啟設備電源並確保藍牙已啟動。連接後即可開始 3 分鐘深度腦波分析。
                </p>

                <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-3">
                    <Activity size={20} />
                    立即連接設備
                </button>
            </div>

            <div className="glass-card p-6 flex items-center gap-4 bg-green-50/50">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">醫療級加密傳輸</h3>
                    <p className="text-xs text-slate-500">您的腦電數據僅儲存在本地，絕不外洩。</p>
                </div>
            </div>
        </div>
    );
}
