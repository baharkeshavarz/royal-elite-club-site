'use client';

import React from 'react';
import {
  AppBar,
  Stack,
  Box,
  useTheme,
  Container,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../common/Logo';
import { Link } from '@/navigation';
import LoginInfo from './components/LoginInfo';
import MenusSection from './components/MenusSection';
import { DEFAULT_HOME_PAGE_PATH } from '@/constants/routes';

const Navbar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        p: 0,
        backgroundColor: theme.palette.background.default,
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '5px',
          background: `linear-gradient(to right top, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
          zIndex: -1,
        },
        top: 0,
        zIndex: theme.zIndex.drawer,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 10 },
          bgColor: theme.palette.grey[200],
        }}
      >
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box p={0} display={{ xs: 'none', md: 'flex' }}>
              <Link href={DEFAULT_HOME_PAGE_PATH}>
                <Logo />
              </Link>
            </Box>
            <Box display={{ xs: 'none', md: 'flex' }}>
              <MenusSection />
            </Box>
          </Box>

          <Box display={{ xs: 'flex', md: 'none' }} p={1}>
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <MenuIcon />
            </IconButton>
            <Link href={DEFAULT_HOME_PAGE_PATH}>
              <Logo />
            </Link>
          </Box>

          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <LoginInfo />
          </Box>
        </Stack>
      </Container>

      {mobileOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            width: '100vw',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <MenusSection />
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
