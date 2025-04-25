import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import DashboardCard from '../shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import Image from '@/components/common/Image';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesOverview: React.FC = () => {
  const [month, setMonth] = useState<string>('1');
  const [seriesPieChart, setSeriesPieChart] = useState<number[]>([
    0.00000009, 0, 0,
  ]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedMonth = event.target.value as string;
    setMonth(selectedMonth);

    if (selectedMonth === '2') {
      setSeriesPieChart([0, 0, 0]);
    } else if (selectedMonth === '3') {
      setSeriesPieChart([0, 0, 0]);
    } else {
      setSeriesPieChart([0, 0, 0]);
    }
  };

  const theme = useTheme();
  const primary = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const grey = theme.palette.grey[300];

  const optionsPieChart: ApexOptions = {
    chart: {
      type: 'pie',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
    },
    labels: ['تراکنش های با تخفیف ', 'خرید با تخفیف  ', 'خرید از پذیرنده'],
    colors: [grey, secondary, primary],
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false, // Disable text shadow on data labels
      },
      style: {
        colors: ['#000000'], // Text color set to black
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#000000'],
        useSeriesColors: false,
      },
    },
  };

  return (
    <DashboardCard
      title="گزارشات خرید"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>مرداد 1403</MenuItem>
          <MenuItem value={2}>شهریور 1403</MenuItem>
          <MenuItem value={3}>مهر 1403</MenuItem>
        </Select>
      }
    >
      {/* <Chart
        options={optionsPieChart}
        series={seriesPieChart}
        type="pie"
        height={340}
      /> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={335}
      >
        <Image
          src="/assets/images/dashboard/empty-chart.png"
          alt=""
          width={450}
          height={300}
        />
      </Box>
    </DashboardCard>
  );
};

export default SalesOverview;
