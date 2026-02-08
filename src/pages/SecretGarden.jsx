import React, { useState, useRef, useEffect } from 'react';
import { Music, Gamepad, MessageSquare, Video, Play, Pause, SkipForward, SkipBack, Plus, Trash2, CheckCircle2, XCircle, ChevronLeft, Volume2, Search, Palmtree, Headphones, Rocket, Mic2, Clapperboard, Check, X, Upload, Edit2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

const EDEN_THEMES = [
    { id: 'music', title: '音樂調節', sub: '腦波同步音療', icon: Headphones, color: 'from-blue-500 to-indigo-600' },
    { id: 'game', title: '遊戲樂園', sub: '意念訓練挑戰', icon: Rocket, color: 'from-purple-500 to-pink-600' },
    { id: 'whisper', title: '輕聲細語', sub: '深度沈浸助眠', icon: Mic2, color: 'from-emerald-500 to-teal-600' },
    { id: 'cinema', title: '情境影院', sub: '全景感官放鬆', icon: Clapperboard, color: 'from-amber-500 to-orange-600' },
];

export default function SecretGarden() {
    const [activeTheme, setActiveTheme] = useState(null);
    // Stores file lists for each theme independently
    const [moduleData, setModuleData] = useState({
        music: [],
        game: [],
        whisper: [],
        cinema: []
    });
    
    // UI Local States
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentMedia, setCurrentMedia] = useState(null); // Track currently "playing" media globally
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [bgIndex, setBgIndex] = useState(0);
    const [editingItem, setEditingItem] = useState(null);
    const [editName, setEditName] = useState('');

    const audioRef = useRef(null);
    const fileInputRef = useRef(null);

    const colors = [
        'bg-blue-400/20', 'bg-emerald-400/20', 'bg-purple-400/20', 'bg-amber-400/20', 'bg-rose-400/20'
    ];

    // Dynamic background color effect during playback
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setBgIndex((prev) => (prev + 1) % colors.length);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Media Sync (Assuming audio/video playback logic)
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying && currentMedia) {
            audioRef.current.play().catch(e => console.log("Playback failed:", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentMedia]);

    // Memory Cleanup
    useEffect(() => {
        return () => {
            Object.values(moduleData).flat().forEach(item => {
                if (item && item.url && item.url.startsWith('blob:')) {
                    URL.revokeObjectURL(item.url);
                }
            });
        };
    }, []);

    const getCurrentList = () => moduleData[activeTheme] || [];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newItems = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name.replace(/\.[^/.]+$/, ""),
            sub: `本地文件 • ${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            url: URL.createObjectURL(file),
            type: file.type
        }));
        
        setModuleData(prev => ({
            ...prev,
            [activeTheme]: [...prev[activeTheme], ...newItems]
        }));

        if (!currentMedia && newItems.length > 0) {
            setCurrentMedia(newItems[0]);
            setIsPlaying(true);
        }
        e.target.value = null;
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const deleteSelected = () => {
        const list = getCurrentList();
        const itemsToDelete = list.filter(m => selectedIds.includes(m.id));
        itemsToDelete.forEach(item => {
            if (item.url.startsWith('blob:')) URL.revokeObjectURL(item.url);
        });

        setModuleData(prev => ({
            ...prev,
            [activeTheme]: list.filter(m => !selectedIds.includes(m.id))
        }));
        
        setSelectedIds([]);
        setIsSelecting(false);
        if (currentMedia && selectedIds.includes(currentMedia.id)) {
            setCurrentMedia(null);
            setIsPlaying(false);
        }
    };

    const handleItemClick = (item) => {
        if (isSelecting) {
            toggleSelect(item.id);
            return;
        }
        if (currentMedia?.id === item.id) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentMedia(item);
            setIsPlaying(true);
        }
    };

    const saveName = () => {
        if (!editingItem) return;
        setModuleData(prev => ({
            ...prev,
            [activeTheme]: prev[activeTheme].map(t => t.id === editingItem.id ? { ...t, name: editName } : t)
        }));
        if (currentMedia?.id === editingItem.id) {
            setCurrentMedia(prev => ({ ...prev, name: editName }));
        }
        setEditingItem(null);
    };

    const updateReorder = (newList) => {
        setModuleData(prev => ({
            ...prev,
            [activeTheme]: newList
        }));
    };

    const renderPortal = () => (
        <div className="space-y-12">
            <div className="flex items-center gap-6 px-4">
                <div className="p-4 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-[2rem] shadow-xl shadow-emerald-100 italic transform -rotate-6">
                    <Palmtree size={40} />
                </div>
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">伊甸心園</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Psychological Regulation Hub</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
                {EDEN_THEMES.map((theme) => (
                    <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setActiveTheme(theme.id);
                            setSelectedIds([]);
                            setIsSelecting(false);
                        }}
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

    const renderMediaModule = () => {
        const theme = EDEN_THEMES.find(t => t.id === activeTheme);
        const list = getCurrentList();
        
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 relative z-10 transition-colors duration-1000">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept={activeTheme === 'cinema' ? 'video/*,image/*' : 'audio/*'}
                    multiple
                />
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setActiveTheme(null)}
                        className="p-3 bg-white shadow-xl shadow-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <theme.icon size={28} className="text-blue-600" />
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{theme.title}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setIsSelecting(!isSelecting); setSelectedIds([]); }}
                            className={`p-3 rounded-2xl transition-all ${isSelecting ? 'bg-orange-500 text-white shadow-orange-100' : 'bg-white shadow-xl shadow-slate-200 text-slate-400 hover:text-orange-600'}`}
                        >
                            {isSelecting ? <X size={20} /> : <Trash2 size={20} />}
                        </button>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 bg-emerald-600 text-white shadow-xl shadow-emerald-100 rounded-2xl hover:bg-emerald-700 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                {isSelecting && selectedIds.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-orange-500 text-white p-4 rounded-3xl flex justify-between items-center shadow-xl shadow-orange-100"
                    >
                        <span className="font-black italic ml-4">已選擇 {selectedIds.length} 個文件</span>
                        <button
                            onClick={deleteSelected}
                            className="bg-white text-orange-500 px-6 py-2 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-50 transition-colors"
                        >
                            確認刪除
                        </button>
                    </motion.div>
                )}

                <Reorder.Group axis="y" values={list} onReorder={updateReorder} className="space-y-4">
                    {list.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center glass-card border-dashed border-2 border-slate-200 text-slate-300 gap-4">
                            <theme.icon size={48} className="opacity-20" />
                            <p className="font-black italic text-center px-4">點擊右上方 “+” 添加本地{theme.title}內容</p>
                        </div>
                    )}
                    {list.map((item) => (
                        <Reorder.Item key={item.id} value={item} className="relative">
                            <motion.div
                                layout
                                onClick={() => handleItemClick(item)}
                                className={`glass-card p-6 flex items-center justify-between group cursor-pointer transition-all border-2 ${currentMedia?.id === item.id ? 'border-emerald-200 bg-emerald-50/30' :
                                    selectedIds.includes(item.id) ? 'border-orange-200 bg-orange-50/30' : 'border-transparent hover:border-blue-100'
                                    }`}
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="cursor-grab active:cursor-grabbing p-1 text-slate-300 hover:text-slate-500 transition-colors">
                                        <GripVertical size={20} />
                                    </div>
                                    <div className="relative">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${currentMedia?.id === item.id ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white'
                                            }`}>
                                            {currentMedia?.id === item.id && isPlaying ? (
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
                                            ) : <Play size={24} fill={currentMedia?.id === item.id ? 'currentColor' : 'none'} />}
                                        </div>
                                        {isSelecting && (
                                            <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${selectedIds.includes(item.id) ? 'bg-orange-500 border-white text-white' : 'bg-white border-slate-200 text-slate-200'
                                                }`}>
                                                <Check size={14} strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-black text-lg ${currentMedia?.id === item.id ? 'text-emerald-700' : 'text-slate-800'} truncate max-w-[200px]`}>{item.name}</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate">{item.sub}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setEditingItem(item); setEditName(item.name); }}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <Volume2 size={24} className={currentMedia?.id === item.id ? 'text-emerald-600' : 'text-slate-200 group-hover:text-blue-600'} />
                                </div>
                            </motion.div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                {/* Sticky Player Bar */}
                <AnimatePresence>
                    {currentMedia && (
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            className="fixed bottom-24 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 flex items-center gap-6 z-[110]"
                        >
                            <audio
                                ref={audioRef}
                                src={currentMedia.url}
                                onEnded={() => setIsPlaying(false)}
                            />
                            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-spin-slow">
                                <theme.icon size={32} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-slate-800 truncate">{currentMedia.name}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {isPlaying ? '正在同步播放...' : '已暫停'}
                                </p>
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
    };

    return (
        <div className="min-h-screen relative overflow-hidden pb-32 max-w-6xl mx-auto px-2 pt-6">
            {/* Real Dynamic Background System */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <AnimatePresence>
                    {isPlaying && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: [1, 1.2, 1], x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className={`absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[100px] ${colors[bgIndex]}`}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: [1.2, 1, 1.2], x: [0, -70, 70, 0], y: [0, 50, -50, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className={`absolute -bottom-20 -right-20 w-[30rem] h-[30rem] rounded-full blur-[120px] ${colors[(bgIndex + 1) % colors.length]}`}
                            />
                        </>
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl" />
            </div>

            <div className="relative z-10">
                {!activeTheme ? renderPortal() : renderMediaModule()}
            </div>

            <footer className="relative z-10 text-center py-12">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Eden heart Intelligence Hub</p>
            </footer>

            {/* Editing Modal */}
            <AnimatePresence>
                {editingItem && (
                    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card w-full max-w-sm p-8 space-y-6"
                        >
                            <h3 className="text-2xl font-black text-slate-800">修改名稱</h3>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none font-bold transition-all"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                            />
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setEditingItem(null)}
                                    className="flex-1 p-4 bg-slate-100 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={saveName}
                                    className="flex-1 p-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-colors"
                                >
                                    保存
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
