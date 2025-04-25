import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { Link } from '@/navigation';

export const Upgrade = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
    >
      <>
        <Box>
          <Typography
            variant="h6"
            sx={{ width: '80px', color: 'common.white' }}
            mb={1}
          >
            هنوز تخفیف نگرفتی!؟
          </Typography>
          <Button
            color="primary"
            target="_blank"
            disableElevation
            component={Link}
            href={DEFAULT_MERCHANT_LIST_PATH}
            variant="contained"
            aria-label="logout"
            size="small"
            sx={{
              textAlign: 'center',
              color: 'common.white',
            }}
          >
            لیست پذیرندگان
          </Button>
        </Box>
        <Box mt="-35px">
          <Image
            alt=""
            src="/assets/images/rocket.png"
            width={100}
            height={100}
          />
        </Box>
      </>
    </Box>
  );
};
