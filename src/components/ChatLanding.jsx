import React from 'react';

export default function ChatLanding({ onOpenNewChat }) {
  return (
    <div className="hidden md:flex flex-grow bg-white flex-col items-center justify-center p-8 h-full">
      <div className="text-center max-w-sm">
        <div className="relative w-44 h-44 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute text-blue-100 opacity-80 animate-[spin_60s_linear_infinite]">
            <i className="fa-solid fa-gear text-[140px]"></i>
          </div>
          <i className="fa-solid fa-comments text-4xl text-slate-700 z-10"></i>
        </div>
        {/* Clickable redirect action link bound to state */}
        <p className="text-xs font-semibold text-black tracking-wide">
          Select a conversation or start a 
          <button 
            onClick={onOpenNewChat}
            className="text-blue-500 hover:underline cursor-pointer ml-1 font-bold focus:outline-none"
          >
            new one
          </button>
        </p>
      </div>
    </div>
  );
}