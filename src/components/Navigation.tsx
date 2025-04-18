import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Tabs, 
  Tab, 
  useMediaQuery, 
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (_event: any, newValue: string) => {
    navigate(newValue);
    setDrawerOpen(false);
  };

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/') return '/';
    if (path === '/drafts') return '/drafts';
    if (path === '/create') return '/create';
    if (path === '/bigboard') return '/bigboard';
    return '/';
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/bigboard', label: 'Big Board', icon: <AssessmentIcon /> },
  ];

  return (
    <>
      <AppBar position="fixed" color="transparent" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: 'none' }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
            </>
          ) : (
            <Tabs 
              value={getCurrentTab()} 
              onChange={handleTabChange} 
              indicatorColor="secondary" 
              textColor="inherit"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  transition: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab value="/" label="Dashboard" disableRipple sx={{ '&:focus': { outline: 'none' } }} />
              <Tab value="/bigboard" label="Big Board" disableRipple sx={{ '&:focus': { outline: 'none' } }} />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton 
                key={item.path} 
                onClick={() => handleTabChange(null, item.path)}
                selected={location.pathname === item.path}
                disableRipple
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation; 