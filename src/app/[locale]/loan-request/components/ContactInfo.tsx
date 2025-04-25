import { useTranslations } from 'next-intl';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

interface ContactItem {
  title: string;
  description: string;
  icon: React.ElementType;
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
    },
  ];

  const primaryColor =
    background === 'dark'
      ? theme.palette.common.white
      : theme.palette.text.primary;
  const secondaryColor =
    background === 'dark'
      ? theme.palette.grey[300]
      : theme.palette.text.secondary;

  const primaryTextVariant = size === 'large' ? 'h6' : 'body1';
  const secondaryTextVariant = size === 'large' ? 'body1' : 'body2';

  return (
    <Stack>
      <List sx={{ gap: 0, padding: 0 }}>
        {contactData.map((contact, index) => {
          return (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{ my: size === 'large' ? 2 : 0.5, padding: 0 }}
            >
              <ListItemText
                primary={
                  <Typography variant={primaryTextVariant} color={primaryColor}>
                    {contact.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant={secondaryTextVariant}
                    color={secondaryColor}
                  >
                    {contact.description}
                  </Typography>
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
