import React from 'react';

export default function NewConversationModal({ isOpen, onClose, onSelectContact }) {
  if (!isOpen) return null;

  const contacts = [
    { id: 11, name: 'Dinesh', status: 'Yesterday, 21:23', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
    { id: 2, name: 'Dog Hat', status: 'Yesterday, 15:53', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 3, name: 'Cute Turtle', status: 'Yesterday, 15:53', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 4, name: 'Cool spirit', status: 'Yesterday, 15:53', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 5, name: 'strange cat', status: 'Yesterday, 15:53', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100' }
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-[fadeIn_0.2s_ease-out]">
      {/* Modal Container Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 max-h-[85vh]">
        
        {/* Header and Search Input Block */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 relative">
          <span className="absolute inset-y-0 left-7 flex items-center text-blue-400">
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
          </span>
          <input 
            type="text" 
            placeholder="Search" 
            autoFocus
            className="flex-grow bg-[#f4f7fe] pl-9 pr-10 py-2.5 rounded-xl text-sm font-medium text-gray-600 focus:outline-none placeholder-blue-300"
          />
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-slate-100 hover:text-gray-600 transition-colors shrink-0"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Contact Selection Scroll Stream */}
        <div className="flex-grow overflow-y-auto p-2 space-y-1">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => {
                onSelectContact(contact);
                onClose();
              }}
              className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 group transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">{contact.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium truncate">{contact.status}</p>
                </div>
              </div>
              
              {/* Interaction Call Utilities */}
              <div className="flex items-center gap-3 text-green-500 text-xs px-2 opacity-80 group-hover:opacity-100">
                <button className="hover:scale-110 transition-transform"><i className="fa-solid fa-phone"></i></button>
                <button className="hover:scale-110 transition-transform"><i className="fa-solid fa-video"></i></button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}