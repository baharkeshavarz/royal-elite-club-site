import CategoryLabel from '@/app/[locale]/(main)/merchant/[id]/components/CategoryLabel';
import { IUserHistoryCouponCodes } from '@/services/club/types';
import { dateConvertorRenderer } from '@/utils/data-renderer';
import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

interface CouponCardProps {
  coupon: IUserHistoryCouponCodes;
}

const CouponCard: FC<CouponCardProps> = ({ coupon }) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">{coupon?.partner}</Typography>
          <Typography variant="subtitle1">
            {t('dashboard.coupon.fields.code')}:{' '}
            <CategoryLabel
              label={coupon?.code}
              backgroundColor={theme.palette.primary.light}
              textColor={theme.palette.grey[800]}
            />
          </Typography>
          <Typography variant="subtitle2">
            {t('dashboard.coupon.fields.discountAmount')}: {coupon?.value}
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" color="grey.700">
            {t('dashboard.coupon.fields.expiryDate')}:{' '}
            {dateConvertorRenderer(coupon.expiryDate)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CouponCard;
