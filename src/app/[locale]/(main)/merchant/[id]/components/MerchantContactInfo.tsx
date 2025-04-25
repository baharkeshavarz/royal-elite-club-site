import { useAppContext } from '@/hooks/useAppContext';
import { Link } from '@/navigation';
import { IMerchant, SocialContactInfoEnum } from '@/services/merchant/types';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import useSocialContactMapper from '../../hooks/useSocialContactMapper';

interface MerchantContactInfoProps {
  merchant: IMerchant;
}

const MerchantContactInfo: React.FC<MerchantContactInfoProps> = ({
  merchant,
}) => {
  const theme = useTheme();
  const contactInfoMapper = useSocialContactMapper();
  const { isMobile } = useAppContext();

  const sharedLinkSx = {
    color: theme.palette.common.black,
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  };

  return (
    <Paper elevation={1} sx={{ p: 1, borderRadius: 1 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={6}>
          {merchant?.siteAddress && (
            <Box display="flex" alignItems="center" p={1} gap={1}>
              <LanguageIcon fontSize="small" />
              <Link
                href={merchant.siteAddress}
                target="_blank"
                style={{
                  ...sharedLinkSx,
                }}
              >
                <Typography
                  variant={isMobile ? 'caption' : 'h6'}
                  fontWeight={600}
                >
                  {merchant.siteAddress}
                </Typography>
              </Link>
            </Box>
          )}
          <Box display="flex" alignItems="center" p={1} gap={1}>
            {contactInfoMapper[SocialContactInfoEnum.PhoneNumbers]?.icon}
            <Box display="flex" flexDirection="column" ml={1}>
              {merchant?.phoneNumbers.map((phoneNumber, index) => (
                <Link
                  key={index}
                  target="_blank"
                  href={`tel:${phoneNumber}`}
                  style={{
                    ...sharedLinkSx,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      ...sharedLinkSx,
                    }}
                  >
                    {phoneNumber}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            gap={2}
            alignItems="center"
          >
            {Object.entries(contactInfoMapper).map(([key, mapping]) => {
              const contactKey = key as SocialContactInfoEnum;
              const url = merchant[contactKey as keyof IMerchant];
              if (
                contactKey === SocialContactInfoEnum.PhoneNumbers ||
                mapping.showLabel ||
                !url
              ) {
                return null;
              }

              return (
                <Link
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: mapping.bg,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.2)',
                      },
                    }}
                  >
                    {mapping.icon}
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MerchantContactInfo;
