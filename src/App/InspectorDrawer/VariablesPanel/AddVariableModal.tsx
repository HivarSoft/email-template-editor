import React, { useEffect, useState } from 'react';

import { Add, Close } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { updateVariable, useVariables } from '../../../documents/editor/EditorContext';

type AddVariableModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddVariableModal({ open, onClose }: AddVariableModalProps) {
  const variables = useVariables();
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [error, setError] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setVariableName('');
      setVariableValue('');
      setError('');
    }
  }, [open]);

  const validateVariableName = (name: string): string => {
    if (!name.trim()) {
      return 'Variable name is required';
    }
    
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name.trim())) {
      return 'Variable name must start with a letter and contain only letters, numbers, and underscores';
    }
    
    if (Object.prototype.hasOwnProperty.call(variables, name.trim())) {
      return 'A variable with this name already exists';
    }
    
    return '';
  };

  const handleVariableNameChange = (value: string) => {
    setVariableName(value);
    const validationError = validateVariableName(value);
    setError(validationError);
  };

  const handleSubmit = () => {
    const trimmedName = variableName.trim();
    const validationError = validateVariableName(trimmedName);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    updateVariable(trimmedName, variableValue.trim());
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !error && variableName.trim()) {
      handleSubmit();
    }
  };

  const isValid = variableName.trim() && !error;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="div">
            Add New Variable
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: 'grey.500' }}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <Alert severity="info" sx={{ borderRadius: 1 }}>
            Variables allow you to create dynamic content in your email templates. 
            Use the format <code>{`{{variableName}}`}</code> in your text content.
          </Alert>

          <TextField
            autoFocus
            fullWidth
            label="Variable Name"
            placeholder="e.g., userName, companyName, firstName"
            value={variableName}
            onChange={(e) => handleVariableNameChange(e.target.value)}
            onKeyPress={handleKeyPress}
            error={Boolean(error)}
            helperText={error || 'Must start with a letter and contain only letters, numbers, and underscores'}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Default Value"
            placeholder="Enter a default value (optional)"
            value={variableValue}
            onChange={(e) => setVariableValue(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            multiline
            rows={2}
            helperText="This value will be used when the variable is not set"
          />

          {variableName.trim() && !error && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, border: 1, borderColor: 'grey.200' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Preview:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontFamily: 'monospace', 
                  bgcolor: 'white', 
                  p: 1, 
                  borderRadius: 0.5,
                  border: 1,
                  borderColor: 'grey.300'
                }}
              >
                {`{{${variableName.trim()}}}`}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid}
          startIcon={<Add />}
          sx={{ minWidth: 120 }}
        >
          Add Variable
        </Button>
      </DialogActions>
    </Dialog>
  );
}