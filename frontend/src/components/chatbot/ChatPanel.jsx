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

function ChatPanel({ messages, isLoading, onSend, onClose, isDisabled, onSuggest }) {
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

      {/* Input */}
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
    </div>
  );
}

export default ChatPanel;