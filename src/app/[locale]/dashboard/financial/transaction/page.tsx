'use client';

import React from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import TransactionDesktopView from './components/TransactionDesktopView';
import TransactionMobileView from './components/TransactionMobileView';

const TransactionPage = () => {
  const { isMobile } = useAppContext();

  return isMobile ? <TransactionMobileView /> : <TransactionDesktopView />;
};

export default TransactionPage;
