import { styled, useTheme } from '@mui/material';
import React from 'react';
import Container from '@mui/material/Container';
import Carousel from 'react-carousel-mui';
import { getMainMerchantList } from '@/services/merchant';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/[locale]/loading';
import { MerchantCard } from '../merchant-card';
import { useTranslations } from 'next-intl';
import HeadingTypography from '@/components/common/HeadingTypography';

const StyledContainer = styled(Container)(({ theme }) => ({
  '.MuiPaper-root': {
    // backgroundColor: theme.palette.grey[200],
  },
}));

const MobileMerchantsCarousel = () => {
  const theme = useTheme();
  const t = useTranslations();

  const { data: merchantList, isFetching } = useQuery({
    queryKey: ['GET_MAIN_MERCHANT_LIST'],
    queryFn: async () => {
      const { data } = await getMainMerchantList();
      return data?.value;
    },
    gcTime: 0,
  });

  if (isFetching) return <Loading />;
  return (
    <StyledContainer maxWidth="xl" sx={{ p: 3 }}>
      <HeadingTypography title={t('pages.home.merchant.title')} />
      <Carousel
        items={merchantList}
        className="test"
        itemsPerPage={{
          xs: 1,
          sm: 2,
          tablet: 2,
          md: 3,
          lg: 3,
          xl: 3,
        }}
        itemRenderer={(item) => <MerchantCard key={item.title} card={item} />}
        maxContainerWidth={theme.breakpoints.values['md']}
      />
    </StyledContainer>
  );
};

export default MobileMerchantsCarousel;
