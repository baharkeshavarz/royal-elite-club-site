'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import Logo from '@/components/common/Logo';
import {
  EnglishAndPersianNumbersRegex,
  RESEND_AUTH_TIMER,
} from '@/constants/general';
import {
  DEFAULT_DASHBOARD_PATH,
  DEFAULT_HOME_PAGE_PATH,
  DEFAULT_LANDING_PAGE,
  DEFAULT_REGISTER_PATH,
} from '@/constants/routes';
import auth from '@/lib/auth';
import { Link } from '@/navigation';
import { register, registerVerify } from '@/services/account';
import { yupResolver } from '@hookform/resolvers/yup';
import { Edit, HourglassTopOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import OtpInput from 'react-otp-input';
import * as yup from 'yup';

type FieldNames = Record<'code', string>;

const Page = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [timerEndDate, setTimerEndDate] = useState(
    Date.now() + RESEND_AUTH_TIMER * 1000,
  );
  const userName = searchParams.get('username') || '';
  const nationalCode = searchParams.get('nationalCode') || '';
  const registerToken = searchParams.get('token') || '';
  const entryPoint = searchParams.get('backUrl') || '';

  const labels: Record<keyof FieldNames, string> = {
    code: t('pages.confirm.fields.code'),
  };

  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    code: yup
      .string()
      .nullable()
      .required()
      .matches(
        EnglishAndPersianNumbersRegex,
        t('pages.confirm.messages.onlyNumberIsValid'),
      )
      .min(6)
      .label(labels.code),
  });

  const methods = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const { control, handleSubmit, watch } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FieldNames) => {
      const { data } = await registerVerify({
        payload: {
          ...payload,
          mobileNumber: userName,
          token: registerToken,
        },
      });

      if (data?.succeed) {
        auth.login(data?.value);
        if (entryPoint) {
          router.push(DEFAULT_LANDING_PAGE);
        } else {
          router.push(DEFAULT_DASHBOARD_PATH);
        }
      }
    },
  });

  const onSubmit: SubmitHandler<FieldNames> = async (payload) => {
    await mutateAsync(payload);
  };

  const [code] = watch(['code']);

  useEffect(() => {
    if (!userName || !registerToken) {
      router.push(DEFAULT_REGISTER_PATH);
    }
  }, [userName, registerToken, router]);

  useEffect(() => {
    if (code?.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [code, handleSubmit]);

  const { mutateAsync: mutateAsyncSendAgain, isPending: isPendingSendAgain } =
    useMutation({
      mutationFn: register,
    });

  const handleClickOnSendAgain = async () => {
    setTimerEndDate(Date.now() + RESEND_AUTH_TIMER * 1000);
    await mutateAsyncSendAgain({
      payload: {
        mobileNumber: userName,
        nationalCode: nationalCode,
      },
    });
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
          <Stack spacing={2}>
            <Stack spacing={3} justifyContent="center" alignItems="center">
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
                sx={{
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {t('pages.confirm.title')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="body2">
                {t('pages.confirm.enterCodeMessage', {
                  phoneNumber: userName,
                })}
              </Typography>
              <Box sx={{ direction: 'rtl', mt: 2 }}>
                <Controller
                  control={control}
                  name="code"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <>
                        <OtpInput
                          containerStyle={{
                            direction: 'ltr',
                            justifyContent: 'space-between',
                          }}
                          inputStyle={{
                            width: 40,
                            height: 40,
                            marginRight: 8,
                            borderRadius: 4,
                            boxShadow: 'none',
                            outlineWidth: 0,
                            border: '1px solid',
                            borderColor: error?.message ? red[500] : grey[300],
                            textAlign: 'center',
                            fontSize: 24,
                          }}
                          value={value}
                          onChange={(value) => {
                            onChange(digitsFaToEn(value));
                          }}
                          numInputs={6}
                          inputType="tel"
                          renderInput={(props) => <input {...props} />}
                        />
                        {!!error?.message && (
                          <FormHelperText error sx={{ textAlign: 'center' }}>
                            {error.message as string}
                          </FormHelperText>
                        )}
                      </>
                    );
                  }}
                />
              </Box>
            </Stack>

            <Stack justifyContent="space-between" direction="row">
              <Countdown
                key={timerEndDate}
                date={timerEndDate}
                renderer={(props) => {
                  return (
                    <Button
                      color="warning"
                      variant="outlined"
                      startIcon={<HourglassTopOutlined />}
                      disabled={!props.completed}
                      onClick={handleClickOnSendAgain}
                      sx={{
                        width: 'fit-content',
                      }}
                    >
                      {props.completed
                        ? t('pages.confirm.buttons.sendAgain')
                        : `${props.total / 1000} ${t(
                            'pages.confirm.seconds',
                          )} ${t('pages.confirm.sendAgainText')}`}
                    </Button>
                  );
                }}
              />
              <Button
                LinkComponent={Link}
                href={
                  entryPoint
                    ? `${DEFAULT_REGISTER_PATH}?backUrl=${entryPoint}`
                    : DEFAULT_REGISTER_PATH
                }
                variant="outlined"
                color="warning"
                startIcon={<Edit />}
              >
                {t('pages.confirm.buttons.edit')}
              </Button>
            </Stack>
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
            {t('pages.login.buttons.login')}
          </ButtonWithLoading>
        </CardActions>
      </Card>
    </FormProvider>
  );
};

export default Page;
