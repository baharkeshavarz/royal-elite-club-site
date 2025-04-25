'use client';

import DashboardCard from '../shared/DashboardCard';
import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import AddCard from './AddCard';
import useUserCardListQuery from '../../financial/card/hooks/useUserCardListQuery';
import { useTranslations } from 'next-intl';
import { Box } from '@mui/material';
import DashboardCardsList from '../../financial/card/components/DashboardCardsList';

const BankCardList = () => {
  const t = useTranslations();
  const query = useUserCardListQuery({
    params: { PageIndex: 1, PageSize: DEFAULT_PAGE_SIZE },
  });

  return (
    <DashboardCard title={t('dashboard.card.cardListTitle')}>
      <Box sx={{ overflow: 'auto', width: { xs: '320px', sm: 'auto' } }}>
        <AddCard />
        <DashboardCardsList
          data={query.data}
          isFetching={query.isFetching}
          onDelete={query.refetch}
        />
      </Box>
    </DashboardCard>
  );
};

export default BankCardList;
