import { IBranch } from '@/services/merchant/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import {
  Box,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface BranchListProps {
  merchantName: string;
  branches: IBranch[];
}

const BranchList: FC<BranchListProps> = ({ branches, merchantName }) => {
  const theme = useTheme();
  const t = useTranslations();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {branches.map((branch) => (
        <Paper
          key={branch.name}
          elevation={0}
          style={{
            marginBottom: '0.5rem',
            padding: '0.5rem',
            borderRadius: '0.1rem',
          }}
        >
          <Box display="flex" alignItems="center">
            <LocationOnIcon color="primary" fontSize="small" />
            <Box flexGrow={1}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {branch.province} {t('stringSeparator')} {branch.city}
              </Typography>
              <Typography
                variant={isSmallScreen ? 'caption' : 'body1'}
                color="text.secondary"
                p={1}
              >
                {branch.address}
              </Typography>
            </Box>
            {branch?.phoneNumbers && (
              <Box display="flex" alignItems="center" ml={2}>
                <PhoneEnabledIcon color="primary" fontSize="small" />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  {branch?.phoneNumbers?.map((number, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => window.open(`tel:${number}`)}
                    >
                      {number}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
          <Divider />
        </Paper>
      ))}
    </>
  );
};

export default BranchList;
