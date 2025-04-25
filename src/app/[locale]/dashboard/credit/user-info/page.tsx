'use client';

import Loading from '@/app/[locale]/loading';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useAppContext } from '@/hooks/useAppContext';
import useGetCities from '@/hooks/useGetCities';
import useGetProvinces from '@/hooks/useGetProvinces';
import { getProfile, updateProfile } from '@/services/account';
import { IUserProfile } from '@/services/account/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Paper } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import StepsHeader from '../components/StepsHeader';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useRouter } from 'next/navigation';
import { DEFAULT_DASHBOARD_GET_CREDIT_KYC } from '@/constants/routes';

const UserInfo = () => {
  const t = useTranslations();
  const router = useRouter();
  const { isMobile } = useAppContext();

  type FieldNames = Record<keyof IUserProfile, any>;

  const labels: Pick<
    FieldNames,
    'firstName' | 'lastName' | 'birthDate' | 'gender'
  > = {
    firstName: t('dashboard.profile.fields.firstName'),
    lastName: t('dashboard.profile.fields.lastName'),
    birthDate: t('dashboard.profile.fields.birthDate'),
    gender: t('dashboard.profile.fields.gender'),
  };

  const resolveSchema: yup.ObjectSchema<any> = yup.object({
    firstName: yup.string().nullable().label(labels.firstName),
    lastName: yup.string().nullable().label(labels.lastName),
    birthDate: yup.mixed().nullable().label(labels.birthDate),
    gender: yup.number().nullable().label(labels.gender),
    provinceId: yup.number().nullable(),
    cityId: yup.number().nullable(),
    address: yup.string().nullable(),
    postalCode: yup.string().nullable(),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const provinceDataId = form.watch('provinceId') || 0;
  const { data: provinces } = useGetProvinces();
  const { data: cities } = useGetCities(provinceDataId);

  const { data: profile, isFetching } = useQuery({
    queryKey: ['GET_USER_PROFILE'],
    queryFn: async () => {
      const { data } = await getProfile();

      form.reset({ ...data.value });
      return data?.value;
    },
    gcTime: 0,
  });

  const { handleSubmit, reset } = form;

  const mobileSize = isMobile ? 12 : 6;

  const fields: FormBuilderProps['fields'] = {
    firstName: {
      name: 'firstName',
      label: t('dashboard.profile.fields.firstName'),
      type: 'String',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    lastName: {
      name: 'lastName',
      label: t('dashboard.profile.fields.lastName'),
      type: 'String',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    birthDate: {
      name: 'birthDate',
      label: t('dashboard.profile.fields.birthDate'),
      type: 'Date',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
    },
    postalCode: {
      name: 'postalCode',
      label: t('dashboard.profile.fields.postalCode'),
      type: 'String',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
      limitations: {
        onlyNumbers: true,
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    provinceId: {
      name: 'provinceId',
      label: t('dashboard.profile.fields.province'),
      type: 'SearchableSelective',
      options: provinces || [],
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
      props: {
        resetFieldsOnChange: ['cityId'],
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    cityId: {
      name: 'cityId',
      label: t('dashboard.profile.fields.city'),
      type: 'SearchableSelective',
      options: cities || [],
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    address: {
      name: 'address',
      label: t('dashboard.profile.fields.address'),
      type: 'String',
      ui: {
        grid: {
          xs: 12,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: FieldNames) => {
      await updateProfile({ payload });
    },
  });

  const onSubmit: SubmitHandler<any> = async (payload) => {
    router.push(DEFAULT_DASHBOARD_GET_CREDIT_KYC);
  };

  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  if (isFetching) return <Loading />;

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid #ddd`,
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        mx: 'auto',
        maxWidth: 'md',
        mt: 4,
        backgroundColor: '#f9fcff',
      }}
    >
      <StepsHeader title="ورود اطلاعات فردی" icon={PermIdentityIcon} />

      <FormProvider {...form}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <FormBuilder fields={fields} />
          <ButtonWithLoading variant="contained" sx={{ mt: 3 }} type="submit">
            تایید اطلاعات و ادامه
          </ButtonWithLoading>
        </Grid>
      </FormProvider>
    </Paper>
  );
};
export default UserInfo;
