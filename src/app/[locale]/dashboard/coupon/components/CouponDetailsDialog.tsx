'use client';

import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ICouponCodeInfo } from '@/services/club/types';
import { dateConvertorRenderer } from '@/utils/data-renderer';

export interface CouponDetailsDialogProps extends DialogProps {
  onSuccess?: VoidFunction;
  couponInfo: ICouponCodeInfo;
}

const CouponDetailsDialog: FC<CouponDetailsDialogProps> = ({
  onSuccess,
  couponInfo,
  ...props
}) => {
  const t = useTranslations();

  return (
    <Dialog
      title={t('dashboard.coupon.couponDialogTitle')}
      onClick={onSuccess}
      PaperProps={{
        sx: {
          width: 500,
        },
      }}
      {...props}
    >
      <Box
        sx={{
          px: 6,
          py: 3,
          borderRadius: '18px',
          cursor: 'pointer',
        }}
      >
        <Stack
          spacing={3}
          sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
        >
          <TaskAltIcon color="success" sx={{ fontSize: 75 }} />
          <Typography
            textAlign="center"
            color="warning"
            variant="h5"
            fontWeight="bold"
          >
            {t('dashboard.coupon.messages.successfulCode')}
          </Typography>
          <Typography variant="subtitle1" fontSize={13}>
            {t('dashboard.coupon.fields.code')}: {couponInfo.code}
          </Typography>
          <Typography variant="subtitle1" fontSize={13}>
            {t('dashboard.coupon.fields.expiryDate')}:{' '}
            {dateConvertorRenderer(couponInfo.expiryDate)}
          </Typography>
          <Typography variant="subtitle1" fontSize={13}>
            {t('dashboard.coupon.fields.couponValue')}:
            {couponInfo.isFixedAmount ? (
              <>
                {couponInfo.value.toLocaleString()}
                {''}
                {t('common.currency.rial')}
              </>
            ) : (
              <>{couponInfo.value.toLocaleString()}%</>
            )}
          </Typography>

          {couponInfo.ceilingAmount > 0 && (
            <Typography variant="subtitle1" fontSize={13}>
              {t('dashboard.coupon.fields.ceilingAmount')}:
              {couponInfo.ceilingAmount.toLocaleString()}
              {''}
              {t('common.currency.rial')}
            </Typography>
          )}

          {couponInfo.minimumAmount > 0 && (
            <Typography variant="subtitle1" fontSize={13}>
              {t('dashboard.coupon.fields.minimumAmount')}:
              {couponInfo.minimumAmount.toLocaleString()}
              {''}
              {t('common.currency.rial')}
            </Typography>
          )}

          <Button
            color="primary"
            variant="contained"
            size="medium"
            sx={{ borderRadius: '8px', width: '100%' }}
            onClick={onSuccess}
          >
            {t('common.buttons.gotIt')}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default CouponDetailsDialog;
