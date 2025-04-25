import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import Logo from '../common/Logo';
import FooterMenus from './components/FooterMenus';
import ContactUsInfo from '@/app/[locale]/(main)/contact-us/components/ContactInfo';
import { DEFAULt_SMALL_LINE_HEIGHT } from '@/constants/general';

const Footer = () => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '2px solid',
        borderColor: theme.palette.primary.main,
        pt: 5,
        pb: 2,
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={3}
            >
              <Logo />
              <Typography
                variant="body2"
                color="common.black"
                textAlign="justify"
                lineHeight={DEFAULt_SMALL_LINE_HEIGHT}
              >
                {t('footer.aboutElite')}
              </Typography>
            </Box>

            <Box gap={1} mt={2} display="flex" justifyContent="center">
              <Button variant="outlined" sx={{}}>
                <a
                  href={`tel:${t(
                    'pages.contactUs.contactInfo.phoneDescription',
                  )}}`}
                  style={{
                    color: theme.palette.common.black,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {t('pages.contactUs.contactInfo.phoneDescription')}
                  <LocalPhoneIcon />
                </a>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            p={1}
            pt={2}
            display="flex"
            justifyContent="center"
          >
            <FooterMenus />
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            p={1}
            pt={2}
            display="flex"
            justifyContent="center"
          >
            <ContactUsInfo background="dark" size="small" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
