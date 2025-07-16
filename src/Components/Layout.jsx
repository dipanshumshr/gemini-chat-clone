import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import useChatStore from '../App/ChatStore';

export default function Layout() {
  const createChatroom = useChatStore(state => state.createChatroom);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('');

  const handleCreate = () => {
    if (!chatTitle.trim()) {
      toast.error('Please enter a chatroom name');
      return;
    }
    const room = createChatroom(chatTitle.trim());
    toast.success('Chatroom created');
    setModalOpen(false);
    setChatTitle('');
    navigate(`/chat/${room.id}`);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="flex h-screen overflow-hidden">
        <Sidebar onNew={() => setModalOpen(true)} />

        <main className="flex-1 bg-white dark:bg-gray-800 overflow-auto">
          <Outlet context={{ onNew: () => setModalOpen(true) }} />
        </main>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-600 rounded-xl shadow-xl">
              <h3 className="mb-4 text-xl font-medium text-white">New Chatroom</h3>
              <input
                type="text"
                value={chatTitle}
                onChange={e => setChatTitle(e.target.value)}
                placeholder="Enter title..."
                autoFocus
                className="w-full px-4 py-3 mb-6 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
