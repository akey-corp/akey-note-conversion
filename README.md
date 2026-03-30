# MIDI to AKEY JSON Converter

A web-based tool for converting MIDI files into AKEY-compatible JSON format. Built with React, Material UI, and Vite.

## Features

- **MIDI Conversion**: Convert standard MIDI files into structured JSON for AKEY.
- **Searchable Instruments**: Choose from a comprehensive list of General MIDI instruments with categorized search.
- **Smart Category Selection**: Select from over 60 musical categories or enter your own.
- **Validation**: Ensures all required metadata (Title, Category, Instrument) is provided before conversion.
- **JSON Preview**: View the generated JSON structure directly in the browser.
- **Lighter Dark Mode**: A clean, modern dark theme optimized for visibility and focus.
- **Easy Download**: One-click download of the resulting JSON file.

## Tech Stack

- **Frontend**: React 19 (TypeScript)
- **UI Components**: Material UI (MUI)
- **MIDI Processing**: [@tonejs/midi](https://github.com/Tonejs/Midi)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/[your-username]/akey-note-conversion.git
   cd akey-note-conversion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build & Deploy

#### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

#### Deploying to GitHub Pages

The project is configured to deploy via the `gh-pages` package.

1. Ensure your `package.json` has the correct `homepage` field:
   ```json
   "homepage": "https://DeweyHammers.github.io/akey-note-conversion",
   ```
2. Run the deploy script:
   ```bash
   npm run deploy
   ```

## Usage

1. **Upload**: Select or drag-and-drop a `.mid` or `.midi` file.
2. **Metadata**:
   - The **Song Title** will be automatically extracted from the filename but can be edited.
   - Select a **Category** from the searchable list or type a custom one.
   - Choose a **Recommended Instrument** using the grouped search selector.
3. **Convert**: Click **Convert MIDI** to generate the JSON.
4. **Download**: Once converted, you can **Preview** the JSON or click **Download JSON** to save it.
5. **Reset**: Use **Convert Another** to clear the form and start a new conversion.

## License

[MIT](LICENSE)
