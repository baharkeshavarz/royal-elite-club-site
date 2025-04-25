'use client';

import { alpha, Tab, useTheme } from '@mui/material';
import { FC } from 'react';

interface StyledTabProps {
  label: string;
  value?: any;
  icon?: React.ReactElement;
  [x: string]: any; // To accept any extra props
}

const StyledTab: FC<StyledTabProps> = ({ label, icon, ...props }) => {
  const theme = useTheme();

  return (
    <Tab
      label={label}
      icon={icon}
      iconPosition="start"
      {...props}
      sx={{
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
        py: 0,
        m: 0,
        color: theme.palette.text.secondary,
        '&.Mui-selected': {
          background: `linear-gradient(to right top, ${alpha(
            theme.palette.secondary.light,
            0.3,
          )}, ${theme.palette.secondary.light})`,

          color: theme.palette.grey[800],
        },
        '&:hover': {
          backgroundColor: theme.palette.grey[100],
        },
        ...props.sx,
      }}
    />
  );
};

export default StyledTab;
