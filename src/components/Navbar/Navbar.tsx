import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  Drawer,
  List,
  ListItem
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import logo from "/public/assets/tmdb-logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProfileMenu from "./ProfileMenu";

type NavbarProps = {
  isScaryMode: boolean;
  onToggleScaryMode: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isScaryMode, onToggleScaryMode }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  // Desktop Navigation
  const DesktopNav = () => (
 <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="TMDB Logo" />
      </Link>

      <div className="navbar-controls">
        {user && (
          <>
            <Link to="/favorites" className="nav-link">
              Preferits
            </Link>
          <button 
            className={`scary-mode-button ${isScaryMode ? 'active' : ''}`}
            onClick={onToggleScaryMode}
          >
              {isScaryMode ? "😱 Normal" : "🎃 Scary"}
          </button>
            <ProfileMenu />
          </>
        )}
        
        {!user && (
          <Link to="/login" className="nav-link">
            Iniciar sessió
          </Link>
        )}
      </div>
    </nav>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#0d253f',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 10px' }}>
        <Link to="/">
          <img 
            src={logo} 
            alt="TMDB Logo" 
            style={{ width: '100px', height: 'auto' }}
          />
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user && (
            <>
              <button 
                className={`scary-mode-button mobile ${isScaryMode ? 'active' : ''}`}
                onClick={onToggleScaryMode}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  position: 'relative',
                  top: 'auto',
                  right: 'auto',
                  margin: 0
                }}
              >
                {isScaryMode ? "😱" : "🎃"}
              </button>
              
              <IconButton
                color="inherit"
                aria-label="open user menu"
                edge="end"
                onClick={handleMobileMenuToggle}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
          
          {!user && (
            <Link to="/login" className="nav-link" style={{ color: 'white', textDecoration: 'none' }}>
              Iniciar sessió
            </Link>
          )}
        </Box>
      </Toolbar>

      {/* Simplified Mobile Drawer - Only User Profile */}
      {user && (
        <Drawer
          anchor="top"
          open={mobileMenuOpen}
          onClose={handleMobileMenuClose}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: '#0d253f',
              color: 'white',
              marginTop: '56px',
              borderRadius: '0 0 16px 16px',
              paddingBottom: '16px',
            },
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <IconButton 
                onClick={handleMobileMenuClose}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            <List>
              <ListItem sx={{ justifyContent: 'center', padding: '16px 0' }}>
                <ProfileMenu />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </AppBar>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
};

export default Navbar;
