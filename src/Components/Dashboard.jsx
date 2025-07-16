import { useNavigate, useOutletContext } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import useAuthStore from '../App/loginAuth';

export default function Dashboard() {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const { onNew } = useOutletContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-[#181818ff] h-full">
      <div className="absolute top-4 right-4 flex items-center space-x-3">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
          Hello, User
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          How can I help you today?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={onNew}
            className="p-6 rounded-xl border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 
                     9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 
                     3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium">Start New Chat</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Begin a fresh conversation
            </p>
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="p-6 rounded-xl border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 
                     3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 
                     3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 
                     1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 
                     1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 
                     1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 
                     00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 
                     1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 
                     0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 
                     2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium">Settings</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize your experience
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}