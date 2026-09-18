import { useState, useEffect, useCallback } from 'react';
import ChatBubble from './ChatBubble';
import ChatPanel from './ChatPanel';
import { sendChatMessage } from '../../api/chat';

const SESSION_CAP = 10;

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);   // does NOT include the welcome message
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // ESC key closes the panel
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSend = useCallback(async (text) => {
    if (isLoading || isDisabled) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const rawReply = await sendChatMessage(updatedMessages);

      // Parse optional action block from reply
      // Format: SKIKSZILCHO_ACTION:{...json...}  on its own line
      const ACTION_PREFIX = 'SKIKSZILCHO_ACTION:';
      let reply = rawReply;
      const actionLineIndex = rawReply.split('\n').findIndex(l => l.startsWith(ACTION_PREFIX));
      if (actionLineIndex !== -1) {
        const lines = rawReply.split('\n');
        const actionJson = lines[actionLineIndex].slice(ACTION_PREFIX.length).trim();
        // Remove the action line from the displayed reply
        reply = lines.filter((_, i) => i !== actionLineIndex).join('\n').trim();
        try {
          const action = JSON.parse(actionJson);
          if (action.type === 'prefill_contact') {
            window.dispatchEvent(new CustomEvent('skikszilcho:prefill_contact', { detail: action }));
            // Scroll to contact section after a short delay
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 600);
          }
        } catch {
          // Malformed action JSON — ignore silently
        }
      }

      const assistantMessage = { role: 'assistant', content: reply };
      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Enforce session cap after assistant replies
      // Count only user messages (assistant replies are paired)
      const userCount = finalMessages.filter((m) => m.role === 'user').length;
      if (userCount >= SESSION_CAP) setIsDisabled(true);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: err.message || 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isDisabled, messages]);

  return (
    <>
      {isOpen && (
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
          onSuggest={handleSend}
          onClose={() => setIsOpen(false)}
          isDisabled={isDisabled}
        />
      )}
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen((o) => !o)} />
    </>
  );
}

export default ChatBot;