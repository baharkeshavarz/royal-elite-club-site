import React, { FC } from 'react';
import RoundedButton from './RoundedButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Box, useTheme } from '@mui/material';
import { Z_INDEX_VALUES } from '@/config/responsive';

interface CarouselButtonsProps {
  nextImage: any;
  prevImage: any;
}

const CarouselButtons: FC<CarouselButtonsProps> = ({
  nextImage,
  prevImage,
}) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: theme.palette.primary.main,
        height: 60,
        borderRadius: '3rem',
        gap: 1,
        p: 2,
        zIndex: Z_INDEX_VALUES.buttonContainer,
      }}
    >
      <RoundedButton onClick={nextImage} variant="contained" color="primary">
        <NavigateNextIcon fontSize="medium" />
      </RoundedButton>

      <RoundedButton onClick={prevImage} variant="contained" color="primary">
        <NavigateBeforeIcon fontSize="medium" />
      </RoundedButton>
    </Box>
  );
};

export default CarouselButtons;
