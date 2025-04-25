import {
  DEFAULT_ABOUT_PATH,
  DEFAULT_CONTACT_PATH,
  DEFAULT_LANDING_PAGE,
  DEFAULT_TERMS_PATH,
} from '@/constants/routes';
import { Link } from '@/navigation';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const FooterMenus = () => {
  const t = useTranslations();

  const pages = {
    company: [
      { label: t('header.navigation.aboutUs'), href: DEFAULT_ABOUT_PATH },
      { label: t('header.navigation.contactUs'), href: DEFAULT_CONTACT_PATH },
      { label: t('header.navigation.terms'), href: DEFAULT_TERMS_PATH },
      { label: t('header.navigation.takeLoan'), href: DEFAULT_LANDING_PAGE },
    ],
  };

  return (
    <Box px={1}>
      <Typography variant="h6" color="common.black" pb={1.5}>
        {t('siteInfo.title')}
      </Typography>
      {pages.company.map((page, index) => (
        <Link
          key={index}
          href={page.href}
          style={{
            textDecoration: 'none',
            color: 'common.black',
          }}
        >
          <Typography color="common.black" py={0.8}>
            {page.label}
          </Typography>
        </Link>
      ))}
    </Box>
  );
};

export default FooterMenus;
