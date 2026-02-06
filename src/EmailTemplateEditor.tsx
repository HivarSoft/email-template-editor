import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { TEditorConfiguration } from './documents/editor/core';

import App from './App';
import theme from './theme';

// Component interface
export interface EmailTemplateEditorProps {
  template?: TEditorConfiguration;
  templateName?: string;
  headerHeight?: number;
  onSave?: (blockTemplate: TEditorConfiguration, htmlTemplate: string, variables: Record<string, string>, templateName: string) => void;
}
/**
 * Complete Email Template Editor Component
 * 
 * This component wraps the entire email template editor with all themes intact.
 * It can be used as a standalone component in any React application.
 * 
 * Features:
 * - Complete purple-themed Material-UI design system
 * - Editable template name with inline editing
 * - Auto-save functionality (1 second debounce)
 * - Manual save via save button
 * - Variable extraction and management
 * - HTML template generation
 * - Block template configuration
 * 
 * @param template - Optional initial template configuration
 * @param templateName - Optional initial template name (defaults to "Untitled Template")
 * @param onSave - Callback function called on both manual and auto saves
 * @param headerHeight - marginTop for  
 */

export default function EmailTemplateEditor({ 
  template, 
  templateName = "Untitled Template",
  headerHeight = 0,
  onSave 
}: EmailTemplateEditorProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App 
        template={template} 
        templateName={templateName}
        headerHeight={headerHeight}
        onSave={onSave}
      />
    </ThemeProvider>
  );
}

// Also export as named export for better compatibility
export { EmailTemplateEditor };