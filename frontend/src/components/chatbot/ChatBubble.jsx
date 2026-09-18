function ChatBubble({ isOpen, onClick }) {
  return (
    <div className="chat-bubble-wrapper">
      {!isOpen && (
        <span className="chat-bubble-tooltip" aria-hidden="true">
          Hi, I am Skikszilcho!
        </span>
      )}
      <button
        className={`chat-bubble-btn ${isOpen ? 'chat-bubble-btn--open' : ''}`}
        onClick={onClick}
        aria-label={isOpen ? 'Close Skikszilcho' : 'Open Skikszilcho'}
      >
        {isOpen
          ? <i className="bx bx-x"></i>
          : <img src="/logo.png" alt="Skikszilcho" className="chat-bubble-logo" />
        }
      </button>
    </div>
  );
}

export default ChatBubble;