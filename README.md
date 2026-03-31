# MIDI to AKEY JSON Converter

A web-based tool for converting MIDI files into AKEY-compatible JSON format. Built with React, Material UI, and Vite.

**Live Website**: [https://akey-corp.github.io/akey-note-conversion/](https://akey-corp.github.io/akey-note-conversion/)

## Features

- **MIDI Conversion**: Convert standard MIDI files into structured JSON for AKEY.
- **Searchable Instruments**: Choose from a comprehensive list of General MIDI instruments with categorized search.
- **Smart Category Selection**: Select from over 60 musical categories or enter your own.
- **Validation**: Ensures all required metadata (Title, Category, Instrument) is provided before conversion.
- **JSON Preview**: View the generated JSON structure directly in the browser.
- **Easy Download**: One-click download of the resulting JSON file.

## Usage

1. **Upload**: Select or drag-and-drop a `.mid` or `.midi` file.
2. **Metadata**:
   - The **Song Title** will be automatically extracted from the filename but can be edited.
   - Select a **Category** from the searchable list or type a custom one.
   - Choose a **Recommended Instrument** using the grouped search selector.
3. **Convert**: Click **Convert MIDI** to generate the JSON.
4. **Download**: Once converted, you can **Preview** the JSON or click **Download JSON** to save it.
5. **Reset**: Use **Convert Another** to clear the form and start a new conversion.
