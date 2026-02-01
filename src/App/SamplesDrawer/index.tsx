import React, { useState } from 'react';

import { EditOutlined, CheckOutlined, CloseOutlined } from '@mui/icons-material';
import { Drawer, Stack, Typography, IconButton, TextField, Box } from '@mui/material';

import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';

import SidebarButton from './SidebarButton';

export const SAMPLES_DRAWER_WIDTH = 240;

interface SamplesDrawerProps {
  templateName?: string;
  onTemplateNameChange?: (name: string) => void;
}

export default function SamplesDrawer({ templateName = "Template Name", onTemplateNameChange }: SamplesDrawerProps) {
  const samplesDrawerOpen = useSamplesDrawerOpen();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(templateName);

  const handleStartEdit = () => {
    setEditValue(templateName);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (onTemplateNameChange && editValue.trim()) {
      onTemplateNameChange(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(templateName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={samplesDrawerOpen}
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
      }}
    >
      <Stack spacing={3} py={1} px={2} width={SAMPLES_DRAWER_WIDTH} justifyContent="space-between" height="100%">
        <Stack spacing={2} >
          {/* Editable Template Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.75 }}>
            {isEditing ? (
              <>
                <TextField
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  variant="outlined"
                  size="small"
                  autoFocus
                  sx={{ flex: 1 }}
                />
                <Box sx={{cursor:"pointer"}} onClick={handleSaveEdit}>
                  <CheckOutlined sx={{fill:"#70c889ff"}} fontSize="small" />
                </Box>
                <Box sx={{cursor:"pointer"}}  onClick={handleCancelEdit}>
                  <CloseOutlined sx={{fill:"#e95d5dff"}} fontSize="small" />
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" component="h1" sx={{ flex: 1 }}>
                  {templateName}
                </Typography>
                <IconButton size="small" onClick={handleStartEdit}>
                  <EditOutlined fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>

          <Typography sx={{ p: 0.75, color: 'primary.main' }} variant="h6">Examples</Typography>
          <Stack alignItems="flex-start">
            <SidebarButton href="#">Empty</SidebarButton>
            <SidebarButton href="#sample/welcome">Welcome email</SidebarButton>
            <SidebarButton href="#sample/one-time-password">One-time passcode (OTP)</SidebarButton>
            <SidebarButton href="#sample/reset-password">Reset password</SidebarButton>
            <SidebarButton href="#sample/order-ecomerce">E-commerce receipt</SidebarButton>
            <SidebarButton href="#sample/subscription-receipt">Subscription receipt</SidebarButton>
            <SidebarButton href="#sample/reservation-reminder">Reservation reminder</SidebarButton>
            <SidebarButton href="#sample/post-metrics-report">Post metrics</SidebarButton>
            <SidebarButton href="#sample/respond-to-message">Respond to inquiry</SidebarButton>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
}
