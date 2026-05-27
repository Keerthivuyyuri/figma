import React, { useState } from 'react';
import ActiveCallChat from './ActiveCallChat';
import ContactInfo from './ContactInfo'; // Import the new sidebar component

export default function ActiveChat({ activeChat, onBack, onStartCall, activeCall, onEndCall }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false); // Controls side panel view state
  const [searchQuery, setSearchQuery] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="w-full h-full flex bg-white relative overflow-hidden">
      
      {/* LEFT CONTAINER: PRIMARY TIMELINE MESSAGE STREAM */}
      <div className="flex-grow h-full flex flex-col min-w-0 relative bg-white">
        
        {/* CHAT HEADER SECTION */}
        <div className="px-6 py-4 border-b border-gray-150/60 flex justify-between items-center shrink-0 bg-white z-20">
          
          {/* User Info Left Side (Clicking triggers contact information slide expansion) */}
          <div 
            onClick={() => setShowContactInfo(!showContactInfo)}
            className="flex items-center gap-3 min-w-0 cursor-pointer select-none group"
          >
            <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="text-gray-400 block md:hidden mr-1 focus:outline-none">
              <i className="fa-solid fa-arrow-left text-base"></i>
            </button>
            <div className="w-9 h-9 rounded-full relative shrink-0">
              <img 
                src={activeChat?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} 
                className="w-full h-full rounded-full object-cover border border-gray-100 group-hover:scale-105 transition-transform" 
                alt="Avatar" 
              />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-bold text-[#1e2229] leading-tight truncate group-hover:text-blue-500 transition-colors">
                {activeChat?.name || "Pink Panda"}
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Online</p>
            </div>
          </div>

          {/* Header Action Items */}
          <div className="flex items-center gap-1 text-[#4a4a4a] relative">
            <button onClick={() => onStartCall && onStartCall('video')} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/70 text-gray-600 transition-colors focus:outline-none" title="Start Video Call">
              <i className="fa-solid fa-video text-[15px]"></i>
            </button>
            <button onClick={() => onStartCall && onStartCall('audio')} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/70 text-gray-600 transition-colors focus:outline-none" title="Start Voice Call">
              <i className="fa-solid fa-phone text-[14px]"></i>
            </button>
            <button onClick={() => setShowSearchBar(!showSearchBar)} className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/70 transition-colors focus:outline-none ${showSearchBar ? 'text-blue-500 bg-blue-50' : 'text-gray-600'}`}>
              <i className="fa-solid fa-magnifying-glass text-[14px]"></i>
            </button>
            <div className="h-5 w-[1px] bg-gray-200 mx-1.5"></div>
            <button onClick={() => setShowDropdown(!showDropdown)} className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/70 transition-colors focus:outline-none ${showDropdown ? 'text-gray-900 rotate-180' : 'text-gray-600'} transition-transform duration-200`}>
              <i className="fa-solid fa-chevron-down text-[14px]"></i>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-150 rounded-xl shadow-xl py-2 z-50">
                <button onClick={() => { setShowDropdown(false); setShowContactInfo(true); }} type="button" className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 flex items-center gap-2"><i className="fa-regular fa-user w-4"></i> View Contact Info</button>
                <button type="button" className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 flex items-center gap-2"><i className="fa-regular fa-bell-slash w-4"></i> Mute Chat</button>
                <button type="button" className="w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2 border-t border-gray-50 mt-1"><i className="fa-regular fa-trash-can w-4"></i> Delete Conversation</button>
              </div>
            )}
          </div>
        </div>

        {/* Slide-down Search Input Row */}
        {showSearchBar && (
          <div className="px-6 py-2.5 bg-[#f4f7fe] border-b border-gray-100 flex items-center gap-2 z-10 shrink-0">
            <i className="fa-solid fa-magnifying-glass text-xs text-gray-400"></i>
            <input type="text" placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none w-full" autoFocus />
          </div>
        )}

        {/* Message Feed Canvas Layer */}
        <div className="flex-grow w-full relative overflow-hidden flex flex-col bg-white">
          
          {/* Call overlay widget frame container */}
          {activeCall && activeCall.id === activeChat.id && (
            <div className="absolute top-4 right-4 z-30 w-[calc(100%-32px)] max-w-[440px] bg-white rounded-[32px] border border-gray-100 shadow-xl p-6 transition-all duration-300">
              <ActiveCallChat activeCall={activeCall} onBack={onEndCall} />
            </div>
          )}

          {/* Conversation Bubbles Scroller */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-4 flex flex-col justify-end bg-white">
            <div className="flex flex-col items-start self-start max-w-[70%]">
              <div className="bg-[#f4f7fe] text-[#2d313d] px-4 py-2 rounded-[22px] rounded-tl-none text-[12px] font-medium leading-relaxed">Hi 👋, How are ya ?</div>
              <span className="text-[9px] text-[#9fa4b3] font-medium mt-1 ml-1 tracking-wide">11:12 AM</span>
            </div>
            <div className="w-full flex items-center justify-center py-2 shrink-0 select-none relative">
              <div className="w-full h-[1px] bg-gray-100 absolute inset-0 my-auto"></div>
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-white px-4 relative z-10">Today</span>
            </div>
            <div className="flex flex-col items-end self-end max-w-[70%]">
              <div className="bg-[#3b82f6] text-white px-4 py-2 rounded-[22px] rounded-tr-none text-[12px] font-medium leading-relaxed">Hi 🐼 Panda, not bad, u ?</div>
              <span className="text-[9px] text-[#9fa4b3] font-medium mt-1 mr-1 tracking-wide">11:13 AM</span>
            </div>
            <div className="flex flex-col items-start self-start w-[180px] md:w-[220px] relative mt-1">
              <div className="rounded-[24px] overflow-hidden shadow-sm border-[3px] border-white bg-slate-50 aspect-square w-full">
                <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] text-[#9fa4b3] font-medium mt-2.5 ml-1 tracking-wide">11:24 AM</span>
            </div>
          </div>
        </div>

        {/* BOTTOM MESSAGE COMPOSER BAR */}
        <div className="p-4 bg-white border-t border-gray-150/60 flex items-center gap-3 shrink-0 z-20">
          <button type="button" className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none rounded-full hover:bg-gray-50"><i className="fa-solid fa-paperclip text-[14px]"></i></button>
          <div className="flex-grow relative bg-[#f4f7fe] rounded-xl flex items-center pr-3 border border-transparent focus-within:border-gray-200/60 transition-all">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message..." className="w-full bg-transparent px-4 py-2.5 text-[11px] font-semibold text-gray-700 placeholder-gray-400/80 focus:outline-none" />
            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"><i className="fa-regular fa-face-smile text-[15px]"></i></button>
          </div>
          <button type="button" className="w-9 h-9 rounded-xl bg-[#3b82f6] text-white flex items-center justify-center shadow-md hover:bg-blue-600 focus:outline-none shrink-0"><i className="fa-solid fa-paper-plane text-[11px] -mr-0.5"></i></button>
        </div>

      </div>

      {/* RIGHT CONTAINER: DYNAMIC SIDEBAR ATTACHMENT INJECTION LAYER */}
      {showContactInfo && (
        <ContactInfo 
          contact={activeChat} 
          onClose={() => setShowContactInfo(false)} 
        />
      )}

    </div>
  );
}