// import React, { useState } from 'react';

// export default function ProfileDrawer() {
//   const [name, setName] = useState('Shreyash Shah');
//   const [about, setAbout] = useState('Hey there, I am learning from coding monk!');

//   return (
//     <div className="w-full h-full bg-white flex flex-col p-6 border-r border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Profile</h2>
      
//       <div className="flex flex-col items-center mb-6">
//         <div className="relative w-24 h-24 rounded-full overflow-hidden group shadow-md border-2 border-slate-50">
//           <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300" alt="Avatar" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//             <i className="fa-solid fa-camera text-white text-lg"></i>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-5 flex-grow overflow-y-auto">
//         <div>
//           <label className="block text-xs font-bold text-blue-500 mb-1 tracking-wide uppercase">Your Name</label>
//           <input 
//             type="text" 
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2.5 border border-blue-400 rounded-xl text-sm font-medium text-gray-700 bg-blue-50/20 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-bold text-gray-400 mb-1 tracking-wide uppercase">About</label>
//           <textarea 
//             rows={4}
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 focus:outline-none focus:border-blue-400 resize-none"
//           />
//         </div>
//       </div>

//       <button className="w-full py-3 mt-4 bg-[#3b82f6] text-white rounded-xl font-semibold text-sm shadow-md hover:bg-blue-600 transition-colors">
//         Save
//       </button>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function ProfileDrawer() {
  const [name, setName] = useState('Shreyash Shah');
  const [about, setAbout] = useState('Hey there, I am learning from coding monk!');

  return (
    <div className="w-full h-full bg-white flex flex-col p-6 border-r border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Profile</h2>
      
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden group shadow-md border-2 border-slate-50">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300" 
            alt="Avatar" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      <div className="space-y-6 flex-grow">
        {/* Name Input */}
        <div>
          <label className="block text-xs font-bold text-blue-500 mb-1 tracking-wide uppercase">Your Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border border-blue-400 rounded-xl text-sm font-medium text-gray-700 bg-blue-50/20 focus:outline-none"
          />
        </div>

        {/* About Input - Container set to relative */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-400 mb-1 tracking-wide uppercase">About</label>
          <textarea 
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            // pb-14 ensures text doesn't hide behind the button
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 focus:outline-none focus:border-blue-400 resize-none pb-14"
          />
          
          <div className="flex justify-end mt-2">
      <button 
        className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg font-semibold text-xs shadow-md hover:bg-blue-600 transition-colors"
      >
        Save
      </button>
    </div>
        </div>
      </div>
    </div>
  );
}