import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useOlderMessages } from '../Hooks/useOlderMessages';
import useChatStore from '../App/ChatStore';
import { aiResponse } from '../utils/aiResponse';
import ThemeToggle from './ThemeToggle';

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = useChatStore(s => s.chatrooms.find(r => r.id === id));
  const addMessage = useChatStore(s => s.addMessage);

  const [text, setText] = useState('');
  const [preview, setPreview] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const { older, loadOlder, hasMore, loadingOlder } = useOlderMessages();
  const messages = [...older, ...(room?.messages || [])];

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages.length]);

  const sendMessage = () => {
    if (isTyping || (!text.trim() && !preview)) return;
    const content = text.trim();
    addMessage(id, {
      id: Date.now().toString(),
      author: 'user',
      text: content,
      image: preview,
      ts: new Date().toLocaleTimeString(),
    });
    setText('');
    setPreview(null);
    toast.success('Message sent');

    setIsTyping(true);
    aiResponse(content).then(reply => {
      addMessage(id, {
        id: Date.now().toString() + '-ai',
        author: 'ai',
        text: reply,
        ts: new Date().toLocaleTimeString(),
      });
      setIsTyping(false);
    });
  };

  const handleFile = e => {
    if (isTyping) return;
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const copyToClipboard = t => {
    navigator.clipboard.writeText(t);
    toast.success('Copied');
  };

  return (
    <div className="relative flex flex-col h-full bg-gray-100 dark:bg-[#1c2123ff]">
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
        <ThemeToggle />
      </div>

      <div className="relative flex-1 overflow-y-auto p-4 pt-20 space-y-3">
        {hasMore && (
          <button
            onClick={loadOlder}
            disabled={loadingOlder}
            className="block mx-auto mb-2 text-sm text-indigo-600 hover:underline disabled:opacity-50"
          >
            {loadingOlder ? 'Loading...' : 'Load older messages'}
          </button>
        )}

        {loadingOlder && (
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/2" />
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-xs px-3 py-2 rounded-lg break-words cursor-pointer ${msg.author === 'user'
                  ? 'bg-indigo-800 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
            >
              <p>{msg.text}</p>
              {msg.image && (
                <img
                  src={msg.image}
                  alt=""
                  className="mt-2 rounded-md max-h-40 object-contain"
                />
              )}
              <div className="mt-1 flex items-center justify-between text-xs opacity-50">
                <span>{msg.ts}</span>
                {msg.author === 'ai' && (
                  <button
                    onClick={() => copyToClipboard(msg.text)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="italic text-gray-500 dark:text-gray-400">
            Gemini is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <label className="cursor-pointer p-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
          📷
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            disabled={isTyping}
          />
        </label>
        {preview && (
          <div className="relative">
            <img src={preview} alt="Preview" className="h-12 rounded-md object-cover" />
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1"
            >
              ×
            </button>
          </div>
        )}
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isTyping}
        />

        <button
          onClick={sendMessage}
          disabled={isTyping || (!text.trim() && !preview)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
