import { Alert, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const AlertComponent = () => {
  const t = useTranslations();

  return (
    <Box py={2} sx={{ width: '100%' }}>
      <Alert severity="error">{t('common.messages.error.generalError')}</Alert>
    </Box>
  );
};

export default AlertComponent;
