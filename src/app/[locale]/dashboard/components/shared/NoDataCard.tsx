import { DEFAULT_NO_IMAGE } from '@/constants/dashboard';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

type NoDataCardProps = {
  imgSrc?: string;
  message: string;
};

const NoDataCard: FC<NoDataCardProps> = ({ imgSrc, message }) => {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      p={2}
    >
      <Image
        src={imgSrc || DEFAULT_NO_IMAGE}
        alt="no-data"
        width={75}
        height={75}
      />
      <Typography variant="h6" fontWeight="bold" textAlign="center">
        {message}
      </Typography>
    </Stack>
  );
};

export default NoDataCard;
