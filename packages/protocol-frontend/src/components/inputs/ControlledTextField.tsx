import React from "react";
import { Control, Controller, Validate } from "react-hook-form";
import { TextField } from "@mui/material";
import { isFloat, isInt } from "./rules";

export interface TextFieldsProps {
  name: string,
  label: string,
  control: Control,
  rules?: Validate<any> | Record<string, Validate<any>> | undefined,
  defaultValue?: string,
  helperText?: string,
  required?: boolean,
  valueAsNumber?: boolean,
  min?: number,
  type?: "string" | "int" | "float"
}

export default function ControlledTextField(props: TextFieldsProps){

  let rules = props.rules ?? {};

  if (props.type === "int") {
    rules = {
      isInt: isInt,
      ...rules
    }
  } else if (props.type === "float"){
    rules = {
      isFloat: isFloat,
      ...rules
    }
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue??""}
      rules={{
        min: props.min,
        required: props.required,
        validate: rules
      }}
      render={({ field, fieldState }) => (
        <>
          <TextField
            {...field}
            label={props.label}
            variant={"outlined"}
            size={"small"}
            required={props.required}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message ?? props.helperText ?? null}
          />
        </>
      )}
    />
  )
}
