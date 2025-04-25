'use client';

import { Stack } from '@mui/material';
import Logo from '@/components/common/Logo';
import {
  DEFAULT_HOME_PAGE_PATH,
  DEFAULT_LOGO_MILAVEH_PATH,
} from '@/constants/routes';
import { Link } from '@/navigation';
import JetvamInfo from './components/Jetvam';
import LoanFeatures from './components/LoanFeatures';
import LoanSlider from './components/LoanSlider';

const LandingPage = () => {
  return (
    <Stack display="flex" justifyContent="center" alignItems="center" p={2}>
      <Link href={DEFAULT_HOME_PAGE_PATH}>
        <Logo height={120} src={DEFAULT_LOGO_MILAVEH_PATH} />
      </Link>
      <LoanFeatures />
      <LoanSlider />
      <JetvamInfo />
    </Stack>
  );
};

export default LandingPage;
