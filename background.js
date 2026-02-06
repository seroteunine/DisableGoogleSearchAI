/**
 * Helper: builds a new URL where the "q" parameter gets "-ai" appended.
 * If the parameter already ends with "-ai", we leave it unchanged.
 */
function augmentQuery(originalUrl) {
  try {
    const url = new URL(originalUrl);

    // Only act on Google search pages (e.g., /search or the root with ?q=)
    if (!url.pathname.startsWith('/search') && !url.searchParams.has('q')) {
      return null;
    }

    const q = url.searchParams.get('q');
    if (!q) return null;

    // Avoid double‑appending if the user already has "+-ai"
    if (q.includes('-ai')) return null;

    // Append the modifier and encode it safely    
    const newQ = q + ' -ai';
    url.searchParams.set('q', newQ);
    return url.toString();
  } catch (e) {
    return null;
  }
}

/**
 * Listener: fires when a navigation finishes loading.
 * We use `onCommitted` because it runs early enough to avoid a flicker,
 * yet after the URL is known.
 */
chrome.webNavigation.onCommitted.addListener(
  async (details) => {
    // We only care about the main frame (the top‑level page)
    if (details.frameId !== 0) return;

    // Only act on Google domains we have permission for
    if (!details.url.includes('google.com')) return;

    const newUrl = augmentQuery(details.url);
    if (!newUrl) return; // nothing to change

    // Update the tab only if the URL really differs
    if (newUrl !== details.url) {
      try {
        await chrome.tabs.update(details.tabId, { url: newUrl });
        // Optional: you could store a tiny log here with chrome.storage.local
      } catch (err) {
        console.warn('Failed to redirect tab:', err);
      }
    }
  },
  {
    // Filter: only trigger for URLs that match Google search patterns
    url: [
      { hostContains: 'google.com', pathContains: '/search' },
      { hostContains: 'google.com', queryContains: 'q=' } // catches root searches like "?q=foo"
    ]
  }
);