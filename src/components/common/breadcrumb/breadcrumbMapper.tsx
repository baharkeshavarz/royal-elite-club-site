import {
  DEFAULT_ABOUT_PATH,
  DEFAULT_CONTACT_PATH,
  DEFAULT_FAQ_PATH,
  DEFAULT_HOME_PAGE_PATH,
  DEFAULT_MERCHANT_LIST_PATH,
  DEFAULT_MERCHANT_REQUEST,
  DEFAULT_TERMS_PATH,
} from '@/constants/routes';
import { useTranslations } from 'next-intl';

interface Route {
  label: string;
}

const useBreadCrumbsMapper = () => {
  const t = useTranslations();

  const mapper: Record<string, Route> = {
    [DEFAULT_HOME_PAGE_PATH as string]: {
      label: t('header.navigation.home'),
    },
    [DEFAULT_ABOUT_PATH as string]: {
      label: t('header.navigation.aboutUs'),
    },
    [DEFAULT_TERMS_PATH as string]: {
      label: t('header.navigation.terms'),
    },
    [DEFAULT_MERCHANT_LIST_PATH as string]: {
      label: t('header.navigation.merchant'),
    },
    [DEFAULT_MERCHANT_REQUEST as string]: {
      label: t('header.navigation.merchantRequest'),
    },
    [DEFAULT_FAQ_PATH as string]: {
      label: t('header.navigation.faq'),
    },
    [DEFAULT_CONTACT_PATH as string]: {
      label: t('header.navigation.contactUs'),
    },
  };

  return mapper;
};

export default useBreadCrumbsMapper;
