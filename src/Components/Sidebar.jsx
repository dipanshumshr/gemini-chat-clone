// src/Components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import useChatStore from '../App/ChatStore';

export default function Sidebar({ onNew }) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');
  const chatrooms = useChatStore(s => s.chatrooms);
  const deleteChatroom = useChatStore(s => s.deleteChatroom);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredRooms = filter
    ? chatrooms.filter(r => r.title.toLowerCase().includes(filter.toLowerCase()))
    : chatrooms;

  return (
    <aside
      className={`flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {!collapsed && (
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Gemini
            </h2>
          )}
          <button
            onClick={onNew}
            className={`${
              collapsed ? 'p-2' : 'ml-2 px-4 py-2'
            } bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors`}
            title="New chat"
          >
            {collapsed ? '+' : 'New'}
          </button>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search chats..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              onClick={() => setFilter(searchInput.trim())}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              title="Search"
            >
              🔍
            </button>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredRooms.map(room => {
          const active = pathname === `/chat/${room.id}`;
          return (
            <div key={room.id} className="relative group">
              <button
                onClick={() => navigate(`/chat/${room.id}`)}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300'
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
                title={collapsed ? room.title : ''}
              >
                {collapsed ? (
                  <span className="text-gray-600 dark:text-gray-400">💬</span>
                ) : (
                  <span className="truncate">{room.title}</span>
                )}
              </button>
              {!collapsed && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteChatroom(room.id);
                    toast.success('Deleted');
                  }}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                  title="Delete chatroom"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
