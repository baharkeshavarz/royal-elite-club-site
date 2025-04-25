import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface LoanItemProps {
  title: string;
  img: string;
}

const LoanItem: FC<LoanItemProps> = ({ title, img }) => {
  return (
    <Card
      sx={{
        gap: 2,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        minHeight: '150px',
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 1,
        },
      }}
    >
      <Box
        sx={{
          transition: 'transform 0.3s',
          '&:hover': { transform: 'rotate(10deg)' },
        }}
      >
        <Image src={img} width={64} height={64} alt={title} />
      </Box>
      <Typography variant="subtitle1" textAlign="center">
        {title}
      </Typography>
    </Card>
  );
};

export default LoanItem;
