import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import NextButton from './NextButton';

//TODO: add multi language support to this page

const items = [
  {
    title: 'مزایای عضويت پذیرنده',
    children: [
      'معرفی پذیرندگان به طیف گسترده ای از دارندگان کارت به منظور خرید هدفمند',
      'افزایش میزان فروش ',
      'حضور پذیرنده در برنامه های تبلیغاتی متنوع رویال الیت',
      'امکان معرفی پیشنهادات و جشنواره های پذیرنده در رسانه های متعلق به رویال الیت',
      'امکان عضويت پذیرنده در شبکه اعتباری در طرح ارائه تسهیلات به اعضای باشگاه رویال الیت',
    ],
  },
  {
    title: 'الزامات و نیازمندی های درخواست پذیرندگی',
    children: [
      'در اختیار داشتن مجوز ارائه کالا/ خدمات',
      'در اختیار داشتن پایانه شرکت به پرداخت ملت',
      'داشتن حسن شهرت در صنف مربوطه',
    ],
  },
];

export interface MerchantRulesProps {
  onClick: VoidFunction;
}
const MerchantRules: FC<MerchantRulesProps> = ({ onClick }) => {
  const t = useTranslations();

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} md={12} lg={6}>
            <img
              src="/assets/images/merchant-request-page.jpg"
              alt="Merchant Request"
              style={{
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '16px',
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Stack spacing={3}>
              {items.map((item) => {
                return (
                  <Box key={item.title}>
                    <Typography variant="h5">{item.title}</Typography>
                    <Stack spacing={1} component="ol">
                      {item.children.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <NextButton onClick={onClick}>
          {t('pages.merchantRequest.buttons.registerRequest')}
        </NextButton>
      </CardActions>
    </Card>
  );
};

export default MerchantRules;
