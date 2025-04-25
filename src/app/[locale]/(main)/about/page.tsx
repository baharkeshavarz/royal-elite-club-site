'use client';

import Image from '@/components/common/Image';
import { Box, Grid, Typography, useTheme, Fade, Slide } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { DEFAULt_LINE_HEIGHT } from '@/constants/general';
import Breadcrumb from '@/components/common/breadcrumb/DynamicBreadcrumbs';
import { BreadcrumbTypes } from '@/services/types/setting';

const AboutUs = () => {
  const theme = useTheme();
  const t = useTranslations();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (inView) {
      setShowImage(true);
    }
  }, [inView]);

  return (
    <>
      <Breadcrumb capitalizeLinks bradCrumbType={BreadcrumbTypes.Navigation} />
      <Grid container spacing={1} mt={3} ref={ref}>
        <Slide direction="up" in={inView} timeout={700}>
          <Grid item xs={12} sm={12} md={6} p={4}>
            <Typography variant="h3" fontWeight={600} py={3}>
              {t('pages.aboutUs.title')}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              lineHeight={DEFAULt_LINE_HEIGHT}
              textAlign="justify"
            >
              شرکت فن آوری هوشمند مهر جم با نام تجاری رویال الیت از سال 1400
              فعالیت در عرصه باشگاه های وفاداری و تخفیفی را آغاز نموده است. این
              شرکت طی تفاهمنامه و قراردادهایی با شرکت های PSP و شرکت های کسب و
              کاری بانکها امکان استفاده از سرویس های تخفیفی و تسهیم مبالغ تراکنش
              را بر اساس الگوها و دستورالعمل های بانک مرکزی و شرکت شاپرک انجام
              می دهد. در حال حاضر همگام با رشد صنعت فینتک در ایران، این شرکت به
              بازارهای لندتک ورود نموده و محصولات مرتبط با آن را نیز در سبد خود
              گنجانده است. از ویژگی ها و دارایی های شرکت شبکه پذیرندگان گسترده و
              متنوع آن می باشد که امکان خلق مزیت رقابتی در پروژه های فینتک را
              فراهم می آورد.
            </Typography>
          </Grid>
        </Slide>

        <Grid item xs={12} sm={12} md={6} p={2}>
          <Fade in={showImage} timeout={1000}>
            <Box width="100%" height="100%">
              <Image
                src="/assets/images/about.jpg"
                alt={t('header.navigation.aboutUs')}
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: theme.shadows[2],
                }}
              />
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUs;
