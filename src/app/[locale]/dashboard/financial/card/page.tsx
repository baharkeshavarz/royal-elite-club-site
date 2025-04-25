'use client';

import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Button, Container, Tooltip } from '@mui/material';
import { useState } from 'react';
import AddToCardDialog from './components/AddToCardDialog';
import CardsList from './components/CardsList';
import useUserCardListQuery from './hooks/useUserCardListQuery';
import { useTranslations } from 'next-intl';
import DashboardCard from '../../components/shared/DashboardCard';

const CardPage = () => {
  const t = useTranslations();
  const [openAddCard, setOpenAddCard] = useState(false);

  const handleToggleAddCard = () => {
    setOpenAddCard((prevState) => !prevState);
  };

  const query = useUserCardListQuery({
    params: { PageIndex: 1, PageSize: DEFAULT_PAGE_SIZE },
  });

  return (
    <Container maxWidth="lg">
      <DashboardCard title={t('dashboard.navigation.myCards')} elevation={3}>
        <>
          <Tooltip title={t('dashboard.card.addCardDialogTitle')}>
            <Button
              variant="contained"
              onClick={handleToggleAddCard}
              startIcon={<AddCardIcon />}
              sx={{ color: 'common.white' }}
            >
              {t('dashboard.card.addCardDialogTitle')}
            </Button>
          </Tooltip>

          <AddToCardDialog
            open={openAddCard}
            onClose={handleToggleAddCard}
            onSuccess={query.refetch}
          />
          <CardsList
            isFetching={query.isFetching}
            data={query.data}
            onDelete={query.refetch}
          />
        </>
      </DashboardCard>
    </Container>
  );
};

export default CardPage;
