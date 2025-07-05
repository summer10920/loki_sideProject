import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    purple: Palette['primary'];
    orange: Palette['primary'];
    teal: Palette['primary'];
    lokiRed: Palette['primary'];
    lokiBlue: Palette['primary'];
    lokiGreen: Palette['primary'];
  }

  interface PaletteOptions {
    purple?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    teal?: PaletteOptions['primary'];
    lokiRed?: PaletteOptions['primary'];
    lokiBlue?: PaletteOptions['primary'];
    lokiGreen?: PaletteOptions['primary'];
  }
}
