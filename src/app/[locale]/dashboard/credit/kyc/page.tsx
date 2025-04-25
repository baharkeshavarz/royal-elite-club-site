'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import Image from 'next/image';
import UserSignature from './components/UserSignature';
import UserSelfieImage from './components/UserSelfieImage';
import UserSelfieVideo from './components/UserSelfieVideo';
import { useRouter } from 'next/navigation';
import { DEFAULT_DASHBOARD_GET_CREDIT_BANK_VALIDATION } from '@/constants/routes';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active
    ? theme.palette.secondary.light
    : '#f1f1f1',
  zIndex: 1,
  color: '#fff',
  width: 70,
  height: 70,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: '#AE8625',
    boxShadow: '0 4px 10px 0 rgba(148, 4, 4, 0.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: '#EDC967',
  }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 40, // Half of 70px (your custom icon size)
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeftWidth: 3,
    borderColor: '#eaeaf0',
    minHeight: 70,
    marginTop: 60, // <-- tweak this to center vertically!
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: '#2878ad',
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: '#AE8625',
  },
}));
function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: (
      <Image
        src="/assets/images/dashboard/credits/signature.png"
        width="50"
        height="50"
        alt="نمونه امضا"
      />
    ),
    2: (
      <Image
        src="/assets/images/dashboard/credits/selfi-image.png"
        width="50"
        height="50"
        alt="عکس سلفی"
      />
    ),
    3: (
      <Image
        src="/assets/images/dashboard/credits/face-live.png"
        width="50"
        height="50"
        alt="ویدیو سلفی"
      />
    ),
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['ترسیم تصویر امضا ', 'ارسال عکس سلفی', 'ارسال ویدیوی سلفی'];

export default function CustomizedVerticalStepper() {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      router.push(DEFAULT_DASHBOARD_GET_CREDIT_BANK_VALIDATION);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Stepper
              // orientation={isMobile ? 'horizontal' : 'vertical'}
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12} md={12}>
            {activeStep === 0 && <UserSignature />}
            {activeStep === 1 && <UserSelfieImage />}
            {activeStep === 2 && <UserSelfieVideo />}
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ color: 'common.white' }}
        >
          {activeStep === steps.length - 1 ? 'مرحله بعدی' : 'بعدی'}
        </Button>
      </Box>
    </>
  );
}
