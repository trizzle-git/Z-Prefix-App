import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import LoginIcon from '@mui/icons-material/LoginTwoTone';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { Context } from '../context/Context';

export const TopBar = () => {
  const { appTitle, auth, setAuth } = useContext(Context)
  const nav = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={() => {
            nav('/')
            setAuth(false)
            }}>
            <HomeIcon  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            href=''
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appTitle}
          </Typography>
          { !auth &&
          <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex', justifyContent: 'right' } }}>
            <Tooltip title="Login/Logout">
              <IconButton onClick={() => {nav('/login')}} sx={{ p: 0 }}>
                <LoginIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

