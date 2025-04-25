'use client';

import TabPanel from '@/components/TabPanel/TabPanel';
import { EnumCreditRequestUserEducationStep } from '@/services/request-credit/types';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Box, Paper, Tabs, useTheme } from '@mui/material';
import React, { useState } from 'react';
import StepsHeader from '../components/StepsHeader';
import EducationDetails from './components/EducationDetails';
import JobDetails from './components/JobDetails';
import StyledTab from './components/StyledTab';

const UserDetails = () => {
  const theme = useTheme();
  const [step, setStep] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setStep(newValue);
  };

  const handleStep = (newValue: number) => {
    setStep(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid #ddd`,
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        mx: 'auto',
        maxWidth: 'md',
        backgroundColor: '#f9fcff',
        mt: 4,
      }}
    >
      <StepsHeader title="ورود اطلاعات تحصیلی و شغلی" icon={PermIdentityIcon} />

      <Box sx={{ width: '100%', bgcolor: 'background.primary' }}>
        <Tabs value={step} onChange={handleChange}>
          <StyledTab label="اطلاعات تحصیلی" icon={<LocalLibraryIcon />} />
          <StyledTab label="اطلاعات شغلی" icon={<FilePresentIcon />} />
        </Tabs>

        <TabPanel
          value={step}
          index={EnumCreditRequestUserEducationStep.EDUCATION}
          dir={theme.direction}
        >
          <EducationDetails handleStep={handleStep} />
        </TabPanel>

        <TabPanel
          value={step}
          index={EnumCreditRequestUserEducationStep.JOB}
          dir={theme.direction}
        >
          <JobDetails />
        </TabPanel>
      </Box>
    </Paper>
  );
};
export default UserDetails;
