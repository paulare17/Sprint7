import React from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
    await signOut(auth);
    console.log('Logout correcte');
    // window.location.reload();
    handleClose();
    navigate('/');
  } catch (error) {
    console.error('Error al tancar sessió:', error);
  }
  };

  return (
    <>
      <Tooltip title="Configuració del compte">
        <IconButton onClick={handleClick} className='user-icon'>
          <Avatar sx={{ width: 32, height: 32}} className='user-avatar'>U</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/favorites')}>Preferits</MenuItem>
        <MenuItem onClick={handleLogout}>Tancar sessió</MenuItem>
      </Menu>
    </>
  );
}
