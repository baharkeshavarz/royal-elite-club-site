import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import CouponImageItem from './CouponImageItem';
import { ICouponPartner } from '@/services/club/types';

interface CouponItemProps {
  partner: ICouponPartner;
  handleSelectCoupon: (id: number | string) => void;
}

const CouponItem: FC<CouponItemProps> = ({ partner, handleSelectCoupon }) => {
  const t = useTranslations();

  return (
    <Box
      sx={{
        my: 1,
        border: 1,
        borderColor: 'grey.300',
        borderRadius: 4,
        p: 2,
      }}
    >
      {partner.logo ? (
        <Grid container spacing={2}>
          <Grid item>
            <CouponImageItem partner={partner} />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" fontStyle="italic">
          {partner.name}
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item md={10} gap={1} p={1}>
          <Typography variant="body1" fontWeight="bold" pt={3} color="grey.800">
            {partner.description || '-'}
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          display="flex"
          justifyContent="end"
          alignItems="end"
          p={1}
        >
          <ButtonWithLoading
            variant="contained"
            size="small"
            sx={{ p: 1 }}
            color="error"
            disabled={!!!partner.isActive}
            onClick={() => handleSelectCoupon(partner.id)}
          >
            {t('dashboard.coupon.buttons.getTheCode')}
          </ButtonWithLoading>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CouponItem;
