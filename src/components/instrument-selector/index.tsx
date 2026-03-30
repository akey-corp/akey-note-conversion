import {
  Autocomplete,
  TextField,
  ListSubheader,
  styled,
} from "@mui/material";
import { instrumentGroups } from "../../constants/instrument-groups";

interface InstrumentSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  fontWeight: "bold",
  zIndex: 1,
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export const InstrumentSelector = ({
  value,
  onChange,
  error,
}: InstrumentSelectorProps) => {
  const options = instrumentGroups.flatMap((group) =>
    group.options.map((option) => ({
      group: group.label,
      label: option,
    }))
  );

  return (
    <Autocomplete
      id="instrument-selector"
      options={options}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.label}
      value={options.find((opt) => opt.label === value) || null}
      onChange={(_, newValue) => {
        if (newValue) {
          onChange(newValue.label);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Recommended Instrument"
          variant="outlined"
          fullWidth
          required
          error={error}
          helperText={error ? "Recommended instrument is required" : ""}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
};
