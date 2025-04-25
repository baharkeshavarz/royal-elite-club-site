'use client';

import { Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { ISliderItem } from '@/services/site/types';
import { SliderSideItem } from './components/SliderItem';
import SwiperSlider from './components/SliderItem/SwiperSlider';

export interface DesktopMainSliderProps {
  items?: ISliderItem;
}

const DesktopMainSlider: FC<DesktopMainSliderProps> = ({ items }) => {
  return (
    <Stack p={1} pt={3}>
      <Grid container spacing={2}>
        <Grid item sm={8} p={0.2}>
          <SwiperSlider items={items} />
        </Grid>
        <Grid item sm={4} p={0.2}>
          <SliderSideItem item={items?.top} borderRadiusTop={32} />
          <SliderSideItem item={items?.down} borderRadiusBottom={32} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DesktopMainSlider;
