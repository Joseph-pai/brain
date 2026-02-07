import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BRAINWAVE_TYPES } from '../utils/mockData';

export default function WaveformChart({ data, showAll = true, activeWave = null }) {
    const visibleWaves = activeWave
        ? BRAINWAVE_TYPES.filter(w => w.id === activeWave)
        : BRAINWAVE_TYPES;

    return (
        <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        {BRAINWAVE_TYPES.map(wave => (
                            <linearGradient key={wave.id} id={`grad-${wave.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={wave.color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={wave.color} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    {visibleWaves.map(wave => (
                        <Area
                            key={wave.id}
                            type="monotone"
                            dataKey={wave.id}
                            stroke={wave.color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#grad-${wave.id})`}
                            animationDuration={1500}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
