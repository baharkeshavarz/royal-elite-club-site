'use client';

import { DEFAULt_NO_IMAGE } from '@/constants/general';
import { useAppContext } from '@/hooks/useAppContext';
import { IsUbSliderItem } from '@/services/site/types';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface SliderItemProps {
  item?: IsUbSliderItem;
}

const SliderItem: FC<SliderItemProps> = ({ item }) => {
  const { isMobile } = useAppContext();

  const imgSrc = item?.fileUrl || DEFAULt_NO_IMAGE;
  const imgContent = (
    <Image
      priority
      src={imgSrc}
      fill
      alt=""
      style={{
        objectFit: isMobile ? 'fill' : 'fill',
      }}
    />
  );

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: isMobile ? 210 : 420,
        cursor: item?.linkUrl ? 'pointer' : 'default',
        '&:hover': {
          opacity: item?.linkUrl ? 0.9 : 1,
        },
        transition: 'opacity 0.2s ease',
      }}
    >
      {item?.linkUrl ? (
        <Link href={item.linkUrl} target="_blank">
          {imgContent}
        </Link>
      ) : (
        imgContent
      )}
    </Box>
  );
};

export default SliderItem;
