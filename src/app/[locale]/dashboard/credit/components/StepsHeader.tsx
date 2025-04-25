import React, { FC } from 'react';
import { Typography, Stack, Avatar } from '@mui/material';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface StepsHeaderProps {
  title: string;
  icon: React.ElementType;
}

const StepsHeader: FC<StepsHeaderProps> = ({ title, icon }) => {
  const Icon: React.ElementType = icon || StarHalfIcon;
  return (
    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <Icon sx={{ fontSize: 20, color: 'white' }} />
      </Avatar>
      <Typography fontWeight="bold" variant="body1">
        {title}
      </Typography>
    </Stack>
  );
};

export default StepsHeader;
