'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';

const UserSelfieImage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      setCameraError(null);
      setIsLoading(true);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => {
            console.error('Error playing video:', err);
            setCameraError('Failed to start camera');
          });
        }
      } catch (err: any) {
        console.error('Error accessing webcam:', err.name, err.message);
        setCameraError(err.message || 'Failed to access camera');
      } finally {
        setIsLoading(false);
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

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg', 0.9);
        setImage(dataURL);

        const tracks = (video.srcObject as MediaStream)?.getTracks();
        tracks?.forEach((track) => track.stop());
      }
    }
  };

  const resetImage = () => {
    setImage(null);
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current
            .play()
            .catch((err) => console.error('Error playing video:', err));
        }
      } catch (err) {
        console.error('Error restarting camera:', err);
      }
    };
    startCamera();
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
            position: 'relative',
            minHeight: 200,
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.7)',
              }}
            >
              <Typography>Loading camera...</Typography>
            </Box>
          )}

          {cameraError && (
            <Box
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography color="error" mb={2}>
                {cameraError}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setCameraError(null);
                  resetImage();
                }}
              >
                تلاش مجدد
              </Button>
            </Box>
          )}

          {!cameraError &&
            (image ? (
              <Image
                src={image}
                alt="Selfie image"
                width={640}
                height={200}
                unoptimized
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  maxHeight: 300,
                }}
              />
            ) : (
              <Box sx={{ position: 'relative' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    maxHeight: 300,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: '2px solid #2196f3',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    sx={{
                      width: '70%',
                      height: '80%',
                      border: '2px dashed #2196f3',
                      borderRadius: 8,
                    }}
                  ></Box>
                </Box>
              </Box>
            ))}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Paper>

        <Grid container spacing={1} justifyContent="center" my={1}>
          {image ? (
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={resetImage}
              >
                حذف تصویر
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button
                variant="contained"
                size="small"
                sx={{ color: 'common.white' }}
                onClick={captureImage}
                disabled={isLoading || !!cameraError}
              >
                ثبت تصویر
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSelfieImage;
