import React from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import theme from './theme';
import { TEditorConfiguration } from './documents/editor/core';

// Example usage with props
const handleSave = (blockTemplate: TEditorConfiguration, htmlTemplate: string, variables: Record<string, string>, templateName: string) => {
  console.log('Save/Auto-Save:', templateName);
  console.log('Block Template:', blockTemplate);
  console.log('HTML Template:', htmlTemplate);
  console.log('Variables:', variables);
  // Your save logic here - handles both manual saves and auto-saves
};

// Optional: provide an initial template and template name
const initialTemplate: TEditorConfiguration | undefined = undefined;
const initialTemplateName = "Template 1";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App 
        template={initialTemplate} 
        templateName={initialTemplateName}
        onSave={handleSave}
      />
    </ThemeProvider>
  </React.StrictMode>
);
