import DashboardCard from '../shared/DashboardCard';
import { Box, Fab, Typography } from '@mui/material';
import { IconStar } from '@tabler/icons-react';

const CustomerPoint = () => {
  return (
    <DashboardCard title="امتیاز باشگاه وفاداری">
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">0</Typography>
          <Fab color="success" size="medium">
            <IconStar width={22} />
          </Fab>
        </Box>
      </>
    </DashboardCard>
  );
};

export default CustomerPoint;
