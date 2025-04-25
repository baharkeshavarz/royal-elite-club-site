'use client';

import {
  Box,
  Typography,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useState } from 'react';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import Link from 'next/link';
import StepsHeader from '../components/StepsHeader';
import { DEFAULT_DASHBOARD_GET_CREDIT_USER_INFO } from '@/constants/routes';

const breakdown = [
  ['استعلام بدهی و اعتبارسنجی ایرانیان', '۸,۰۰۰ تومان'],
  ['استعلام احراز هویت', '۱۲,۴۰۰ تومان'],
  ['استعلام‌های مربوط به منابع درآمدی و دارایی‌ها', '۳۳,۴۰۰ تومان'],
  ['تحلیل اطلاعات و محاسبه اعتبار', '۴۷,۰۰۰ تومان'],
  ['هزینه بازاریابی و خدمات افزوده', '۹,۸۰۰ تومان'],
];

const total = '۹۸,۷۰۰ تومان';

const CreditAssessmentCard = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid #ddd`,
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
      }}
    >
      <StepsHeader
        title="پرداخت هزینه های استعلام بانکی"
        icon={AssessmentIcon}
      />

      <Typography variant="body2" color="text.secondary" mb={2}>
        برای اطلاع از شرایط دریافت وام، ابتدا رتبه اعتباری خود را بررسی کنید.
        اعتبارسنجی شامل بررسی سوابق مالی، ارائه گزارش تحلیل وضعیت، مشاهده جزئیات
        چک‌ها و اقساط و کمک به بهبود رتبه اعتباری شما است.
      </Typography>

      <Box
        sx={{
          border: '1px dashed #ccc',
          borderRadius: 2,
          p: 2,
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="subtitle1" mb={1}>
          جزئیات پرداخت
        </Typography>
        <List dense disablePadding>
          {breakdown.map(([label, price], idx) => (
            <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: '0.875rem' }}
              />
              <Typography variant="body2" fontWeight="bold">
                {price}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
        }
        label={
          <Typography variant="caption" color="text.secondary">
            شرایط و قوانین رویال را می‌پذیرم و قبول دارم.
          </Typography>
        }
        sx={{ mt: 2 }}
      />

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold">قابل پرداخت:</Typography>
        <Typography color="primary" fontWeight="bold">
          {total}
        </Typography>
      </Stack>

      <ButtonWithLoading
        fullWidth
        variant="contained"
        component={Link}
        href={DEFAULT_DASHBOARD_GET_CREDIT_USER_INFO}
        sx={{ mt: 2, color: 'common.white' }}
        disabled={!accepted}
        type="submit"
      >
        اعتبارسنجی
      </ButtonWithLoading>
    </Paper>
  );
};

export default CreditAssessmentCard;
