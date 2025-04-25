'use client';

import Loading from '@/app/[locale]/loading';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';

import useClassOfActivityList from '@/hooks/useClassOfActivityList';
import useGetCities from '@/hooks/useGetCities';
import useGetGenders from '@/hooks/useGetGenders';
import useGetProvinces from '@/hooks/useGetProvinces';
import { getProfile, updateProfile } from '@/services/account';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import DashboardCard from '../components/shared/DashboardCard';
import { IUserProfile } from '@/services/account/types';
import { FormBuilder } from '@/components/Fields';
import { useAppContext } from '@/hooks/useAppContext';

const MyProfile = () => {
  const t = useTranslations();
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
    firstName: yup.string().nullable().required().label(labels.firstName),
    lastName: yup.string().nullable().required().label(labels.lastName),
    birthDate: yup.mixed().nullable().required().label(labels.birthDate),
    gender: yup.number().nullable().required().label(labels.gender),
    provinceId: yup.number().nullable(),
    cityId: yup.number().nullable(),
    address: yup.string().nullable(),
    entertainment: yup.string().nullable(),
    favoriteCategories: yup.array().of(yup.number().required()),
    postalCode: yup.string().nullable(),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const provinceDataId = form.watch('provinceId') || 0;
  const { data: classOfActivityList } = useClassOfActivityList();
  const { data: provinces } = useGetProvinces();
  const { data: cities } = useGetCities(provinceDataId);
  const { data: genders } = useGetGenders();

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
    gender: {
      name: 'gender',
      label: t('dashboard.profile.fields.gender'),
      type: 'SearchableSelective',
      options: genders || [],
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
    },
    favoriteCategories: {
      name: 'favoriteCategories',
      label: t('dashboard.profile.fields.favoriteCategories'),
      type: 'SearchableSelective',
      options: classOfActivityList || [],
      ui: {
        grid: {
          xs: 12,
        },
      },
      multiple: true,
    },
    entertainment: {
      name: 'entertainment',
      label: t('dashboard.profile.fields.entertainment'),
      type: 'String',
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
    },
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: FieldNames) => {
      await updateProfile({ payload });
    },
  });

  const onSubmit: SubmitHandler<any> = async (payload) => {
    await mutateAsync(payload);
  };

  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  if (isFetching) return <Loading />;

  return (
    <Container maxWidth="lg">
      <DashboardCard title={t('dashboard.navigation.myProfile')} elevation={3}>
        <FormProvider {...form}>
          <Grid
            container
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormBuilder fields={fields} />
            <ButtonWithLoading variant="contained" sx={{ mt: 3 }} type="submit">
              {t('buttons.edit')}
            </ButtonWithLoading>
          </Grid>
        </FormProvider>
      </DashboardCard>
    </Container>
  );
};
export default MyProfile;
