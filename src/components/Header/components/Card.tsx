import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const headerBorderColor = '#131720';

export const CardBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0),
}));

export const ImageBlock = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '350px',
  borderRadius: 1,
  borderBottomLeftRadius: 0,
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
  },
}));

export const Image = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: '8px',
});

export const CardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const CardLeftContent = styled(Box)(({ theme }) => ({
  width: 'calc(100% - 185px)',
  padding: theme.spacing(2, 0),
  border: `1px solid ${alpha(theme.palette.background.default, 0.8)}`,
  borderTop: 'none',
  borderRadius: '0 0 15px 15px',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const RightButtonContainer = styled(Box)(({ theme }) => ({
  width: '180px',
  marginTop: '1rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-6px',
    left: '-6px',
    width: '15px',
    height: '15px',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-6px',
    left: '-6px',
    width: '15px',
    height: '15px',
    borderTopLeftRadius: '15px',
    border: `1px solid ${headerBorderColor}`,
    borderRight: 'none',
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

export const CardButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '4rem',
  position: 'relative',
  marginTop: '0.8rem',
  borderRadius: '15px',
  border: 'none',
}));

export const ContextContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.5rem',
  marginBottom: '0.1rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
