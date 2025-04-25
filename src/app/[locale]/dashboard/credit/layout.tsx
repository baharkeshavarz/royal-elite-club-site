'use client';

import { Container, Divider } from '@mui/material';
import React from 'react';
import DashboardCard from '../components/shared/DashboardCard';
import StepHeader from './components/StepHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg">
      <DashboardCard title="دریافت اعتبار در رویال الیت" elevation={1}>
        <>
          <Divider />
          <StepHeader />
          {children}
        </>
      </DashboardCard>
    </Container>
  );
}
