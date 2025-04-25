'use client';

import { Divider, Paper } from '@mui/material';
import StepsHeader from '../components/StepsHeader';
import ChequeInfo from './components/ChequeInfo';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const UploadChequeImage = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid #ddd`,
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        mx: 'auto',
        maxWidth: 'md',
        mt: 4,
      }}
    >
      <StepsHeader title="ورود اطلاعات چک ضمانت" icon={UploadFileIcon} />
      <Divider />
      <ChequeInfo />
    </Paper>
  );
};

export default UploadChequeImage;
