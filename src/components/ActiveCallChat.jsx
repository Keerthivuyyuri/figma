
import React, { useState, useEffect } from 'react';

export default function ActiveCallChat({ activeCall, onBack }) {
  const [seconds, setSeconds] = useState(0);

  // Active call session length ticker tracker logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (totalSecs) => {
    const minutes = Math.floor(totalSecs / 60);
    const remainderSecs = totalSecs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  // ===================================================================
  // LAYOUT CONDITION A: VIDEO CALL STREAM MODULE (Screenshot (54).jpg)
  // ===================================================================
  if (activeCall?.type === 'video') {
    return (
      <div className="w-full relative aspect-[4/3] sm:aspect-[16/10] bg-[#1a1b1e] rounded-[24px] overflow-hidden shadow-xl select-none group">
        
        {/* Remote Participant Primary High-Definition stream feed camera view */}
        <img 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800" 
          alt="Remote User Feed stream" 
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Picture-in-Picture Local Self Camera Preview Frame Layer */}
        <div className="absolute top-4 right-4 w-28 h-20 sm:w-36 sm:h-24 bg-slate-900 rounded-2xl overflow-hidden border-2 border-white/95 shadow-2xl z-10 transition-transform duration-200 hover:scale-105">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" 
            alt="Self Track Feed stream" 
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Lower Central Control Actions Management Dock Overlay */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          {/* Running session duration label timer display track code */}
          <span className="text-[10px] font-bold text-white/80 drop-shadow-sm bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-[2px] mb-1">
            {formatDuration(seconds)}
          </span>
          
          <button 
            onClick={onBack}
            type="button" 
            className="w-12 h-12 bg-red-500 hover:bg-red-600 active:scale-95 text-white flex items-center justify-center rounded-full shadow-lg border border-red-400/50 transition-all duration-150 focus:outline-none"
            title="Disconnect Video Stream"
          >
            <i className="fa-solid fa-phone text-sm rotate-[135deg]"></i>
          </button>
        </div>

      </div>
    );
  }

  // ===================================================================
  // LAYOUT CONDITION B: AUDIO CALL CONNECTION CARD (Screenshot (52).jpg)
  // ===================================================================
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white font-sans">
      
      {/* Participant profile avatars mesh grid layout column row tracking frame */}
      <div className="flex items-center justify-center gap-8 md:gap-10 mb-6">
        
        {/* Left Caller Component Profile: Camel Node */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[84px] h-[84px] rounded-full p-0.5 bg-white shadow-inner border border-gray-100 flex items-center justify-center relative">
            <img 
              src={activeCall?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
              className="w-full h-full rounded-full object-cover" 
              alt="Remote participant track" 
            />
          </div>
          <span className="text-[11px] font-bold text-gray-500 tracking-wide">
            {activeCall?.name || "Camel"}
          </span>
        </div>

        {/* Right Caller Component Profile: Horse Node / Self Mock */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[84px] h-[84px] rounded-full p-0.5 bg-white shadow-inner border border-gray-100 flex items-center justify-center relative">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
              className="w-full h-full rounded-full object-cover" 
              alt="Self baseline target track" 
            />
          </div>
          <span className="text-[11px] font-bold text-gray-500 tracking-wide">Horse</span>
        </div>

      </div>

      {/* Media session connectivity and running clock metrics layer */}
      <div className="text-center space-y-1 mb-6 select-none">
        <p className="text-[11px] font-black text-green-500 uppercase tracking-widest">Connected</p>
        <h4 className="text-[18px] font-black text-gray-800 tracking-wider">
          {formatDuration(seconds)}
        </h4>
      </div>

      {/* Disconnect Action Management Element */}
      <div className="w-full flex justify-center">
        <button 
          onClick={onBack}
          type="button" 
          className="px-5 py-1.5 rounded-lg bg-white hover:bg-red-50 border border-red-200 text-red-500 text-[11px] font-extrabold tracking-wide transition-colors focus:outline-none active:scale-95 shadow-sm"
        >
          Hang Up
        </button>
      </div>

    </div>
  );
}
