import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    black: {
      main: "#000",
      light: "#000",
      dark: "#000",
      contrastText: "#fff",   
     },
    secondary: {
      main: '#e18500',
      light: '#e79d33',
      dark: '#9d5d00',
      contrastText: '#ffffff',
    },
    gray: {
      main: '#f0f0f0',
      light: '#f0f0f0',
      dark: '#f0f0f0',
      contrastText: '#000',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          padding: "15px 15px",
        },
      },
    },
  },
});

export { theme };
