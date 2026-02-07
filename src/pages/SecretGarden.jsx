import React, { useState, useRef, useEffect } from 'react';
import { Music, Gamepad, MessageSquare, Video, Play, Pause, SkipForward, SkipBack, Plus, Trash2, CheckCircle2, XCircle, ChevronLeft, Volume2, Search, Palmtree, Headphones, Rocket, Mic2, Clapperboard, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EDEN_THEMES = [
    { id: 'music', title: '音樂調節', sub: '腦波同步音療', icon: Headphones, color: 'from-blue-500 to-indigo-600' },
    { id: 'game', title: '遊戲樂園', sub: '意念訓練挑戰', icon: Rocket, color: 'from-purple-500 to-pink-600' },
    { id: 'whisper', title: '輕聲細語', sub: '深度沈浸助眠', icon: Mic2, color: 'from-emerald-500 to-teal-600' },
    { id: 'cinema', title: '情境影院', sub: '全景感官放鬆', icon: Clapperboard, color: 'from-amber-500 to-orange-600' },
];

const INITIAL_MUSIC = [
    { id: 1, name: '深海冥想曲', sub: 'Alpha 波同步 • 12:05', url: '#' },
    { id: 2, name: '阿爾法波森林', sub: 'Beta 波平衡 • 08:30', url: '#' },
    { id: 3, name: '陽光午後', sub: 'Gamma 波激發 • 05:45', url: '#' },
    { id: 4, name: '雨後清晨', sub: 'Theta 波誘導 • 15:20', url: '#' },
];

export default function SecretGarden() {
    const [activeTheme, setActiveTheme] = useState(null);
    const [musicList, setMusicList] = useState(INITIAL_MUSIC);
    const [selectedMusic, setSelectedMusic] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [bgColor, setBgColor] = useState('from-slate-50 to-slate-100');

    // Dynamic background color effect during playback
    useEffect(() => {
        let interval;
        if (isPlaying) {
            const colors = [
                'from-blue-100 to-purple-100',
                'from-emerald-100 to-teal-100',
                'from-pink-100 to-rose-100',
                'from-indigo-100 to-cyan-100'
            ];
            let i = 0;
            interval = setInterval(() => {
                setBgColor(colors[i % colors.length]);
                i++;
            }, 3000);
        } else {
            setBgColor('from-slate-50 to-slate-100');
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleAddMusic = () => {
        // Simulating folder selection/file adding
        const newSong = {
            id: Date.now(),
            name: `自定義音樂 ${musicList.length + 1}`,
            sub: '本機文件 • 04:20',
            url: '#'
        };
        setMusicList([...musicList, newSong]);
    };

    const toggleSelect = (id) => {
        if (selectedMusic.includes(id)) {
            setSelectedMusic(selectedMusic.filter(ms => ms !== id));
        } else {
            setSelectedMusic([...selectedMusic, id]);
        }
    };

    const deleteSelected = () => {
        setMusicList(musicList.filter(m => !selectedMusic.includes(m.id)));
        setSelectedMusic([]);
        setIsSelecting(false);
        if (currentTrack && selectedMusic.includes(currentTrack.id)) {
            setCurrentTrack(null);
            setIsPlaying(false);
        }
    };

    const playTrack = (track) => {
        if (isSelecting) {
            toggleSelect(track.id);
            return;
        }
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const renderPortal = () => (
        <div className="space-y-12">
            <div className="flex items-center gap-6 px-4">
                <div className="p-4 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-[2rem] shadow-xl shadow-emerald-100 italic transform -rotate-6">
                    <Palmtree size={40} />
                </div>
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">伊甸園</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Psychological Regulation Hub</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
                {EDEN_THEMES.map((theme) => (
                    <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTheme(theme.id)}
                        className="group relative overflow-hidden glass-card p-12 flex flex-col items-center gap-8 text-center border-2 border-transparent hover:border-emerald-100 transition-all shadow-2xl shadow-slate-200/50"
                    >
                        <div className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${theme.color} text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                            <theme.icon size={48} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-slate-800">{theme.title}</h3>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{theme.sub}</p>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/20 -skew-x-12 translate-x-12 group-hover:bg-emerald-50/10 transition-colors" />
                    </motion.button>
                ))}
            </div>
        </div>
    );

    const renderMusicModule = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 relative z-10 transition-colors duration-1000">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => setActiveTheme(null)}
                    className="p-3 bg-white shadow-xl shadow-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                    <Headphones size={28} className="text-blue-600" />
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">音樂調節</h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => { setIsSelecting(!isSelecting); setSelectedMusic([]); }}
                        className={`p-3 rounded-2xl transition-all ${isSelecting ? 'bg-orange-500 text-white shadow-orange-100' : 'bg-white shadow-xl shadow-slate-200 text-slate-400 hover:text-orange-600'}`}
                    >
                        {isSelecting ? <X size={20} /> : <Trash2 size={20} />}
                    </button>
                    <button
                        onClick={handleAddMusic}
                        className="p-3 bg-emerald-600 text-white shadow-xl shadow-emerald-100 rounded-2xl hover:bg-emerald-700 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {isSelecting && selectedMusic.length > 0 && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-orange-500 text-white p-4 rounded-3xl flex justify-between items-center shadow-xl shadow-orange-100"
                >
                    <span className="font-black italic ml-4">已選擇 {selectedMusic.length} 首音樂</span>
                    <button
                        onClick={deleteSelected}
                        className="bg-white text-orange-500 px-6 py-2 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-50 transition-colors"
                    >
                        確認刪除
                    </button>
                </motion.div>
            )}

            <div className="space-y-4">
                {musicList.map((track) => (
                    <motion.div
                        key={track.id}
                        layout
                        onClick={() => playTrack(track)}
                        className={`glass-card p-6 flex items-center justify-between group cursor-pointer transition-all border-2 ${currentTrack?.id === track.id ? 'border-emerald-200 bg-emerald-50/30' :
                                selectedMusic.includes(track.id) ? 'border-orange-200 bg-orange-50/30' : 'border-transparent hover:border-blue-100'
                            }`}
                    >
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${currentTrack?.id === track.id ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white'
                                    }`}>
                                    {currentTrack?.id === track.id && isPlaying ? (
                                        <div className="flex gap-1 items-end h-6">
                                            {[1, 2, 3].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [8, 20, 10, 24, 12, 18, 8] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                    className="w-1 bg-white rounded-full"
                                                />
                                            ))}
                                        </div>
                                    ) : <Play size={24} fill={currentTrack?.id === track.id ? 'currentColor' : 'none'} />}
                                </div>
                                {isSelecting && (
                                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${selectedMusic.includes(track.id) ? 'bg-orange-500 border-white text-white' : 'bg-white border-slate-200 text-slate-200'
                                        }`}>
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className={`font-black text-lg ${currentTrack?.id === track.id ? 'text-emerald-700' : 'text-slate-800'}`}>{track.name}</h4>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{track.sub}</p>
                            </div>
                        </div>
                        <Volume2 size={24} className={currentTrack?.id === track.id ? 'text-emerald-600' : 'text-slate-200 group-hover:text-blue-600'} />
                    </motion.div>
                ))}
            </div>

            {/* Sticky Player Bar */}
            <AnimatePresence>
                {currentTrack && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-24 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 flex items-center gap-6 z-[110]"
                    >
                        <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-spin-slow">
                            <Music size={32} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-black text-slate-800 truncate">{currentTrack.name}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">正在播放...</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-slate-300 hover:text-slate-600"><SkipBack size={24} /></button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                            >
                                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                            </button>
                            <button className="text-slate-300 hover:text-slate-600"><SkipForward size={24} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className={`min-h-screen bg-gradient-to-br ${bgColor} transition-colors duration-[3000ms] pb-32 max-w-6xl mx-auto px-2 pt-6`}>
            {!activeTheme && renderPortal()}
            {activeTheme === 'music' && renderMusicModule()}
            {activeTheme && activeTheme !== 'music' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-6 mb-12">
                        <button onClick={() => setActiveTheme(null)} className="p-3 bg-white shadow-xl shadow-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="text-3xl font-black text-slate-800 italic">
                            {EDEN_THEMES.find(t => t.id === activeTheme).title}
                        </h2>
                    </div>
                    <div className="h-96 flex flex-col items-center justify-center text-slate-300 italic font-bold text-xl glass-card">
                        模塊開發中...
                    </div>
                </div>
            )}

            <footer className="text-center py-12">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Eden Garden Intelligence Hub</p>
            </footer>
        </div>
    );
}
