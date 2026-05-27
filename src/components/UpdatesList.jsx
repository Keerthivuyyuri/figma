import React, { useState } from 'react';

export default function UpdatesList() {
  // Mock data representing the updates directory
  const updatesData = [
    {
      id: 'me',
      name: "Pink Panda (Me)",
      time: "20hr",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      statusType: "Not seen",
      storyImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      isMe: true
    },
    {
      id: 2,
      name: "Dog Hat",
      time: "3 min",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      statusType: "Not seen",
      storyImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      isMe: false
    },
    {
      id: 3,
      name: "Cute Turtle",
      time: "50 min",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      statusType: "Seen",
      storyImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
      isMe: false
    },
    {
      id: 4,
      name: "Cool spirit",
      time: "23 hr",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      statusType: "Seen",
      storyImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
      isMe: false
    }
  ];

  // Additional state layer managing the edit workflow layout mode
  const [selectedUpdate, setSelectedUpdate] = useState(updatesData[0]);
  const [isEditing, setIsEditing] = useState(false); // Controls the Dashboard Edit view state
  const [replyText, setReplyText] = useState("");

  // Mock edit thumbnail gallery images matching the user faces in your screenshot
  const [editThumbnails, setEditThumbnails] = useState([
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  ]);

  const handleRemoveThumbnail = (indexToRemove) => {
    setEditThumbnails(editThumbnails.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full h-full flex bg-white font-sans overflow-hidden">
      
      {/* ==========================================================
          LEFT PANE: UPDATES DIRECTORY COLUMN LIST
         ========================================================== */}
      <div className="w-[360px] h-full border-r border-gray-150/60 flex flex-col shrink-0 bg-white">
        
        <div className="px-5 pt-6 pb-4 flex items-center justify-between shrink-0">
          <h2 className="text-[20px] font-black text-[#1e2229] tracking-tight">Updates</h2>
          <button type="button" className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none">
            <i className="fa-solid fa-plus text-sm"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-2 space-y-4 pb-4">
          
          {/* CATEGORY A: NOT SEEN SECTION */}
          <div>
            <div className="px-4 pb-2 text-[9px] font-bold text-[#9fa4b3] uppercase tracking-widest">Not seen</div>
            <div className="space-y-1">
              {updatesData.filter(u => u.statusType === "Not seen").map((item) => {
                const isActive = selectedUpdate?.id === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedUpdate(item);
                      setIsEditing(false); // Default to clean view on profile click
                    }}
                    className={`flex items-center gap-3 p-3 mx-2 rounded-[20px] cursor-pointer transition-all ${
                      isActive ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/10' : 'hover:bg-slate-50 text-gray-800'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full p-[2px] bg-white shrink-0 border-2 ${isActive ? 'border-white' : 'border-blue-500'}`}>
                      <img src={item.avatar} className="w-full h-full rounded-full object-cover" alt="" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-[12px] font-bold truncate">{item.name}</h4>
                        <span className={`text-[9px] ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>{item.time}</span>
                      </div>
                      
                      {item.isMe && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents layout collision
                            setSelectedUpdate(item);
                            setIsEditing(true); // Forces view straight into Dashboard Edit layout
                          }}
                          className={`text-[10px] font-bold block mt-0.5 text-left hover:underline focus:outline-none ${
                            isActive ? 'text-blue-100' : 'text-blue-500'
                          }`}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CATEGORY B: SEEN SECTION */}
          <div>
            <div className="px-4 pb-2 text-[9px] font-bold text-[#9fa4b3] uppercase tracking-widest">Seen</div>
            <div className="space-y-1">
              {updatesData.filter(u => u.statusType === "Seen").map((item) => {
                const isActive = selectedUpdate?.id === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedUpdate(item);
                      setIsEditing(false);
                    }}
                    className={`flex items-center gap-3 p-3 mx-2 rounded-[20px] cursor-pointer transition-all ${
                      isActive ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/10' : 'hover:bg-slate-50 text-gray-800'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full p-[2px] bg-white shrink-0 border-2 ${isActive ? 'border-white' : 'border-gray-200'}`}>
                      <img src={item.avatar} className="w-full h-full rounded-full object-cover" alt="" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-[12px] font-bold truncate">{item.name}</h4>
                        <span className={`text-[9px] ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================================
          RIGHT PANE: DYNAMIC STORIES VIEW / EDIT CANVAS
         ========================================================== */}
      <div className="flex-grow h-full bg-white flex flex-col relative">
        {selectedUpdate ? (
          <div className="w-full h-full flex flex-col relative">
            
            {/* TOP HEADER ROW */}
            <div className="px-8 py-5 flex justify-between items-center bg-white shrink-0">
              <span className="text-[12px] font-bold text-[#1e2229]">
                {selectedUpdate.name}
              </span>
              
              <div className="flex items-center gap-3">
                {/* Conditionally render Delete/Trash button when in Edit view Mode */}
                {isEditing && (
                  <button 
                    type="button" 
                    className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                    title="Delete Update"
                  >
                    <i className="fa-regular fa-trash-can text-base"></i>
                  </button>
                )}
                
                <button 
                  type="button"
                  onClick={() => {
                    setSelectedUpdate(null);
                    setIsEditing(false);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <i className="fa-solid fa-xmark text-base"></i>
                </button>
              </div>
            </div>

            {/* MAIN PORTRAIT CONTENT FEEDS FRAME CONTAINER */}
            <div className="flex-grow w-full bg-white relative flex items-center justify-center px-12 overflow-hidden">
              
              <button type="button" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors z-10 focus:outline-none">
                <i className="fa-solid fa-chevron-left text-lg"></i>
              </button>

              <div className="h-[82%] max-h-[480px] aspect-[9/16] rounded-[24px] overflow-hidden shadow-sm relative">
                <div className="absolute top-2.5 inset-x-4 z-20 flex gap-1 px-0.5">
                  <div className="h-[2px] flex-grow bg-white/90 rounded-full"></div>
                  <div className="h-[2px] flex-grow bg-white/40 rounded-full"></div>
                  <div className="h-[2px] flex-grow bg-white/40 rounded-full"></div>
                </div>

                <img 
                  src={selectedUpdate.storyImage} 
                  alt="" 
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </div>

              <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors z-10 focus:outline-none">
                <i className="fa-solid fa-chevron-right text-lg"></i>
              </button>
            </div>

            {/* ==============================================================================
                BOTTOM ACTION INTERACTION ZONE (Conditional render checks split layout modes)
               ============================================================================== */}
            {isEditing ? (
              
              /* MODE 1: IMAGE ATTACHMENT STRIP ROW (Exact match for Screenshot (68).jpg) */
              <div className="p-4 bg-white border-t border-gray-150/50 flex items-center justify-between gap-4 shrink-0">
                
                {/* Thumbnails Stack Group Container */}
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  
                  {/* Plus/Add Input Grid Block Box */}
                  <button 
                    type="button" 
                    className="w-12 h-12 bg-white border border-blue-200 hover:bg-blue-50/40 rounded-xl flex items-center justify-center text-blue-500 text-sm font-bold shadow-sm transition-all focus:outline-none shrink-0"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>

                  {/* Selected Attachment Preview Badges Loop */}
                  {editThumbnails.map((imgUrl, idx) => (
                    <div key={idx} className="w-12 h-12 rounded-xl border border-gray-100 relative shrink-0 shadow-sm group">
                      <img src={imgUrl} className="w-full h-full object-cover rounded-xl" alt="" />
                      
                      {/* Cross deletion action node */}
                      <button 
                        type="button"
                        onClick={() => handleRemoveThumbnail(idx)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1f2937] hover:bg-red-500 rounded-md text-white flex items-center justify-center transition-colors focus:outline-none scale-90"
                      >
                        <i className="fa-solid fa-xmark text-[8px]"></i>
                      </button>
                    </div>
                  ))}

                </div>

                {/* Confirm Post/Save Action dispatch Plane block button */}
                <button 
                  onClick={() => setIsEditing(false)}
                  type="button" 
                  className="w-9 h-9 rounded-xl bg-[#3b82f6] hover:bg-blue-600 text-white flex items-center justify-center shadow-md focus:outline-none shrink-0 transition-transform active:scale-95"
                >
                  <i className="fa-solid fa-paper-plane text-[11px]"></i>
                </button>

              </div>

            ) : (
              
              /* MODE 2: STANDARD REPLY INPUT COMPOSER BLOCK (Dashboard View Layout) */
              <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0">
                <button type="button" className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <i className="fa-solid fa-paperclip text-[13px]"></i>
                </button>
                
                <div className="flex-grow relative bg-[#f4f7fe] rounded-xl flex items-center pr-3">
                  <input 
                    type="text" 
                    value={replyText} 
                    onChange={(e) => setReplyText(e.target.value)} 
                    placeholder="Write a message..." 
                    className="w-full bg-transparent px-4 py-2.5 text-[11px] font-semibold text-gray-700 focus:outline-none" 
                  />
                  <button type="button" className="text-gray-400 hover:text-gray-600 focus:outline-none">
                    <i className="fa-regular fa-face-smile text-base"></i>
                  </button>
                </div>

                <button type="button" className="w-9 h-9 rounded-xl bg-[#3b82f6] text-white flex items-center justify-center shadow-md focus:outline-none shrink-0">
                  <i className="fa-solid fa-paper-plane text-[11px]"></i>
                </button>
              </div>

            )}

          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-white">
            <p className="text-xs font-bold text-gray-400">Click on any profile to open updates view</p>
          </div>
        )}
      </div>

    </div>
  );
}