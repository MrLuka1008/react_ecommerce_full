import { TextField } from "@mui/material";
import React from "react";

export const TextFieldComponent = ({ name, label, value, onChange, error }) => {
  return (
    <TextField
      variant="outlined"
      name={name}
      label={label}
      margin="dense"
      value={value}
      onChange={onChange}
      error={error}
      helperText={error}
    />
  );
};
