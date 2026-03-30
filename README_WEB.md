# MIDI to AKEY JSON Web Converter

This is a web-based version of the MIDI to AKEY JSON converter, built with React and Vite, and designed to be hosted on GitHub Pages.

## Features
- **File Upload:** Drag and drop or select a `.mid` or `.midi` file.
- **Song Metadata:** Enter `song_title`, `category`, and select a `recommended_instrument`.
- **Grouped Instrument Dropdown:** Instruments are organized by category.
- **Instant Conversion:** Converts MIDI to AKEY JSON format directly in the browser.
- **Download:** Download the resulting JSON file.

## Getting Started

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

### Deployment to GitHub Pages
1. Ensure your project is in a GitHub repository.
2. Initialize the repository and set the remote (if not already done):
   ```bash
   git init
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
   This will build the project and push it to the `gh-pages` branch.

## How to add more instruments
The instrument list is located in `src/App.tsx`. You can add more instruments to the `instrumentGroups` array.
```typescript
const instrumentGroups = [
  {
    label: "Pianos",
    options: ["Acoustic Grand Piano", "New Instrument"]
  },
  {
    label: "Organs",
    options: ["Church Organ"]
  }
];
```
