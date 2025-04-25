import { Grid } from '@mui/material';
import ChequeForm from './ChequeForm';
import ChequeRules from './ChequeRules';

const ChequeInfo = () => {
  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12} md={5}>
        <ChequeRules />
      </Grid>

      <Grid item xs={12} md={7}>
        <ChequeForm />
      </Grid>
    </Grid>
  );
};

export default ChequeInfo;
