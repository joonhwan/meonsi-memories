import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
function Input({
  name,
  label,
  type,
  autoFocus,
  half,
  handleChange,
  handleShowPassword,
}) {
  const inputProps =
    name === "password" || name === "confirmPassword"
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }
      : null;
  console.log(`name=${name}, inputProps=`, inputProps);
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        variant="outlined"
        fullWidth
        type={type}
        onChange={handleChange}
        autoFocus={autoFocus}
        InputProps={inputProps}
      ></TextField>
    </Grid>
  );
}

export default Input;
