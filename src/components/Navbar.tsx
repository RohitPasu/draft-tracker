import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <SportsFootballIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            NFL Draft Tracker
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/drafts">
            All Picks
          </Button>
          <Button color="inherit" component={RouterLink} to="/create">
            Add Pick
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 