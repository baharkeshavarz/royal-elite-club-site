import React, { FC } from 'react';
import Image from './Image';
import { ImageProps } from 'next/image';
import { useTranslations } from 'next-intl';

const JetvamLogo: FC<Partial<ImageProps>> = (props) => {
  const t = useTranslations();

  return (
    <Image
      draggable={false}
      width={150}
      height={100}
      alt={t('siteInfo.title')}
      src="/assets/images/landing/jetvam-logo.svg"
      {...props}
    />
  );
};

export default JetvamLogo;
