import React, { FC } from 'react';
import Image from './Image';
import { ImageProps } from 'next/image';
import { useTranslations } from 'next-intl';
import { DEFAULT_LOGO_PATH } from '@/constants/routes';

const Logo: FC<Partial<ImageProps>> = (props) => {
  const t = useTranslations();

  return (
    <Image
      draggable={false}
      width={220}
      height={80}
      alt={t('siteInfo.title')}
      src={props?.src ?? DEFAULT_LOGO_PATH}
      {...props}
    />
  );
};

export default Logo;
