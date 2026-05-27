import React from 'react';

// Accept a 'status' prop ('connecting' | 'connected') to switch views easily
export default function AudioCallPanel({ status = 'connecting', onClose }) {
  return (
    <div className="w-full bg-white border border-gray-150 rounded-2xl shadow-md p-6 mb-4 flex flex-col items-center justify-center relative animate-[fadeIn_0.2s_ease-out]">
      
      {/* Participant Profiles & Waveform Link Layout Row */}
      <div className="flex items-center justify-center gap-4 md:gap-8 my-4 w-full max-w-sm">
        
        {/* Profile 1: Camel */}
        <div className="flex flex-col items-center text-center shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-1 bg-slate-50 border border-gray-200 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
              alt="Camel" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-xs font-bold text-gray-700 mt-3">Camel</span>
        </div>

        {/* Dynamic Waveform Section */}
        <div className="flex-grow flex items-center justify-center h-10 px-2 min-w-[60px]">
          {status === 'connecting' ? (
            /* Figma Call Waves Simulation SVG with built-in pulsing animation */
            <svg className="w-full h-full text-blue-400 opacity-70" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                className="animate-[pulse_1.5s_infinite_ease-in-out]"
                d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                fill="none" 
              />
              <path 
                className="animate-[pulse_1.5s_infinite_ease-in-out_0.3s]"
                d="M0 10 Q 12.5 20, 25 10 T 50 10 T 75 10 T 100 10" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeDasharray="2 2"
                strokeLinecap="round"
                fill="none" 
              />
            </svg>
          ) : (
            /* Simple Connected Divider Link */
            <div className="w-full h-[2px] bg-gray-100 rounded-full"></div>
          )}
        </div>

        {/* Profile 2: Horse */}
        <div className="flex flex-col items-center text-center shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-1 bg-slate-50 border border-gray-200 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" 
              alt="Horse" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-xs font-bold text-gray-700 mt-3">Horse</span>
        </div>

      </div>

      {/* Dynamic Status Display Box */}
      <div className="text-center h-10 flex items-center justify-center mt-2">
        {status === 'connecting' ? (
          <p className="text-sm font-black text-gray-800 tracking-wide animate-pulse">
            Connecting...
          </p>
        ) : (
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-green-500 tracking-wide">Connected</p>
            <p className="text-sm font-bold text-gray-800 tracking-wider">12 : 32</p>
          </div>
        )}
      </div>

      {/* Action Button Controls */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-50 hover:bg-red-100 text-red-500 border border-red-150 px-6 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all active:scale-95 focus:outline-none"
        >
          Hang Up
        </button>
      </div>

    </div>
  );
}