'use client';

import AssessmentIcon from '@mui/icons-material/Assessment';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { AdvertBoxContainer, CardBox } from './components/Card';
import { useTranslations } from 'next-intl';
import { DEFAULt_SMALL_LINE_HEIGHT } from '@/constants/general';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import HeadingTypography from '@/components/common/HeadingTypography';
import { useAppContext } from '@/hooks/useAppContext';
import { grey } from '@mui/material/colors';

const HomeAdvertisement = () => {
  const theme = useTheme();
  const t = useTranslations();
  const { isMobile } = useAppContext();

  const advertList = [
    {
      title: t('pages.home.advertisement.cards.card1'),
      icon: CardGiftcardIcon,
    },
    {
      title: t('pages.home.advertisement.cards.card2'),
      icon: AppRegistrationIcon,
    },
    {
      title: t('pages.home.advertisement.cards.card3'),
      icon: AssuredWorkloadIcon,
    },
    {
      title: t('pages.home.advertisement.cards.card4'),
      icon: AssessmentIcon,
    },
    {
      title: t('pages.home.advertisement.cards.card5'),
      icon: ThumbsUpDownIcon,
    },
  ];

  const content = (
    <>
      <Box pt={1}>
        <HeadingTypography title={t('pages.home.advertisement.title1')} />
      </Box>
      <Grid
        container
        spacing={2}
        my={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        {advertList.map((item, index) => (
          <Grid key={index} item md={2.2} xs={12}>
            <AdvertBoxContainer>
              <Box
                sx={{
                  bgcolor: theme.palette.primary.main,
                  borderRadius: '50%',
                  padding: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <item.icon
                  sx={{
                    color: 'common.white',
                    fontSize: 48,
                  }}
                />
              </Box>
              <Typography
                variant={isMobile ? 'subtitle1' : 'subtitle2'}
                color={grey[900]}
                textAlign="center"
                lineHeight={DEFAULt_SMALL_LINE_HEIGHT}
                pt={2}
              >
                {item.title}
              </Typography>
            </AdvertBoxContainer>
          </Grid>
        ))}
      </Grid>
    </>
  );
  return <>{isMobile ? <Box>{content}</Box> : <CardBox>{content}</CardBox>}</>;
};

export default HomeAdvertisement;
