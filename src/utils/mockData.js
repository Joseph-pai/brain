export const BRAINWAVE_TYPES = [
    { id: 'delta', label: 'Delta', sub: 'Sleep (0.5-4Hz)', color: 'var(--color-wave-delta)' },
    { id: 'theta', label: 'Theta', sub: 'Deep Relax (4-8Hz)', color: 'var(--color-wave-theta)' },
    { id: 'alpha', label: 'Alpha', sub: 'Relaxed (8-13Hz)', color: 'var(--color-wave-alpha)' },
    { id: 'beta', label: 'Beta', sub: 'Focus (13-30Hz)', color: 'var(--color-wave-beta)' },
    { id: 'gamma', label: 'Gamma', sub: 'Peak Insight (>30Hz)', color: 'var(--color-wave-gamma)' },
    { id: 'stress', label: 'Stress', sub: 'System Load', color: 'var(--color-wave-stress)' },
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
    mood: 'Focused & Calm',
    summary: 'Your brain shows excellent alpha-beta balance. Ideal for deep work or creative problem solving.',
    waves: [
        { name: 'Delta', value: 15, full: 100 },
        { name: 'Theta', value: 45, full: 100 },
        { name: 'Alpha', value: 78, full: 100 },
        { name: 'Beta', value: 82, full: 100 },
        { name: 'Gamma', value: 12, full: 100 },
        { name: 'Stress', value: 25, full: 100 },
    ]
};
