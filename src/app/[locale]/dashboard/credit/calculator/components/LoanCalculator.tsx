'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { DEFAULT_DASHBOARD_GET_CREDIT_PAYMENT } from '@/constants/routes';

const MIN_AMOUNT = 10_000_000;
const MAX_AMOUNT = 100_000_000;
const STEP = 10_000_000;
const INTEREST_RATE = 0.23;

const LoanCalculator = () => {
  const router = useRouter();
  const [amount, setAmount] = useState(MIN_AMOUNT);
  const [duration, setDuration] = useState(12);

  const handleDurationChange = (
    event: React.MouseEvent<HTMLElement>,
    newDuration: number | null,
  ) => {
    if (newDuration !== null) setDuration(newDuration);
  };

  const monthlyInterest = INTEREST_RATE / 12;
  const monthlyPayment =
    (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -duration));
  const totalPayment = Math.round(monthlyPayment * duration);

  const handleNextStep = () => {
    router.push(DEFAULT_DASHBOARD_GET_CREDIT_PAYMENT);
  };
  return (
    <Box
      sx={{
        p: 4,
        my: 4,
        maxWidth: 600,
        mx: 'auto',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={1}>
        محاسبه‌گر اقساط
      </Typography>

      <Typography variant="body1" mb={4}>
        قبل از درخواست وام، از جزئیات و اقساط ماهانه آن مطلع شوید.
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={2}
      >
        <IconButton
          size="small"
          onClick={() => setAmount((prev) => Math.max(prev - STEP, MIN_AMOUNT))}
          sx={{
            border: '1px solid #ccc',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#f5f5f5' },
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <AnimatePresence mode="wait">
          <motion.div
            key={amount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Typography variant="h5" fontWeight="bold">
              {amount.toLocaleString('fa-IR')} تومان
            </Typography>
          </motion.div>
        </AnimatePresence>

        <IconButton
          size="small"
          onClick={() => setAmount((prev) => Math.min(prev + STEP, MAX_AMOUNT))}
          sx={{
            border: '1px solid #ccc',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#f5f5f5' },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Slider
        value={amount}
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        step={STEP}
        marks
        onChange={(e, val) => setAmount(val as number)}
        sx={{
          mb: 1,
          '& .MuiSlider-mark': {
            backgroundColor: 'secondary.main',
            height: 8,
            width: 8,
            borderRadius: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          },
          '& .MuiSlider-rail': {
            opacity: 0.1,
          },
        }}
      />

      <Box display="flex" justifyContent="space-between" px={1} mb={3}>
        <Typography variant="caption" color="text.secondary">
          ۱۰ میلیون تومان
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ۱۰۰ میلیون تومان
        </Typography>
      </Box>

      <ToggleButtonGroup
        exclusive
        value={duration}
        onChange={handleDurationChange}
        fullWidth
        sx={{ justifyContent: 'center', my: 3 }}
      >
        <ToggleButton value={12}>۱۲ ماه</ToggleButton>
        <ToggleButton value={24}>۲۴ ماه</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction="column" spacing={1} mt={3}>
        <Typography>
          سود بانکی: <strong>{INTEREST_RATE * 100}%</strong>
        </Typography>
        <Typography>
          مدت بازپرداخت: <strong>{duration} ماه</strong>
        </Typography>
        <Typography>
          قسط ماهیانه:{' '}
          <strong>{Math.round(monthlyPayment).toLocaleString()} تومان</strong>
        </Typography>
        <Typography>
          مجموع بازپرداخت:{' '}
          <strong>{totalPayment.toLocaleString()} تومان</strong>
        </Typography>
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleNextStep}
        sx={{ mt: 4, borderRadius: 2, color: 'common.white' }}
      >
        درخواست وام
      </Button>
    </Box>
  );
};

export default LoanCalculator;
