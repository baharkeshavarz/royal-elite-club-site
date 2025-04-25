'use client';

import { Box, Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { ISliderItem } from '@/services/site/types';
import { SliderSideItem } from './components/SliderItem';
import SwiperSlider from './components/SliderItem/SwiperSlider';

export interface MainSliderProps {
  items?: ISliderItem;
}

const MobileMainSlider: FC<MainSliderProps> = ({ items }) => {
  return (
    <Stack pt={1}>
      <Grid container spacing={1}>
        <Grid item xs={12} pt={0.2}>
          <SwiperSlider items={items} />
        </Grid>

        <Grid item xs={12} p={0}>
          <Box display="flex" justifyContent="space-between" gap={1}>
            <SliderSideItem item={items?.top} borderRadiusTop={16} />
            <SliderSideItem item={items?.down} borderRadiusBottom={16} />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MobileMainSlider;
