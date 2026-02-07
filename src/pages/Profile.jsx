import React from 'react';
import { User, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-3xl font-bold text-slate-800 px-2">個人信息</h1>

            <div className="glass-card p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <User size={48} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Joseph</h2>
                <p className="text-slate-500 text-sm italic">高級腦機接口用戶</p>

                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors">
                    編輯資料
                </button>
            </div>

            <div className="glass-card divide-y divide-slate-100">
                {[
                    { icon: Settings, label: '系統設置', color: 'text-slate-600' },
                    { icon: Bell, label: '通知提醒', color: 'text-indigo-600' },
                    { icon: Shield, label: '隱私與安全', color: 'text-green-600' },
                    { icon: LogOut, label: '登出帳號', color: 'text-red-600' },
                ].map((item, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                                <item.icon size={20} />
                            </div>
                            <span className="font-bold text-slate-700">{item.label}</span>
                        </div>
                        <span className="text-slate-300">❯</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
