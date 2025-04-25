'use client';

import {
  Box,
  Fade,
  Grid,
  Slide,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from '@/components/common/Image';
import { DEFAULt_SMALL_LINE_HEIGHT } from '@/constants/general';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import HeadingTypography from '@/components/common/HeadingTypography';

const Introduction = () => {
  const theme = useTheme();
  const { isMobile } = useAppContext();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (inView) {
      setShowImage(true);
    }
  }, [inView]);

  return (
    <Grid container py={3} ref={ref}>
      <Slide direction="up" in={inView} timeout={700}>
        <Grid item md={8} xs={12}>
          <Stack spacing={3} p={1}>
            <Typography
              variant={isMobile ? 'button' : 'h6'}
              color="common.black"
              lineHeight={DEFAULt_SMALL_LINE_HEIGHT}
              align="justify"
            >
              باشگاه رویال الیت یک پلتفرم دیجیتال است که اعضای آن یعنی دارندگان
              کارتهای بانکی و پذیرندگان آن یعنی فروشگاهها، شرکت ها و ارائه
              دهندگان کالا یا خدمات را به یکدیگر متصل می کند. این باشگاه به
              اعضای خود امکان می دهد با خرید از پذیرندگان طرح به صورت آنلاین و
              هدفمند از تخفیف بهره مند شوند. هدف این باشگاه افزایش تعداد مشتریان
              پذیرندگان و به تبع آن افزایش میزان فروش آنها و در ادامه تسهیل در
              ارائه تخفیف های موثر و سریع به اعضای باشگاه و ایجاد رضایتمندی خرید
              در آنان است.
            </Typography>

            <Stack spacing={3} py={1} color="common.black">
              <HeadingTypography title="اهداف و مزایا باشگاه تخفیف برای ذینفعان" />
              <Typography variant={isMobile ? 'button' : 'h6'}>
                برای اعضا: تخفیف‌های جذاب و امتیازات وفاداری که باعث صرفه‌جویی
                در خریدهای روزانه و کاهش هزینه های روزمره می‌شود.
              </Typography>
              <Typography variant={isMobile ? 'button' : 'h6'}>
                برای پذیرندگان: افزایش فروش، جذب مشتریان جدید و وفاداری بیشتر
                مشتریان قدیمی.
              </Typography>
              <Typography variant={isMobile ? 'button' : 'h6'}>
                برای مالک پلتفرم: کسب درآمد از طریق دریافت کارمزد.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Slide>
      <Grid item md={4} xs={12}>
        <Fade in={showImage} timeout={2000}>
          <Stack display="flex" alignItems="center">
            <Box
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Image
                width={125}
                height={125}
                src="/assets/images/home/royal-introduction-2.jpg"
                alt=""
                style={{ borderRadius: '100%', boxShadow: theme.shadows[10] }}
              />
            </Box>
            <Box
              sx={{
                transform: 'translateX(40%)',
                transition: 'transform 0.3s ease',
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Image
                width={125}
                height={125}
                src="/assets/images/home/royal-introduction-1.jpg"
                alt=""
                style={{
                  borderRadius: '100%',
                  boxShadow: theme.shadows[10],
                }}
              />
            </Box>
            <Box
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover img': {
                  transform: 'scale(1.1)',
                  boxShadow: theme.shadows[5],
                },
              }}
            >
              <Image
                width={125}
                height={125}
                src="/assets/images/home/royal-introduction-3.jpg"
                alt=""
                style={{ borderRadius: '100%', boxShadow: theme.shadows[10] }}
              />
            </Box>
          </Stack>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default Introduction;
