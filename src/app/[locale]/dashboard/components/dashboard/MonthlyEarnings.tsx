import DashboardCard from '../shared/DashboardCard';
import { Box, Fab, Typography } from '@mui/material';
import { IconCurrencyDollar } from '@tabler/icons-react';

const MonthlyEarnings = () => {
  return (
    <DashboardCard title="گزارش خرید سالانه">
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">0 ریال</Typography>
          <Fab color="secondary" size="medium">
            <IconCurrencyDollar width={22} />
          </Fab>
        </Box>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
