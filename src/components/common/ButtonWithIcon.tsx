import React, { FC } from 'react';
import { Box, ButtonProps, Stack, Typography, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import { Link } from '@/navigation';

export interface ButtonWithLoadingProps extends ButtonProps {
  icon: SvgIconComponent;
  label: string;
  category?: string;
}

const ButtonWithIcon: FC<ButtonWithLoadingProps> = ({
  icon: Icon,
  label,
  category,
  ...props
}) => {
  const theme = useTheme();
  const linkHref = `${DEFAULT_MERCHANT_LIST_PATH}?ClassOfActivities=${
    category || ''
  }`;

  return (
    <Link href={linkHref} style={{ textDecoration: 'none' }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        p={2}
        m={2}
        borderRadius={2}
        gap={1}
        sx={{
          backgroundColor: theme.palette.primary.main,
          transition: 'background-color 0.3s, color 0.3s',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            '& .icon-box': {
              color: theme.palette.primary.light,
            },
          },
        }}
      >
        <Box
          className="icon-box"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={1}
          color={theme.palette.common.white}
          sx={{
            transition: 'color 0.3s',
          }}
          aria-label={label}
        >
          <Icon sx={{ fontSize: '2.7rem' }} />
        </Box>
      </Stack>

      <Typography
        variant="body1"
        color={theme.palette.grey[800]}
        textAlign="center"
      >
        {label}
      </Typography>
    </Link>
  );
};

export default ButtonWithIcon;
