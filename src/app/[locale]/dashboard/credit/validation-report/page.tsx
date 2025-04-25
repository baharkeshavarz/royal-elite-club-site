import { Typography, Stack, Grid, Paper, Box } from '@mui/material';
import ValidationChart from '../components/ValidationChart';
import type { BankValidationReport } from '@/services/financial/types';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import Link from 'next/link';
import { DEFAULT_DASHBOARD_GET_CREDIT_USER_DETAILS } from '@/constants/routes';
import StepsHeader from '../components/StepsHeader';

const bankReport: BankValidationReport = {
  description: 'رتبه اعتباری شما',
  rate: 650,
};

const BankValidationReport = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid #ddd`,
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        maxWidth: 600,
        backgroundColor: '#f9fcff',
        mx: 'auto',
        mt: 4,
      }}
    >
      <StepsHeader title="اعتبارسنجی رتبه بانکی" icon={StarHalfIcon} />

      <Typography variant="body2" color="text.secondary" mb={2}>
        اعتبار سنجی بانکی شامل بررسی سوابق مالی، ارائه گزارش تحلیل وضعیت، مشاهده
        جزئیات چک‌ها و اقساط و کمک به بهبود رتبه اعتباری شما است.
      </Typography>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Stack
            spacing={2}
            sx={{
              border: '1px dashed rgb(4, 93, 12)',
              borderRadius: 2,
              padding: 2,
              marginTop: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="h1" color="secondary.main">
              A
            </Typography>
            <Typography variant="subtitle1" textAlign="center" mt={5}>
              شما در بالاترین رتبه اعتباری قرار دارید
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              نمره اعتبار شما: A-650
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ValidationChart value={bankReport} height={250} />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center">
        <ButtonWithLoading
          variant="contained"
          component={Link}
          href={DEFAULT_DASHBOARD_GET_CREDIT_USER_DETAILS}
          sx={{ mt: 2, color: 'common.white' }}
          type="submit"
        >
          ادامه
        </ButtonWithLoading>
      </Box>
    </Paper>
  );
};

export default BankValidationReport;
