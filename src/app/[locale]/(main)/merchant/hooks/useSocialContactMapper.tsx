import { SocialContactInfoEnum } from '@/services/merchant/types';
import {
  Facebook,
  Instagram,
  LinkedIn,
  PhoneEnabled,
  Telegram,
  Twitter,
} from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

const useSocialContactMapper = () => {
  const t = useTranslations();

  const theme = useTheme();
  const mapper: Record<
    SocialContactInfoEnum,
    {
      title: string;
      bg: string;
      text: string;
      icon: ReactNode;
      showLabel: boolean;
    }
  > = {
    [SocialContactInfoEnum.Instagram]: {
      title: 'instagram',
      bg: '#d53946',
      text: theme.palette.info.main,
      icon: <Instagram fontSize="small" />,
      showLabel: false,
    },
    [SocialContactInfoEnum.Facebook]: {
      title: 'facebook',
      bg: '#395498',
      text: theme.palette.info.main,
      icon: <Facebook fontSize="small" />,
      showLabel: false,
    },
    [SocialContactInfoEnum.Twitter]: {
      title: 'twitter',
      bg: '#1C96E8',
      text: theme.palette.info.main,
      icon: <Twitter fontSize="small" />,
      showLabel: false,
    },
    [SocialContactInfoEnum.LinkedIn]: {
      title: 'linkedIn',
      bg: '#007AB5',
      text: theme.palette.info.main,
      icon: <LinkedIn fontSize="small" />,
      showLabel: false,
    },
    [SocialContactInfoEnum.Telegram]: {
      title: 'telegram',
      bg: '#1C96E8',
      text: theme.palette.info.main,
      icon: <Telegram fontSize="small" />,
      showLabel: false,
    },
    [SocialContactInfoEnum.PhoneNumbers]: {
      title: 'phone',
      bg: '#000',
      text: theme.palette.info.main,
      icon: <PhoneEnabled fontSize="small" />,
      showLabel: true,
    },
  };

  return mapper;
};

export default useSocialContactMapper;
