import React from 'react';
import { Music, Calendar, Gamepad, BookOpen, Video, Palette } from 'lucide-react';

const activities = [
    { id: 'music', label: 'Music', icon: Music, color: 'text-pink-500 bg-pink-100' },
    { id: 'games', label: 'Games', icon: Gamepad, color: 'text-purple-500 bg-purple-100' },
    { id: 'audio', label: 'Audiobooks', icon: BookOpen, color: 'text-blue-500 bg-blue-100' },
    { id: 'video', label: 'Videos', icon: Video, color: 'text-red-500 bg-red-100' },
    { id: 'draw', label: 'Drawing', icon: Palette, color: 'text-orange-500 bg-orange-100' },
];

export default function SecretGarden() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="text-3xl">🌸</span>
                Secret Garden
            </h1>

            <div className="grid grid-cols-2 gap-4">
                {activities.map(({ id, label, icon: Icon, color }) => (
                    <button
                        key={id}
                        className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow aspect-square"
                    >
                        <div className={`p-4 rounded-full ${color} mb-3`}>
                            <Icon size={32} />
                        </div>
                        <span className="font-medium text-slate-700">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
