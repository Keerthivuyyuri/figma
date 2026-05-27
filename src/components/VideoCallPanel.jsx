import React from 'react';

export default function VideoCallPanel({ onClose }) {
  return (
    <div className="w-full bg-white border border-gray-150 rounded-2xl shadow-md overflow-hidden mb-4 p-2 flex flex-col items-center justify-center relative animate-[fadeIn_0.2s_ease-out]">
      
      {/* Primary Video Feed Stream Frame */}
      <div className="w-full relative aspect-[16/10] md:aspect-[16/9] bg-slate-900 rounded-xl overflow-hidden shadow-inner group">
        
        {/* Remote Participant Camera Stream Mock (Pink Panda / User view) */}
        <img 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800" 
          alt="Remote Video Feed" 
          className="w-full h-full object-cover"
        />

        {/* Floating Picture-in-Picture (PiP) Window (Self Camera Feed) */}
        <div className="absolute top-3 right-3 w-24 h-16 sm:w-32 sm:h-22 md:w-36 md:h-24 bg-slate-800 rounded-lg overflow-hidden border-2 border-white shadow-lg transition-transform duration-300 hover:scale-105">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" 
            alt="Local Self Video Feed" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Controls Overlay - Lower Center HUD HUD Panel */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-10 sm:w-14 sm:h-11 bg-red-500 hover:bg-red-600 active:scale-95 text-white flex items-center justify-center rounded-2xl shadow-lg transition-all border border-red-400 focus:outline-none"
            title="End Video Call"
          >
            {/* Horizontal telephone receiver icon mimicking Figma button shape */}
            <i className="fa-solid fa-phone-flip text-sm rotate-[135deg]"></i>
          </button>
        </div>

      </div>
      
    </div>
  );
}