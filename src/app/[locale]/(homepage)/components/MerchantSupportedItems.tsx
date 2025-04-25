import { Box, useTheme } from '@mui/material';
import MerchantItemCarousel from './MerchantItemCarousel';

const MerchantSupportedItems = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 60,
        py: 2,
        boxShadow: theme.shadows[4],
      }}
    >
      <MerchantItemCarousel />
    </Box>
  );
};

export default MerchantSupportedItems;
