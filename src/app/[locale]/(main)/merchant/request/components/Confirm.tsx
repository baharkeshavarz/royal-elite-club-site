import { useRouter } from '@/navigation';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import NextButton from './NextButton';
import { useTranslations } from 'next-intl';
import { DEFAULT_HOME_PAGE_PATH } from '@/constants/routes';

export interface ConfirmProps {
  value: string;
}

const Confirm: FC<ConfirmProps> = ({ value }) => {
  const router = useRouter();

  const t = useTranslations();

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Image
          className="gif"
          alt="confirm"
          src="/assets/images/confirm.gif"
          width={300}
          height={225}
        />
        <Typography variant="h4">
          {t('pages.merchantRequest.messages.confirm')}
        </Typography>

        <Typography>
          {t('pages.merchantRequest.fields.trackingCode')}:
        </Typography>
        <Typography variant="h1">{value}</Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center',
        }}
      >
        <NextButton onClick={() => router.push(DEFAULT_HOME_PAGE_PATH)}>
          {t('buttons.returnHome')}
        </NextButton>
      </CardActions>
    </Card>
  );
};

export default Confirm;
