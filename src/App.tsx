import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Dashboard from './pages/Dashboard';
import DraftList from './pages/DraftList';
import CreateDraft from './pages/CreateDraft';
import BigBoard from './pages/BigBoard';
import AddPick from './pages/AddPick';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#FDF3E3', // Specific cream color
      paper: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navigation />
          <Box sx={{ pt: '1in' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/drafts" element={<DraftList />} />
              <Route path="/create" element={<CreateDraft />} />
              <Route path="/bigboard" element={<BigBoard />} />
              <Route path="/addpick" element={<AddPick />} />
            </Routes>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
