import IconsSymbols from '@/components/Icons/components/IconsSymbols';
import RTLProvider from '@/components/common/RTLProvider';
import { defaultTheme, persianTheme, globalStyles } from '@/config/theme';
import { Locale, languages } from '@/navigation';
import { AppProvider } from '@/providers';
import ConfirmAlertProvider from '@/providers/ConfirmAlertProvider';
import CustomLocalizationProvider from '@/providers/CustomLocalizationProvider';
import I18nProvider from '@/providers/I18nProvider';
import TanstackProvider from '@/providers/TanstackProvider';
import ToastProvider from '@/providers/ToastProvider';
import {
  CssBaseline,
  GlobalStyles,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { PropsWithChildren } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type LocaleLayoutParams = { params: { locale: Locale } };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'باشگاه تخفیفی  رویال الیت',
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<LocaleLayoutParams>) {
  const reqUserAgent = userAgent({ headers: headers() });

  const themes: Record<Locale, ThemeOptions> = {
    en: defaultTheme,
    fa: persianTheme,
  };

  return (
    <html lang={locale} dir={languages?.[locale]?.direction}>
      <body>
        <TanstackProvider>
          <IconsSymbols />
          <AppRouterCacheProvider>
            <ThemeProvider theme={themes[locale] ?? defaultTheme}>
              <ToastProvider />
              <AppProvider userAgent={reqUserAgent}>
                <CssBaseline />
                <GlobalStyles styles={globalStyles} />
                <RTLProvider>
                  <CustomLocalizationProvider locale={locale}>
                    <I18nProvider locale={locale}>
                      <ConfirmAlertProvider>{children}</ConfirmAlertProvider>
                    </I18nProvider>
                  </CustomLocalizationProvider>
                </RTLProvider>
              </AppProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
