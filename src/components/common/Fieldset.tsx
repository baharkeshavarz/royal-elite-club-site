import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface FieldsetProps {
  title?: ReactNode;
  color?: string;
  titleSize?: string;
  borderWidth?: number;
  borderRadius?: number;
  children: ReactNode;
  sx?: any;
}
const Fieldset: FC<FieldsetProps> = ({
  title,
  color = 'grey.800',
  titleSize = '1rem',
  borderWidth = 1,
  borderRadius = 2,
  children,
  sx = {},
  ...props
}) => {
  return (
    <Box
      component="fieldset"
      sx={{
        borderColor: color,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        ...sx,
      }}
      {...props}
    >
      {title && (
        <Typography
          component="legend"
          sx={{
            color: color,
            fontSize: titleSize,
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};
export default Fieldset;
