import DashboardCard from '../shared/DashboardCard';
import { Box, Fab, Typography } from '@mui/material';
import { IconDiscount } from '@tabler/icons-react';

const PaymentInfo = () => {
  return (
    <DashboardCard title="تخفیف های سالانه ی شما ">
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">0 ریال</Typography>
          <Fab color="warning" size="medium">
            <IconDiscount width={22} />
          </Fab>
        </Box>
      </>
    </DashboardCard>
  );
};

export default PaymentInfo;
