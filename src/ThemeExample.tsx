import React from 'react';
import { Button, Stack, Typography, Box, useTheme } from '@mui/material';

/**
 * Example component demonstrating the purple theme usage
 */
export default function ThemeExample() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Purple Theme Example
      </Typography>
      
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <Typography variant="body1">
          The theme now uses purple as the primary color:
        </Typography>
        
        <Button variant="contained" color="primary">
          Primary Button (Purple 500)
        </Button>
        
        <Button variant="outlined" color="primary">
          Outlined Primary Button
        </Button>
        
        <Button variant="contained" color="secondary">
          Secondary Button (Purple 300)
        </Button>
        
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
          Primary Color Background: {theme.palette.primary.main}
        </Box>
        
        <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', borderRadius: 1 }}>
          Secondary Color Background: {theme.palette.secondary.main}
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Purple palette values:
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.purple[300], borderRadius: 1 }} />
            <Typography variant="body2">300: {theme.palette.purple[300]} (Medium light purple)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.purple[400], borderRadius: 1 }} />
            <Typography variant="body2">400: {theme.palette.purple[400]} (Bright purple for accents)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.purple[500], borderRadius: 1 }} />
            <Typography variant="body2">500: {theme.palette.purple[500]} (Primary purple - main brand color)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.purple[600], borderRadius: 1 }} />
            <Typography variant="body2">600: {theme.palette.purple[600]} (Darker purple for buttons)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.purple[700], borderRadius: 1 }} />
            <Typography variant="body2">700: {theme.palette.purple[700]} (Deep purple for active states)</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}