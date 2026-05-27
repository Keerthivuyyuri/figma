import React from 'react';

export default function CallLogsList({ onSelectCall, selectedCallId, onOpenNewChat }) {
  const logEntries = [
    { id: 101, name: 'Dinesh', status: 'Yesterday, 21:23', type: 'voice', icon: 'fa-phone', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
    { id: 102, name: 'Dog Hat', status: 'Yesterday, 15:53', type: 'voice', icon: 'fa-phone', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 103, name: 'Cute Turtle', status: 'Yesterday, 15:53', type: 'voice', icon: 'fa-phone', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 104, name: 'Cool spirit', status: 'Yesterday, 15:53', type: 'video', icon: 'fa-video', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 105, name: 'strange cat', status: 'Yesterday, 15:53', type: 'video', icon: 'fa-video', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100' }
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col border-r border-gray-200">
      {/* Title Header */}
      <div className="p-5 flex justify-between items-center pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Call Log</h2>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-slate-100">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      {/* Internal Search Bar */}
      <div className="px-5 mb-4 relative">
        <span className="absolute inset-y-0 left-9 flex items-center text-blue-400">
          <i className="fa-solid fa-magnifying-glass text-xs"></i>
        </span>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-[#f4f7fe] pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 focus:outline-none placeholder-blue-300" 
        />
      </div>

      {/* Start New Conversation Link Shortcut Trigger */}
      <div className="px-5 mb-4">
        <button 
          onClick={onOpenNewChat}
          className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:opacity-80 transition-opacity"
        >
          <i className="fa-solid fa-circle-plus"></i>
          <span>Start new conversation</span>
        </button>
      </div>

      {/* Scrollable Logs Stream */}
      <div className="flex-grow overflow-y-auto px-3 space-y-1 pb-4">
        {logEntries.map((log) => (
          <div 
            key={log.id} 
            onClick={() => onSelectCall(log)}
            className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
              selectedCallId === log.id ? 'bg-[#e3ecfc]' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img src={log.avatar} alt={log.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-800 truncate">{log.name}</h4>
                <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                  <i className={`fa-solid ${log.icon === 'fa-phone' ? 'fa-arrow-left text-green-500' : 'fa-arrow-right text-blue-500'} text-[8px]`}></i>
                  {log.status}
                </p>
              </div>
            </div>

            {/* Status Type Icon indicators on the right frame side edge */}
            <div className="text-green-500 px-2">
              <i className={`fa-solid ${log.icon} text-sm opacity-70`}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}