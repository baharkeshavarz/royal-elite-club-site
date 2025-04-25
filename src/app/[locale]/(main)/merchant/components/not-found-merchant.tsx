import { RefreshOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface NotFoundMerchantProps {
  title: string;
  message: string;
  handleClickFun: VoidFunction;
}

const NotFoundMerchant: FC<NotFoundMerchantProps> = ({
  title,
  message,
  handleClickFun,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Image
        src="/assets/images/not-found-data.png"
        alt=""
        width={150}
        height={150}
      />
      <Typography variant="h6" fontWeight={600} my={1}>
        {message}
      </Typography>
      <Button variant="outlined" onClick={handleClickFun}>
        {title}
        <RefreshOutlined fontSize="small" />
      </Button>
    </Box>
  );
};

export default NotFoundMerchant;
