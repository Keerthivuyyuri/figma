import React from 'react';

export default function Sidebar({ currentView, setView }) {
  // Removed 'profile' from the array loop to isolate the parrot branding element
  const menus = [
    { id: 'chats', icon: 'fa-regular fa-comment-dots' },
    { id: 'groups', icon: 'fa-solid fa-users' },
    { id: 'calls', icon: 'fa-solid fa-phone' },
    { id: 'settings', icon: 'fa-solid fa-gear' }
  ];

  return (
    <div className="w-full md:w-[75px] h-[60px] md:h-full bg-[#f4f7fe] flex md:flex-col justify-between items-center px-4 md:py-6 border-b md:border-b-0 md:border-r border-gray-200 shrink-0 z-40 order-last md:order-first">
      
      {/* Navigation Buttons Container */}
      <div className="flex md:flex-col gap-1 md:gap-5 w-full items-center justify-around md:justify-start">
        
        {/* ==========================================
            PARROT ICON CONTAINER (Image 1 Replacement)
           ========================================== */}
        <div 
          onClick={() => setView('profile')}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shadow-sm select-none transition-all duration-200 cursor-pointer active:scale-95 ${
            currentView === 'profile' 
              ? 'bg-[#b4c3ff] ring-2 ring-blue-400' 
              : 'bg-[#b4c3ff]'
          }`}
        >
          <span className="text-[22px] md:text-[24px] leading-none filter drop-shadow-sm">🦜</span>
        </div>

        {/* Dynamic Navigation Tabs Loop */}
        {menus.map((m) => (
          <button
            key={m.id}
            onClick={() => setView(m.id)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              currentView === m.id 
                ? 'bg-[#e3ecfc] text-[#3b82f6]' 
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
          >
            <i className={`${m.icon} text-lg`}></i>
          </button>
        ))}
      </div>

      {/* Hidden layout elements for clean display formatting on mobile screens */}
      <div className="hidden md:flex flex-col items-center gap-5 w-full">
        <label className="relative inline-flex items-center cursor-pointer scale-75">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
        </label>
        <img 
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" 
          alt="User Profile" 
          className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
}