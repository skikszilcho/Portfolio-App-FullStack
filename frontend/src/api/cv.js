/**
 * Fetches a short-lived signed URL for the CV PDF from GET /api/cv.
 * Returns the URL string on success.
 * Throws a user-facing error string on failure.
 *
 * @returns {Promise<string>} Signed R2 URL (TTL: 60 seconds)
 */
export async function fetchCvUrl() {
  const response = await fetch('/api/cv');

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'CV unavailable. Please try again.');
  }

  const data = await response.json();
  return data.url;
}