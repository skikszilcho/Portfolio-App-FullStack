// Generate or retrieve a stable session ID for this browser.
// Stored in localStorage — survives page reloads, prevents quota bypass by refreshing.
function getSessionId() {
  let id = localStorage.getItem('skikszilcho_session_id');
  if (!id) {
    id = crypto.randomUUID();   // native in all modern browsers — no import needed
    localStorage.setItem('skikszilcho_session_id', id);
  }
  return id;
}

// Sends the full message history to POST /api/chat.
// Returns the assistant's reply string.
// Throws an Error with a user-facing message on failure.
export async function sendChatMessage(messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': getSessionId(),
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    if (response.status === 429) {
      throw new Error(body.error || 'Too many requests. Please try again later.');
    }
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  const data = await response.json();
  return data.reply;
}