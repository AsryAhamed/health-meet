import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Smile } from 'lucide-react';

const ChatSidebar = ({ onClose, userName }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to Health Meet chat!', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), isSystem: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: userName || 'You',
        text: inputValue,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isSystem: false,
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="w-80 glass-dark border-l border-slate-700/50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Chat
        </h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.isSystem
                ? 'text-center'
                : message.isOwn
                ? 'flex justify-end'
                : 'flex justify-start'
            }`}
          >
            {message.isSystem ? (
              <div className="text-xs text-slate-400 bg-slate-800/30 px-3 py-1 rounded-full">
                {message.text}
              </div>
            ) : (
              <div
                className={`max-w-[80%] ${
                  message.isOwn ? 'bg-blue-600' : 'bg-slate-700'
                } rounded-2xl px-4 py-2`}
              >
                <p className="text-xs font-medium mb-1 opacity-80">{message.sender}</p>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-60 mt-1">{message.time}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-700/50">
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 hover:bg-slate-700 rounded-xl transition-colors"
            title="Emoji"
          >
            <Smile className="w-5 h-5 text-slate-400" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl transition-colors"
            title="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSidebar;