'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useAppContext } from '@/hooks/useAppContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { IUserEducation } from '@/services/account/types';
import useGetEducations from '../hooks/useGetEducations';
import useGetJobs from '../hooks/useGetJobs';
import { FC } from 'react';
import { EnumCreditRequestUserEducationStep } from '@/services/request-credit/types';

interface EducationDetailsProps {
  handleStep: (step: number) => void;
}

const EducationDetails: FC<EducationDetailsProps> = ({ handleStep }) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();

  type FieldNames = Record<keyof IUserEducation, any>;

  const labels: Pick<FieldNames, 'education' | 'job' | 'income'> = {
    education: t('dashboard.profile.fields.education'),
    job: t('dashboard.profile.fields.job'),
    income: t('dashboard.profile.fields.income'),
  };

  const resolveSchema: yup.ObjectSchema<any> = yup.object({
    education: yup.string().nullable().required().label(labels.education),
    job: yup.string().nullable().required().label(labels.job),
    income: yup.mixed().nullable().required().label(labels.income),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit, reset } = form;

  const mobileSize = isMobile ? 12 : 6;
  const { data: educationList } = useGetEducations();
  const { data: jobList } = useGetJobs();

  const fields: FormBuilderProps['fields'] = {
    education: {
      name: 'provinceId',
      label: t('dashboard.profile.fields.education'),
      type: 'SearchableSelective',
      options: educationList || [],
      ui: {
        grid: {
          xs: mobileSize,
          sm: 4,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    job: {
      name: 'cityId',
      label: t('dashboard.profile.fields.job'),
      type: 'SearchableSelective',
      options: jobList || [],
      ui: {
        grid: {
          xs: mobileSize,
          sm: 4,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    income: {
      name: 'income',
      label: t('dashboard.profile.fields.income'),
      type: 'String',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 4,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
  };

  const onSubmitEducation = () => {
    handleStep(EnumCreditRequestUserEducationStep.JOB);
  };

  return (
    <FormProvider {...form}>
      <Grid
        container
        spacing={2}
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <FormBuilder fields={fields} />
        <ButtonWithLoading
          variant="contained"
          sx={{ mt: 3 }}
          onClick={onSubmitEducation}
        >
          ثبت و ادامه
        </ButtonWithLoading>
      </Grid>
    </FormProvider>
  );
};
export default EducationDetails;
