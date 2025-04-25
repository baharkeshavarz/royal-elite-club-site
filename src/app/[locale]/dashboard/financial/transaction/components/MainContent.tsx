import GridProvider from '@/components/DataGrid/GridProvider';
import FiltersProvider from '@/components/Filters/providers/FiltersProvider';
import Wrapper from '@/components/Wrapper/Wrapper';
import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import DashboardCard from '../../../components/shared/DashboardCard';
import Filters from './Filters';
import Grid from './Grid';

const MainContent = () => {
  const t = useTranslations();

  return (
    <Container maxWidth="lg">
      <DashboardCard
        title={t('dashboard.navigation.myTransaction')}
        elevation={3}
      >
        <Wrapper>
          <GridProvider>
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
