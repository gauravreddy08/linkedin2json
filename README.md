# linkedin2json

A Chrome extension that exports any LinkedIn™ profile to a clean JSON format or PDF CV in a single click.

## What it does

- Visit any LinkedIn profile
- Click the extension icon
- Instantly export profile data as structured JSON, or download a formatted PDF CV/Resume

## Installation

1. Clone or download this repo
2. Open Chrome → `chrome://extensions/` → Enable **Developer mode**
3. Click **Load unpacked** → select this folder
4. Navigate to any LinkedIn profile and click the extension icon

## Keyboard Shortcut

- `Ctrl+Shift+E` (Windows/Linux) or `MacCtrl+Shift+E` (Mac) — Export CV to PDF

## Files

| File | Purpose |
|------|---------|
| `popup.js` | Extension popup UI logic |
| `popup.html` | Popup UI |
| `static/js/export.js` | Core export logic (JSON + PDF generation) |
| `static/js/popup.js` | Popup-side JS |
| `manifest.json` | Chrome extension manifest |

## License

MIT
