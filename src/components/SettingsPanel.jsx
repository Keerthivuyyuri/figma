import React, { useState } from 'react';

export default function SettingsPanel() {
  // Navigation sub-view state tracker: 'main' | 'notifications' | 'privacy' | 'security' | 'help' | 'lastseen' | 'profilephoto' | 'about' | 'groupsPrivacy' | 'blocked' | 'account' | 'wallpaper'
  const [activeSubView, setActiveSubView] = useState('main');

  // Interactive Overlays Modals Toggle States
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false); 
  const [showBlockModal, setShowBlockModal] = useState(false); 

  // Settings Visibility Value Trackers
  const [selectedTheme, setSelectedTheme] = useState('light'); 
  const [activeTheme, setActiveTheme] = useState('light'); 
  const [lastSeen, setLastSeen] = useState('everyone'); 
  const [profilePhoto, setProfilePhoto] = useState('everyone'); 
  const [aboutVisibility, setAboutVisibility] = useState('everyone'); 
  const [groupsPrivacy, setGroupsPrivacy] = useState('everyone');

  // Chat Wallpaper Custom States
  const [enableTalkDoodle, setEnableTalkDoodle] = useState(true);
  const [previewColor, setPreviewColor] = useState('#4a4e69'); // Defaults to the blueprint slate blue from Screenshot (90).png

  // Complete palette hex matrix array matching your figma grid rows perfectly
  const wallpaperPalette = [
    { id: 'default', hex: '#e2e8f0', isDefault: true },
    { id: 'c1', hex: '#1c252c' },
    { id: 'c2', hex: '#234a36' },
    { id: 'c3', hex: '#2d8a5c' },
    { id: 'c4', hex: '#2a5566' },
    { id: 'c5', hex: '#b57c7c' },
    { id: 'c6', hex: '#a69d98' },
    { id: 'c7', hex: '#1f1315' },
    { id: 'c8', hex: '#4f5e1f' },
    { id: 'c9', hex: '#a14a76' },
    { id: 'c10', hex: '#52947a' },
    { id: 'c11', hex: '#cc7d52' },
    { id: 'c12', hex: '#bab3e6' },
    { id: 'c13', hex: '#0a1f11' },
    { id: 'c14', hex: '#cca3a3' },
    { id: 'c15', hex: '#363d47' },
    { id: 'c16', hex: '#911b5d' },
    { id: 'c17', hex: '#4a4e69' }, // Active color code highlighted in screenshot
    { id: 'c18', hex: '#5cd699' },
    { id: 'c19', hex: '#875122' },
    { id: 'c20', hex: '#262261' }
  ];

  // Blocked contacts state stream
  const [blockedContacts, setBlockedContacts] = useState([
    { id: 1, name: "Dinesh", status: "Enjoy life to the fullest", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
    { id: 2, name: "Dog Hat", status: "You can call me at random.", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100" },
    { id: 3, name: "Cute Turtle", status: "Almost there", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" }
  ]);

  const masterCandidates = [
    { id: 1, name: "Dinesh", status: "Enjoy life to the fullest", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
    { id: 2, name: "Dog Hat", status: "You can call me at random.", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100" },
    { id: 3, name: "Cute Turtle", status: "Almost there", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { id: 4, name: "Cool spirit", status: "Fiddling with ideas", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { id: 5, name: "strange cat", status: "Omw to discover myself", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" }
  ];

  // Toggle checkbox preferences tracker states
  const [notificationPrefs, setNotificationPrefs] = useState({
    notifications: true,
    showPreviews: true,
    reactions: false,
    ringtone: false,
    sounds: true
  });

  const [readReceipts, setReadReceipts] = useState(true);

  const toggleNotificationPref = (key) => {
    setNotificationPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUnblock = (id) => {
    setBlockedContacts(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectBlockTarget = (candidate) => {
    if (!blockedContacts.some(item => item.id === candidate.id)) {
      setBlockedContacts(prev => [...prev, candidate]);
    }
    setShowBlockModal(false); 
  };

  const settingsOptions = [
    { id: 'notifications', name: 'Notifications', icon: 'fa-regular fa-bell' },
    { id: 'privacy', name: 'Privacy', icon: 'fa-regular fa-lock' },
    { id: 'security', name: 'Security', icon: 'fa-solid fa-key' },
    { id: 'theme', name: 'Theme', icon: 'fa-regular fa-circle-half-stroke' },
    { id: 'wallpaper', name: 'Chat Wallpaper', icon: 'fa-regular fa-image' },
    { id: 'account', name: 'Request Account Info', icon: 'fa-regular fa-file-lines' },
    { id: 'shortcuts', name: 'Keyboard shortcuts', icon: 'fa-regular fa-keyboard' },
    { id: 'help', name: 'Help', icon: 'fa-regular fa-circle-question' }
  ];

  const KeyBadge = ({ label }) => (
    <kbd className="px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-500 font-sans font-bold text-[9.5px] rounded-md shadow-sm min-w-[24px] text-center select-none">
      {label}
    </kbd>
  );

  return (
    <div className="w-full h-full flex bg-white font-sans overflow-hidden relative">
      
      {/* ==========================================================
          LEFT PANE: DIRECTORY LAYER SWITCH GRAPH
         ========================================================== */}
      <div className="w-[360px] h-full border-r border-gray-150/60 flex flex-col shrink-0 bg-white">
        
        {/* CONDITION A: NOTIFICATIONS LAYER SUB-VIEW */}
        {activeSubView === 'notifications' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50">
              <button type="button" onClick={() => setActiveSubView('main')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button>
              <h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Notifications</h2>
            </div>
            <div className="flex-grow overflow-y-auto divide-y divide-gray-100/50">
              <div onClick={() => toggleNotificationPref('notifications')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 select-none"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug">Notifications</span><span className="text-[10px] font-medium text-gray-400 leading-tight mt-0.5">Show notifications for new messages</span></div><input type="checkbox" checked={notificationPrefs.notifications} readOnly className="w-3.5 h-3.5 rounded bg-gray-100 text-blue-500 accent-blue-500 focus:ring-0" /></div>
              <div onClick={() => toggleNotificationPref('showPreviews')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 select-none"><span className="text-[11px] font-black text-gray-800">Show Previews</span><input type="checkbox" checked={notificationPrefs.showPreviews} readOnly className="w-3.5 h-3.5 rounded bg-gray-100 text-blue-500 accent-blue-500 focus:ring-0" /></div>
              <div onClick={() => toggleNotificationPref('reactions')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 select-none"><span className="text-[11px] font-black text-gray-800">Show Reaction Notifications</span><input type="checkbox" checked={notificationPrefs.reactions} readOnly className="w-3.5 h-3.5 rounded bg-gray-100 text-blue-500 accent-blue-500 focus:ring-0" /></div>
              <div onClick={() => toggleNotificationPref('ringtone')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 select-none"><span className="text-[11px] font-black text-gray-800">Incoming call ringtone</span><input type="checkbox" checked={notificationPrefs.ringtone} readOnly className="w-3.5 h-3.5 rounded bg-gray-100 text-blue-500 accent-blue-500 focus:ring-0" /></div>
              <div onClick={() => toggleNotificationPref('sounds')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 select-none"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug">Sounds</span><span className="text-[10px] font-medium text-gray-400 leading-tight mt-0.5">Play sounds for incoming messages</span></div><input type="checkbox" checked={notificationPrefs.sounds} readOnly className="w-3.5 h-3.5 rounded bg-gray-100 text-blue-500 accent-blue-500 focus:ring-0" /></div>
            </div>
          </div>
        )}

        {/* CONDITION B: PRIVACY DETAILS DIRECTORY SUB-VIEW */}
        {activeSubView === 'privacy' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50">
              <button type="button" onClick={() => setActiveSubView('main')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button>
              <h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Privacy</h2>
            </div>
            <div className="flex-grow overflow-y-auto divide-y divide-gray-100/50">
              <div onClick={() => setActiveSubView('lastseen')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors group"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug group-hover:text-blue-500 transition-colors">Last Seen</span><span className="text-[10px] font-semibold text-gray-400 mt-0.5 capitalize">{lastSeen === 'contacts' ? 'My Contacts' : lastSeen}</span></div><i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i></div>
              <div onClick={() => setActiveSubView('profilephoto')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors group"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug group-hover:text-blue-500 transition-colors">Profile Photo</span><span className="text-[10px] font-semibold text-gray-400 mt-0.5 capitalize">{profilePhoto === 'contacts' ? 'My Contacts' : profilePhoto}</span></div><i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i></div>
              <div onClick={() => setActiveSubView('about')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors group"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug group-hover:text-blue-500 transition-colors">About</span><span className="text-[10px] font-semibold text-gray-400 mt-0.5 capitalize">{aboutVisibility === 'contacts' ? 'My Contacts' : aboutVisibility}</span></div><i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i></div>
              <div onClick={() => setReadReceipts(!readReceipts)} className="px-6 py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/40 select-none"><div className="flex flex-col min-w-0 pr-2"><span className="text-[11px] font-black text-gray-800 leading-snug">Read receipts</span><p className="text-[9.5px] font-medium text-gray-400 leading-normal mt-1 max-w-[260px]">If turned off, you won't send or receive read receipts. Read receipts are always sent for group chats.</p></div><input type="checkbox" checked={readReceipts} onChange={() => {}} className="w-3.5 h-3.5 mt-0.5 rounded bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0 cursor-pointer" /></div>
              <div onClick={() => setActiveSubView('groupsPrivacy')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors group"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug group-hover:text-blue-500 transition-colors">Groups</span><span className="text-[10px] font-semibold text-gray-400 mt-0.5 capitalize">{groupsPrivacy === 'contacts' ? 'My Contacts' : groupsPrivacy}</span></div><i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i></div>
              <div onClick={() => setActiveSubView('blocked')} className="px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors group"><div className="flex flex-col min-w-0"><span className="text-[11px] font-black text-gray-800 leading-snug group-hover:text-blue-500 transition-colors">Blocked contacts</span><span className="text-[10px] font-semibold text-gray-400 mt-0.5">{blockedContacts.length}</span></div><i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i></div>
            </div>
          </div>
        )}

        {/* CONDITION C: LAST SEEN SUB-VIEW PREFERENCES */}
        {activeSubView === 'lastseen' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('privacy')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Last Seen</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-5 flex flex-col space-y-5">
              <p className="text-[9.5px] font-bold text-blue-500 leading-normal tracking-wide px-0.5">If you don't share your Last Seen, you won't be able to see other people's Last Seen</p>
              <div className="flex flex-col space-y-4 pt-1">
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="lastSeenFieldGroup" checked={lastSeen === 'everyone'} onChange={() => setLastSeen('everyone')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Everyone</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="lastSeenFieldGroup" checked={lastSeen === 'contacts'} onChange={() => setLastSeen('contacts')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">My Contacts</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="lastSeenFieldGroup" checked={lastSeen === 'nobody'} onChange={() => setLastSeen('nobody')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Nobody</span></label>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION D: PROFILE PHOTO SUB-VIEW PREFERENCES */}
        {activeSubView === 'profilephoto' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('privacy')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Profile Photo</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-5 flex flex-col space-y-5">
              <p className="text-[9.5px] font-bold text-blue-500 leading-normal tracking-wide px-0.5 select-none">Who can see my profile photo</p>
              <div className="flex flex-col space-y-4 pt-1">
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="profilePhotoFieldGroup" checked={profilePhoto === 'everyone'} onChange={() => setProfilePhoto('everyone')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Everyone</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="profilePhotoFieldGroup" checked={profilePhoto === 'contacts'} onChange={() => setProfilePhoto('contacts')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">My Contacts</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="profilePhotoFieldGroup" checked={profilePhoto === 'nobody'} onChange={() => setProfilePhoto('nobody')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Nobody</span></label>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION E: ABOUT SUB-VIEW PREFERENCES */}
        {activeSubView === 'about' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('privacy')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">About</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-5 flex flex-col space-y-5">
              <p className="text-[9.5px] font-bold text-blue-500 leading-normal tracking-wide px-0.5 select-none">Who can see my about</p>
              <div className="flex flex-col space-y-4 pt-1">
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="aboutFieldGroup" checked={aboutVisibility === 'everyone'} onChange={() => setAboutVisibility('everyone')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Everyone</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="aboutFieldGroup" checked={aboutVisibility === 'contacts'} onChange={() => setAboutVisibility('contacts')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">My Contacts</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="aboutFieldGroup" checked={aboutVisibility === 'nobody'} onChange={() => setAboutVisibility('nobody')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Nobody</span></label>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION F: GROUPS PRIVACY SUB-VIEW PREFERENCES */}
        {activeSubView === 'groupsPrivacy' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('privacy')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Groups</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-5 flex flex-col space-y-5">
              <p className="text-[9.5px] font-bold text-blue-500 leading-normal tracking-wide px-0.5 select-none">Who can add me to groups</p>
              <div className="flex flex-col space-y-4 pt-1">
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="groupsPrivacyFieldGroup" checked={groupsPrivacy === 'everyone'} onChange={() => setGroupsPrivacy('everyone')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Everyone</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="groupsPrivacyFieldGroup" checked={groupsPrivacy === 'contacts'} onChange={() => setGroupsPrivacy('contacts')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">My Contacts</span></label>
                <label className="flex items-center gap-4 cursor-pointer group select-none"><input type="radio" name="groupsPrivacyFieldGroup" checked={groupsPrivacy === 'nobody'} onChange={() => setGroupsPrivacy('nobody')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Nobody</span></label>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION G: BLOCKED CONTACTS DIRECTORY LAYOUT */}
        {activeSubView === 'blocked' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-150/50 bg-white"><button type="button" onClick={() => setActiveSubView('privacy')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Blocked Contacts</h2></div>
            <div onClick={() => setShowBlockModal(true)} className="px-6 py-3.5 flex items-center justify-between text-blue-500 hover:bg-slate-50/50 transition-colors cursor-pointer select-none border-b border-gray-100/40 shrink-0 font-extrabold text-[11px] tracking-wide"><span>Block New Contact</span><i className="fa-solid fa-plus text-xs"></i></div>
            <div className="flex-grow overflow-y-auto py-2.5 px-3 space-y-1 bg-white">
              {blockedContacts.length === 0 ? (<div className="text-center py-16 text-[11px] font-bold text-gray-400 select-none">No blocked accounts recorded</div>) : (blockedContacts.map((item) => (<div key={item.id} className="w-full bg-white border border-gray-100/60 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm hover:shadow transition-all"><div className="flex items-center gap-3 min-w-0"><img src={item.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" alt="" /><div className="min-w-0"><h4 className="text-[11px] font-black text-[#1e2229] truncate leading-none">{item.name}</h4><p className="text-[9px] font-medium text-gray-400 truncate mt-1 max-w-[200px]">{item.status}</p></div></div><button type="button" onClick={() => handleUnblock(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1.5 focus:outline-none"><i className="fa-solid fa-xmark text-[10px]"></i></button></div>)))}
            </div>
          </div>
        )}

        {/* CONDITION H: REQUEST ACCOUNT INFO SUB-VIEW */}
        {activeSubView === 'account' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('main')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Request Account Info</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-6 flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/10 mb-8 mt-1 shrink-0"><i className="fa-regular fa-clipboard text-[18px]"></i></div>
              <div className="w-full border-t border-b border-gray-100/70 py-1.5 select-none"><button type="button" className="w-full text-left py-2 text-[11px] font-bold text-gray-600 hover:text-blue-500 transition-colors focus:outline-none">Request Report</button></div>
              <p className="text-[9.5px] font-medium text-gray-400 leading-normal text-left mt-4 px-0.5">Create a report of your Talk Account information and settings, which you can access or port to another app. This report does not include your messages.</p>
            </div>
          </div>
        )}

        {/* =========================================================================
            CONDITION I: CHAT WALLPAPER SUB-VIEW PANEL (Matches Screenshot (90).png)
           ========================================================================= */}
        {activeSubView === 'wallpaper' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            
            {/* Header section path backward route link */}
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white">
              <button 
                type="button" 
                onClick={() => setActiveSubView('main')} // Reverts view state securely back to parent settings list
                className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
              >
                <i className="fa-solid fa-chevron-left text-xs font-bold"></i>
              </button>
              <h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Set Chat Wallpaper</h2>
            </div>

            {/* Scrollable menu options matrix area */}
            <div className="flex-grow overflow-y-auto px-5 py-4 flex flex-col">
              
              {/* Doodle checkbox toggle option button */}
              <div 
                onClick={() => setEnableTalkDoodle(!enableTalkDoodle)}
                className="flex items-center justify-between gap-4 pb-4 cursor-pointer select-none border-b border-gray-50"
              >
                <span className="text-[11px] font-black text-gray-700">Enable Talk Doodle</span>
                <input 
                  type="checkbox" 
                  checked={enableTalkDoodle}
                  onChange={() => {}}
                  className="w-3.5 h-3.5 rounded bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0 cursor-pointer" 
                />
              </div>

              {/* Responsive hex matrix color catalog swatches grid block */}
              <div className="grid grid-cols-3 gap-2 pt-4">
                {wallpaperPalette.map((color) => {
                  const isSelected = previewColor === color.hex;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setPreviewColor(color.hex)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-full aspect-[3/4] rounded-xl flex items-center justify-center relative transition-all duration-150 focus:outline-none active:scale-95 border ${
                        isSelected 
                          ? 'border-blue-500 ring-2 ring-blue-500/20 scale-95 shadow-md' 
                          : 'border-transparent hover:scale-102 hover:shadow-sm'
                      }`}
                    >
                      {/* Displays explicit textual flag for default variant */}
                      {color.isDefault && (
                        <span className="text-[9.5px] font-extrabold text-gray-500 select-none">
                          Default
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* CONDITION J: SECURITY PANEL SUB-VIEW */}
        {activeSubView === 'security' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('main')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Security</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-6 flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/10 mb-5 shrink-0"><i className="fa-solid fa-lock text-[18px]"></i></div>
              <h3 className="text-[11.5px] font-black text-[#1e2229] tracking-tight text-center w-full">Your Chats and calls are private</h3>
              <p className="text-[10px] font-medium text-gray-400 leading-normal text-left mt-2.5 px-0.5">End-to-end encryption keeps your personal messages & call between you and person you choose to communicate with. Not even talk can read or listen to them. This includes your</p>
              <div className="w-full mt-7 space-y-4 px-1 select-none">
                <div className="flex items-center gap-3.5 text-gray-400"><div className="w-4 flex items-center justify-center shrink-0"><i className="fa-regular fa-comment-dots text-[13px]"></i></div><span className="text-[10.5px] font-bold text-gray-600">Text and voice messages</span></div>
                <div className="flex items-center gap-3.5 text-gray-400"><div className="w-4 flex items-center justify-center shrink-0"><i className="fa-solid fa-phone text-[12px]"></i></div><span className="text-[10.5px] font-bold text-gray-600">Audio & Video Calls</span></div>
                <div className="flex items-center gap-3.5 text-gray-400"><div className="w-4 flex items-center justify-center shrink-0"><i className="fa-solid fa-paperclip text-[12px] rotate-[45deg]"></i></div><span className="text-[10.5px] font-bold text-gray-600">Photos, videos & documents</span></div>
                <div className="flex items-center gap-3.5 text-gray-400"><div className="w-4 flex items-center justify-center shrink-0"><i className="fa-solid fa-location-dot text-[13px]"></i></div><span className="text-[10.5px] font-bold text-gray-600">Location Sharing</span></div>
                <div className="flex items-center gap-3.5 text-gray-400"><div className="w-4 flex items-center justify-center shrink-0"><i className="fa-solid fa-circle-notch text-[13px] rotate-[45deg]"></i></div><span className="text-[10.5px] font-bold text-gray-600">Status Updates</span></div>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION K: HELP DETAILS SUB-VIEW */}
        {activeSubView === 'help' && (
          <div className="flex flex-col h-full animate-fade-in text-[#2d313d]">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3.5 shrink-0 border-b border-gray-50 bg-white"><button type="button" onClick={() => setActiveSubView('main')} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-xs font-bold"></i></button><h2 className="text-[15px] font-black text-[#1e2229] tracking-tight">Help</h2></div>
            <div className="flex-grow overflow-y-auto px-6 py-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/10 mb-8 mt-2 shrink-0"><i className="fa-solid fa-fingerprint text-3xl"></i></div>
              <div className="w-full divide-y divide-gray-100/80 border-t border-b border-transparent">
                {['Help Center', 'Contact Us', 'Licenses', 'Terms and Privacy Policy'].map((menuLabel, index) => (
                  <button key={index} type="button" className="w-full text-left py-4 text-[11px] font-bold text-gray-600 hover:text-blue-500 transition-colors focus:outline-none">{menuLabel}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONDITION L: MAIN CORE SETTINGS INDEX */}
        {activeSubView === 'main' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="px-5 pt-6 pb-4 flex items-center gap-3 shrink-0">
              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"><i className="fa-solid fa-chevron-left text-sm font-bold"></i></button>
              <h2 className="text-[20px] font-black text-[#1e2229] tracking-tight">Settings</h2>
            </div>
            <div className="px-5 py-4 flex items-center gap-3.5 border-b border-gray-100/60 shrink-0">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm shrink-0" alt="" />
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#1e2229] leading-tight truncate">Shreyansh shah</h4>
                <p className="text-[11px] font-semibold text-gray-400 mt-1 truncate">Exploring</p>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto py-2 divide-y divide-gray-50/40">
              <div className="px-2 space-y-0.5">
                {settingsOptions.map((item) => (
                  <button
                    key={item.id} type="button"
                    onClick={() => {
                      if (item.id === 'notifications') setActiveSubView('notifications');
                      if (item.id === 'privacy') setActiveSubView('privacy');
                      if (item.id === 'security') setActiveSubView('security');
                      if (item.id === 'help') setActiveSubView('help');
                      if (item.id === 'theme') setShowThemeModal(true); 
                      if (item.id === 'shortcuts') setShowShortcutsModal(true);
                      if (item.id === 'account') setActiveSubView('account');
                      if (item.id === 'wallpaper') setActiveSubView('wallpaper'); // Triggers the custom chat wallpaper palette state subview
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 rounded-xl text-left transition-colors text-gray-400 hover:text-blue-500 group focus:outline-none"
                  >
                    <div className="w-5 flex items-center justify-center shrink-0"><i className={`${item.icon} text-[14px] text-gray-400 group-hover:text-blue-500 transition-colors`}></i></div>
                    <span className="text-[12px] font-bold text-gray-700 group-hover:text-[#1e2229] transition-colors">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ==========================================================
          RIGHT PANE: LIVE WORKSPACE OVERLAY CANVAS ROUTER
         ========================================================== */}
      <div className="flex-grow h-full bg-white hidden md:flex flex-col items-center justify-center p-8 relative">
        
        {activeSubView === 'wallpaper' ? (
          
          /* LIVE COMPONENT PREVIEW VIEWPORT CONTAINER (Figma layout match) */
          <div className="w-full h-full flex flex-col items-center animate-fade-in text-[#2d313d] py-1">
            <span className="text-[11px] font-black text-gray-400 mb-5 tracking-widest uppercase select-none">
              Wallpaper Preview
            </span>
            
            <div 
              style={{ backgroundColor: previewColor }}
              className="flex-grow w-full max-w-[580px] rounded-3xl shadow-inner border border-gray-150/40 relative overflow-hidden transition-all duration-300"
            >
              {/* Optional dynamic fine grid doodle overlay mesh if Talk Doodle is enabled */}
              {enableTalkDoodle && (
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>
              )}
            </div>
          </div>

        ) : (

          /* PERSISTENT BASE LEVEL COGWHEEL ILLUSTRATION LOGO */
          <div className="w-full max-w-[360px] flex flex-col items-center text-center space-y-6 animate-fade-in">
            <div className="w-44 h-44 relative text-blue-500/10 flex items-center justify-center">
              <svg className="w-full h-full text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.15" d="M19.14 12.94C19.18 12.63 19.21 12.32 19.21 12C19.21 11.68 19.18 11.37 19.14 11.06L21.16 9.48C21.34 9.34 21.39 9.08 21.28 8.87L19.36 5.55C19.25 5.34 18.99 5.26 18.78 5.34L16.4 6.3C15.91 5.92 15.37 5.61 14.79 5.37L14.43 2.84C14.39 2.62 14.2 2.46 13.98 2.46H10.03C9.81 2.46 9.62 2.62 9.58 2.84L9.22 5.37C8.64 5.61 8.1 5.92 7.61 6.3L5.23 5.34C5.02 5.26 4.76 5.34 4.65 5.55L2.73 8.87C2.62 9.08 2.67 9.34 2.85 9.48L4.87 11.06C4.83 11.37 4.8 11.69 4.8 12C4.8 12.31 4.83 12.63 4.87 12.94L2.85 14.52C2.67 14.66 2.62 14.92 2.73 15.13L4.65 18.45C4.76 18.66 5.02 18.74 5.23 18.66L7.61 17.7C8.1 18.08 8.64 18.39 9.22 18.63L9.58 21.16C9.62 21.38 9.81 21.54 10.03 21.54H13.98C14.2 21.54 14.39 21.38 14.43 21.16L14.79 18.63C15.37 18.39 15.91 18.08 16.4 17.7L18.78 18.66C18.99 18.74 19.25 18.66 19.36 18.45L21.28 15.13C21.39 14.92 21.34 14.66 21.16 14.52L19.14 12.94ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z" fill="currentColor"/></svg><div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100"><i className="fa-solid fa-user-astronaut text-blue-500 text-lg"></i></div>
            </div>
            <p className="text-[12px] font-extrabold text-gray-400 select-none tracking-normal">Select a conversation or start a <span className="text-blue-500 hover:underline cursor-pointer">new one</span></p>
          </div>

        )}
      </div>

      {/* GLOBAL MODAL: CHOOSE THEME OVERLAY */}
      {showThemeModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[350px] rounded-[24px] p-6 shadow-2xl border border-gray-100 flex flex-col relative">
            <h3 className="text-[13px] font-black text-[#1e2229] mb-4 tracking-tight">Choose Theme</h3>
            <div className="flex flex-col space-y-3.5 py-1">
              <label className="flex items-center gap-3.5 cursor-pointer group"><input type="radio" name="themeGroup" checked={selectedTheme === 'light'} onChange={() => setSelectedTheme('light')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900">Light</span></label>
              <label className="flex items-center gap-3.5 cursor-pointer group"><input type="radio" name="themeGroup" checked={selectedTheme === 'dark'} onChange={() => setSelectedTheme('dark')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900">Dark</span></label>
              <label className="flex items-center gap-3.5 cursor-pointer group"><input type="radio" name="themeGroup" checked={selectedTheme === 'system'} onChange={() => setSelectedTheme('system')} className="w-3.5 h-3.5 bg-gray-100 border-transparent text-blue-500 accent-blue-500 focus:ring-0" /><span className="text-[11px] font-bold text-gray-700 group-hover:text-gray-900">System Default</span></label>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button type="button" onClick={() => { setSelectedTheme(activeTheme); setShowThemeModal(false); }} className="text-[11px] font-black text-blue-500 hover:text-blue-600 px-3.5 py-2 rounded-xl focus:outline-none">Cancel</button>
              <button type="button" onClick={() => { setActiveTheme(selectedTheme); setShowThemeModal(false); }} className="bg-[#3b82f6] text-white text-[11px] font-black px-5 py-2 rounded-xl shadow-md focus:outline-none">Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL MODAL PORTAL LAYER: KEYBOARD SHORTCUTS */}
      {showShortcutsModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[620px] rounded-[24px] p-6 shadow-2xl border border-gray-100 flex flex-col relative">
            <h3 className="text-[13px] font-black text-[#1e2229] mb-5 tracking-tight select-none">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 pb-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Mark as unread</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="U" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Archive chat</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="E" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Pin chat</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="P" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Search Chat</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="F" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Next Chat</span><div className="flex gap-1"><KeyBadge label="Ctrl" /><KeyBadge label="Tab" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>New Group</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="N" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Increase speed of voice message</span><div className="flex gap-1"><KeyBadge label="Shift" /><KeyBadge label="." /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Settings</span><div className="flex gap-1"><KeyBadge label="Shift" /><KeyBadge label="," /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Settings</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="," /></div></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Mute</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="M" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Delete chat</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="Shift" /><KeyBadge label="D" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Search</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="F" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>New Chat</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="N" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Previous Chat</span><div className="flex gap-1"><KeyBadge label="Ctrl" /><KeyBadge label="Shift" /><KeyBadge label="Tab" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Profile & About</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="P" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Decrease speed of voice message</span><div className="flex gap-1"><KeyBadge label="Shift" /><KeyBadge label="," /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Emoji Panel</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="E" /></div></div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500"><span>Sticker Panel</span><div className="flex gap-1"><KeyBadge label="Cmd" /><KeyBadge label="S" /></div></div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-5"><button type="button" onClick={() => setShowShortcutsModal(false)} className="bg-[#3b82f6] text-white text-[11px] font-extrabold px-6 py-2 rounded-xl shadow-md focus:outline-none">OK</button></div>
          </div>
        </div>
      )}

      {/* GLOBAL MODAL: BLOCK NEW CONTACT ROSTER SELECTION */}
      {showBlockModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[350px] rounded-[24px] p-6 shadow-2xl border border-gray-100 flex flex-col relative max-h-[85%] overflow-hidden">
            <div className="flex items-center gap-4 mb-4 pb-1 select-none shrink-0"><button type="button" onClick={() => setShowBlockModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none p-0.5"><i className="fa-solid fa-xmark text-sm font-bold"></i></button><h3 className="text-[13px] font-black text-[#1e2229] tracking-tight">Block New Contact</h3></div>
            <div className="relative shrink-0 mb-4 select-none"><i className="fa-solid fa-magnifying-glass absolute left-3.5 top-[11px] text-[10px] text-gray-400"></i><input type="text" placeholder="Search" className="w-full bg-[#f4f7fe] pl-9 pr-4 py-2 rounded-xl text-xs font-semibold placeholder-gray-400 focus:outline-none" /></div>
            <div className="flex-grow overflow-y-auto space-y-1.5 pr-0.5 py-0.5">
              {masterCandidates.map((candidate) => {
                const isSpecHighlight = candidate.id === 4;
                return (
                  <div key={candidate.id} onClick={() => handleSelectBlockTarget(candidate)} className={`w-full p-3 flex items-center gap-3 rounded-2xl cursor-pointer transition-all ${isSpecHighlight ? 'bg-white border-2 border-[#3b82f6] shadow-sm' : 'bg-white border border-transparent hover:bg-slate-50/70'}`}><img src={candidate.avatar} className="w-8 h-8 rounded-full object-cover shadow-sm shrink-0" alt="" /><div className="min-w-0 text-left"><h4 className="text-[11px] font-black text-[#1e2229] truncate leading-none">{candidate.name}</h4><p className="text-[9px] font-medium text-gray-400 truncate mt-1 max-w-[220px]">{candidate.status}</p></div></div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}