import { Z_INDEX_VALUES } from '@/config/responsive';
import { alpha, Button, ButtonProps, useTheme } from '@mui/material';
import { FC } from 'react';

const RoundedButton: FC<ButtonProps> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      sx={{
        color: theme.palette.common.white,
        background: alpha(theme.palette.primary.light, 0.7),
        borderRadius: '50%',
        width: '48px',
        height: '45px',
        minWidth: '48px',
        zIndex: Z_INDEX_VALUES.button,
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;
