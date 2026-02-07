export const BRAINWAVE_TYPES = [
    { id: 'delta', label: 'Delta', sub: '深度睡眠 (0.5-4Hz)', color: 'var(--color-wave-delta)' },
    { id: 'theta', label: 'Theta', sub: '深度放鬆 (4-8Hz)', color: 'var(--color-wave-theta)' },
    { id: 'alpha', label: 'Alpha', sub: '放鬆專注 (8-13Hz)', color: 'var(--color-wave-alpha)' },
    { id: 'beta', label: 'Beta', sub: '警覺專注 (13-30Hz)', color: 'var(--color-wave-beta)' },
    { id: 'gamma', label: 'Gamma', sub: '巔峰思考 (>30Hz)', color: 'var(--color-wave-gamma)' },
    { id: 'stress', label: '壓力', sub: '系統負荷', color: 'var(--color-wave-stress)' },
];

export const generateWaveformData = (length = 20) => {
    return Array.from({ length }, (_, i) => ({
        time: i,
        delta: Math.floor(Math.random() * 40 + 10),
        theta: Math.floor(Math.random() * 50 + 20),
        alpha: Math.floor(Math.random() * 60 + 30),
        beta: Math.floor(Math.random() * 70 + 20),
        gamma: Math.floor(Math.random() * 30 + 5),
        stress: Math.floor(Math.random() * 20 + 5),
    }));
};

export const MOCK_REPORT_DATA = {
    score: 88,
    mood: '專注且冷靜',
    summary: '您的腦電波顯示出極佳的 Alpha-Beta 平衡。非常適合進行深度工作或解創意性難題。',
    waves: [
        { name: 'Delta', value: 15, full: 100 },
        { name: 'Theta', value: 45, full: 100 },
        { name: 'Alpha', value: 78, full: 100 },
        { name: 'Beta', value: 82, full: 100 },
        { name: 'Gamma', value: 12, full: 100 },
        { name: '壓力', value: 25, full: 100 },
    ]
};
