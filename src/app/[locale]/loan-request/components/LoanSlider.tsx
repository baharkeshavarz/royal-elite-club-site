import { Stack, Button, ButtonGroup, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { jetvamLoanData } from '../data';
import LoanPricing from './LoanPricing';

const LoanSlider = () => {
  const [selectedLoan, setSelectedLoan] = useState(0);
  return (
    <Box width="100%">
      <Stack display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5" color="primary.main" textAlign="center" py={2}>
          جدول وام و باز پرداخت اقساط
        </Typography>

        <Typography variant="h5" color="grey.700" textAlign="center" pb={1}>
          مبلغ وام 100 میلیون تا 1 میلیارد ریال | بازپرداخت 12 و 24 ماه
        </Typography>

        <ButtonGroup sx={{ mt: 2 }}>
          {jetvamLoanData.map((loan, index) => (
            <Button
              key={loan.title}
              disableElevation={true}
              onClick={() => setSelectedLoan(index)}
              variant={selectedLoan === index ? 'contained' : 'outlined'}
              sx={{
                color: selectedLoan === index ? 'common.white' : 'inherit',
              }}
            >
              {loan.title}
            </Button>
          ))}
        </ButtonGroup>
        <LoanPricing loan={jetvamLoanData[selectedLoan]} />
      </Stack>
    </Box>
  );
};

export default LoanSlider;
