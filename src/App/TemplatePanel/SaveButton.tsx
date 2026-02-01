import React, { useState, useMemo } from 'react';

import { SaveSharp } from '@mui/icons-material';
import { IconButton, Snackbar, Tooltip } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useDocument, useVariables } from '../../documents/editor/EditorContext';
import { TEditorConfiguration } from '../../documents/editor/core';
import { extractVariablesFromDocument } from '../../utils/variables';

interface SaveButtonProps {
  onSave?: (blockTemplate: TEditorConfiguration, htmlTemplate: string, variables: Record<string, string>) => void;
}

export default function SaveButton({ onSave }: SaveButtonProps) {
  const document = useDocument();
  const variables = useVariables();
  const [message, setMessage] = useState<string | null>(null);

  // Generate HTML template
  const htmlTemplate = useMemo(() => {
    return renderToStaticMarkup(document, { rootBlockId: 'root' });
  }, [document]);

  // Extract all variables from document
  const documentVariables = useMemo(() => {
    return extractVariablesFromDocument(document);
  }, [document]);

  // Merge document variables with current variable values
  const allVariables = useMemo(() => {
    const merged: Record<string, string> = {};
    
    // Add all variables found in document with their current values or empty string
    documentVariables.forEach(varName => {
      merged[varName] = variables[varName] || '';
    });
    
    // Add any additional variables that might be set but not in document
    Object.keys(variables).forEach(varName => {
      if (!(varName in merged)) {
        merged[varName] = variables[varName];
      }
    });
    
    return merged;
  }, [documentVariables, variables]);

  const onClick = async () => {
    try {      
      // Call the onSave function if provided with all three parameters
      if (onSave) {
        onSave(document, htmlTemplate, allVariables);
      }
    } catch (error) {
      console.error('Error saving template:', error);
      setMessage('Error saving template');
    }
  };

  const onClose = () => {
    setMessage(null);
  };

  return (
    <>
      <IconButton onClick={onClick}>
        <Tooltip title="Save email template">
          <SaveSharp sx={{color:"purple.500"}} fontSize="small" />
        </Tooltip>
      </IconButton>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={onClose}
        message={message}
      />
    </>
  );
}