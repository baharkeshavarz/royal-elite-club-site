'use client';

import { styled, useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { FC, ReactNode } from 'react';
import Footer from './components/Footer';
import { DEFAULT_LOGIN_PATH } from '@/constants/routes';
import auth from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { BACK_URL_PARAM } from '@/constants/general';

export interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();

  const LayoutWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
  }));

  if (!auth.isLoggedIn) {
    router.push(`${DEFAULT_LOGIN_PATH}?backUrl=${BACK_URL_PARAM}`);
  }

  return (
    <>
      <LayoutWrapper>
        <Container maxWidth="lg">{children}</Container>
        <Footer />
      </LayoutWrapper>
    </>
  );
};

export default Layout;
