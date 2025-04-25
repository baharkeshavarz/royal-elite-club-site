import Filters from './Filters';
import { useTranslations } from 'next-intl';
import FiltersProvider from '@/components/Filters/providers/FiltersProvider';
import MainContentMobile from './MainContentMobile';
import { useState } from 'react';
import Wrapper from '@/components/Wrapper/Wrapper';
import AddTicketDialog from './AddTicketDialog.';
import { Box } from '@mui/material';
import MobileHeader from '../../components/shared/MobileHeader';
import { useRouter } from '@/navigation';

const TicketMobileView = () => {
  const t = useTranslations();
  const router = useRouter();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleToggleAddDialog = () => setOpenAddDialog((prev) => !prev);

  const onBackClick = () => {
    router.back();
  };

  return (
    <>
      <MobileHeader
        title={t('dashboard.navigation.myTicket')}
        onBackClick={onBackClick}
      />
      <FiltersProvider>
        <AddTicketDialog open={openAddDialog} onClose={handleToggleAddDialog} />
        <Wrapper
          buttons={[
            {
              id: 'add-ticket',
              children: t('dashboard.ticket.addDialogTitle'),
              variant: 'contained',
              color: 'primary',
              onClick: handleToggleAddDialog,
            },
          ]}
        >
          <Box py={2}>
            <Filters />
            <MainContentMobile />
          </Box>
        </Wrapper>
      </FiltersProvider>
    </>
  );
};

export default TicketMobileView;
