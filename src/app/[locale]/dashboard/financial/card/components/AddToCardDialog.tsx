'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import { FormBuilder } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import useGetBanks from '@/hooks/useGetBanks';
import { insertUserCard } from '@/services/financial';
import { IBankCard } from '@/services/financial/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface AddToCardDialogProps extends DialogProps {
  onSuccess?: VoidFunction;
}

const AddToCardDialog: FC<AddToCardDialogProps> = ({ onSuccess, ...props }) => {
  const t = useTranslations();
  const { data: bankTypes } = useGetBanks();

  const labels: Record<keyof IBankCard, string> = {
    cardNumber: t('dashboard.card.fields.cardNumber'),
    bankType: t('dashboard.card.fields.bankType'),
  };

  const resolveSchema: yup.ObjectSchema<IBankCard> = yup.object({
    cardNumber: yup.string().nullable().required().label(labels.cardNumber),
    bankType: yup.number().nullable().required().label(labels.bankType),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const fields: FormBuilderProps['fields'] = {
    cardNumber: {
      name: 'cardNumber',
      label: t('dashboard.card.fields.cardNumber'),
      type: 'String',
      ui: {
        grid: {
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
      },
    },
    bankType: {
      name: 'bankType',
      label: t('dashboard.card.fields.bankType'),
      type: 'SearchableSelective',
      options: bankTypes || [],
      ui: {
        grid: {
          xs: 12,
        },
      },
    },
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: insertUserCard,
  });

  const onSubmit: SubmitHandler<any> = async (payload) => {
    await mutateAsync({ payload });
    form.reset();
    props.onClose?.({}, 'escapeKeyDown');
    onSuccess?.();
  };

  return (
    <Dialog
      title={t('dashboard.card.addCardDialogTitle')}
      PaperProps={{
        sx: {
          width: { sx: '100%', md: '400px' },
        },
      }}
      {...props}
    >
      <Container maxWidth="md">
        <FormProvider {...form}>
          <Grid
            container
            spacing={2}
            component="form"
            onSubmit={form.handleSubmit(onSubmit)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormBuilder fields={fields} />
            <ButtonWithLoading
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
              disabled={isPending}
              isLoading={isPending}
            >
              {t('dashboard.card.buttons.addCard')}
            </ButtonWithLoading>
          </Grid>
        </FormProvider>
      </Container>
    </Dialog>
  );
};
export default AddToCardDialog;
