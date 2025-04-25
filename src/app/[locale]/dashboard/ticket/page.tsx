'use client';

import React from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import TicketDesktopView from './components/TicketDesktopView';
import TicketMobileView from './components/TicketMobileView';

const TicketPage = () => {
  const { isMobile } = useAppContext();

  return isMobile ? <TicketMobileView /> : <TicketDesktopView />;
};

export default TicketPage;
