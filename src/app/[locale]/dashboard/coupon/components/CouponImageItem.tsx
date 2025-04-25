import Image from '@/components/common/Image';
import { DEFAULt_NO_IMAGE } from '@/constants/general';
import { ICouponPartner } from '@/services/club/types';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface CouponItemProps {
  partner: ICouponPartner;
  title?: string;
}

const CouponImageItem: FC<CouponItemProps> = ({ partner, title }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Image
        src={partner.logo || DEFAULt_NO_IMAGE}
        alt={partner.name}
        width={45}
        height={45}
        style={{ borderRadius: '100%' }}
      />
      <Typography variant="h5">{title ?? partner.name}</Typography>
    </Box>
  );
};

export default CouponImageItem;
