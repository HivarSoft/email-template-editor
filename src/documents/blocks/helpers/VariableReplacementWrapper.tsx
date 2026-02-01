import React from 'react';

type VariableReplacementWrapperProps = {
  children: React.ReactElement;
  textProps?: any;
};

export default function VariableReplacementWrapper({ children, textProps }: VariableReplacementWrapperProps) {
  // Variables are not replaced in the main template - they remain as {{variableName}}
  // This allows the template to preserve variable placeholders
  
  // Return children as-is without any variable replacement
  return children;
}