import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router/router.tsx'

import './index.css'
import { createTheme, ThemeProvider, THEME_ID } from '@mui/material/styles'

const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#ee5f3d',
    },
    secondary: {
      main: '#2e4490',
      dark: '#23294b',
    },
    common: {
      white: '#f1f5fb',
      black: '#000000',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <Router />
    </ThemeProvider>
  </StrictMode>,
)
