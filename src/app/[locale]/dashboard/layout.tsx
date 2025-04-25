'use client';

import { styled, Container, Box } from '@mui/material';
import React, { useState } from 'react';
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import auth from '@/lib/auth';
import { useRouter } from '@/navigation';
import { DEFAULT_LOGIN_PATH } from '@/constants/routes';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: 'white',
  overflowX: 'scroll',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // if (!auth.isLoggedIn) { //TODO
  //   router.push(DEFAULT_LOGIN_PATH);
  // }

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Container
          sx={{
            maxWidth: '1200px',
          }}
        >
          <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
          <Box sx={{ minHeight: 'calc(100vh - 170px)', paddingTop: 1 }}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
