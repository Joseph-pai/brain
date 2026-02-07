import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Brain-Computer Interface</h1>
        <p className="text-slate-600 mb-6">Simulation App Initialized</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-sm text-blue-500 font-medium">Status</div>
            <div className="text-lg font-bold text-blue-700">Ready</div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="text-sm text-green-500 font-medium">Netlify</div>
            <div className="text-lg font-bold text-green-700">Configured</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
