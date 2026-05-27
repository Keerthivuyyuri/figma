import React, { useState } from 'react';

export default function ActiveGroupChat({ activeGroup, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi 👋 How are you ?", time: "9:36 AM", isSender: false },
    { id: 2, text: "Hi 😄 Panda, not bad, u ?", time: "9:37 AM", isSender: true },
    { id: 3, text: "Can you send me an abstract image?", time: "9:37 AM", isSender: false },
    { id: 4, type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400", time: "10:30 AM", isSender: false },
    { id: 5, text: "Can you send it as file ?", time: "11:12 AM", isSender: true },
    { id: 6, type: "file", name: "Abstract.png", time: "11:20 AM", isSender: false },
    { id: 7, text: "Thnx!", time: "11:20 AM", isSender: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true
    }]);
    setInput("");
  };

  return (
    <div className="w-full h-full bg-[#f4f7fe] flex flex-col">
      {/* Group Header Strip */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-black block md:hidden mr-1">
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </button>
          <img src={activeGroup.avatar} alt={activeGroup.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="text-sm font-bold text-gray-800">{activeGroup.name}</h3>
            {/* Group Members subtext string */}
            <p className="text-[10px] text-gray-400 font-medium truncate max-w-[180px] sm:max-w-[300px]">
              {activeGroup.members}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <button className="hover:text-gray-600"><i className="fa-solid fa-magnifying-glass"></i></button>
          <button className="hover:text-gray-600"><i className="fa-solid fa-chevron-down"></i></button>
        </div>
      </div>

      {/* Messages Scroll Layer */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.isSender ? 'items-end' : 'items-start'}`}>
            
            {!m.type && (
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-sm leading-relaxed ${
                m.isSender ? 'bg-[#3b82f6] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
              }`}>
                {m.text}
              </div>
            )}

            {m.type === 'image' && (
              <div className="max-w-[260px] rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white relative">
                <img src={m.src} alt="Shared" className="w-full h-auto object-cover max-h-48" />
                <div className="absolute bottom-2 right-2 bg-black/60 text-[9px] text-white px-1.5 py-0.5 rounded font-medium">10:30</div>
              </div>
            )}

            {m.type === 'file' && (
              <div className="w-full max-w-[280px] bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                    <i className="fa-regular fa-image text-lg"></i>
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-800 truncate">{m.name}</h5>
                    <p className="text-[9px] text-gray-400 font-medium">Image file</p>
                  </div>
                </div>
                <button className="w-7 h-7 rounded-full bg-slate-50 border border-gray-100 text-gray-500 hover:text-black flex items-center justify-center shrink-0 transition-colors">
                  <i className="fa-solid fa-arrow-down text-xs"></i>
                </button>
              </div>
            )}

            <span className="text-[9px] text-gray-400 mt-1 px-1 font-medium">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input Entry Box */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
        <button type="button" className="text-gray-400 hover:text-gray-600 px-1"><i className="fa-solid fa-paperclip text-lg"></i></button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..." 
          className="flex-grow bg-[#f4f7fe] px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none text-gray-700 placeholder-gray-400" 
        />
        <button type="button" className="text-gray-400 hover:text-gray-600 px-1"><i className="fa-regular fa-face-smile text-lg"></i></button>
        <button type="submit" className="w-9 h-9 rounded-xl bg-[#3b82f6] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md shrink-0">
          <i className="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </form>
    </div>
  );
}