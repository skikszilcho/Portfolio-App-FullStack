function ChatMessage({ role, content }) {
  return (
    <div className={`chat-message chat-message--${role}`}>
      {role === 'assistant' && (
        <img src="/logo.png" alt="Skikszilcho" className="chat-avatar" />
      )}
      <div className="chat-bubble">{content}</div>
    </div>
  );
}

export default ChatMessage;