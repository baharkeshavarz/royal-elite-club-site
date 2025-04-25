import { useTranslations } from 'next-intl';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import {
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

const enum ContactItemType {
  Tel = 'tel',
  Text = 'text',
  Email = 'mailto',
  LinkTo = 'link',
}

interface ContactItem {
  title: string;
  description: string;
  label?: string;
  icon: React.ElementType;
  type: ContactItemType;
}

interface ContactUsInfoProps {
  background?: 'light' | 'dark';
  size?: 'small' | 'large';
}

const ContactUsInfo = ({
  background = 'light',
  size = 'large',
}: ContactUsInfoProps) => {
  const t = useTranslations();
  const theme = useTheme();

  const contactData: ContactItem[] = [
    {
      title: t('pages.contactUs.contactInfo.phoneTitle'),
      description: t('pages.contactUs.contactInfo.phoneDescription'),
      icon: PhoneEnabledIcon,
      type: ContactItemType.Tel,
    },
    {
      title: t('pages.contactUs.contactInfo.emailTitle'),
      description: t('pages.contactUs.contactInfo.emailDescription'),
      icon: MailOutlineIcon,
      type: ContactItemType.Email,
    },
    {
      title: t('pages.contactUs.contactInfo.instagramTitle'),
      label: t('pages.contactUs.contactInfo.instagramLabel'),
      description: t('pages.contactUs.contactInfo.instagramDescription'),
      icon: InstagramIcon,
      type: ContactItemType.LinkTo,
    },
  ];

  const primaryColor =
    background === 'dark'
      ? theme.palette.common.black
      : theme.palette.text.primary;
  const secondaryColor =
    background === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.text.secondary;

  const titleVariant = size === 'large' ? 'h4' : 'h6';
  const iconSize = size === 'large' ? 45 : 30;
  const primaryTextVariant = size === 'large' ? 'h6' : 'body1';
  const secondaryTextVariant = size === 'large' ? 'body1' : 'body2';

  return (
    <Stack>
      <Typography variant={titleVariant} color={primaryColor} gutterBottom>
        {t('pages.contactUs.connectionTitle')}
      </Typography>
      <List sx={{ gap: 0, padding: 0 }}>
        {contactData.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{ my: size === 'large' ? 2 : 0.5, padding: 0 }}
            >
              <ListItemAvatar>
                <Icon sx={{ fontSize: iconSize, color: primaryColor }} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant={primaryTextVariant} color={primaryColor}>
                    {contact.title}
                  </Typography>
                }
                secondary={
                  <>
                    {[ContactItemType.Email, ContactItemType.Tel].includes(
                      contact.type,
                    ) && (
                      <a href={`${contact.type}:${contact.description}`}>
                        <Typography
                          variant={secondaryTextVariant}
                          color={secondaryColor}
                        >
                          {contact.description}
                        </Typography>
                      </a>
                    )}

                    {contact.type === ContactItemType.LinkTo && (
                      <Link href={contact.description} target="_blank">
                        <Typography
                          variant={secondaryTextVariant}
                          color={secondaryColor}
                        >
                          {contact.label}
                        </Typography>
                      </Link>
                    )}

                    {contact.type === ContactItemType.Text && (
                      <Typography
                        variant={secondaryTextVariant}
                        color={secondaryColor}
                      >
                        {contact.description}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default ContactUsInfo;
