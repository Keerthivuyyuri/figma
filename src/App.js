import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProfileDrawer from './components/ProfileDrawer';
import ChatsList from './components/ChatsList';
import CallLogsList from './components/CallLogsList';
import GroupsList from './components/GroupsList';
import ChatLanding from './components/ChatLanding';
import ActiveChat from './components/ActiveChat';
import ActiveCallChat from './components/ActiveCallChat';
import ActiveGroupChat from './components/ActiveGroupChat';
import NewConversationModal from './components/NewConversationModal';
import CreateGroupModal from './components/CreateGroupModal';
import UpdatesList from './components/UpdatesList';
import SettingsPanel from './components/SettingsPanel'; // Imported settings panel layout

export default function App() {
  const [view, setView] = useState('profile'); // Defaulted to groups view for testing
  const [activeChat, setActiveChat] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  
  // Modal toggle state layers
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  // Smooth layout route updates
  const handleViewChange = (newView) => {
    setView(newView);
    setActiveChat(null);
    setActiveCall(null);
    setActiveGroup(null);
  };

  return (
    <div className="w-screen h-screen md:p-4 bg-slate-100 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-[1440px] max-h-[900px] bg-white md:rounded-2xl md:shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-200 relative">
        
        {/* Navigation Sidebar panel alignment */}
        <Sidebar currentView={view} setView={handleViewChange} />

        {/* Dynamic Panel Router Grid Area */}
        <div className="flex-grow flex h-[calc(100%-60px)] md:h-full w-full overflow-hidden relative">
          
          {/* Profile Route Layout Component */}
          {view === 'profile' && (
            <div className="w-full md:w-[360px] h-full shrink-0">
              <ProfileDrawer />
            </div>
          )}
          
          {/* Individual Chats Sub-View Pane */}
          {view === 'chats' && (
            <div className={`w-full md:w-[360px] h-full shrink-0 ${(activeChat || activeCall || activeGroup) ? 'hidden md:block' : 'block'}`}>
              <ChatsList 
                onSelectChat={(chat) => { setActiveCall(null); setActiveGroup(null); setActiveChat(chat); }} 
                selectedChatId={activeChat?.id} 
                onOpenNewChat={() => setIsNewChatOpen(true)}
                onNavigateToUpdates={() => setView('updates')} // Triggers custom slide routing switch hook
              />
            </div>
          )}

          {/* Voice/Video Call Logs Sub-View Pane */}
          {view === 'calls' && (
            <div className={`w-full md:w-[360px] h-full shrink-0 ${(activeChat || activeCall || activeGroup) ? 'hidden md:block' : 'block'}`}>
              <CallLogsList 
                onSelectCall={(call) => { setActiveChat(null); setActiveGroup(null); setActiveCall(call); }}
                selectedCallId={activeCall?.id}
                onOpenNewChat={() => setIsNewChatOpen(true)}
              />
            </div>
          )}

          {/* Channel Groups List Sub-View Pane */}
          {view === 'groups' && (
            <div className={`w-full md:w-[360px] h-full shrink-0 ${(activeChat || activeCall || activeGroup) ? 'hidden md:block' : 'block'}`}>
              <GroupsList 
                onSelectGroup={(group) => { setActiveChat(null); setActiveCall(null); setActiveGroup(group); }}
                selectedGroupId={activeGroup?.id}
                onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
              />
            </div>
          )}

          {/* Dynamic Updates List Sub-View Pane Layout */}
          {view === 'updates' && (
            <div className="absolute inset-0 md:static flex-grow h-full w-full z-30">
              <UpdatesList />
            </div>
          )}

          {/* ==========================================================
              DYNAMIC SETTINGS LAYOUT ROUTE VIEWPORT (Screenshot (76).png)
             ========================================================== */}
          {view === 'settings' && (
            <div className="absolute inset-0 md:static flex-grow h-full w-full z-30">
              <SettingsPanel />
            </div>
          )}

          {/* ==========================================
              RIGHT WORKSPACE CONTEXT VIEWPORTS
             ========================================== */}
          
          {/* Render Main Chat Frame Container */}
          {activeChat && view === 'chats' && (
            <div className="absolute inset-0 md:static flex-grow h-full w-full z-30">
              <ActiveChat 
                activeChat={activeChat} 
                onBack={() => setActiveChat(null)} 
                activeCall={activeCall}
                onStartCall={(callType) => {
                  setActiveCall({
                    id: activeChat.id || Date.now(),
                    name: activeChat.name,
                    avatar: activeChat.avatar,
                    type: callType
                  });
                }}
                onEndCall={() => setActiveCall(null)}
              />
            </div>
          )}

          {/* Standalone Fallback Call Log Viewport */}
          {(activeCall && !activeChat) && (
            <div className="absolute inset-0 md:static flex-grow h-full w-full z-30 flex items-center justify-center bg-slate-50">
              <div className="w-full max-w-[480px] bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                <ActiveCallChat activeCall={activeCall} onBack={() => setActiveCall(null)} />
              </div>
            </div>
          )}

          {activeGroup && view === 'groups' && (
            <div className="absolute inset-0 md:static flex-grow h-full w-full z-30">
              <ActiveGroupChat activeGroup={activeGroup} onBack={() => setActiveGroup(null)} />
            </div>
          )}

          {/* Fallback Screen Dashboard Layer */}
          {(!activeChat && !activeCall && !activeGroup && view !== 'updates' && view !== 'settings') && (
            <ChatLanding onOpenNewChat={() => setIsNewChatOpen(true)} />
          )}

        </div>
      </div>

      {/* Global Overlay Interactivity Toggles */}
      <NewConversationModal 
        isOpen={isNewChatOpen} 
        onClose={() => setIsNewChatOpen(false)}
        onSelectContact={(contact) => {
          setView('chats');
          setActiveChat(contact);
        }}
      />

      <CreateGroupModal 
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={(data) => {
          setView('groups');
          setActiveGroup({
            id: Date.now(),
            name: data.name,
            members: 'You, and selected chips',
            message: 'Group created successfully.',
            time: 'Just Now',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
          });
        }}
      />
    </div>
  );
}