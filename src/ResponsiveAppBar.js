import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SportsIcon from '@mui/icons-material/Sports';
import Logo from './Logo.png';
const pages = [
  { title: 'Accueil', path: '/accueil', icon: <HomeIcon /> },
  { title: 'Matchs', path: '/matchs', icon: <SportsIcon /> },
  { title: 'Équipes', path: '/equipes', icon: <GroupsIcon /> },
  { title: 'Classement', path: '/classement', icon: <EmojiEventsIcon /> },
  { title: 'Profile', path: '/profile', icon: <PersonIcon /> }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#000000',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        height: { xs: '70px', md: '90px' },
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            justifyContent: 'space-between',
            minHeight: { xs: '70px', md: '90px' }
          }}
        >
          {/* Logo - Desktop */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center',
              flex: 1
            }}
          >
            <Link to="/">
              <img 
                src={Logo} 
                alt="B6 Logo" 

                style={{ 
                  height: '90px',
                  marginRight: '20px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
            </Link>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ 
                color: '#c8ff00',
                padding: '12px'
              }}
            >
              <MenuIcon sx={{ fontSize: '32px' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: '#000000',
                  color: '#c8ff00',
                  marginTop: '5px'
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.path} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  selected={location.pathname === page.path}
                  sx={{
                    my: 0.5,
                    mx: 1,
                    borderRadius: 1,
                    padding: '12px 24px',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(200, 255, 0, 0.15)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(200, 255, 0, 0.1)',
                    }
                  }}
                >
                  {page.icon}
                  <Typography sx={{ ml: 2, fontSize: '16px' }}>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <Link to="/">
              <img 
                src="/b6-logo.png" 
                alt="B6 Logo" 
                style={{ 
                  height: '50px',
                  marginRight: '10px'
                }} 
              />
            </Link>
          </Box>

          {/* Desktop Menu */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 3,
              alignItems: 'center',
              flex: 2,
              justifyContent: 'flex-end'
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                startIcon={page.icon}
                sx={{ 
                  color: '#c8ff00',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: location.pathname === page.path ? 700 : 400,
                  backgroundColor: location.pathname === page.path ? 'rgba(200, 255, 0, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(200, 255, 0, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Menu utilisateur */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;