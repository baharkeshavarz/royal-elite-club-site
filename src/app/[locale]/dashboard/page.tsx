'use client';

import { Grid, Box } from '@mui/material';
import PageContainer from './components/container/PageContainer';
import SalesOverview from './components/dashboard/SalesOverview';
import MonthlyEarnings from './components/dashboard/MonthlyEarnings';
import RecentTransactions from './components/dashboard/RecentTransactions';
import BankList from './components/dashboard/BankCardList';
import PaymentInfo from './components/dashboard/PaymentInfo';
import CustomerPoint from './components/dashboard/CustomerPoint';

const Dashboard = () => {
  return (
    <PageContainer title="پنل کاربری" description="پنل کاربری">
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomerPoint />
              </Grid>
              <Grid item xs={12}>
                <PaymentInfo />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <BankList />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
