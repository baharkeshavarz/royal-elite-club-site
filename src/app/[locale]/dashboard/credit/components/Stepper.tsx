'use client';

import { useEffect, useState } from 'react';
import {
  Divider,
  Paper,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Collapse,
  Container,
  Box,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  ExpandMore,
  ExpandLess,
  Autorenew,
  ErrorOutline,
  HourglassEmpty,
} from '@mui/icons-material';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import Link from 'next/link';
import { DEFAULT_DASHBOARD_GET_CREDIT_CALCULATOR } from '@/constants/routes';

type StepStatus = 'completed' | 'progress' | 'pending' | 'error';

interface Step {
  label: string;
  description: string;
  status: StepStatus;
  errorMessage?: string;
}

const steps: Step[] = [
  {
    label: 'انتخاب تسهیلات',
    description:
      'در این مرحله باید مبلغ تسهیلات درخواستی خود به همراه مدت بازپرداخت را تعیین نمایید.',
    status: 'completed',
  },
  {
    label: 'استعلام‌های بانکی',
    description: 'در این مرحله اطلاعات شما برای استعلام‌های لازم ارسال می‌شود.',
    status: 'completed',
  },
  {
    label: 'پرداخت هزینه استعلام',
    description:
      'پرداخت هزینه استعلام‌های مورد نیاز مانند ثبت احوال، کد پستی، چک برگشتی و غیره.',
    status: 'completed',
  },
  {
    label: 'ورود اطلاعات فردی',
    description: 'ورود اطلاعات دقیق هویتی شما شامل نام، کد ملی و آدرس.',
    status: 'progress',
  },
  {
    label: 'اعتبارسنجی رتبه بانکی',
    description: 'بررسی سوابق بانکی شما جهت رتبه‌بندی اعتباری.',
    status: 'error',
    errorMessage: 'خطا در دریافت اطلاعات بانکی. لطفاً دوباره تلاش کنید.',
  },
  {
    label: 'ورود اطلاعات شغلی و تحصیلی',
    description: 'درج اطلاعات شغلی و تحصیلی به منظور تکمیل پرونده.',
    status: 'pending',
  },
  {
    label: 'ثبت چک',
    description: 'ثبت اطلاعات چک‌های تضمینی مورد نیاز برای ضمانت.',
    status: 'pending',
  },
  {
    label: 'عضویت جت کلاب',
    description: 'عضویت در باشگاه مشتریان برای دریافت مزایای بیشتر.',
    status: 'pending',
  },
  {
    label: 'تحویل اصل چک',
    description: 'تحویل فیزیکی چک به نماینده جهت بررسی.',
    status: 'pending',
  },
  {
    label: 'امضای قرارداد',
    description: 'امضای رسمی قرارداد تسهیلات با حضور نماینده.',
    status: 'pending',
  },
  {
    label: 'تخصیص اعتبار',
    description: 'نهایی‌سازی تخصیص و دریافت تسهیلات.',
    status: 'pending',
  },
];

const statusColors: Record<StepStatus, string> = {
  completed: '#4caf50',
  progress: '#f9a825',
  pending: '#bdbdbd',
  error: '#e53935',
};

const getStatusIcon = (status: StepStatus) => {
  switch (status) {
    case 'completed':
      return <CheckCircle sx={{ fontSize: 16 }} />;
    case 'progress':
      return <Autorenew sx={{ fontSize: 16 }} />;
    case 'error':
      return <ErrorOutline sx={{ fontSize: 16 }} />;
    default:
      return <HourglassEmpty sx={{ fontSize: 16 }} />;
  }
};

const VerticalLinearStepper = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const theme = useTheme();

  const toggleStep = (index: number) => {
    setExpandedStep((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const firstErrorIndex = steps.findIndex((step) => step.status === 'error');
    if (firstErrorIndex !== -1) {
      setExpandedStep(firstErrorIndex);
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 4 }}>
      <Stack spacing={1}>
        {steps.map((step, index) => {
          const isExpanded = expandedStep === index;
          const isError = step.status === 'error';

          return (
            <Paper
              key={index}
              elevation={1}
              sx={{
                px: 1.5,
                py: 1,
                borderRight: `4px solid ${statusColors[step.status]}`,
                backgroundColor: isError
                  ? '#fdecea'
                  : isExpanded
                  ? theme.palette.action.hover
                  : 'background.paper',
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      bgcolor: statusColors[step.status],
                      width: 28,
                      height: 28,
                    }}
                  >
                    {getStatusIcon(step.status)}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {step.label}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => toggleStep(index)}
                  sx={{ p: 0.5 }}
                >
                  {isExpanded ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  )}
                </IconButton>
              </Box>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
                {isError && step.errorMessage && (
                  <Typography
                    variant="caption"
                    color="error"
                    fontWeight="bold"
                    mt={1}
                    display="block"
                  >
                    ⚠ {step.errorMessage}
                  </Typography>
                )}
              </Collapse>
            </Paper>
          );
        })}
      </Stack>
      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <ButtonWithLoading
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          size="large"
          component={Link}
          href={DEFAULT_DASHBOARD_GET_CREDIT_CALCULATOR}
          sx={{ width: 100, color: 'common.white' }}
        >
          ادامه
        </ButtonWithLoading>
      </Box>
    </Container>
  );
};

export default VerticalLinearStepper;
