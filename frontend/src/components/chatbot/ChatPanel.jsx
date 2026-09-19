import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';

const SUGGESTED_QUESTIONS = [
  "What is Ikageng's tech stack?",
  "Tell me about Ikageng's experience at IBM.",
  "What projects is Ikageng working on?",
  "Is Ikageng open to new roles?",
  "What are Ikageng's hobbies and interests?",
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Skikszilcho — Ikageng's digital alter ego. Ask me about his skills, experience, or projects. Curious about what he does for fun? I can help with that too.",
};

function ChatPanel({ messages, isLoading, onSend, onClose, isDisabled, onSuggest, staticMode }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || isDisabled) return;
    onSend(trimmed);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e);
  }

  return (
    <div className="chat-panel" role="dialog" aria-label="Skikszilcho chat">
      {/* Header */}
      <div className="chat-panel__header">
        <img src="/logo.png" alt="Skikszilcho" className="chat-header-logo" />
        <span className="chat-header-name">Skikszilcho</span>
        <button className="chat-close-btn" onClick={onClose} aria-label="Close chat">
          <i className="bx bx-x"></i>
        </button>
      </div>

      {/* Message list */}
      <div className="chat-panel__messages">
        <ChatMessage {...WELCOME_MESSAGE} />

        {messages.length === 0 && !isLoading && (
          <div className="chat-suggestions">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                className="chat-suggestion-btn"
                onClick={() => onSuggest(q)}
                disabled={isDisabled}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="chat-message chat-message--assistant">
            <img src="/logo.png" alt="Skikszilcho" className="chat-avatar" />
            <div className="chat-bubble chat-bubble--typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        {isDisabled && !isLoading && (
          <div className="chat-session-cap-notice">
            Session limit reached. Refresh the page to start a new conversation.
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input — replaced with coming-soon notice on static builds */}
      {staticMode ? (
        <div className="chat-coming-soon">
          <div className="chat-coming-soon__gears" aria-hidden="true">
            <svg className="gear gear--large" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className="gear gear--small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="chat-coming-soon__title">Chat Coming Soon</p>
          <p className="chat-coming-soon__sub">Full AI backend deploying shortly. Check back soon!</p>
        </div>
      ) : (
        <form className="chat-panel__input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isDisabled ? 'Session limit reached' : 'Ask me anything about Ikageng...'}
            disabled={isLoading || isDisabled}
            aria-label="Chat input"
          />
          <button type="submit" disabled={isLoading || isDisabled || !input.trim()} aria-label="Send">
            <i className="bx bx-send"></i>
          </button>
        </form>
      )}
    </div>
  );
}

export default ChatPanel;