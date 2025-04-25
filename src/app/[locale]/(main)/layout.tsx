'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const t = useTranslations();

  const LayoutWrapper = styled(Box)(({ theme }) => ({
    minHeight: '50vh',
    backgroundColor: theme.palette.common.white,
  }));

  return (
    <>
      <Navbar />
      <LayoutWrapper>
        <Container maxWidth="xl">{children}</Container>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default Layout;
