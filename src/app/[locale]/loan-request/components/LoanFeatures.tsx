import {
  Box,
  Grid,
  useTheme,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import React, { useRef } from 'react';
import LoanItem from './LoanItem';
import Image from '@/components/common/Image';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { useMutation } from '@tanstack/react-query';
import { loadRequest } from '@/services/club';
import { useAppContext } from '@/hooks/useAppContext';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useTranslations } from 'next-intl';

const landingItems = [
  {
    title: 'تسهیلات  تا 1 میلیارد ریال',
    img: '/assets/images/landing/elite-01.png',
  },
  {
    title: 'باز پرداخت 12 و 24 ماهه',
    img: '/assets/images/landing/elite-02.png',
  },
  {
    title: '%23 کارمزد سالانه',
    img: '/assets/images/landing/elite-03.png',
  },
  {
    title: 'بدون ضامن و با یک برگ چک صیادی',
    img: '/assets/images/landing/elite-04.png',
  },
  {
    title: 'فروشگاه های متنوع خرید کالا (موبایل، لوازم خانگی، ...)',
    img: '/assets/images/landing/elite-05.png',
  },
  {
    title: 'اخذ آسان تسهیلات',
    img: '/assets/images/landing/elite-06.png',
  },
];

const LoanFeatures = () => {
  const theme = useTheme();
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const requestLoanRef = useRef<null | HTMLDivElement>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loadRequest,
  });

  const onTakeLoan = async () => {
    const { data } = await mutateAsync();

    if (data?.succeed && data?.value?.url) {
      window.open(data.value.url);
    }
  };

  const handleScrollToRequest = () => {
    if (requestLoanRef?.current) {
      requestLoanRef!.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent
          sx={{
            p: 3,
            m: 2,
            borderRadius: 16,
            borderColor: theme.palette.grey[500],
            bgcolor: theme.palette.common.white,
          }}
        >
          <Typography
            variant="h5"
            color="primary.main"
            textAlign="center"
            pb={2}
          >
            با اعتبار خرید باشگاه تخفیفی رویال الیت (طرح جت وام با تامین اعتبار
            بانک ملت)، اقساطی خرید کنید
          </Typography>
          <Typography
            variant="subtitle1"
            color="grey.800"
            textAlign="center"
            pb={4}
          >
            در طرح خرید اقساطی جت وام شما می‌توانید از 100 میلیون تا 1 میلیارد
            ریال وام خرید اقساطی با کارمزد بانکی را از رویال الیت دریافت کنید.
          </Typography>

          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={isMobile ? '100%' : '50%'}
              borderRadius={8}
              p={2}
              ref={requestLoanRef}
            >
              <ButtonWithLoading
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={isPending}
                isLoading={isPending}
                sx={{ p: 1, my: 1, color: 'common.white' }}
                onClick={onTakeLoan}
              >
                {t('pages.landing.jetVamRequest')}
              </ButtonWithLoading>
            </Box>
          </Grid>

          <Grid
            container
            spacing={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Box width="100%" height="100%">
                <Image
                  src="/assets/images/landing/loan-calculation4.jpg"
                  width={400}
                  height={400}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Grid
                container
                spacing={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                {landingItems.slice(0, 3).map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <LoanItem title={item.title} img={item.img} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={3}>
              <Grid
                container
                spacing={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {landingItems.slice(3, 6).map((item, index) => (
                  <Grid item xs={12} md={12} key={index}>
                    <LoanItem title={item.title} img={item.img} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box position="fixed" bottom={20} left={20}>
        <Button
          variant="contained"
          size="small"
          sx={{
            width: 85,
            height: 85,
            borderRadius: '100%',
            boxShadow: theme.shadows[5],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'primary.light',
            color: 'common.white',
            ':hover': {
              bgcolor: 'primary.main',
              color: 'common.white',
            },
          }}
          onClick={handleScrollToRequest}
        >
          <LocalMallIcon fontSize="small" />
          <Typography variant="subtitle2" py={1}>
            {t('pages.landing.requestLoan')}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default LoanFeatures;
