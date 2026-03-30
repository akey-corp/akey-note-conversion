import { Box, Button, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface FileUploaderProps {
  midiFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const FileUploader = ({
  midiFile,
  onFileChange,
  inputRef,
}: FileUploaderProps) => {
  return (
    <Box>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUpload />}
        fullWidth
        sx={{
          py: 2,
          borderStyle: "dashed",
          borderColor: midiFile ? "primary.main" : "divider",
        }}
      >
        {midiFile ? "Change MIDI File" : "Upload MIDI File"}
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".mid,.midi"
          onChange={onFileChange}
        />
      </Button>
      {midiFile && (
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, ml: 1, color: "primary.main", fontWeight: "medium" }}
        >
          Selected: {midiFile.name}
        </Typography>
      )}
    </Box>
  );
};
