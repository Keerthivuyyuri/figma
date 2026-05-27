import React, { useState } from 'react';

export default function ChatsList({ onSelectChat, selectedChatId, onOpenNewChat, onNavigateToUpdates }) {
  // Central state controlling list display variants: 'chats' | 'unread' | 'archived'
  const [listMode, setListMode] = useState('chats');

  // Combined mock conversation data layer with filter flags matching your slides
  const chatsData = [
    { id: 1, name: "Pink Panda", msg: "You: thnx!", time: "9:36", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", unread: false, isPinned: true, isArchived: true },
    { id: 2, name: "Dog Hat", msg: "It's so quiet outside 🤫", time: "9:36", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", unread: false, isPinned: false, isArchived: true },
    { id: 3, name: "Cute Turtle", msg: "That's it. Goodbye!", time: "9:36", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", unread: false, isPinned: false, isArchived: true },
    { id: 4, name: "Cool spirit", msg: "Look what I found", time: "9:36", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", unread: false, isPinned: false, isArchived: false }
  ];

  // Separate computation arrays for distinct list lookups
  const unreadChats = chatsData.filter(chat => chat.unread);
  const archivedChats = chatsData.filter(chat => chat.isArchived);

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-150/60">
      
      {/* ==========================================================
          DYNAMIC PANEL HEADER (Chats vs Unread vs Archive)
         ========================================================== */}
      <div className="px-5 pt-6 pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {listMode !== 'chats' && (
            <button 
              type="button"
              onClick={() => setListMode('chats')}
              className="text-gray-400 hover:text-gray-600 transition-colors mr-1 focus:outline-none"
            >
              <i className="fa-solid fa-chevron-left text-sm font-bold"></i>
            </button>
          )}
          <h2 className="text-[20px] font-black text-[#1e2229] tracking-tight">
            {listMode === 'unread' && "Unread"}
            {listMode === 'archived' && "Archive"}
            {listMode === 'chats' && "Chats"}
          </h2>
        </div>
        
        <button 
          type="button"
          onClick={onNavigateToUpdates}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all focus:outline-none"
          title="Status Log Updates"
        >
          <i className="fa-solid fa-circle-notch text-[16px] rotate-[45deg]"></i>
        </button>
      </div>
      
      {/* ==========================================================
          SEARCH BAR & FILTER SLIDERS TRIGGER TOGGLE BUTTON
         ========================================================== */}
      <div className="px-4 pb-3 relative shrink-0 flex items-center gap-2">
        <div className="relative flex-grow">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-[11px] text-[11px] text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-[#f4f7fe] pl-9 pr-4 py-2 rounded-xl text-xs font-semibold placeholder-gray-400/80 focus:outline-none" 
          />
        </div>
        
        <button
          type="button"
          onClick={() => setListMode(listMode === 'unread' ? 'chats' : 'unread')}
          className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all focus:outline-none ${
            listMode === 'unread' 
              ? 'bg-blue-50 border-blue-200 text-blue-500 font-bold' 
              : 'bg-[#f4f7fe] border-transparent text-gray-400 hover:bg-gray-100'
          }`}
          title="Filter Unread Messages"
        >
          <i className="fa-solid fa-sliders text-xs"></i>
        </button>
      </div>

      {/* Archived Navigation Shortcuts Entry Row (Hidden when browsing specific sub-views) */}
      {listMode === 'chats' && (
        <div className="px-4 pb-2 shrink-0">
          <button 
            type="button" 
            onClick={() => setListMode('archived')}
            className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-gray-50/70 rounded-lg w-full text-left text-gray-400 focus:outline-none transition-colors group"
          >
            <i className="fa-solid fa-box-archive text-[12px] text-gray-400 group-hover:text-blue-500 transition-colors"></i>
            <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#1e2229] transition-colors">Archived</span>
          </button>
        </div>
      )}

      {/* ==========================================================
          DYNAMIC LIST ENGINE SCROLLER VIEWPORT
         ========================================================== */}
      <div className="flex-grow overflow-y-auto pb-4 mt-1 flex flex-col">
        
        {/* VIEW 1: UNREAD FILTER VIEW MODE */}
        {listMode === 'unread' && (
          unreadChats.length === 0 ? (
            <div className="flex-grow flex items-center justify-center py-20 select-none animate-fade-in">
              <span className="text-[11px] font-bold text-[#9fa4b3]">No Unread Messages</span>
            </div>
          ) : (
            <div className="space-y-1 animate-fade-in">
              {unreadChats.map((item) => {
                const isSelected = selectedChatId === item.id;
                return (
                  <div 
                    key={item.id} onClick={() => onSelectChat(item)}
                    className={`flex items-center gap-3 p-3 mx-2.5 rounded-[20px] cursor-pointer transition-all ${
                      isSelected ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/10' : 'hover:bg-slate-50 text-gray-800'
                    }`}
                  >
                    <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className={`text-[12px] font-bold truncate ${isSelected ? 'text-white' : 'text-[#1e2229]'}`}>{item.name}</h4>
                        <span className={`text-[9px] font-medium ${isSelected ? 'text-blue-100' : 'text-[#9fa4b3]'}`}>{item.time}</span>
                      </div>
                      <div className="flex justify-between items-center gap-1">
                        <p className={`text-[11px] truncate ${isSelected ? 'text-blue-50' : 'text-[#848a9e]'}`}>{item.msg}</p>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center bg-blue-500 text-white text-[9px] font-bold">!</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* VIEW 2: ARCHIVED FILTER VIEW MODE (Matches your new slide perfectly) */}
        {listMode === 'archived' && (
          <div className="space-y-1 animate-fade-in">
            {archivedChats.map((item) => {
              const isSelected = selectedChatId === item.id;
              return (
                <div 
                  key={item.id} onClick={() => onSelectChat(item)}
                  className={`flex items-center gap-3 p-3 mx-2.5 rounded-[20px] cursor-pointer transition-all ${
                    isSelected ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/10' : 'hover:bg-slate-50 text-gray-800'
                  }`}
                >
                  <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className={`text-[12px] font-bold truncate ${isSelected ? 'text-white' : 'text-[#1e2229]'}`}>{item.name}</h4>
                      <span className={`text-[9px] font-medium ${isSelected ? 'text-blue-100' : 'text-[#9fa4b3]'}`}>{item.time}</span>
                    </div>
                    <p className={`text-[11px] truncate ${isSelected ? 'text-blue-50' : 'text-[#848a9e]'}`}>{item.msg}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 3: STANDARD CORE DIRECTORY MIXED VIEW MODE */}
        {listMode === 'chats' && (
          <div className="space-y-4 animate-fade-in">
            {/* Pinned Category */}
            <div>
              <div className="px-5 pb-1.5 text-[9px] font-bold text-[#9fa4b3] uppercase tracking-widest">Pinned</div>
              <div className="space-y-1">
                {chatsData.filter(c => c.isPinned).map((item) => {
                  const isSelected = selectedChatId === item.id;
                  return (
                    <div 
                      key={item.id} onClick={() => onSelectChat(item)}
                      className={`flex items-center gap-3 p-3 mx-2.5 rounded-[20px] cursor-pointer transition-all ${
                        isSelected ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/10' : 'hover:bg-slate-50 text-gray-800'
                      }`}
                    >
                      <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`text-[12px] font-bold truncate ${isSelected ? 'text-white' : 'text-[#1e2229]'}`}>{item.name}</h4>
                          <span className={`text-[9px] font-medium ${isSelected ? 'text-blue-100' : 'text-[#9fa4b3]'}`}>{item.time}</span>
                        </div>
                        <p className={`text-[11px] truncate ${isSelected ? 'text-blue-50' : 'text-[#848a9e]'}`}>{item.msg}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Chats Category */}
            <div>
              <div className="px-5 pb-1.5 text-[9px] font-bold text-[#9fa4b3] uppercase tracking-widest">All Chats</div>
              <div className="space-y-1">
                {chatsData.filter(c => !c.isPinned).map((item) => {
                  const isSelected = selectedChatId === item.id;
                  return (
                    <div 
                      key={item.id} onClick={() => onSelectChat(item)}
                      className={`flex items-center gap-3 p-3 mx-2.5 rounded-[20px] cursor-pointer transition-all ${
                        isSelected ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/10' : 'hover:bg-slate-50 text-gray-800'
                      }`}
                    >
                      <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`text-[12px] font-bold truncate ${isSelected ? 'text-white' : 'text-[#1e2229]'}`}>{item.name}</h4>
                          <span className={`text-[9px] font-medium ${isSelected ? 'text-blue-100' : 'text-[#9fa4b3]'}`}>{item.time}</span>
                        </div>
                        <p className={`text-[11px] truncate ${isSelected ? 'text-blue-50' : 'text-[#848a9e]'}`}>{item.msg}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}