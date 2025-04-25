'use client';

import React from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import MyCouponDesktopView from './components/MyCouponDesktopView';
import MyCouponMobileView from './components/MyCouponMobileView';

const MyCouponPage = () => {
  const { isMobile } = useAppContext();

  return isMobile ? <MyCouponMobileView /> : <MyCouponDesktopView />;
};

export default MyCouponPage;
