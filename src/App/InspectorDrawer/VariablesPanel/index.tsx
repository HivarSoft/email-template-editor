import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  deleteVariable,
  setVariables,
  updateVariable,
  useDocument,
  useVariables,
} from '../../../documents/editor/EditorContext';
import { extractVariablesFromDocument } from '../../../utils/variables';

import AddVariableModal from './AddVariableModal';

export default function VariablesPanel() {
  const document = useDocument();
  const variables = useVariables();
  const [modalOpen, setModalOpen] = useState(false);

  // Memoize document variables to avoid recalculation
  const documentVariables = useMemo(() => extractVariablesFromDocument(document), [document]);

  // Extract variables from document on mount and document changes
  useEffect(() => {
    const currentVariables = { ...variables };
    let hasChanges = false;
    
    // Add any new variables found in document with empty values if not already set
    documentVariables.forEach(varName => {
      if (!(varName in currentVariables)) {
        currentVariables[varName] = '';
        hasChanges = true;
      }
    });
    
    // Only update if there are actual changes
    if (hasChanges) {
      setVariables(currentVariables);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentVariables]); // Intentionally excluding 'variables' to prevent infinite loop

  const handleAddVariable = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleUpdateVariable = useCallback((key: string, value: string) => {
    updateVariable(key, value);
  }, []);

  const handleDeleteVariable = useCallback((key: string) => {
    deleteVariable(key);
  }, []);

  const allVariableKeys = useMemo(() => 
    [...new Set([...Object.keys(variables), ...documentVariables])], 
    [variables, documentVariables]
  );

  return (
    <Box sx={{ p: 2, position: 'relative' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">
          Template Variables
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={handleAddVariable}
          sx={{ borderRadius: 2 }}
        >
          Add Variable
        </Button>
      </Stack>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Variables are placeholders in your template marked with double curly braces like {`{{name}}`}.
        These variables map with system variables
      </Typography>

      <Stack spacing={2}>
        {/* Existing Variables */}
        {allVariableKeys.length > 0 ? (
          allVariableKeys.map((key) => (
            <Paper key={key} sx={{ p: 2, borderRadius: 2 }} variant="outlined">
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: 'monospace',
                      bgcolor: 'grey.100',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.875rem'
                    }}
                  >
                    {`{{${key}}}`}
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    {documentVariables.includes(key) && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'primary.main',
                          bgcolor: 'primary.50',
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        Used in template
                      </Typography>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteVariable(key)}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Enter default value for ${key}`}
                  value={variables[key] || ''}
                  onChange={(e) => handleUpdateVariable(key, e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />
              </Stack>
            </Paper>
          ))
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }} variant="outlined">
            <Typography color="text.secondary" gutterBottom>
              No variables found in your template
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add text with {`{{variableName}}`} syntax to create variables, or click the button above to add one manually.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddVariable}
              sx={{ borderRadius: 2 }}
            >
              Add Your First Variable
            </Button>
          </Paper>
        )}
      </Stack>

      <AddVariableModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
}