import CategoryLabel from '@/app/[locale]/(main)/merchant/[id]/components/CategoryLabel';
import { ITicket } from '@/services/ticket/types';
import { dateConvertorRenderer } from '@/utils/data-renderer';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import OperationRenderer from './OperationRenderer';

interface TicketCardProps {
  ticket: ITicket;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5">{ticket?.type}</Typography>
          <Typography variant="subtitle1">
            {t('dashboard.ticket.fields.trackingCode')}:{' '}
            <CategoryLabel
              label={ticket?.trackingCode}
              backgroundColor="grey.100"
              textColor="grey.800"
            />
          </Typography>
          <Typography variant="subtitle2">
            {t('dashboard.ticket.fields.status')}: {ticket?.status}
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" color="grey.700">
            {t('dashboard.ticket.fields.createDate')}:{' '}
            {dateConvertorRenderer(ticket.createDate)}
          </Typography>
          <Box display="flex" justifyContent="flex-end" p={0} m={0}>
            <OperationRenderer props={ticket} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default TicketCard;
