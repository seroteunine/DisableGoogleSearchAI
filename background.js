// Storage utility functions
async function getPluginEnabled() {
  const { pluginEnabled = true } = await chrome.storage.sync.get({ pluginEnabled: true });
  return pluginEnabled;
}

async function setPluginEnabled(value) {
  await chrome.storage.sync.set({ pluginEnabled: value });
}

// Inject content script on icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

// Augment Google search queries with "-ai" when extension is enabled
function augmentQuery(url) {
  try {
    const parsedUrl = new URL(url);
    
    // Only process Google search pages
    if (!parsedUrl.pathname.startsWith('/search') && !parsedUrl.searchParams.has('q')) {
      return null;
    }

    const query = parsedUrl.searchParams.get('q');
    if (!query || query.includes('-ai')) return null;

    parsedUrl.searchParams.set('q', query + ' -ai');
    return parsedUrl.toString();
  } catch (e) {
    return null;
  }
}

// Intercept Google search navigation and modify query
chrome.webNavigation.onCommitted.addListener(
  async (details) => {
    // Only process main frame navigation on Google
    if (details.frameId !== 0 || !details.url.includes('google.com')) return;

    const newUrl = augmentQuery(details.url);
    if (newUrl && newUrl !== details.url && await getPluginEnabled()) {
      chrome.tabs.update(details.tabId, { url: newUrl }).catch(() => {});
    }
  },
  {
    url: [
      { hostContains: 'google.com', pathContains: '/search' },
      { hostContains: 'google.com', queryContains: 'q=' }
    ]
  }
);