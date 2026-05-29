import React from 'react';

export default function GroupsList({
  onSelectGroup,
  selectedGroupId,
  onOpenCreateGroup
}) {
  const groups = [
    {
      id: 201,
      name: 'Animal Kingdom',
      message: 'You: thnx!',
      time: '9:36 AM',
      members: 'Pink Panda, Turtle, 212 others',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      isPinned: true
    },
    {
      id: 202,
      name: 'Dog Hat',
      message: "It's so quiet outside 😊",
      time: '9:36 AM',
      members: 'Tom, Jerry, 15 others',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      isPinned: true
    },
    {
      id: 203,
      name: 'Cute Turtle',
      message: "That's it. Goodbye!",
      time: '9:36 AM',
      members: 'Alex, Sam, 25 others',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      isPinned: false
    },
    {
      id: 204,
      name: 'Cool Spirit',
      message: 'Look what I found',
      time: '9:36 AM',
      members: 'John, Mike, 40 others',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      isPinned: false
    },
    {
      id: 205,
      name: 'Strange Cat',
      message: 'Hi, sorry to bother you...',
      time: '9:36 AM',
      members: 'Rose, Lily, 12 others',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      isPinned: false
    },
    {
      id: 206,
      name: 'Fire Fox',
      message: 'What does the fox say?',
      time: '9:36 AM',
      members: 'Mark, Steve, 18 others',
      avatar:
        'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100',
      isPinned: false
    }
  ];

  const pinnedGroups = groups.filter(group => group.isPinned);
  const allGroups = groups.filter(group => !group.isPinned);

  const renderGroupCard = (group) => {
    const isSelected = selectedGroupId === group.id;

    return (
      <div
        key={group.id}
        onClick={() => onSelectGroup(group)}
        className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all mb-1 ${
          isSelected
            ? 'bg-[#3b82f6] text-white shadow-md'
            : 'hover:bg-slate-50'
        }`}
      >
        <img
          src={group.avatar}
          alt={group.name}
          className="w-11 h-11 rounded-full object-cover shrink-0"
        />

        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-baseline">
            <h4
              className={`text-sm font-bold truncate ${
                isSelected ? 'text-white' : 'text-gray-800'
              }`}
            >
              {group.name}
            </h4>

            <span
              className={`text-[10px] ${
                isSelected ? 'text-blue-100' : 'text-gray-400'
              }`}
            >
              {group.time}
            </span>
          </div>

          <div className="flex justify-between items-center mt-0.5">
            <p
              className={`text-xs truncate pr-2 ${
                isSelected ? 'text-blue-200' : 'text-gray-400'
              }`}
            >
              {group.message}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-5 flex justify-between items-center pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Groups</h2>
      </div>

      {/* Search */}
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

      {/* Create Group */}
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

      {/* Groups List */}
      <div className="flex-grow overflow-y-auto px-3">
        {/* Pinned */}
        <div className="px-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Pinned
        </div>

        {pinnedGroups.map(renderGroupCard)}

        {/* All Chats */}
        <div className="px-2 pt-4 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  All Chats
          All Chats
        </div>

        {allGroups.map(renderGroupCard)}
      </div>
    </div>
  );
}