'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import Logo from '@/components/common/Logo';
import {
  DEFAULT_HOME_PAGE_PATH,
  DEFAULT_LOGIN_OTP_PATH,
  DEFAULT_REGISTER_PATH,
  DEFAULT_TERMS_PATH,
} from '@/constants/routes';
import { Link } from '@/navigation';
import { sendLoginOtp } from '@/services/account';
import { SendLoginOtpPayload } from '@/services/account/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { CustomTextField } from '@/components/Fields';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useCommon from '../../(main)/merchant/request/hooks/useCommon';

const Page = () => {
  const t = useTranslations();
  const theme = useTheme();
  const common = useCommon();
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryPoint = searchParams.get('backUrl') || '';

  const resolveSchema: yup.ObjectSchema<SendLoginOtpPayload> =
    common.schema.shape({
      userName: yup.string().isMobileNumber().nullable().required(),
    });

  const methods = useForm<SendLoginOtpPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendLoginOtp,
  });

  const onSubmit: SubmitHandler<SendLoginOtpPayload> = async (payload) => {
    const { data } = await mutateAsync({ payload });

    let redirectRoute = `${DEFAULT_LOGIN_OTP_PATH}?username=${payload.userName}`;
    if (entryPoint) {
      redirectRoute += `&backUrl=${entryPoint}`;
    }

    if (data?.succeed) {
      router.push(redirectRoute);
    }
  };

  return (
    <FormProvider {...methods}>
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        sx={{
          p: 2,
        }}
      >
        <CardContent>
          <Stack spacing={1}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Box
                sx={{
                  pt: 2,
                }}
              >
                <Link href={DEFAULT_HOME_PAGE_PATH}>
                  <Logo />
                </Link>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {t('pages.login.title')}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="body1">{t('pages.login.hello')}</Typography>
              <Typography variant="body1">
                {t('pages.login.message')}
              </Typography>
            </Stack>

            <CustomTextField
              name="userName"
              variant="outlined"
              fullWidth
              label={t('pages.login.phoneNumber')}
              placeholder={t('pages.login.phoneNumber')}
              limitations={{
                onlyNumbers: true,
              }}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <ButtonWithLoading
            fullWidth
            isLoading={isPending}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            <Typography color="common.white">
              {t('pages.login.buttons.getTheCode')}
            </Typography>
          </ButtonWithLoading>
        </CardActions>

        <Stack spacing={2} my={2}>
          <Typography textAlign="center" variant="caption">
            {t('pages.login.acceptRule')}
            <Link
              href={DEFAULT_TERMS_PATH}
              style={{
                color: theme.palette.secondary.main,
                fontWeight: 600,
                padding: '0.2rem',
                textDecoration: 'none',
              }}
            >
              {''} {t('siteInfo.title')} {''}
            </Link>
            {t('pages.login.acceptRuleEnd')}
          </Typography>
        </Stack>
        <Stack spacing={2} my={2}>
          <Typography textAlign="center" variant="caption">
            {t('pages.register.hasNoAccount')}
            <Link
              href={
                entryPoint
                  ? `${DEFAULT_REGISTER_PATH}?backUrl=${entryPoint}`
                  : DEFAULT_REGISTER_PATH
              }
              style={{
                color: theme.palette.secondary.main,
                fontWeight: 600,
                padding: '0.2rem',
                textDecoration: 'none',
              }}
            >
              {t('pages.register.buttons.register')}
            </Link>
          </Typography>
        </Stack>
      </Card>
    </FormProvider>
  );
};
export default Page;
