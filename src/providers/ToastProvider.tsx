'use client';
import { Locale, languages } from '@/navigation';
import { Box } from '@mui/material';
import { useLocale } from 'next-intl';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ToastProviderProps {}
const ToastProvider: FC<ToastProviderProps> = () => {
  const locale = useLocale() as Locale;
  return (
    <Box
      sx={{
        '& .Toastify__toast': {
          '--toastify-font-family': (theme) =>
            `${theme.typography.fontFamily} !important`,
        },
      }}
    >
      <ToastContainer
        rtl={languages[locale]?.direction == 'rtl'}
        position="top-center"
      />
    </Box>
  );
};

export default ToastProvider;
