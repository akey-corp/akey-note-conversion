import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { categories } from "../../constants/categories";

const filter = createFilterOptions<string>();

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const CategorySelector = ({
  value,
  onChange,
  error,
}: CategorySelectorProps) => {
  return (
    <Autocomplete
      id="category-selector"
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={categories}
      value={value}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          onChange(newValue);
        } else {
          onChange(newValue || "");
        }
      }}
      onInputChange={(_, newInputValue) => {
        onChange(newInputValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          // No need to add "Add ..." prefix, freeSolo handles raw input
        }

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          variant="outlined"
          fullWidth
          required
          placeholder="e.g. Classical, Pop, Lullaby"
          error={error}
          helperText={error ? "Category is required" : ""}
        />
      )}
    />
  );
};
