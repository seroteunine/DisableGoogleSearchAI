# Disable Google Search AI

A Chrome extension that removes AI overviews from Google Search results by automatically appending `-ai` to your search queries.

## Features

✨ **Seamless Integration** - Works automatically on all Google searches
🚀 **Fast & Lightweight** - Minimal performance impact
🎛️ **Easy Toggle** - Turn the extension on/off with a single click
💾 **Persistent Settings** - Your preferences are saved locally
🔒 **Privacy-Focused** - No data collection or tracking

## Installation

### Load Unpacked Extension (Development)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top right corner)
4. Click **Load unpacked**
5. Select the `DisableGoogleSearchAI` folder
6. The extension is now ready to use!

### Release Installation (Chrome Web Store)

[Coming soon]

## How It Works

The extension automatically detects Google Search navigation and appends `-ai` to your search queries. This parameter tells Google to exclude AI overview results from the search results page.

### How to Use

1. **Automatic Mode**: The extension modifies your Google searches automatically
2. **Toggle Control**: Click the extension icon to open the popup and turn the extension on/off
3. **Real-time Sync**: Changes are synchronized across all your tabs

## Usage

- **Click the extension icon** in your Chrome toolbar to open the control popup
- **Toggle the button** to enable or disable the AI overview removal
- **Current status** is displayed in the popup
- **Click ×** to close the popup

## How It Works Technically

The extension uses two main scripts:

### `background.js`
- Listens for Google Search page navigation
- Modifies search queries by appending `-ai` parameter
- Manages storage and settings

### `content.js`
- Creates an injected popup UI when you click the extension icon
- Handles toggle functionality
- Manages local state display

## Permissions Explained

- **`tabs`** - Required to detect which tab you're on
- **`webNavigation`** - Required to intercept Google Search navigation
- **`storage`** - Required to save your extension preferences
- **`scripting`** - Required to inject the popup UI
- **`<all_urls>`** - Allows the extension to work on all websites

## Manifest Version

Uses Manifest V3 (the latest Chrome extension standard)

## Troubleshooting

### Extension doesn't appear to work
1. Make sure persistence mode is enabled (toggle the button)
2. Try doing another Google search
3. Reload the extension at `chrome://extensions/`

### Settings not saving
1. Check that you have enabled cookies/storage for the extension
2. Try clearing the extension's stored data and re-enabling

## Development

### File Structure
```
DisableGoogleSearchAI/
├── manifest.json          # Extension configuration
├── background.js          # Service worker (main logic)
├── content.js             # Content script (UI injection)
├── icon.svg               # Main extension icon (128x128)
├── icons/
│   ├── icon-16.svg        # Toolbar icon (small)
│   ├── icon-48.svg        # Chrome Web Store display
│   └── icon-128.svg       # Chrome Web Store display (large)
├── README.md              # This file
├── PRIVACY_POLICY.md      # Privacy policy
├── STORE_DESCRIPTION.md   # Chrome Web Store listing
├── CHANGELOG.md           # Version history
└── LICENSE                # MIT License
```

### Icon Design

The extension features a distinctive red **"No AI"** icon design:
- Red circle (stop sign style) background
- White diagonal line through it
- Bold "AI" text in the center
- Professional and immediately recognizable

### Building & Testing
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the **refresh icon** next to the extension
4. Test your changes

## License

MIT License - see [LICENSE](LICENSE) file for details

## Version History

### v1.0 (February 2026)
- Initial release
- Automatic Google Search AI removal
- Toggle control popup
- Local preference storage

## Contributing

Contributions are welcome! Feel free to:
1. Report bugs
2. Suggest features
3. Submit pull requests

## Support

For issues or questions, please [open an issue on GitHub].

---

**Disclaimer**: This extension modifies your Google Search behavior. Use responsibly and ensure you have the right to use this tool in your jurisdiction.
