'use client';

import {
  DESKTOP_PRODUCT_VARIANT_IMAGE_SIZE,
  MOBILE_PRODUCT_VARIANT_IMAGE_SIZE,
} from '@/config/images';
import { appContext } from '@/contexts/appContext';
import { faLocale } from '@/utils/yup/yup';
import { Theme, useMediaQuery } from '@mui/material';
import { useLocale } from 'next-intl';
import { userAgent } from 'next/server';
import { FC, PropsWithChildren, useEffect } from 'react';
import { LocaleObject, setLocale } from 'yup';
import { en } from 'yup-locales';

export interface AppProviderProps {
  userAgent: ReturnType<typeof userAgent>;
}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
  userAgent,
}) => {
  const inMobileView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const isMobile = userAgent.device.type === 'mobile' || inMobileView;

  const localeMapper: Record<string, LocaleObject> = {
    en: en,
    fa: faLocale,
  };

  const locale = useLocale();

  useEffect(() => {
    setLocale(localeMapper[locale]);
  }, [locale]);

  return (
    <appContext.Provider
      value={{
        isMobile,
        variantImageSize: isMobile
          ? MOBILE_PRODUCT_VARIANT_IMAGE_SIZE
          : DESKTOP_PRODUCT_VARIANT_IMAGE_SIZE,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
