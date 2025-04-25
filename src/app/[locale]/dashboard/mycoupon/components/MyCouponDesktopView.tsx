'use client';

import React from 'react';
import FiltersProvider from '@/components/Filters/providers/FiltersProvider';
import MainContent from './MainContent';

const MyCouponDesktopView = () => {
  return (
    <FiltersProvider>
      <MainContent />
    </FiltersProvider>
  );
};

export default MyCouponDesktopView;
