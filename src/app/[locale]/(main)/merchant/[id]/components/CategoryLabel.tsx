import { useAppContext } from '@/hooks/useAppContext';
import { Chip, useTheme } from '@mui/material';
import React, { FC } from 'react';

interface CategoryLabelProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

const CategoryLabel: FC<CategoryLabelProps> = ({
  label,
  backgroundColor,
  textColor,
}) => {
  const { isMobile } = useAppContext();
  const theme = useTheme();

  let chipBgColor = backgroundColor ?? theme.palette.grey[50];
  let chipTextColor = textColor ?? theme.palette.text.primary;

  return (
    <Chip
      sx={{
        backgroundColor: chipBgColor,
        color: chipTextColor,
        p: 0.5,
      }}
      size={isMobile ? 'medium' : 'small'}
      label={label}
    />
  );
};

export default CategoryLabel;
