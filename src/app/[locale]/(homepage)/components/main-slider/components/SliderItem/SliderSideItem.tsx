'use client';

import { DEFAULt_NO_IMAGE } from '@/constants/general';
import { useAppContext } from '@/hooks/useAppContext';
import { IsUbSliderItem } from '@/services/site/types';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface SliderSideItemProps {
  item?: IsUbSliderItem;
  borderRadiusTop?: number;
  borderRadiusBottom?: number;
}

const SliderSideItem: FC<SliderSideItemProps> = ({
  item,
  borderRadiusTop,
  borderRadiusBottom,
}) => {
  const { isMobile } = useAppContext();

  const imgSrc = item?.fileUrl || DEFAULt_NO_IMAGE;
  const imgContent = (
    <Image
      priority
      src={imgSrc}
      fill
      alt=""
      style={{
        objectFit: isMobile ? 'fill' : 'cover',
        borderTopLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopRightRadius: borderRadiusTop || 4,
        borderBottomLeftRadius: borderRadiusBottom || 4,
        height: '100%',
      }}
      sizes={isMobile ? '100vw' : '50vw'}
    />
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: isMobile ? 100 : 200,
        position: 'relative',
        mb: 2,
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

export default SliderSideItem;
