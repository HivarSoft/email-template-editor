import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    purple: {
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
    };
    brand: {
      navy: string;
      blue: string;
      red: string;
      green: string;
      yellow: string;
      purple: string;
      brown: string;
    };
    cadet: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
    highlight: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
  }

  interface PaletteOptions {
    purple?: {
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
    };
    brand?: {
      navy?: string;
      blue?: string;
      red?: string;
      green?: string;
      yellow?: string;
      purple?: string;
      brown?: string;
    };
    cadet?: {
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
    };
    highlight?: {
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
    };
  }
}