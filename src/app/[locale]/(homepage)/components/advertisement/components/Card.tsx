import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const CardBox = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(3),
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  minHeight: '60px',
  borderRadius: '10px',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.grey[800]}`,
  borderBottom: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: theme.shadows[3],
  background: `linear-gradient(to right top, ${theme.palette.background.default}, ${theme.palette.grey[900]})`,
}));

export const BodyContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.grey[800]}`,
  borderRadius: '0 10px 10px 10px',
  background: `linear-gradient(to right top, ${theme.palette.background.default}, ${theme.palette.grey[900]})`,
  boxShadow: theme.shadows[5],
}));

export const AdvertBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
    borderRadius: 3,
  },
}));

export const AdvertBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  minHeight: 180,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[300]}`,
  background: `linear-gradient(to right top, ${alpha(
    theme.palette.primary.main,
    0.2,
  )}, ${theme.palette.common.white})`,
  borderRadius: 16,
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[5],
    transform: 'scale(1.02)',
  },
}));
