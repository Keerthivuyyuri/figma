import React, { useState } from 'react';

export default function ContactInfo({ contact, onClose }) {
  // Navigation state manager toggle: 'profile' | 'media' | 'starred'
  const [subView, setSubView] = useState('profile');
  const [activeTab, setActiveTab] = useState('media'); // For media sub-tabs

  // Dynamic directory registry profiles mapping data
  const profileRegistry = {
    "Pink Panda": {
      phone: "+91 98765 43210",
      about: "🐼 Living in my own cozy panda-verse.",
      mediaPics: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
      ]
    },
    "Dog Hat": {
      phone: "+91 87654 32109",
      about: "🤫 Quiet vibes and coding in the mountains.",
      mediaPics: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150"
      ]
    },
    "Cute Turtle": {
      phone: "+91 76543 21098",
      about: "🐢 Slow, steady, and always hydration-focused.",
      mediaPics: [
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=150",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150"
      ]
    },
    "Cool spirit": {
      phone: "+91 62650 81928",
      about: "✨ Clean code and phantom pixel designs.",
      mediaPics: [
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=150",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=150"
      ]
    }
  };

  const activeName = contact?.name || "Pink Panda";
  const currentProfile = profileRegistry[activeName] || profileRegistry["Pink Panda"];

  const sharedLinksMock = [
    { url: "https://codingmonk.in/blogs", domain: "codingmonk.in" },
    { url: "https://codingmonk.in/blogs", domain: "codingmonk.in" }
  ];

  const sharedDocsMock = [
    { title: "Booked Ticket", icon: "fa-solid fa-file-pdf text-cyan-500" },
    { title: "Invoice 22 Oct", icon: "fa-solid fa-file-invoice text-blue-500" }
  ];

  // ===================================================================
  // SUB-VIEW A: STARRED MESSAGES VIEWPORT CONTAINER (Matches screenshot)
  // ===================================================================
  if (subView === 'starred') {
    return (
      <div className="w-full md:w-[320px] h-full border-l border-gray-150/60 bg-white flex flex-col shrink-0 font-sans animate-fade-in">
        
        {/* Navigation Return Back Arrow Header */}
        <div className="px-4 py-3.5 border-b border-gray-100 flex items-center gap-3 shrink-0">
          <button 
            type="button"
            onClick={() => setSubView('profile')} 
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors focus:outline-none"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </button>
          <span className="text-[12px] font-bold text-gray-800">Starred Messages</span>
        </div>

        {/* Scrollable Starred Content Stream area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white flex flex-col">
          
          {/* Date Segment Stamp Row */}
          <span className="text-[10px] font-extrabold text-[#9fa4b3] tracking-wide block mb-1 select-none">
            27th Oct 22
          </span>

          {/* 1. Starred Incoming Text Bubble */}
          <div className="flex flex-col items-start self-start max-w-[85%]">
            <div className="bg-[#f4f7fe] text-[#2d313d] px-3.5 py-2 rounded-[18px] rounded-tl-none text-[11px] font-semibold leading-relaxed shadow-sm">
              Hi 👋, How are ya ?
            </div>
            <span className="text-[9px] text-[#9fa4b3] font-medium mt-1 ml-1">11:12</span>
          </div>

          {/* 2. Starred Outgoing Text Bubble */}
          <div className="flex flex-col items-end self-end max-w-[85%]">
            <div className="bg-[#3b82f6] text-white px-3.5 py-2 rounded-[18px] rounded-tr-none text-[11px] font-semibold leading-relaxed shadow-sm">
              Hi 🐼 Panda, not bad, u ?
            </div>
            <span className="text-[9px] text-[#9fa4b3] font-medium mt-1 mr-1">11:13</span>
          </div>

          {/* 3. Starred Outgoing Secondary Text Bubble */}
          <div className="flex flex-col items-end self-end max-w-[85%]">
            <div className="bg-[#3b82f6] text-white px-3.5 py-2 rounded-[18px] rounded-tr-none text-[11px] font-semibold leading-relaxed shadow-sm">
              Can you send it as file ?
            </div>
            <span className="text-[9px] text-[#9fa4b3] font-medium mt-1 mr-1">11:12</span>
          </div>

          {/* 4. Starred File Document Attachment Box */}
          <div className="w-[85%] bg-white border border-gray-150/80 rounded-xl p-3 flex items-center justify-between gap-3 self-start shadow-sm mt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                <i className="fa-regular fa-image text-sm"></i>
              </div>
              <span className="text-[11px] font-black text-[#2d313d] truncate">
                Abstract.png
              </span>
            </div>
            <button type="button" className="text-gray-400 hover:text-gray-600 focus:outline-none shrink-0">
              <i className="fa-solid fa-arrow-down-long text-[11px]"></i>
            </button>
          </div>

        </div>

      </div>
    );
  }

  // ===================================================================
  // SUB-VIEW B: SHARED MEDIA / LINKS / DOCS ATTACHMENTS VIEWPORT
  // ===================================================================
  if (subView === 'media') {
    return (
      <div className="w-full md:w-[320px] h-full border-l border-gray-150/60 bg-white flex flex-col shrink-0 font-sans animate-fade-in">
        <div className="px-4 h-[53px] border-b border-gray-100 flex items-center shrink-0">
          <button type="button" onClick={() => setSubView('profile')} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors focus:outline-none"><i className="fa-solid fa-arrow-left text-xs"></i></button>
        </div>
        <div className="w-full border-b border-gray-100/80 flex items-center justify-between px-2 shrink-0 select-none">
          {['Media', 'Links', 'Docs'].map((tab) => {
            const isTabActive = activeTab === tab.toLowerCase();
            return (
              <button key={tab} type="button" onClick={() => setActiveTab(tab.toLowerCase())} className={`flex-1 text-center py-3.5 text-[11px] font-black transition-all relative focus:outline-none ${isTabActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}>{tab}{isTabActive && <div className="absolute bottom-0 inset-x-8 h-[2.5px] bg-blue-500 rounded-full"></div>}</button>
            );
          })}
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-5">
          {activeTab === 'media' && (
            <>
              <div className="space-y-2.5">
                <span className="text-[10px] font-extrabold text-[#9fa4b3] tracking-wide block">27th Oct 22</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" className="w-full aspect-square object-cover rounded-lg border border-gray-100 bg-slate-50" alt="" />
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" className="w-full aspect-square object-cover rounded-lg border border-gray-100 bg-slate-50" alt="" />
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" className="w-full aspect-square object-cover rounded-lg border border-gray-100 bg-slate-50" alt="" />
                </div>
              </div>
            </>
          )}
          {activeTab === 'links' && (
            <div className="space-y-3.5">
              <span className="text-[10px] font-extrabold text-[#9fa4b3] tracking-wide block select-none">27th Oct 22</span>
              {sharedLinksMock.map((link, idx) => (
                <div key={idx} className="w-full bg-[#f4f7fe]/60 border border-gray-100/30 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-200/60 rounded-xl flex items-center justify-center text-gray-400"><i className="fa-solid fa-link text-[12px] rotate-[-45deg]"></i></div>
                  <div className="min-w-0 flex-grow"><span className="text-[11px] font-bold text-[#1e2229] truncate block">{link.url}</span><span className="text-[10px] font-semibold text-blue-500/90 mt-0.5 block">{link.domain}</span></div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'docs' && (
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-[#9fa4b3] tracking-wide block select-none">27th Oct 22</span>
              {sharedDocsMock.map((doc, idx) => (
                <div key={idx} className="w-full bg-white border border-gray-150/70 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="w-full h-[96px] bg-[#e5e7eb]/60 flex items-center justify-center"><i className="fa-regular fa-file text-gray-300 text-2xl"></i></div>
                  <div className="px-3 py-2.5 flex items-center justify-between bg-white border-t border-gray-50/80">
                    <div className="flex items-center gap-2 min-w-0"><i className={`${doc.icon} text-[13px] shrink-0`}></i><span className="text-[10px] font-black text-[#2d313d] truncate">{doc.title}</span></div>
                    <button type="button" className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-arrow-down-long text-[11px]"></i></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===================================================================
  // SUB-VIEW C: PRIMARY PROFILE PARTICIPANT DETAILS PANEL
  // ===================================================================
  return (
    <div className="w-full md:w-[320px] h-full border-l border-gray-150/60 bg-white flex flex-col shrink-0 overflow-y-auto font-sans animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="px-5 py-4 border-b border-gray-100/80 flex items-center gap-3 shrink-0">
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>
        <span className="text-[12px] font-bold text-gray-800">Contact info</span>
      </div>

      {/* PROFILE BADGE BLOCK */}
      <div className="flex flex-col items-center text-center p-6 border-b border-gray-100/60 shrink-0">
        <img src={contact?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} className="w-16 h-16 rounded-full object-cover shadow-sm mb-3 border border-gray-50" alt="" />
        <h4 className="text-[13px] font-black text-[#1e2229] leading-tight">{activeName}</h4>
        <p className="text-[10px] font-semibold text-gray-400 mt-1 select-all">{currentProfile.phone}</p>
        
        <div className="flex items-center gap-8 mt-4">
          <button type="button" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-blue-500 focus:outline-none group">
            <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-blue-50/50 flex items-center justify-center border border-gray-100/70">
              <i className="fa-solid fa-phone text-xs text-gray-600 group-hover:text-blue-500"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-500">Audio</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-blue-500 focus:outline-none group">
            <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-blue-50/50 flex items-center justify-center border border-gray-100/70">
              <i className="fa-solid fa-video text-xs text-gray-600 group-hover:text-blue-500"></i>
            </div>
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-500">Video</span>
          </button>
        </div>
      </div>

      {/* ABOUT STATUS SECTION */}
      <div className="p-5 border-b border-gray-100/60 shrink-0">
        <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">About</h5>
        <p className="text-[11px] font-bold text-gray-700 leading-relaxed">{currentProfile.about}</p>
      </div>

      {/* INTERACTIVE MEDIA TRIGGER SHORTCUT BLOCK */}
      <div className="p-5 border-b border-gray-100/60 shrink-0">
        <div 
          onClick={() => { setSubView('media'); setActiveTab('media'); }} 
          className="flex justify-between items-center mb-3 cursor-pointer select-none group"
        >
          <h5 className="text-[11px] font-bold text-[#1e2229] group-hover:text-blue-500 transition-colors">Media, links and docs</h5>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold">
            <span>201</span>
            <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {currentProfile.mediaPics.map((imgUrl, i) => (
            <img key={i} src={imgUrl} className="w-full aspect-square object-cover rounded-xl border border-gray-100" alt="" />
          ))}
        </div>
      </div>

      {/* PREFERENCES SETTINGS ROW ACTIONS */}
      <div className="border-b border-gray-100/60 divide-y divide-gray-50/60 shrink-0">
        
        {/* Click triggers view shift straight into Starred Message Panel Logs */}
        <div 
          onClick={() => setSubView('starred')} 
          className="flex justify-between items-center p-4 hover:bg-slate-50/60 cursor-pointer select-none transition-colors group"
        >
          <div className="flex items-center gap-3 text-gray-400 group-hover:text-blue-500">
            <i className="fa-regular fa-star text-sm"></i>
            <span className="text-[11px] font-bold text-[#1e2229] group-hover:text-blue-500 transition-colors">Starred Messages</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-[10px]"></i>
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3 text-gray-400">
            <i className="fa-regular fa-bell text-sm"></i>
            <span className="text-[11px] font-bold text-[#1e2229]">Mute Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </div>

      {/* MUTUAL GROUPS */}
      <div className="p-5 border-b border-gray-100/60 shrink-0">
        <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">1 group in common</h5>
        <div className="flex items-center gap-3 bg-slate-50/60 p-2.5 rounded-xl border border-gray-100/40 cursor-pointer hover:bg-slate-50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shrink-0 font-black text-[10px]">CG</div>
          <div className="min-w-0 flex-grow">
            <h4 className="text-[11px] font-black text-[#1e2229] truncate leading-tight">Camel's Gang</h4>
            <p className="text-[9px] text-gray-400 font-semibold truncate mt-0.5">Owl, Parrot, Rabbit, You</p>
          </div>
        </div>
      </div>

      {/* SAFETY UTILITY FOOTER */}
      <div className="p-4 mt-auto flex items-center gap-3 shrink-0 bg-white">
        <button type="button" className="flex-grow py-2 border border-red-100 hover:bg-red-50 text-red-500 font-extrabold text-[10px] rounded-xl transition-all active:scale-95">Block</button>
        <button type="button" className="flex-grow py-2 border border-gray-150 hover:bg-gray-50 text-gray-500 font-extrabold text-[10px] rounded-xl transition-all active:scale-95">Delete</button>
      </div>

    </div>
  );
}