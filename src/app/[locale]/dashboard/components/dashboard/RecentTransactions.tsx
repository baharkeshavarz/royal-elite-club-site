import ProgressLoading from '@/components/common/ProgressLoading';
import { getTransactionList } from '@/services/financial';
import { dateConvertorRenderer } from '@/utils/data-renderer';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import DashboardCard from '../shared/DashboardCard';
import NoDataCard from '../shared/NoDataCard';

const RecentTransactions = () => {
  const t = useTranslations();
  const colorsList = ['success', 'error', 'warning', 'info', 'primary'];

  const { data, isFetching } = useQuery({
    queryKey: ['GET_DASHBOARD_TRANSACTION_LIST'],
    queryFn: async () => {
      const { data } = await getTransactionList({
        params: {
          PageIndex: 1,
          PageSize: 5,
        },
      });
      return data?.value;
    },
    gcTime: 0,
  });

  return (
    <DashboardCard title="تراکنش های اخیر">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-10px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
            height: '210px',
          }}
        >
          {isFetching && <ProgressLoading />}
          {data?.list.length === 0 && <NoDataCard message="تراکنشی یافت نشد" />}
          {data?.list.map((transaction, index) => (
            <TimelineItem key={transaction.rowNumber}>
              <TimelineOppositeContent>
                {dateConvertorRenderer(
                  transaction?.transactionDate,
                  'YYYY/MM/DD HH:mm',
                )}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={colorsList[index % colorsList.length] as any}
                  variant="outlined"
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Stack direction="column" spacing={0.5}>
                  <Typography variant="subtitle1">
                    {transaction.merchantName}
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">
                      {transaction.amount.toLocaleString()}{' '}
                      {t('common.currency.rial')}
                    </Typography>
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}{' '}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
