'use client';

import { Box, Button, Typography } from '@mui/material';
import { Link as NextLink } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from '@/components/common/Image';
import { DEFAULT_HOME_PAGE_PATH } from '@/constants/routes';

const NotFound = () => {
  const t = useTranslations();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Image
        src="/assets/images/404-error.jpg"
        width={500}
        height={350}
        alt="404"
      />
      <Typography
        variant="h1"
        sx={{
          color: (theme) => theme.palette.primary.main,
          fontWeight: 'bold',
          mt: 1,
        }}
      >
        404
      </Typography>
      <Typography variant="h6" mb={2}>
        {t('messages.notFound')}
      </Typography>

      <Button
        variant="outlined"
        component={NextLink}
        href={DEFAULT_HOME_PAGE_PATH}
      >
        {t('buttons.returnHome')}
      </Button>
    </Box>
  );
};

export default NotFound;
