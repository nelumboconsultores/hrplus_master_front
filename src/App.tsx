import { BrowserRouter } from 'react-router-dom'
import { Layout } from 'core/layout'
import { useTheme } from 'core/styles'
import { AppProvider } from 'core/providers'
import { CssBaseline, ThemeProvider } from '@mui/material'

function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/">
        <AppProvider>
          <Layout />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
