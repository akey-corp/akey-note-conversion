import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#242424', // Lighter dark background (softer gray)
      paper: '#2d2d2d',   // Slightly lighter gray for cards/paper
    },
    primary: {
      main: '#64b5f6', // Brighter blue for better contrast on lighter dark
    },
    secondary: {
      main: '#f06292',
    },
    text: {
      primary: '#e0e0e0', // High-contrast off-white text
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
