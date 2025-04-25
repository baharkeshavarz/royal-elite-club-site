import React, { useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { IconUser, IconCreditCard } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import auth from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { DEFAULT_DASHBOARD_PROFILE_PATH } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import { getProfile } from '@/services/account';

const Profile = () => {
  const t = useTranslations();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const router = useRouter();

  const userData = auth.user?.firstName
    ? `${auth.user.firstName} ${auth.user?.lastName}`
    : auth.user?.mobileNumber;

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const { mutateAsync } = useMutation({
    mutationFn: auth.logout,
  });

  const handleLogout = async () => {
    await mutateAsync(router);
  };

  const { data, isFetching } = useQuery({
    queryKey: ['GET_DASHBOARD_USER_PROFILE'],
    queryFn: async () => {
      const { data } = await getProfile();
      return data?.value;
    },
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick2}
        sx={{ color: 'common.white', fontSize: '0.9rem' }}
      >
        {userData}
      </Button>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          fontSize: '0.9rem',
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>
            <Link
              href={DEFAULT_DASHBOARD_PROFILE_PATH}
              underline="hover"
              color="inherit"
            >
              {t('header.auth.myProfile')}
            </Link>
          </ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <IconCreditCard width={20} />
          </ListItemIcon>
          <ListItemText>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Link
                href={DEFAULT_DASHBOARD_PROFILE_PATH}
                underline="hover"
                color="inherit"
              >
                {t('header.auth.myCredit')}
              </Link>
              {isFetching ? (
                <CircularProgress size={16} />
              ) : (
                <Typography>
                  {data?.credit} {t('header.auth.myCreditPoint')}
                </Typography>
              )}
            </Box>
          </ListItemText>
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            {t('header.auth.logout')}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
