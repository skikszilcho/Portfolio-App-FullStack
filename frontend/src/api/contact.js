/**
 * Sends a contact form submission to POST /api/contact.
 * Returns void on success.
 * Throws a user-facing error string on failure.
 *
 * @param {{ fullName: string, email: string, mobileNumber: string, subject: string, message: string }} payload
 */
export async function sendContactMessage(payload) {
  const response = await fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    if (response.status === 429) {
      throw new Error('Too many requests. Please try again in a few minutes.');
    }
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  // 200 { ok: true } — no return value needed
}