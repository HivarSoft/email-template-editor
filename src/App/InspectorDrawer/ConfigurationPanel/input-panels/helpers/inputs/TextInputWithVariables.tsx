import React, { useEffect,useRef, useState } from 'react';

import { InputProps, Stack } from '@mui/material';

import TextInput from './TextInput';
import VariablesButton from './VariablesButton';

type Props = {
  label: string;
  rows?: number;
  placeholder?: string;
  helperText?: string | JSX.Element;
  InputProps?: InputProps;
  defaultValue: string;
  onChange: (v: string) => void;
  showVariables?: boolean;
  showPreview?: boolean;
};

export default function TextInputWithVariables({ 
  showVariables = true,
  ...textInputProps 
}: Props) {
  const [value, setValue] = useState(textInputProps.defaultValue);
  const textFieldRef = useRef<HTMLInputElement>(null);

  // Update local state when defaultValue prop changes
  useEffect(() => {
    setValue(textInputProps.defaultValue);
  }, [textInputProps.defaultValue]);

  const handleTextChange = (newValue: string) => {
    setValue(newValue);
    textInputProps.onChange(newValue);
  };

  const handleInsertVariable = (variableName: string) => {
    const variableText = `{{${variableName}}}`;
    
    if (textFieldRef.current) {
      const input = textFieldRef.current;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      
      const newValue = value.substring(0, start) + variableText + value.substring(end);
      handleTextChange(newValue);
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        const newCursorPos = start + variableText.length;
        input.setSelectionRange(newCursorPos, newCursorPos);
        input.focus();
      }, 0);
    } else {
      // Fallback: append to end
      const newValue = value + variableText;
      handleTextChange(newValue);
    }
  };

  return (
    <Stack spacing={1}>
      <TextInput
        {...textInputProps}
        defaultValue={value}
        onChange={handleTextChange}
        InputProps={{
          ...textInputProps.InputProps,
          inputRef: textFieldRef,
        }}
      />
      
      {showVariables && (
        <VariablesButton onInsertVariable={handleInsertVariable} />
      )}
    </Stack>
  );
}