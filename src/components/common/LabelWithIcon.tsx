import { FC } from 'react';
import { Box, Typography, TypographyProps, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

export interface LabelWithLoadingProps extends TypographyProps {
  icon?: SvgIconComponent | null;
  label: string;
  iconColor?: any;
}

const LabelWithIcon: FC<LabelWithLoadingProps> = ({
  icon: Icon,
  label,
  iconColor,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" p={0.5}>
      {Icon && (
        <Icon
          fontSize="small"
          sx={{
            marginX: 0.2,
            color: iconColor ?? theme.palette.primary.main,
          }}
        />
      )}
      <Typography {...props}>{label}</Typography>
    </Box>
  );
};

export default LabelWithIcon;
