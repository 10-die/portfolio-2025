'use client';

import { useEffect, useState } from 'react';
import { getOrCreateVisitorId, getDebugMode, setDebugMode } from '@/lib/visitor';

export default function DebugConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [visitorId, setVisitorId] = useState('');

  useEffect(() => {
    setVisitorId(getOrCreateVisitorId());
    setDebugEnabled(getDebugMode());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDebug = () => {
    const newState = !debugEnabled;
    setDebugEnabled(newState);
    setDebugMode(newState);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors"
        title="Debug console (Ctrl+Shift+D)"
        aria-label="Toggle debug console"
      />

      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-96 max-h-96 bg-black border border-gray-700 rounded-tl-lg overflow-hidden flex flex-col">
          <div className="bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
            <h3 className="text-white font-mono text-sm">Debug Console</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-white"
              aria-label="Close debug console"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Visitor ID</p>
              <p className="text-white font-mono text-sm break-all">{visitorId}</p>
              <button
                onClick={() => navigator.clipboard.writeText(visitorId)}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300"
              >
                Copy
              </button>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={debugEnabled}
                  onChange={toggleDebug}
                  className="w-4 h-4"
                />
                <span className="text-white text-sm">Help debug</span>
              </label>
              <p className="text-gray-500 text-xs mt-2">
                Structured logs emitted to console for every interaction.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
