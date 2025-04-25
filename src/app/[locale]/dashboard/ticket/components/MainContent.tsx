import GridProvider from '@/components/DataGrid/GridProvider';
import FiltersProvider from '@/components/Filters/providers/FiltersProvider';
import Wrapper from '@/components/Wrapper/Wrapper';
import { Container, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import DashboardCard from '../../components/shared/DashboardCard';
import AddTicketDialog from './AddTicketDialog.';
import Filters from './Filters';
import Grid from './Grid';

const MainContent = () => {
  const t = useTranslations();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleToggleAddDialog = () => setOpenAddDialog((prev) => !prev);

  return (
    <Container maxWidth="lg">
      <DashboardCard title={t('dashboard.navigation.myTicket')} elevation={3}>
        <Wrapper
          buttons={[
            {
              id: 'export-excel-report',
              children: t('dashboard.ticket.addDialogTitle'),
              variant: 'contained',
              color: 'primary',
              sx: { color: 'common.white' },
              onClick: handleToggleAddDialog,
            },
          ]}
        >
          <GridProvider>
            <AddTicketDialog
              open={openAddDialog}
              onClose={handleToggleAddDialog}
            />
            <Divider />

            <FiltersProvider>
              <Filters />
              <Grid />
            </FiltersProvider>
          </GridProvider>
        </Wrapper>
      </DashboardCard>
    </Container>
  );
};

export default MainContent;
