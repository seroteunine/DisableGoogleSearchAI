// Storage utility
async function getPluginEnabled() {
  const { pluginEnabled = true } = await chrome.storage.sync.get({ pluginEnabled: true });
  return pluginEnabled;
}

async function setPluginEnabled(value) {
  await chrome.storage.sync.set({ pluginEnabled: value });
}

// Update UI with current state
function updateState(enabled) {
  const button = document.getElementById('buttonSwitch');
  const stateText = document.getElementById('state');

  button.textContent = enabled ? 'Turn extension off' : 'Turn extension on';
  stateText.textContent = enabled
    ? 'The extension is active and the Google AI overview will be removed.'
    : 'The extension is disabled and Google will show AI overviews.';
}

// Create and inject popup
function createPopup() {
  if (document.getElementById('disable-ai-popup')) return;

  const popup = document.createElement('div');
  popup.id = 'disable-ai-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Remove Google AI</h2>
      <p id="state">Loading...</p>
      <button id="buttonSwitch">Loading...</button>
      <button class="popup-close">&times;</button>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #disable-ai-popup {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1a202c;
    }

    .popup-content {
      background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
      padding: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      text-align: center;
      width: 320px;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
    }

    .popup-content h2 {
      font-size: 18px;
      margin: 0 0 16px 0;
      color: #1a202c;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    #state {
      font-size: 13px;
      line-height: 1.6;
      margin: 0 0 20px 0;
      color: #4a5568;
      font-weight: 500;
    }

    #buttonSwitch {
      width: 100%;
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
      letter-spacing: 0.3px;
    }

    #buttonSwitch:hover {
      background: linear-gradient(135deg, #5568d3 0%, #6b3fa0 100%);
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(102, 126, 234, 0.4);
    }

    #buttonSwitch:active {
      transform: translateY(0);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
    }

    .popup-close {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.6);
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #a0aec0;
      padding: 4px 8px;
      width: 32px;
      height: 32px;
      line-height: 1;
      transition: all 0.2s;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .popup-close:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(popup);

  // Close button
  popup.querySelector('.popup-close').addEventListener('click', () => {
    popup.remove();
  });

  // Initialize popup state and add button handler
  getPluginEnabled().then(enabled => {
    updateState(enabled);
  });

  document.getElementById('buttonSwitch').addEventListener('click', async () => {
    const enabled = await getPluginEnabled();
    await setPluginEnabled(!enabled);
    updateState(!enabled);
  });
}

// Inject popup when content script loads
createPopup();
