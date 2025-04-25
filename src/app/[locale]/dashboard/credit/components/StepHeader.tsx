'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

const steps = [
  {
    step: 'calculator',
    title: 'قوانین و انتخاب میزان اعتبار',
    subtitle: '',
    row: 1,
  },
  {
    step: 'payment',
    title: 'پرداخت هزینه های استعلام بانکی',
    subtitle: '',
    row: 2,
  },
  {
    step: 'user-info',
    title: 'تکمیل اطلاعات هویتی',
    subtitle: '',
    row: 3,
  },
  {
    step: 'kyc',
    title: 'احزار هویت دیجیتال',
    subtitle: '',
    row: 4,
  },
  {
    step: 'validation-report',
    title: 'اعتبارسنجی رتبه بانکی',
    subtitle: '',
    row: 5,
  },
  {
    step: 'user-details',
    title: 'ورود اطلاعات تحصیلی و شغلی',
    subtitle: '',
    row: 6,
  },
  {
    step: 'upload-cheque',
    title: 'آپلود و ورود اطلاعات چک ضمانت ',
    subtitle: '',
    row: 7,
  },

  {
    step: 'preview-contract',
    title: 'پیش نمایش قرارداد ',
    subtitle: '',
    row: 8,
  },
  {
    step: 'sign-contract',
    title: ' قرارداد نهایی امضا شده کاربر ',
    subtitle: '',
    row: 9,
  },
];

const StepHeader = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const stepName = pathParts[pathParts.length - 1];
  const currentStep = steps.find((step) => step.step === stepName);

  if (!currentStep) {
    return null;
  }

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'common.black',
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={45}
            height={45}
            borderRadius={12}
            sx={{
              background: (theme) =>
                `linear-gradient(to right top, ${theme.palette.common.white}, ${theme.palette.primary.light})`,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width={36}
              height={36}
              borderRadius={12}
              color="primary.main"
              sx={{
                border: '1px solid rgb(71, 95, 190)',
              }}
            >
              {currentStep.row} {/* Displaying the step number */}
            </Box>
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            {`مرحله ${currentStep.row}: ${currentStep.title}`}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {currentStep.subtitle}
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <ArrowForward sx={{ color: 'primary.main', fontSize: 22 }} />
          <Typography variant="body1">در حال انجام...</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StepHeader;
