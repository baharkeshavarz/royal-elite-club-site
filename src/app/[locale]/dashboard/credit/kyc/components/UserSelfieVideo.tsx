'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const UserSelfieVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraEnabled(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError(
        'Failed to access camera. Please make sure permissions are granted.',
      );
    }
  };

  const startRecording = () => {
    if (!streamRef.current || !cameraEnabled) {
      startCamera().then(() => {
        setTimeout(() => startRecording(), 1000);
      });
      return;
    }

    chunksRef.current = [];
    setIsRecording(true);
    setCountdown(5);

    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9,opus',
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      setIsRecording(false);
      setCountdown(0);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          recorder.stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = () => {
    setRecordedVideo(null);
    setIsRecording(false);
    setCountdown(0);
    setError(null);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (videoRef.current) videoRef.current.srcObject = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCameraEnabled(false);
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

      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

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

          {isRecording && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CircularProgress color="secondary" size={40} />
              <Typography variant="h4" mt={1}>
                {countdown}
              </Typography>
              <Typography variant="body2">در حال ضبط ویدئو...</Typography>
            </Box>
          )}
        </Paper>

        <Grid container spacing={1} justifyContent="center" my={1}>
          {!recordedVideo && !isRecording && (
            <>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={startCamera}
                  disabled={cameraEnabled || isRecording}
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
                  disabled={isRecording}
                >
                  ضبط ویدیو
                </Button>
              </Grid>
            </>
          )}
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={reset}
              disabled={isRecording}
            >
              بازنشانی
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSelfieVideo;
