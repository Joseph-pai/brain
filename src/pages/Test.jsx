import React from 'react';

export default function Test() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-2xl min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-blue-200 rounded-full mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Ready to Connect?</h2>
            <p className="text-blue-600 mb-8 max-w-sm">
                Connect your brainwave device to start the 3-minute analysis.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors">
                Connect Device
            </button>
        </div>
    );
}
