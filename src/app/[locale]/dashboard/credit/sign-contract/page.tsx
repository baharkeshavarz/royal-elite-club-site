'use client';

import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { SAMPLE_CONTRACT } from '@/constants/dashboard';
import { DEFAULT_DASHBOARD_GET_CREDIT_KYC } from '@/constants/routes';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

const SignContractPreview = () => {
  const theme = useTheme();
  const router = useRouter();
  const [iconClicked, setIconClicked] = useState(false);

  const handleSubmit = () => {
    //  router.push(DEFAULT_DASHBOARD_GET_CREDIT_KYC);
  };

  const handleDownload = () => {
    window.open(SAMPLE_CONTRACT, '_blank');
  };

  const handleIconClick = () => {
    setIconClicked(true); // Action triggered when user clicks the icon
    setTimeout(() => setIconClicked(false), 1500); // Reset the state after animation
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Box my={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                bgcolor: 'grey.100',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 2,
                },
              }}
            >
              <CardMedia
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                }}
              >
                <Image
                  src="/assets/images/dashboard/credits/singned-contract.png"
                  alt="نهایی قرارداد"
                  fill
                  style={{ objectFit: 'contain' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'secondary.main',
                    zIndex: 1,
                  }}
                />
              </CardMedia>

              <CardContent sx={{ textAlign: 'center', zIndex: 2 }}>
                <Stack spacing={1} display="flex" alignItems="center">
                  <CheckIcon
                    sx={{
                      fontSize: 32,
                      color: 'text.secondary',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color="text.secondary"
                  >
                    قرارداد شما با موفقیت امضا گردید!
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={handleDownload}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      color: 'common.white',
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      paddingX: 3,
                    }}
                  >
                    دانلود قرارداد
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: PDF Preview */}
          <Grid item xs={12} sm={9}>
            <Box
              component="iframe"
              src={SAMPLE_CONTRACT}
              loading="lazy"
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

        <Stack spacing={2} mt={3} alignItems="center">
          <Divider sx={{ width: '100%', mt: 1 }} />
          <ButtonWithLoading
            variant="contained"
            onClick={handleSubmit}
            fullWidth={false}
            sx={{
              color: 'common.white',
            }}
          >
            ادامه
          </ButtonWithLoading>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default SignContractPreview;
