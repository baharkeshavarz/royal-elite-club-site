import {
  DEFAULT_ABOUT_PATH,
  DEFAULT_CONTACT_PATH,
  DEFAULT_FAQ_PATH,
  DEFAULT_LANDING_PAGE,
  DEFAULT_MERCHANT_LIST_PATH,
  DEFAULT_MERCHANT_REQUEST_PATH,
  DEFAULT_TERMS_PATH,
} from '@/constants/routes';
import { Link as NextLink } from '@/navigation';
import { Button, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

const MenusSection = () => {
  const t = useTranslations();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const pages = [
    {
      label: t('header.navigation.merchantRequest'),
      href: DEFAULT_MERCHANT_REQUEST_PATH,
    },
    {
      label: t('header.navigation.merchant'),
      href: DEFAULT_MERCHANT_LIST_PATH,
    },
    { label: t('header.navigation.faq'), href: DEFAULT_FAQ_PATH },
    { label: t('header.navigation.aboutUs'), href: DEFAULT_ABOUT_PATH },
    { label: t('header.navigation.contactUs'), href: DEFAULT_CONTACT_PATH },
    { label: t('header.navigation.terms'), href: DEFAULT_TERMS_PATH },
    { label: t('header.navigation.takeLoan'), href: DEFAULT_LANDING_PAGE },
  ];

  return (
    <Stack
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        flexWrap: 'wrap',
        justifyContent: isSmallScreen ? 'center' : 'flex-start',
        alignItems: 'center',
        gap: 1,
        width: '100%',
      }}
    >
      {pages.map((page) => (
        <Button
          component={NextLink}
          href={page.href}
          key={page.label}
          sx={{
            color: theme.palette.common.black,
            textTransform: 'none',
            fontSize: '0.9rem',
            '&:hover': {
              borderRadius: 0,
              borderBottom: `2px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          {page.label}
        </Button>
      ))}
    </Stack>
  );
};

export default MenusSection;
