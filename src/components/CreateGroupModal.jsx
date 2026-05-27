import React, { useState } from 'react';

export default function CreateGroupModal({ isOpen, onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  
  // Static mock members based on the "Chip" tokens shown in your Figma file
  const [selectedMembers, setSelectedMembers] = useState([
    { id: 1, name: 'Chip', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80' },
    { id: 2, name: 'Chip', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80' }
  ]);

  if (!isOpen) return null;

  const handleRemoveMember = (id) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    
    onCreateGroup({
      name: groupName,
      members: selectedMembers
    });
    
    // Reset state & close overlay
    setGroupName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200">
      
      {/* Responsive Card Container - fluid full width on mobile, max-w-sm on desktop */}
      <div className="bg-white w-full max-w-[380px] rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 border border-gray-100 transform transition-transform scale-100 relative">
        
        {/* Top Header Row Panel */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-gray-800 tracking-wide">Create New Group</h2>
          <button 
            type="button"
            onClick={onClose} 
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all focus:outline-none"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Input Interactive Form Setup */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Group Name Input Segment with floating layer labels */}
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1.5 bg-white text-[10px] font-bold text-blue-500 tracking-wide z-10">
              Name
            </label>
            <input 
              type="text" 
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full bg-white border border-blue-500 px-3.5 py-2.5 rounded-lg text-xs font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              autoFocus
            />
          </div>

          {/* Members Tag Grid Layout Box */}
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1.5 bg-white text-[10px] font-bold text-gray-400 tracking-wide z-10">
              Members
            </label>
            
            <div className="w-full border border-gray-200 rounded-lg p-3 pt-4 min-h-[56px] flex flex-wrap gap-2 items-center bg-white">
              {selectedMembers.length === 0 ? (
                <span className="text-xs text-gray-300 font-medium pl-1">No members added</span>
              ) : (
                selectedMembers.map((member) => (
                  /* Figma-style inline user token chip component */
                  <div 
                    key={member.id} 
                    className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200/60 text-gray-700 px-1.5 py-1 rounded-full text-[11px] font-bold transition-all hover:bg-gray-150"
                  >
                    <img 
                      src={member.avatar} 
                      alt="" 
                      className="w-4 h-4 rounded-full object-cover border border-white"
                    />
                    <span>{member.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="w-3.5 h-3.5 rounded-full bg-gray-300/80 text-white flex items-center justify-center hover:bg-gray-400 transition-colors ml-0.5"
                    >
                      <i className="fa-solid fa-xmark text-[8px]"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit Action Block Container */}
          <div className="pt-2 flex justify-end">
            <button 
              type="submit"
              className="bg-[#3b82f6] text-white px-6 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-blue-600 active:scale-95 transition-all focus:outline-none tracking-wide"
            >
              Create
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}