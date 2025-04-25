import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { DEFAULt_SMALL_LINE_HEIGHT } from '@/constants/general';
import Logo from '@/components/common/Logo';
import ContactUsInfo from './ContactInfo';
import { useAppContext } from '@/hooks/useAppContext';

const Footer = () => {
  const t = useTranslations();
  const theme = useTheme();
  const { isMobile } = useAppContext();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: theme.palette.grey[200],
        py: 2,
        backgroundColor: 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Logo />
            <Typography
              variant="body1"
              color={theme.palette.grey[900]}
              textAlign="justify"
              lineHeight={DEFAULt_SMALL_LINE_HEIGHT}
            >
              {t('pages.home.header.slogan')}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            p={1}
            pt={2}
            display="flex"
            justifyContent={isMobile ? 'center' : 'flex-end'}
          >
            <ContactUsInfo background="light" size="small" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
