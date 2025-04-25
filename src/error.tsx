'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, useEffect } from 'react';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  const t = useTranslations();
  const theme = useTheme();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <Container
        maxWidth="xs"
        sx={{
          p: 5,
          my: 6,
        }}
      >
        <Stack
          spacing={1}
          alignItems="center"
          sx={{
            userSelect: 'none',
          }}
        >
          <Image
            width={150}
            height={150}
            src="/assets/images/unplugged.png"
            alt="Error!"
            style={{
              opacity: 0.68,
            }}
          />
          <Typography
            variant="h5"
            component="h1"
            color={theme.palette.common.white}
          >
            {t('pages.error.message')}
          </Typography>
          <Button fullWidth variant="contained" size="large" onClick={reset}>
            {t('pages.error.buttons.reset')}
          </Button>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default ErrorPage;
