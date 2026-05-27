import React from 'react';

export default function GroupsList({ onSelectGroup, selectedGroupId, onOpenCreateGroup }) {
  const groups = [
    { id: 201, name: 'Animal Kingdom', message: 'You: thnx!', time: '9:36 AM', members: 'Pink Panda, Turtle, 212 others', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col border-r border-gray-200">
      <div className="p-5 flex justify-between items-center pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Groups</h2>
      </div>
      
      {/* Search Input Filter Frame */}
      <div className="px-5 mb-4 relative">
        <span className="absolute inset-y-0 left-9 flex items-center text-blue-400">
          <i className="fa-solid fa-magnifying-glass text-xs"></i>
        </span>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-[#f4f7fe] pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none placeholder-gray-300" 
        />
      </div>

      {/* Figma Creation Link Element Section */}
      <div className="px-5 mb-4 pb-2">
        <button 
          type="button"
          onClick={onOpenCreateGroup} 
          className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:opacity-80 transition-all focus:outline-none"
        >
          <span>Create New Group</span>
          <i className="fa-solid fa-plus text-[10px]"></i>
        </button>
      </div>

      {/* Groups Indexed List Stream */}
      <div className="flex-grow overflow-y-auto px-3 space-y-1">
        <div className="px-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Pinned
        </div>
        {groups.map((g) => (
          <div 
            key={g.id} 
            onClick={() => onSelectGroup(g)} 
            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
              selectedGroupId === g.id ? 'bg-[#3b82f6] text-white shadow-md' : 'hover:bg-slate-50'
            }`}
          >
            <img src={g.avatar} alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className={`text-sm font-bold truncate ${selectedGroupId === g.id ? 'text-white' : 'text-gray-800'}`}>
                  {g.name}
                </h4>
                <span className={`text-[10px] ${selectedGroupId === g.id ? 'text-blue-100' : 'text-gray-400'}`}>
                  {g.time}
                </span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <p className={`text-xs truncate pr-2 ${selectedGroupId === g.id ? 'text-blue-200' : 'text-gray-400'}`}>
                  {g.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}