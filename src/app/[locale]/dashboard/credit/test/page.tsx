'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const DonutProgress: React.FC = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const radius = 70;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <Box
      sx={{
        width: 2 * radius,
        height: 2 * radius,
        position: 'relative',
        borderRadius: '50%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 5px rgba(252, 185, 0, 0.2)', // subtle glow
      }}
    >
      <svg height={2 * radius} width={2 * radius}>
        <defs>
          <linearGradient
            id="gradient-stroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0f4c75" />
            <stop offset="100%" stopColor="#05344a" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          stroke="#05344a"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress stroke */}
        <circle
          stroke="url(#gradient-stroke)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.4s ease-in-out',
            filter: 'drop-shadow(0 0 3px #fcb900)',
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      {/* Center text */}
      <Box
        sx={{
          position: 'absolute',
          textAlign: 'center',
          color: '#000',
          animation: 'fadeIn 0.3s ease-in',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            transition: 'transform 0.2s ease-in-out',
            transform: `scale(${1 + value / 300})`, // slight scaling effect
          }}
        >
          {value}%
        </Typography>
      </Box>
    </Box>
  );
};

export default DonutProgress;
