'use client';

import { ISliderItem } from '@/services/site/types';
import { useTheme } from '@mui/material';
import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderItem from './SliderItem';

export interface SwiperSliderProps {
  items?: ISliderItem;
}

const SwiperSlider: FC<SwiperSliderProps> = ({ items }) => {
  const theme = useTheme();
  return (
    <Swiper
      key={items ? 'loaded' : 'loading'}
      autoplay={{
        delay: 3000,
        stopOnLastSlide: false,
      }}
      dir={theme.direction}
      loop={true}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      style={{
        borderRadius: 8,
      }}
    >
      {items?.main?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <SliderItem item={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperSlider;
