'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';

const UserSelfieImage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current
            .play()
            .catch((err) => console.error('Error playing video:', err));
        }
      } catch (err: any) {
        console.error('Error accessing webcam:', err.name, err.message);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/jpeg');
      setImage(dataURL);
    }
  };

  const resetImage = () => {
    setImage(null);
  };

  return (
    <Grid container spacing={2} my={1}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            borderRadius: 1,
            boxShadow: 1,
            minHeight: 240,
            border: '2px dashed #ccc',
          }}
        >
          <Typography mb={2} variant="subtitle1">
            لطفا قبل از شروع به نکات زیر توجه کنید:
          </Typography>
          {[
            'دسترسی دوربین برای گرفتن سلفی را در مرورگر فعال نمایید.',
            'لطفا صورت خود را داخل کادر مشخص شده قرار دهید. تصویر به صورت تمام رخ، بدون ماسک، عینک آفتابی و کلاه باشد.',
            'تصویر دارای نور مناسب باشد و واضح باشد.',
            'لطفا پس از تایید و ارسال عکس، منتظر بمانید تا عکس شما ارسال شود.',
          ].map((text, i) => (
            <Typography
              key={i}
              mb={2}
              variant="subtitle2"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <CheckIcon fontSize="small" />
              {text}
            </Typography>
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            textAlign: 'center',
          }}
        >
          {image ? (
            <Image
              src={image}
              alt="عکس سلفی"
              width={640}
              height={200}
              unoptimized
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: 200, borderRadius: 8 }}
            />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Paper>

        <Grid container spacing={1} justifyContent="center" my={1}>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={resetImage}
            >
              ثبت مجدد عکس
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              sx={{ color: 'common.white' }}
              onClick={captureImage}
            >
              ثبت و ادامه
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSelfieImage;
