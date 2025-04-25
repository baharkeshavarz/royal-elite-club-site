'use client';

import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import { Box, Button, Divider, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import LoanRulesContent from './LoanRulesContent';

export interface LoanRulesDialogProps extends DialogProps {
  onClose?: VoidFunction;
}

const LoanRulesDialog: FC<LoanRulesDialogProps> = ({ onClose, ...props }) => {
  const t = useTranslations();

  return (
    <Dialog
      title="قوانین و مقررات اخذ وام"
      onClick={onClose}
      PaperProps={{
        sx: {
          width: '80vw',
        },
      }}
      {...props}
    >
      <Divider />
      <Box
        sx={{
          px: 6,
          py: 3,
          borderRadius: '18px',
          cursor: 'pointer',
        }}
      >
        <Stack
          spacing={3}
          sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
        >
          <LoanRulesContent />
          <Button
            color="primary"
            variant="contained"
            size="medium"
            sx={{ borderRadius: '8px', width: '100%', color: 'common.white' }}
            onClick={onClose}
          >
            {t('common.buttons.acceptRules')}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default LoanRulesDialog;
