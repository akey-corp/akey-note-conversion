import { useState, useMemo, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { convertMidiToAkeyJson } from "./helpers/convert-midi-to-akey-json";
import { RecommendedSettings } from "./helpers/convert-midi-to-akey-json/types";
import { FileUploader } from "./components/file-uploader";
import { InstrumentSelector } from "./components/instrument-selector";
import { CategorySelector } from "./components/category-selector";
import { ConversionResult } from "./components/conversion-result";

function App() {
  const [midiFile, setMidiFile] = useState<File | null>(null);
  const [songTitle, setSongTitle] = useState("");
  const [category, setCategory] = useState("");
  const [instrument, setInstrument] = useState("Acoustic Grand Piano");
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [touched, setTouched] = useState({
    songTitle: false,
    category: false,
    instrument: false,
  });

  const isValid = useMemo(() => {
    return (
      midiFile !== null &&
      songTitle.trim() !== "" &&
      category.trim() !== "" &&
      instrument.trim() !== ""
    );
  }, [midiFile, songTitle, category, instrument]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMidiFile(file);
      if (!songTitle) {
        setSongTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleReset = () => {
    setResult(null);
    setMidiFile(null);
    setSongTitle("");
    setCategory("");
    setInstrument("Acoustic Grand Piano");
    setTouched({
      songTitle: false,
      category: false,
      instrument: false,
    });
    setShowToast(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConvert = async () => {
    setTouched({
      songTitle: true,
      category: true,
      instrument: true,
    });

    if (!isValid) return;

    setIsProcessing(true);
    try {
      const buffer = await midiFile!.arrayBuffer();
      const settings: RecommendedSettings = {
        song_title: songTitle.trim(),
        category: category.trim(),
        recommended_instrument: instrument.trim(),
      };
      const converted = await convertMidiToAkeyJson(buffer, settings);
      setResult(converted);
      setShowToast(true);
    } catch (error) {
      console.error("Conversion error:", error);
      alert("Failed to convert MIDI file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          MIDI to AKEY JSON
        </Typography>

        <Stack spacing={3}>
          <FileUploader
            midiFile={midiFile}
            onFileChange={handleFileChange}
            inputRef={fileInputRef}
          />

          <TextField
            label="Song Title"
            variant="outlined"
            fullWidth
            required
            value={songTitle}
            onChange={(e) => {
              setSongTitle(e.target.value);
              setTouched((prev) => ({ ...prev, songTitle: true }));
            }}
            error={touched.songTitle && !songTitle.trim()}
            helperText={
              touched.songTitle && !songTitle.trim()
                ? "Song title is required"
                : ""
            }
            placeholder="Enter song title"
          />

          <CategorySelector
            value={category}
            onChange={(val) => {
              setCategory(val);
              if (val.trim()) {
                setTouched((prev) => ({ ...prev, category: true }));
              }
            }}
            error={touched.category && !category.trim()}
          />

          <InstrumentSelector
            value={instrument}
            onChange={(val) => {
              setInstrument(val);
              setTouched((prev) => ({ ...prev, instrument: true }));
            }}
            error={touched.instrument && !instrument.trim()}
          />

          {!result && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleConvert}
              disabled={!isValid || isProcessing}
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              {isProcessing ? "Converting..." : "Convert MIDI"}
            </Button>
          )}

          {result && (
            <ConversionResult
              result={result}
              songTitle={songTitle}
              onReset={handleReset}
            />
          )}
        </Stack>
      </Paper>

      <Snackbar
        open={showToast}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Conversion successful!
        </Alert>
      </Snackbar>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 4, color: "text.secondary" }}
      >
        Built for AKEY
      </Typography>
    </Container>
  );
}

export default App;
