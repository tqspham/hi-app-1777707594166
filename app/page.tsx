'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function Home(): React.ReactElement {
  const [greeting, setGreeting] = useState<string>('');
  const [hour, setHour] = useState<number>(0);
  const [userName, setUserName] = useState<string>('Guest');
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    setHour(currentHour);

    let greetingText = '';
    if (currentHour < 12) {
      greetingText = 'Good Morning';
    } else if (currentHour < 18) {
      greetingText = 'Good Afternoon';
    } else {
      greetingText = 'Good Evening';
    }

    setGreeting(greetingText);
  }, []);

  const handleNameChange = (newName: string): void => {
    setUserName(newName || 'Guest');
    setInputValue('');
  };

  const getTimeIcon = (): React.ReactElement => {
    if (hour < 12) {
      return <Sun className="w-8 h-8 text-yellow-400" />;
    }
    return <Moon className="w-8 h-8 text-indigo-400" />;
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header with icon */}
          <div className="flex items-center justify-center space-x-3">
            {getTimeIcon()}
            <Sparkles className="w-8 h-8 text-indigo-500" />
          </div>

          {/* Main greeting */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {greeting}
            </h1>
            <p className="text-2xl text-indigo-600 font-semibold">
              {userName}!
            </p>
            <p className="text-gray-600 text-sm">
              Welcome to our application. Have a wonderful day!
            </p>
          </div>

          {/* User input section */}
          <div className="space-y-3">
            <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">
              What\'s your name?
            </label>
            <div className="flex gap-2">
              <input
                id="name-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleNameChange(inputValue);
                  }
                }}
                placeholder="Enter your name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
              <button
                onClick={() => handleNameChange(inputValue)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Set
              </button>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center text-xs text-gray-500">
            <p>Current time: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </main>
  );
}