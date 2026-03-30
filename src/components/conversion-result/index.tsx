import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
  Alert,
  IconButton,
} from "@mui/material";
import { Download, Visibility, Close, Refresh } from "@mui/icons-material";
import { useState } from "react";

interface ConversionResultProps {
  result: any;
  songTitle: string;
  onReset?: () => void;
}

export const ConversionResult = ({
  result,
  songTitle,
  onReset,
}: ConversionResultProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${songTitle || "song"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            Download JSON
          </Button>
          <IconButton
            color="primary"
            onClick={() => setShowPreview(!showPreview)}
            title="Toggle Preview"
          >
            {showPreview ? <Close /> : <Visibility />}
          </IconButton>
        </Stack>

        {onReset && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Refresh />}
            onClick={onReset}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}44`,
            }}
          >
            Convert Another (Reset)
          </Button>
        )}
      </Stack>

      {showPreview && (
        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "background.default", // Match app background for consistency
            maxHeight: "300px",
            overflow: "auto",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "text.secondary" }}
          >
            JSON Preview:
          </Typography>
          <pre
            style={{
              margin: 0,
              fontSize: "0.8rem",
              fontFamily: "monospace",
              color: "#e0e0e0", // Explicit high-contrast color for visibility
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  );
};
