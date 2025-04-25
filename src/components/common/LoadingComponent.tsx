'use client';

import Logo from '@/components/common/Logo';
import ProgressBar from '@/components/common/ProgressBar';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

const LoadingComponent = () => {
  const t = useTranslations();
  return (
    <>
      <ProgressBar />
      <Dialog open maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Logo />
          <Typography variant="h6" fontWeight={600}>
            {t('siteInfo.title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="indeterminate" />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoadingComponent;
