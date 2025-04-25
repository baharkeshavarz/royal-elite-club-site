'use client';

import Loading from '@/app/[locale]/loading';
import { getMerchant } from '@/services/merchant';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CategoryLabel from './components/CategoryLabel';
import MerchantTabs from './components/MerchantTabs';
import { useTranslations } from 'next-intl';
import CustomImageGallery from './components/MerchantImages';
import Image from '@/components/common/Image';
import { DEFAULt_NO_IMAGE } from '@/constants/general';
import Breadcrumb from '@/components/common/breadcrumb/DynamicBreadcrumbs';
import { BreadcrumbTypes, IBreadCrumbItem } from '@/services/types/setting';
import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';

const MerchantDetail = ({ params }: { params: { id: string } }) => {
  const theme = useTheme();
  const t = useTranslations();

  const { data: merchantInfo, isFetching } = useQuery({
    queryKey: ['GET_MERCHANT', params.id],
    queryFn: async () => {
      const { data } = await getMerchant({
        params: {
          Id: params.id,
        },
      });
      return data?.value;
    },
  });

  if (isFetching) return <Loading />;

  const bradCrumbItems: IBreadCrumbItem[] = [
    {
      label: t('header.navigation.merchant'),
      link: DEFAULT_MERCHANT_LIST_PATH,
    },
    {
      label: merchantInfo?.name || '',
      link: '',
    },
  ];

  return (
    <>
      <Breadcrumb
        capitalizeLinks
        bradCrumbType={BreadcrumbTypes.Static}
        bradCrumbItems={bradCrumbItems}
      />
      <Container maxWidth="xl" sx={{ p: 0, py: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <Typography variant="h4" fontWeight="bold" p={1}>
                  {merchantInfo?.name}
                </Typography>

                <Box display="flex" p={1} gap={1}>
                  <Typography variant="h5" fontWeight="bold">
                    {t('pages.merchant.details.buyTypeStore')}:
                  </Typography>
                  <Typography variant="h6">
                    {merchantInfo?.activityType}
                  </Typography>
                </Box>

                <Divider sx={{ pt: 1 }} />
                <Box display="flex" flexWrap="wrap" p={2} gap={2}>
                  <Typography variant="body1" fontWeight="bold">
                    {t('pages.merchant.details.category')}:
                  </Typography>
                  {merchantInfo?.classOfActivity.map((activity, index) => (
                    <CategoryLabel key={index} label={activity} />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                {merchantInfo?.images && merchantInfo?.images.length > 1 ? (
                  <CustomImageGallery images={merchantInfo?.images} />
                ) : (
                  <Image
                    src={
                      merchantInfo?.images
                        ? merchantInfo?.images[0]
                        : DEFAULt_NO_IMAGE
                    }
                    alt={merchantInfo?.name}
                    width="200"
                    height="200"
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                      borderRadius: 2,
                    }}
                  />
                )}
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} md={12} mt={3}>
                <MerchantTabs merchant={merchantInfo!} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default MerchantDetail;
