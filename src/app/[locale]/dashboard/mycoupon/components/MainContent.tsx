import { Container } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import Filters from './Filters';
import Grid from './Grid';
import { useTranslations } from 'next-intl';

const MainContent = () => {
  const t = useTranslations();

  return (
    <Container maxWidth="lg">
      <DashboardCard title={t('dashboard.navigation.myCoupons')} elevation={3}>
        <>
          <Filters />
          <Grid />
        </>
      </DashboardCard>
    </Container>
  );
};

export default MainContent;
