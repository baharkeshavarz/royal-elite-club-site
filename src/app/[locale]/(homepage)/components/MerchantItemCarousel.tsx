import React from 'react';
import Carousel from 'react-multi-carousel';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import 'react-multi-carousel/lib/styles.css';
import { Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import useCategoriesMapper from '../hooks/useCategoriesMapper';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const MerchantItemCarousel = () => {
  const t = useTranslations();
  const items = useCategoriesMapper();

  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Typography
        variant="h4"
        color="common.black"
        textAlign="center"
        pt={2}
        pb={2}
      >
        {t('pages.home.merchant.categories')}
      </Typography>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={true}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {items.map((item) => (
          <ButtonWithIcon
            key={item.title}
            icon={item.icon}
            label={item.title}
            category={item.category}
          />
        ))}
      </Carousel>
      ;
    </Container>
  );
};

export default MerchantItemCarousel;
