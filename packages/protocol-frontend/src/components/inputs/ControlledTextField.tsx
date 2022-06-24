import React, { ChangeEventHandler } from "react";
import { Control, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export interface TextFieldsProps {
  name: string,
  label: string,
  control: Control,
  rules?: object,
  defaultValue?: string,
  helperText?: string,
}

export default function ControlledTextField(props: TextFieldsProps){
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue??""}
      rules={props.rules}
      render={({ field, fieldState }) => (
        <>
          <TextField
            {...field}
            label={props.label}
            variant={"outlined"}
            size={"small"}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message ?? props.helperText ?? null}
          />
        </>
      )}
    />
  )
}
