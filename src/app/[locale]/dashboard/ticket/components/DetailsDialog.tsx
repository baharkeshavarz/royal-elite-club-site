import DetailList, {
  DetailListProps,
} from '@/components/DetailList/DetailList';
import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import { getTicket } from '@/services/ticket';
import { dateConvertorRenderer } from '@/utils/data-renderer';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface DetailsDialogProps extends DialogProps {
  ticketId: string;
}

const DetailsDialog: FC<DetailsDialogProps> = ({ ticketId, ...props }) => {
  const t = useTranslations();

  const { data, isFetching } = useQuery({
    enabled: props.open && !!ticketId,
    queryKey: ['GET_TICKET', ticketId],
    queryFn: async () => {
      const { data } = await getTicket({
        params: {
          Id: ticketId,
        },
      });

      const { trackingCode, message, response, type, status, createDate } =
        data.value;

      const items: DetailListProps['items'] = [
        {
          key: t('dashboard.ticket.fields.type'),
          value: type,
        },
        {
          key: t('dashboard.ticket.fields.createDate'),
          value: dateConvertorRenderer(createDate, 'YYYY/MM/DD HH:mm'),
        },
        {
          key: t('dashboard.ticket.fields.trackingCode'),
          value: trackingCode,
        },
        {
          key: t('dashboard.ticket.fields.message'),
          value: message,
        },
        {
          key: t('dashboard.ticket.fields.response'),
          value: response,
        },
        {
          key: t('dashboard.ticket.fields.status'),
          value: status,
        },
      ];

      return items;
    },
    placeholderData: [],
  });

  return (
    <Dialog
      title={t('dashboard.ticket.ticketDetails')}
      PaperProps={{
        sx: {
          width: 500,
        },
      }}
      {...props}
    >
      <DetailList items={data || []} isLoading={isFetching} />
    </Dialog>
  );
};
export default DetailsDialog;
