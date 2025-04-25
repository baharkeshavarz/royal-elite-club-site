'use client';

import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const UserSelfieVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('خطا در دسترسی به دوربین:', err);
    }
  };

  const startRecording = () => {
    if (streamRef.current) {
      chunksRef.current = [];
      const recorder = new MediaRecorder(streamRef.current);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;

      setTimeout(() => {
        recorder.stop();
      }, 5000); // ضبط به مدت ۵ ثانیه
    }
  };

  const reset = () => {
    setRecordedVideo(null);
    if (videoRef.current) videoRef.current.srcObject = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <Grid container spacing={2} my={1}>
      {/* دستورالعمل‌ها */}
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
            لطفا قبل از ضبط ویدیو به نکات زیر توجه کنید:
          </Typography>
          {[
            'دسترسی دوربین و میکروفون را در مرورگر فعال نمایید.',
            'صورت خود را در مرکز کادر قرار دهید.',
            'در حین ضبط، چند ثانیه به دوربین نگاه کنید و سپس پلک بزنید یا سر خود را کمی بچرخانید.',
            'نور محیط مناسب و تصویر واضح باشد.',
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

      {/* پیش‌نمایش ویدیو و دکمه‌ها */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            textAlign: 'center',
          }}
        >
          {recordedVideo ? (
            <video
              src={recordedVideo}
              controls
              style={{ width: '100%', height: 200, borderRadius: 8 }}
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ width: '100%', height: 200, borderRadius: 8 }}
            />
          )}
        </Paper>

        <Grid container spacing={1} justifyContent="center" my={1}>
          {!recordedVideo && (
            <>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={startCamera}
                >
                  روشن کردن دوربین
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ color: 'common.white' }}
                  onClick={startRecording}
                >
                  ضبط ویدیو
                </Button>
              </Grid>
            </>
          )}
          <Grid item>
            <Button variant="outlined" size="small" onClick={reset}>
              بازنشانی
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSelfieVideo;
