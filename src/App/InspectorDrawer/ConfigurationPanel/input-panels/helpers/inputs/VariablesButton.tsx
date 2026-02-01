import React, { useState } from 'react';

import {
  Add,
  ContentCopy,
  KeyboardArrowDown,
  Settings,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import {
  updateVariable,
  useDocument,
  useVariables,
} from '../../../../../../documents/editor/EditorContext';
import { extractVariablesFromDocument } from '../../../../../../utils/variables';

type VariablesButtonProps = {
  onInsertVariable?: (variableName: string) => void;
};

export default function VariablesButton({ onInsertVariable }: VariablesButtonProps) {
  const document = useDocument();
  const variables = useVariables();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableValue, setNewVariableValue] = useState('');

  const documentVariables = extractVariablesFromDocument(document);
  const allVariableKeys = [...new Set([...Object.keys(variables), ...documentVariables])];
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInsertVariable = (variableName: string) => {
    if (onInsertVariable) {
      onInsertVariable(variableName);
    }
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(`{{${variableName}}}`);
    handleClose();
  };

  const handleAddNewVariable = () => {
    if (newVariableName.trim() && !Object.prototype.hasOwnProperty.call(variables, newVariableName.trim())) {
      updateVariable(newVariableName.trim(), newVariableValue.trim());
      setNewVariableName('');
      setNewVariableValue('');
      setDialogOpen(false);
    }
  };

  const handleOpenAddDialog = () => {
    handleClose();
    setDialogOpen(true);
  };

  return (
    <Box pt={2}>
      <Button
        variant="contained"
        size="small"
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        startIcon={<Settings />}
        fullWidth
        sx={{ justifyContent: 'space-between' }}
      >
        Variables ({allVariableKeys.length})
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 300,
              minWidth: 250,
            },
          },
        }}
      >
        {allVariableKeys.length > 0 ? (
          <>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Click to insert variable
              </Typography>
            </Box>
            {allVariableKeys.map((variableName) => (
              <MenuItem
                key={variableName}
                onClick={() => handleInsertVariable(variableName)}
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'monospace' }}
                    >
                      {`{{${variableName}}}`}
                    </Typography>
                    {documentVariables.includes(variableName) && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.50',
                          px: 0.5,
                          py: 0.25,
                          borderRadius: 0.5,
                          fontSize: '0.65rem',
                        }}
                      >
                        Used
                      </Typography>
                    )}
                  </Box>
                </ListItemText>
              </MenuItem>
            ))}
            <Divider />
          </>
        ) : (
          <Box sx={{ px: 2, py: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No variables found
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Add variables by typing {`{{variableName}}`} in your content
            </Typography>
          </Box>
        )}
        
        <MenuItem onClick={handleOpenAddDialog}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add New Variable</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Variable</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Variable Name"
            placeholder="e.g., userName, companyName"
            fullWidth
            variant="outlined"
            value={newVariableName}
            onChange={(e) => setNewVariableName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddNewVariable();
              }
            }}
            helperText="Variable names should be descriptive and contain no spaces"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Default Value"
            placeholder="e.g., John Doe, Acme Corp"
            fullWidth
            variant="outlined"
            value={newVariableValue}
            onChange={(e) => setNewVariableValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddNewVariable();
              }
            }}
            helperText="Optional default value for this variable"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setNewVariableName('');
              setNewVariableValue('');
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddNewVariable}
            disabled={!newVariableName.trim() || Object.prototype.hasOwnProperty.call(variables, newVariableName.trim())}
          >
            Add Variable
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}