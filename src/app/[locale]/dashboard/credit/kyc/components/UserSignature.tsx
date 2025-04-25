'use client';

import { useState, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const UserSignature = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const sigCanvas = useRef<SignaturePad | null>(null);

  const clear = () => sigCanvas?.current?.clear();

  const save = () => {
    const canvas = sigCanvas.current?.getTrimmedCanvas?.();
    if (canvas) {
      setImageURL(canvas.toDataURL('image/png'));
    }
  };

  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            borderRadius: 1,
            boxShadow: 1,
            height: 240,
            border: '2px dashed #ccc',
          }}
        >
          <Typography mb={2} variant="subtitle1">
            لطفا قبل از شروع به نکات زیر توجه کنید:
          </Typography>
          <Typography
            mb={2}
            variant="subtitle2"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CheckIcon fontSize="small" />
            امضای خود را در مرکز کادر مقابل ترسیم نمایید.
          </Typography>
          <Typography
            mb={2}
            variant="subtitle2"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CheckIcon fontSize="small" />
            لطفاً تصویر صرفا شامل امضا باشد و از نوشتن سایر کلمات مانند تاریخ،
            نام و نام خانوادگی و ... اجتناب کنید.
          </Typography>
          <Typography
            mb={2}
            variant="subtitle2"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CheckIcon fontSize="small" />
            در صورت نیاز از گزینه پاک کردن استفاده نموده و مجددا اقدام به ترسیم
            امضا نمایید.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            margin: '0 auto',
          }}
        >
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              style: {
                width: '100%',
                height: 200,
                borderRadius: 8,
                border: '1px solid #aaa',
              },
            }}
          />
        </Paper>

        <Grid container spacing={1} justifyContent="center" my={1}>
          <Grid item>
            <Button
              variant="contained"
              onClick={save}
              size="small"
              sx={{ color: 'common.white' }}
            >
              ثبت و ادامه
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={clear}
            >
              پاک کردن
            </Button>
          </Grid>
        </Grid>

        {imageURL && (
          <Box mt={4} textAlign="center">
            <Typography variant="subtitle1">امضای شما:</Typography>
            <Box
              component="img"
              src={imageURL}
              alt="امضای من"
              sx={{
                border: '1px solid #333',
                borderRadius: 1,
                width: { xs: '100%', sm: 200 },
                mx: 'auto',
                mt: 1,
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default UserSignature;
