import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  useTheme,
  styled,
  Grid,
} from '@mui/material';
import { Link } from '@/navigation';

import CarouselButtons from './components/CarouselButtons';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useQuery } from '@tanstack/react-query';
import { getMainMerchantList } from '@/services/merchant';
import { IMainMerchant } from '@/services/merchant/types';
import CardSkeleton from '../merchant-card/components/CardSkeleton';
import MerchantCard from '../merchant-card/MerchantCard';
import { useTranslations } from 'next-intl';
import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import HeadingTypography from '@/components/common/HeadingTypography';

const CarouselContainer = styled(Box)({
  width: '100%',
});

const CarouselCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '350px',
  background: 'none',
  marginTop: '1rem',
});

const DesktopMerchantsCarousel = () => {
  const theme = useTheme();
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: merchantList, isFetching } = useQuery({
    queryKey: ['GET_MAIN_MERCHANT_LIST'],
    queryFn: async () => {
      const { data } = await getMainMerchantList();
      return data?.value;
    },
    gcTime: 0,
  });
  const merchantsToShow = 4;
  const merchantCount = merchantList?.length || 0;

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % merchantCount);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + merchantCount) % merchantCount,
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Stack spacing={1}>
          <HeadingTypography title={t('pages.home.merchant.title')} />
          <Typography variant="body1" color="grey.800">
            {t('pages.home.merchant.comment')}
          </Typography>
        </Stack>
        <Box display="flex" gap={1}>
          <CarouselButtons nextImage={nextCard} prevImage={prevCard} />
          <Button
            variant="outlined"
            size="small"
            component={Link}
            href={DEFAULT_MERCHANT_LIST_PATH}
            sx={{
              color: theme.palette.common.black,
              borderRadius: '1rem',
              border: 1,
              borderColor: theme.palette.primary.main,
            }}
          >
            <Typography variant="caption"> {t('buttons.seeAll')}</Typography>
            <NavigateBeforeIcon />
          </Button>
        </Box>
      </Box>

      <CarouselContainer>
        <CarouselCard>
          <Grid container>
            {isFetching
              ? Array(4)
                  .fill(0)
                  .map((_item, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <CardSkeleton />
                      </Grid>
                    );
                  })
              : merchantList
                  ?.slice(currentIndex, currentIndex + merchantsToShow)
                  .map((merchant: IMainMerchant) => (
                    <Grid item xs={12} sm={6} md={3} key={merchant.id}>
                      <MerchantCard card={merchant} />
                    </Grid>
                  ))}
          </Grid>
        </CarouselCard>
      </CarouselContainer>
    </>
  );
};

export default DesktopMerchantsCarousel;
