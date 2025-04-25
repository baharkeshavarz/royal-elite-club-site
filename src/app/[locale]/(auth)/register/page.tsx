'use client';

import Logo from '@/components/common/Logo';
import { Link } from '@/navigation';
import { register } from '@/services/account';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { CustomTextField } from '@/components/Fields';
import {
  DEFAULT_HOME_PAGE_PATH,
  DEFAULT_LOGIN_PATH,
  DEFAULT_REGISTER_OTP_PATH,
  DEFAULT_TERMS_PATH,
} from '@/constants/routes';
import { RegisterPayload } from '@/services/account/types';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useCommon from '../../(main)/merchant/request/hooks/useCommon';

type FieldNames = Record<'mobileNumber' | 'nationalCode', any>;

const Page = () => {
  const t = useTranslations();
  const theme = useTheme();
  const common = useCommon();
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryPoint = searchParams.get('backUrl') || '';

  const resolveSchema: yup.ObjectSchema<RegisterPayload> = common.schema.shape({
    mobileNumber: yup.string().isMobileNumber().nullable().required(),
    nationalCode: yup.string().isNationalCode().nullable().required(),
  });

  const methods = useForm<RegisterPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync } = useMutation({
    mutationFn: register,
  });

  const onSubmit: SubmitHandler<FieldNames> = async (payload) => {
    const { data } = await mutateAsync({ payload });

    if (data?.succeed) {
      let redirectRoute = `${DEFAULT_REGISTER_OTP_PATH}?username=${payload.mobileNumber}&nationalCode=${payload.nationalCode}&token=${data?.value}`;
      if (entryPoint) {
        redirectRoute += `&backUrl=${entryPoint}`;
      }

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
                  mb: 2,
                }}
              >
                {t('pages.register.title')}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="body1" mt={2}>
                {t('pages.register.message')}
              </Typography>
            </Stack>

            <CustomTextField
              name="mobileNumber"
              variant="outlined"
              fullWidth
              label={t('pages.register.phoneNumber')}
              placeholder={t('pages.register.phoneNumber')}
              limitations={{
                onlyNumbers: true,
              }}
            />

            <CustomTextField
              name="nationalCode"
              variant="outlined"
              fullWidth
              label={t('pages.register.nationalCode')}
              placeholder={t('pages.register.nationalCode')}
              limitations={{
                onlyNumbers: true,
              }}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            <Typography color="common.white">
              {t('pages.register.buttons.register')}
            </Typography>
          </Button>
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
            {t('pages.register.hasAccount')}
            <Link
              href={
                entryPoint
                  ? `${DEFAULT_LOGIN_PATH}?backUrl=${entryPoint}`
                  : DEFAULT_LOGIN_PATH
              }
              style={{
                color: theme.palette.secondary.main,
                fontWeight: 600,
                padding: '0.2rem',
              }}
            >
              {t('pages.login.buttons.login')}
            </Link>
          </Typography>
        </Stack>
      </Card>
    </FormProvider>
  );
};

export default Page;
