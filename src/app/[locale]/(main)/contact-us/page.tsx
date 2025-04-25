'use client';

import { DEFAULT_FAQ_PATH } from '@/constants/routes';
import { useAppContext } from '@/hooks/useAppContext';

import {
  alpha,
  Button,
  Fade,
  Grid,
  Link,
  Slide,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ContactUsInfo from './components/ContactInfo';
import Breadcrumb from '@/components/common/breadcrumb/DynamicBreadcrumbs';
import { BreadcrumbTypes } from '@/services/types/setting';

const ContactUs = () => {
  const theme = useTheme();
  const t = useTranslations();
  const { isMobile } = useAppContext();

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
      <Grid container spacing={3} mt={3} ref={ref}>
        <Slide direction="up" in={inView} timeout={700}>
          <Grid item xs={12} sm={12} md={7} p={4}>
            <ContactUsInfo background="light" size="large" />
          </Grid>
        </Slide>

        <Grid item xs={12} sm={12} md={4} p={4}>
          <Fade in={showImage} timeout={1500}>
            <Stack spacing={2}>
              <Stack display="flex" alignItems="center">
                <Typography variant={isMobile ? 'h4' : 'h3'} textAlign="center">
                  {t('pages.contactUs.contactSupport.title')}
                </Typography>
                <Typography
                  variant={isMobile ? 'body2' : 'body1'}
                  fontStyle="italic"
                >
                  {t('siteInfo.title')}
                </Typography>
              </Stack>

              <Stack
                display="flex"
                alignItems="center"
                spacing={2}
                p={2}
                borderRadius={2}
                border={`1px solid ${theme.palette.grey[200]}`}
                bgcolor={alpha(theme.palette.grey[100], 0.7)}
              >
                <Typography variant="h4">
                  {t('pages.contactUs.contactSupport.faqTitle')}
                </Typography>

                <Button
                  component={Link}
                  color="primary"
                  href={DEFAULT_FAQ_PATH}
                  variant="contained"
                  sx={{
                    width: '60%',
                  }}
                >
                  <Typography variant="subtitle1" color="common.white">
                    {t('pages.contactUs.contactSupport.faqDescription')}
                  </Typography>
                </Button>
              </Stack>

              <Stack
                display="flex"
                alignItems="center"
                spacing={2}
                p={2}
                borderRadius={2}
                border={`1px solid ${theme.palette.grey[200]}`}
                bgcolor={alpha(theme.palette.grey[100], 0.7)}
              >
                <Typography variant="h4">
                  {t('pages.contactUs.contactSupport.callTitle')}
                </Typography>

                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    width: '60%',
                  }}
                >
                  <a
                    href={`tel:${t(
                      'pages.contactUs.contactInfo.phoneDescription',
                    )}}`}
                    style={{
                      color: theme.palette.common.white,
                    }}
                  >
                    <Typography variant="subtitle1">
                      {t('pages.contactUs.contactSupport.callDescription')}
                    </Typography>
                  </a>
                </Button>
              </Stack>
            </Stack>
          </Fade>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactUs;
