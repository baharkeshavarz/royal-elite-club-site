'use client';

import ButtonWithGradient from '@/components/common/ButtonWithGradient';
import Transition from '@/components/common/Transition';
import {
  DEFAULT_DASHBOARD_PATH,
  DEFAULT_DASHBOARD_PROFILE_PATH,
  DEFAULT_LOGIN_PATH,
  DEFAULT_REGISTER_PATH,
} from '@/constants/routes';
import auth from '@/lib/auth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  Box,
  Button,
  ClickAwayListener,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const LoginInfo = () => {
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [user, setUser] = useState(auth?.user || null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    auth.logout();
    setUser(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {user ? (
        <>
          <Button
            ref={anchorRef}
            onClick={handleToggle}
            disableElevation
            variant="contained"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            sx={{
              borderRadius: 2,
              minWidth: '7rem',
              m: 0,
              p: 0.8,
              color: 'common.white',
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {user?.firstName
              ? user?.firstName + ' ' + user?.lastName
              : user?.mobileNumber}
          </Button>
          <Popper
            id="user-menu"
            anchorEl={anchorRef.current}
            open={open}
            placement="top-start"
            transition
            sx={{ zIndex: 2000 }}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 0],
                },
              },
            ]}
          >
            {({ TransitionProps }) => (
              <Transition in={open} {...TransitionProps}>
                <Paper
                  sx={{
                    borderRadius: '10px',
                    boxShadow: theme.shadows[2],
                    width: 270,
                    minWidth: 250,
                    maxWidth: 220,
                    [theme.breakpoints.down('md')]: {
                      maxWidth: 200,
                    },
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{ width: '100%', borderRadius: '8px', px: 0 }}>
                      <List>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemButton
                            onClick={() => router.push(DEFAULT_DASHBOARD_PATH)}
                          >
                            <ListItemIcon sx={{ minWidth: '2rem' }}>
                              <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography variant="subtitle2">
                                {t('header.auth.myAccount')}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ p: 0 }}>
                          <ListItemButton
                            onClick={() =>
                              router.push(DEFAULT_DASHBOARD_PROFILE_PATH)
                            }
                          >
                            <ListItemIcon sx={{ minWidth: '2rem' }}>
                              <PermIdentityIcon />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography variant="subtitle2">
                                {t('header.auth.myProfile')}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ p: 0 }} onClick={handleLogout}>
                          <ListItemButton>
                            <ListItemIcon sx={{ minWidth: '2rem' }}>
                              <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography variant="subtitle2">
                                {t('header.auth.logout')}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Transition>
            )}
          </Popper>
        </>
      ) : (
        <Button
          variant="outlined"
          component={Link}
          href={DEFAULT_LOGIN_PATH}
          sx={{
            color: theme.palette.common.black,
          }}
        >
          {t('header.auth.login')}
        </Button>
      )}

      {!user && (
        <ButtonWithGradient
          variant="contained"
          component={Link}
          href={DEFAULT_REGISTER_PATH}
          sx={{ textAlign: 'center', p: 1, minWidth: 120 }}
        >
          <Typography color="common.white">
            {t('header.auth.register')}
          </Typography>
        </ButtonWithGradient>
      )}
    </>
  );
};
export default LoginInfo;
