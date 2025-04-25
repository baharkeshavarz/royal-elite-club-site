'use client';

import React from 'react';
import FiltersProvider from '@/components/Filters/providers/FiltersProvider';
import MainContent from './MainContent';

const TransactionDesktopView = () => {
  return (
    <FiltersProvider>
      <MainContent />
    </FiltersProvider>
  );
};

export default TransactionDesktopView;
