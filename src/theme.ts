import { alpha, createTheme, darken, lighten } from '@mui/material/styles';

const BRAND_NAVY = '#d8b4fe';
const BRAND_BLUE = '#a855f7';
const BRAND_GREEN = '#1F8466';
const BRAND_RED = '#E81212';
const BRAND_YELLOW = '#F6DC9F';
const BRAND_PURPLE = '#a855f7'; // Primary purple - main brand color
const BRAND_BROWN = '#CC996C';

// Purple theme palette - comprehensive purple color system
const PURPLE_PALETTE = {
  50: '#faf5ff',   // Very light purple background
  100: '#f3e8ff',  // Light purple background
  200: '#e9d5ff',  // Lighter purple
  300: '#d8b4fe',  // Medium light purple
  400: '#c084fc',  // Bright purple for accents
  500: '#a855f7',  // Primary purple - main brand color
  600: '#9333ea',  // Darker purple for buttons
  700: '#7c3aed',  // Deep purple for active states
  800: '#6b21a8',  // Very dark purple
  900: '#581c87',  // Darkest purple
};
const STANDARD_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const MONOSPACE_FONT_FAMILY =
  'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace';

const BASE_THEME = createTheme({
  palette: {
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1F1F21',
      secondary: '#4F4F4F',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: STANDARD_FONT_FAMILY,
  },
});

const THEME = createTheme(BASE_THEME, {
  palette: {
    brand: {
      navy: BRAND_NAVY,
      blue: BRAND_BLUE,
      red: BRAND_RED,
      green: BRAND_GREEN,
      yellow: BRAND_YELLOW,
      purple: BRAND_PURPLE,
      brown: BRAND_BROWN,
    },
    purple: PURPLE_PALETTE,
    success: {
      main: BRAND_GREEN,
      light: lighten(BRAND_GREEN, 0.15),
      dark: darken(BRAND_GREEN, 0.15),
    },
    error: {
      main: BRAND_RED,
      light: lighten(BRAND_RED, 0.15),
      dark: darken(BRAND_RED, 0.15),
    },
    warning: {
      main: BRAND_YELLOW,
      light: lighten(BRAND_YELLOW, 0.15),
      dark: darken(BRAND_YELLOW, 0.15),
    },
    cadet: {
      100: '#F9FAFB',
      200: '#F2F5F7',
      300: '#DCE4EA',
      400: '#A8BBCA',
      500: '#6A8BA4',
    },
    highlight: {
      100: lighten(BRAND_YELLOW, 0.8),
      200: lighten(BRAND_YELLOW, 0.6),
      300: lighten(BRAND_YELLOW, 0.4),
      400: lighten(BRAND_YELLOW, 0.2),
      500: BRAND_YELLOW,
    },
    info: {
      main: PURPLE_PALETTE[500],
      light: PURPLE_PALETTE[300],
      dark: PURPLE_PALETTE[700],
    },
    primary: {
      main: PURPLE_PALETTE[500], // Use purple as primary
      light: PURPLE_PALETTE[400],
      dark: PURPLE_PALETTE[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: PURPLE_PALETTE[300],
      light: PURPLE_PALETTE[200],
      dark: PURPLE_PALETTE[700],
      contrastText: PURPLE_PALETTE[800],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        address {
          font-style: normal;
        }
        fieldset {
          border: none;
          padding: 0;
        }
        pre {
          font-family: ${MONOSPACE_FONT_FAMILY}
          white-space: pre-wrap;
          font-size: 12px;
        }
      `,
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
        action: {
          paddingTop: 0,
          marginRight: 0,
        },
        filledSuccess: {
          backgroundColor: BRAND_GREEN,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: BASE_THEME.spacing(1),
          paddingBottom: BASE_THEME.spacing(2),
        },
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        variant: 'h4',
      },
      styleOverrides: {
        root: {
          paddingTop: BASE_THEME.spacing(3),
          paddingBottom: BASE_THEME.spacing(1),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid',
          borderTopColor: BASE_THEME.palette.divider,
          marginTop: BASE_THEME.spacing(2.5),
          padding: `${BASE_THEME.spacing(1.5)} ${BASE_THEME.spacing(3)}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          ...BASE_THEME.typography.body2,
          borderColor: BASE_THEME.palette.grey[200],
        },
        head: {
          ...BASE_THEME.typography.overline,
          fontWeight: BASE_THEME.typography.fontWeightMedium,
          letterSpacing: '0.075em',
          color: BASE_THEME.palette.text.secondary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontSize: BASE_THEME.typography.pxToRem(14),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledError, &.MuiChip-filledSuccess': {
            fill: BASE_THEME.palette.primary.contrastText,
          },
        },
        sizeSmall: {
          borderRadius: BASE_THEME.spacing(0.5),
          fontSize: 12,
        },
        iconSmall: {
          fontSize: 14,
          marginLeft: BASE_THEME.spacing(1),
        },
        colorSecondary: {
          borderColor: BASE_THEME.palette.grey[400],
          color: BASE_THEME.palette.text.secondary,
        },
        label: {
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        PaperProps: {
          elevation: 2,
        },
      },
      styleOverrides: {
        paper: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
          borderRadius: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: BASE_THEME.typography.pxToRem(12),
          backgroundColor: alpha(BASE_THEME.palette.text.primary, 0.9),
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 1,
        },
        track: {
          height: 1,
          border: 'none',
        },
        rail: {
          height: 1,
          backgroundColor: BASE_THEME.palette.grey[500],
        },
        mark: {
          backgroundColor: BASE_THEME.palette.grey[500],
        },
        markActive: {
          height: 0,
        },
        thumb: {
          height: 16,
          width: 16,
          cursor: 'col-resize',
          '&:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: `0 0 0 4px ${alpha(PURPLE_PALETTE[500], 0.2)}`,
          },
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
        square: false,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
          borderRadius: BASE_THEME.spacing(1),
        },
        elevation1: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
        },
        elevation2: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
        focusRipple: true,
      },
      styleOverrides: {
        root: {
          '&.MuiButton-containedSecondary.Mui-disabled': {
            backgroundColor: BASE_THEME.palette.grey[100],
          },
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        edgeStart: {
          marginLeft: BASE_THEME.spacing(-1),
        },
        colorSecondary: {
          color: BASE_THEME.palette.grey[500],
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        textPrimary: {
          color: BASE_THEME.palette.text.primary,
        },
        textSecondary: {
          color: BASE_THEME.palette.text.secondary,
        },
        outlinedPrimary: {
          borderColor: BASE_THEME.palette.grey[300],
          color: BASE_THEME.palette.text.primary,
          '&:hover, &:active, &:focus': {
            borderColor: BASE_THEME.palette.grey[500],
            color: BASE_THEME.palette.text.primary,
          },
        },
        containedSecondary: {
          backgroundColor: BASE_THEME.palette.common.white,
          border: `1px solid ${BASE_THEME.palette.grey[300]}`,
          color: BASE_THEME.palette.text.primary,
          '&:hover, &:active, &:focus': {
            backgroundColor: BASE_THEME.palette.common.white,
            borderColor: BASE_THEME.palette.grey[500],
            color: BASE_THEME.palette.text.primary,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          paddingLeft: BASE_THEME.spacing(1.5),
          paddingRight: BASE_THEME.spacing(1.5),
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: `1px solid ${BASE_THEME.palette.grey[400]}`,
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: `1px solid ${BASE_THEME.palette.grey[500]} !important`,
          },
          '&:after': {
            borderBottom: `1px solid ${PURPLE_PALETTE[500]} !important`,
          },
          '&.MuiOutlinedInput-root:not(.Mui-error)': {
            '& fieldset': {
              borderColor: BASE_THEME.palette.grey[300],
              transition: 'border-color 0.2s',
            },
          },
          '&.MuiOutlinedInput-root:not(.Mui-disabled, .Mui-error)': {
            '&:hover fieldset': {
              borderColor: PURPLE_PALETTE[300],
            },
            '&.Mui-focused fieldset': {
              borderColor: PURPLE_PALETTE[500],
              borderWidth: 2,
            },
          },
        },
        input: {
          fontSize: BASE_THEME.typography.pxToRem(14),
          '&.Mui-disabled': {
            WebkitTextFillColor: 'inherit',
            color: BASE_THEME.palette.text.secondary,
          },
        },
        inputSizeSmall: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          '& legend': {
            fontSize: '0.85em',
            maxWidth: '100%',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: BASE_THEME.typography.pxToRem(14),
            color: BASE_THEME.palette.text.secondary,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        shrink: {
          transform: 'scale(0.85)',
          fontWeight: BASE_THEME.typography.fontWeightMedium,
          '&.Mui-focused': {
            color: PURPLE_PALETTE[600],
          },
          '&.MuiInputLabel-standard': {
            transform: 'translate(0, -4px) scale(0.85)',
            color: '#4F4F4F',
          },
          '&.MuiInputLabel-outlined': {
            transform: 'translate(15px, -8px) scale(0.85)',
          },
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        variant: 'scrollable',
      },
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${BASE_THEME.palette.divider}`,
        },
        indicator: {
          height: 2,
          backgroundColor: PURPLE_PALETTE[500],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: BASE_THEME.spacing(2),
          paddingLeft: BASE_THEME.spacing(1.5),
          paddingRight: BASE_THEME.spacing(1.5),
          fontSize: BASE_THEME.typography.pxToRem(14),
          fontFamily: BASE_THEME.typography.fontFamily,
          lineHeight: 1.5,
          fontWeight: BASE_THEME.typography.fontWeightMedium,
          transition: 'color 0.2s',
          color: BASE_THEME.palette.text.secondary,
          '&.Mui-selected': {
            color: PURPLE_PALETTE[600],
          },
          '&:hover': {
            color: PURPLE_PALETTE[500],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BASE_THEME.spacing(1),
          border: `1px solid ${BASE_THEME.palette.divider}`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: BASE_THEME.typography.pxToRem(18),
          fontWeight: BASE_THEME.typography.fontWeightMedium,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
          borderRadius: BASE_THEME.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha(PURPLE_PALETTE[500], 0.08),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(PURPLE_PALETTE[500], 0.12),
            '&:hover': {
              backgroundColor: alpha(PURPLE_PALETTE[500], 0.16),
            },
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
          borderRadius: BASE_THEME.spacing(1),
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: PURPLE_PALETTE[500],
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: BASE_THEME.palette.grey[400],
          '&.Mui-checked': {
            color: PURPLE_PALETTE[500],
          },
          '&:hover': {
            backgroundColor: alpha(PURPLE_PALETTE[500], 0.08),
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: BASE_THEME.palette.grey[400],
          '&.Mui-checked': {
            color: PURPLE_PALETTE[500],
          },
          '&:hover': {
            backgroundColor: alpha(PURPLE_PALETTE[500], 0.08),
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: PURPLE_PALETTE[500],
            '& + .MuiSwitch-track': {
              backgroundColor: PURPLE_PALETTE[500],
            },
          },
        },
        track: {
          backgroundColor: BASE_THEME.palette.grey[400],
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: PURPLE_PALETTE[100],
        },
        bar: {
          backgroundColor: PURPLE_PALETTE[500],
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: PURPLE_PALETTE[500],
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          '&.MuiFab-primary': {
            backgroundColor: PURPLE_PALETTE[500],
            '&:hover': {
              backgroundColor: PURPLE_PALETTE[600],
            },
          },
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: PURPLE_PALETTE[500],
          '&:hover': {
            backgroundColor: PURPLE_PALETTE[600],
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${BASE_THEME.palette.divider}`,
          borderRadius: BASE_THEME.spacing(1),
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        expandIconWrapper: {
          color: PURPLE_PALETTE[500],
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: BASE_THEME.spacing(2),
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          '& .MuiStepIcon-root': {
            color: BASE_THEME.palette.grey[300],
            '&.Mui-active': {
              color: PURPLE_PALETTE[500],
            },
            '&.Mui-completed': {
              color: PURPLE_PALETTE[600],
            },
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: PURPLE_PALETTE[500],
          color: '#ffffff',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${BASE_THEME.palette.divider}`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: PURPLE_PALETTE[500],
          },
        },
      },
    },
  },
  typography: {
    fontFamily: BASE_THEME.typography.fontFamily,
    h1: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(40),
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h2: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(32),
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h3: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(24),
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h4: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(20),
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h5: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(18),
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    h6: {
      fontFamily: BASE_THEME.typography.fontFamily,
      fontSize: BASE_THEME.typography.pxToRem(16),
      lineHeight: 1.5,
      letterSpacing: '-0.005em',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
    },
    body1: {
      fontSize: BASE_THEME.typography.pxToRem(14),
    },
    body2: {
      fontSize: BASE_THEME.typography.pxToRem(12),
    },
    overline: {
      fontWeight: BASE_THEME.typography.fontWeightMedium,
      letterSpacing: '0.05em',
    },
    button: {
      textTransform: 'none',
      fontWeight: BASE_THEME.typography.fontWeightMedium,
      lineHeight: 1.5,
    },
    caption: {
      letterSpacing: 0,
      lineHeight: 1.5,
    },
  },
  shadows: [
    'none',
    '0px 4px 15px rgba(33, 36, 67, 0.04), 0px 0px 2px rgba(33, 36, 67, 0.04), 0px 0px 1px rgba(33, 36, 67, 0.04)',
    '0px 10px 20px rgba(33, 36, 67, 0.04), 0px 2px 6px rgba(33, 36, 67, 0.04), 0px 0px 1px rgba(33, 36, 67, 0.04)',
    '0px 16px 24px rgba(33, 36, 67, 0.05), 0px 2px 6px rgba(33, 36, 67, 0.05), 0px 0px 1px rgba(33, 36, 67, 0.05)',
    '0px 24px 32px rgba(33, 36, 67, 0.06), 0px 16px 24px rgba(33, 36, 67, 0.06), 0px 4px 8px rgba(33, 36, 67, 0.06)',
    ...Array(20).fill('none'),
  ],
});

export default THEME;
