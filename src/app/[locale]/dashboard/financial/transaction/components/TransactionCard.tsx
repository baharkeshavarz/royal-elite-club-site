import CategoryLabel from '@/app/[locale]/(main)/merchant/[id]/components/CategoryLabel';
import { ITransaction } from '@/services/financial/types';
import { dateConvertorRenderer } from '@/utils/data-renderer';
import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

interface TransactionCardProps {
  transaction: ITransaction;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">{transaction?.merchantName}</Typography>
          <Typography variant="subtitle1">
            {t('dashboard.transaction.fields.amount')}:{' '}
            <CategoryLabel
              label={transaction?.amount.toLocaleString().toString()}
              backgroundColor={theme.palette.primary.light}
              textColor={theme.palette.grey[800]}
            />
          </Typography>
          <Typography variant="subtitle2">
            {t('dashboard.transaction.fields.description')}:{' '}
            {transaction?.description ?? '-'}
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" color="grey.700">
            {t('dashboard.transaction.fields.transactionDate')}:{' '}
            {dateConvertorRenderer(transaction?.transactionDate)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
