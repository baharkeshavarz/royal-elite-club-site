'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import FileUploader from '@/components/common/FileUploader';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { DEFAULT_DASHBOARD_GET_CREDIT_PREVIEW_CONTRACT } from '@/constants/routes';
import { useAppContext } from '@/hooks/useAppContext';
import useGetBanks from '@/hooks/useGetBanks';
import { IChequeData } from '@/services/facility/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const ChequeForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const { isMobile } = useAppContext();
  type FieldNames = Record<keyof IChequeData, any>;

  const labels: FieldNames = {
    collateralNumber: t('dashboard.facility.fields.collateralNumber'),
    collateralDate: t('dashboard.facility.fields.collateralDate'),
    collateralIssuerBank: t('dashboard.facility.fields.collateralIssuerBank'),
    chequeSeri: t('dashboard.facility.fields.chequeSeri'),
    chequeSerial: t('dashboard.facility.fields.chequeSerial'),
    chequeAmount: t('dashboard.facility.fields.chequeAmount'),
  };

  const resolveSchema: yup.ObjectSchema<any> = yup.object({
    collateralNumber: yup
      .number()
      .nullable()
      .required()
      .label(labels.collateralNumber),
    collateralDate: yup
      .mixed()
      .nullable()
      .required()
      .label(labels.collateralDate),
    collateralIssuerBank: yup
      .number()
      .nullable()
      .required()
      .label(labels.collateralIssuerBank),
    chequeSeri: yup.number().required().nullable(),
    chequeSerial: yup.string().required().nullable(),
    chequeAmount: yup.number().required().nullable(),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const { data: bankList } = useGetBanks();

  const { handleSubmit, reset, getValues } = form;

  const mobileSize = isMobile ? 12 : 6;

  const fields: FormBuilderProps['fields'] = {
    collateralNumber: {
      name: 'collateralNumber',
      label: t('dashboard.facility.fields.collateralNumber'),
      type: 'String',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: 16,
      },
    },

    collateralDate: {
      name: 'collateralDate',
      label: t('dashboard.facility.fields.collateralDate'),
      type: 'Date',
      ui: {
        grid: {
          xs: mobileSize,
          sm: 6,
        },
      },
    },
    collateralIssuerBank: {
      name: 'collateralIssuerBank',
      label: t('dashboard.facility.fields.collateralIssuerBank'),
      type: 'SearchableSelective',
      options: bankList || [],
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

    chequeSeri: {
      name: 'chequeSeri',
      label: t('dashboard.facility.fields.chequeSeri'),
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

    chequeSerial: {
      name: 'chequeSerial',
      label: t('dashboard.facility.fields.chequeSerial'),
      type: 'String',
      ui: {
        grid: {
          xs: mobileSize,
        },
      },
      props: {
        sx: {
          backgroundColor: 'common.white',
        },
      },
    },
    chequeAmount: {
      name: 'chequeAmount',
      label: t('dashboard.facility.fields.chequeAmount'),
      type: 'Number',
      ui: {
        grid: {
          xs: mobileSize,
        },
      },
    },
  };

  const onSubmit: SubmitHandler<any> = async (payload) => {
    router.push(DEFAULT_DASHBOARD_GET_CREDIT_PREVIEW_CONTRACT);
  };

  console.log(getValues());

  return (
    <>
      <Typography variant="subtitle1">ورود اطلاعات چک ضمانت:</Typography>
      <FormProvider {...form}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <FormBuilder fields={fields} />
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                border: '2px dashed #ccc',
                p: 2,
                margin: '0 auto',
              }}
            >
              <FileUploader
                title="تصویر چک"
                subTitle="عکس ارسالی باید خوانا و واضح باشد"
                setFile={() => {}}
                sx={{ height: '100%' }}
                description=""
              />
            </Paper>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <ButtonWithLoading variant="contained" sx={{ mt: 2 }} type="submit">
              تایید اطلاعات و ادامه
            </ButtonWithLoading>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
export default ChequeForm;
