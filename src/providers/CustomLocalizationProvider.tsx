'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import React, { FC, PropsWithChildren } from 'react';
import { Locale } from '@/navigation';

export interface CustomLocalizationProviderProps {
  locale: Locale;
}

const CustomLocalizationProvider: FC<
  PropsWithChildren<CustomLocalizationProviderProps>
> = ({ children, locale }) => {
  const adapter = {
    fa: AdapterDateFnsJalali as any,
    en: AdapterDateFns,
  };

  return (
    <LocalizationProvider dateAdapter={adapter[locale]}>
      {children}
    </LocalizationProvider>
  );
};

export default CustomLocalizationProvider;
