'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  StepContent,
} from '@mui/material';
import { Info } from '@mui/icons-material';
import { motion } from 'framer-motion';
import LoanRulesDialog from './LoanRulesDialog';
import { useTranslations } from 'next-intl';

const steps = [
  { label: 'ثبت نام و انتخاب میزان اعتبار', icon: '💳' },
  { label: 'تکمیل اطلاعات هویتی', icon: '📝' },
  { label: 'اعتبارسنجی آنلاین در سیستم بانکی', icon: '✅' },
  { label: 'بارگذاری آنلاین مدارک و چک', icon: '📤' },
  { label: 'امضای قرارداد و تحویل مدارک', icon: '📝' },
  { label: 'دریافت اعتبار در کیف پول رویال الیت', icon: '📦' },
  { label: 'انتخاب محصول مورد نظر در فروشگاه', icon: '🛒' },
];

const EmojiStepIcon = (props: any) => {
  const { icon } = props;
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        backgroundColor: (theme) => theme.palette.grey[200],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 22,
      }}
    >
      {steps[icon - 1]?.icon}
    </Box>
  );
};

const PurchaseSteps = () => {
  const t = useTranslations();
  const [showRules, setShowRules] = useState(false);

  return (
    <Box
      sx={{
        p: 4,
        my: 4,
        maxWidth: 600,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={1}>
        مراحل دریافت اعتبار و خرید اقساطی
      </Typography>

      <Stepper orientation="vertical" nonLinear>
        {steps.map((step, index) => (
          <Step key={index} active>
            <StepLabel StepIconComponent={EmojiStepIcon}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  {step.label}
                </Typography>
              </motion.div>
            </StepLabel>
            <StepContent />
          </Step>
        ))}
      </Stepper>

      <Button
        startIcon={<Info />}
        variant="outlined"
        size="small"
        fullWidth
        onClick={() => setShowRules(!showRules)}
        sx={{
          mt: 4,
          borderRadius: 2,
          fontWeight: 600,
          color: 'text.primary',
          borderColor: 'divider',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'primary.light',
            color: 'common.white',
          },
        }}
      >
        قوانین و مقررات دریافت وام
      </Button>

      {showRules && (
        <LoanRulesDialog open={showRules} onClose={() => setShowRules(false)} />
      )}
    </Box>
  );
};

export default PurchaseSteps;
