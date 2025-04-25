'use client';

import { useTranslations } from 'next-intl';
import useGetSliders from '@/hooks/useGetSliders';
import { useAppContext } from '@/hooks/useAppContext';
import {
  DesktopMainSlider,
  MobileMainSlider,
} from '@/app/[locale]/(homepage)/components/main-slider';

const Header = () => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const { data: sliders } = useGetSliders();

  return isMobile ? (
    <MobileMainSlider items={sliders} />
  ) : (
    <DesktopMainSlider items={sliders} />
  );
};

export default Header;
