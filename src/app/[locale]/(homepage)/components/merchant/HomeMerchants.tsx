'use client';

import { Suspense } from 'react';
import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import DesktopSuppliersCarousel from './DesktopMerchantsCarousel';
import MobileMerchantsCarousel from './MobileMerchantsCarousel';

const HomeMerchants = () => {
  return (
    <>
      <DesktopView>
        <DesktopSuppliersCarousel />
      </DesktopView>
      <MobileView>
        <Suspense>
          <MobileMerchantsCarousel />
        </Suspense>
      </MobileView>
    </>
  );
};

export default HomeMerchants;
