'use client';

import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { SAMPLE_CONTRACT } from '@/constants/dashboard';
import { DEFAULT_DASHBOARD_GET_CREDIT_SIGN_CONTRACT } from '@/constants/routes';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignContractPreview = () => {
  const theme = useTheme();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = () => {
    if (accepted) {
      router.push(DEFAULT_DASHBOARD_GET_CREDIT_SIGN_CONTRACT);
    }
  };

  return (
    <Box my={4}>
      <Grid container spacing={2}>
        {/* Preview card */}
        <Grid item xs={12} sm={3}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              bgcolor: 'grey.100',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Stack spacing={1}>
                <Typography variant="h6" fontWeight="bold">
                  پیش نمایش قرارداد شما
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  لطفاً قرارداد را به دقت خوانده و آن را امضا نمایید
                </Typography>
              </Stack>
            </CardContent>

            <CardMedia sx={{ position: 'relative', pt: '75%' }}>
              <Image
                src="/assets/images/dashboard/credits/preview-contract.png"
                alt="پیش نمایش قرارداد"
                fill
                style={{ objectFit: 'contain', padding: theme.spacing(1) }}
              />
            </CardMedia>
          </Card>
        </Grid>

        {/* PDF preview */}
        <Grid item xs={12} sm={9}>
          <Box
            component="iframe"
            src={SAMPLE_CONTRACT}
            width="100%"
            height={500}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </Grid>
      </Grid>

      {/* Acceptance and submit */}
      <Stack spacing={1} mt={3} alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              size="small"
            />
          }
          label={
            <Typography variant="caption" color="text.secondary">
              با موارد مندرج در قرارداد موافق هستم.
            </Typography>
          }
        />
        <Divider sx={{ width: '100%', mt: 1 }} />

        <ButtonWithLoading
          variant="contained"
          onClick={handleSubmit}
          disabled={!accepted}
          fullWidth={false}
          sx={{ px: 6, py: 1, borderRadius: 2, color: 'common.white' }}
        >
          امضای نهایی قرارداد
        </ButtonWithLoading>
      </Stack>
    </Box>
  );
};

export default SignContractPreview;
