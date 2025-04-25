'use client';

import { FC, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { BankValidationReport } from '@/services/financial/types';
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

interface ValidationChartProps {
  value: BankValidationReport;
  height?: number;
}

const ValidationChart: FC<ValidationChartProps> = ({ value, height = 200 }) => {
  const theme = useTheme();
  const minValue = 0;
  const maxValue = 1000;

  const chartOption: ChartProps = useMemo(() => {
    return {
      chart: {
        height,
        type: 'radialBar' as 'radialBar',
        fontFamily: 'iransans',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '78%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: (val: number) =>
                Math.floor((val * (maxValue - minValue)) / 100 + minValue),
              color: '#111',
              fontSize: '2rem',
              show: true,
            },
          },
        },
      },
      fill: {
        colors: [theme.palette.primary.main, theme.palette.secondary.main],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [theme.palette.secondary.main],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: [value?.description || ''],
    };
  }, [value]);

  return (
    <ReactApexChart
      type="radialBar"
      series={[(value?.rate || 0) / 10]}
      options={chartOption}
      height={height}
    />
  );
};

export default ValidationChart;
