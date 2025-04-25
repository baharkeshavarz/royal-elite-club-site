'use client';

import React from 'react';
import { Grid } from '@mui/material';
import LoanCalculator from './components/LoanCalculator';
import PurchaseSteps from './components/PurchaseSteps';

const Calculator = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <PurchaseSteps />
      </Grid>
      <Grid item xs={12} md={8}>
        <LoanCalculator />
      </Grid>
    </Grid>
  );
};

export default Calculator;
