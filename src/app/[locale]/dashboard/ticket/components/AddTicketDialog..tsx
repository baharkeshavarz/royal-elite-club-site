import useGrid from '@/components/DataGrid/hooks/useGrid';
import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import { FormPaper } from '@/components/FormPaper';
import useTicketTypeList from '@/hooks/useTicketTypeList';
import { insertTicket } from '@/services/ticket';
import { InsetTicketPayload } from '@/services/ticket/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface AddTicketDialogProps extends DialogProps {}

const AddTicketDialog: FC<AddTicketDialogProps> = (props) => {
  const t = useTranslations();
  const { data: ticketTypes } = useTicketTypeList();
  const { gridRef } = useGrid();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: insertTicket,
  });

  const labels: Record<keyof InsetTicketPayload, string> = {
    type: t('dashboard.ticket.fields.type'),
    message: t('dashboard.ticket.fields.message'),
  };

  const resolveSchema: yup.ObjectSchema<InsetTicketPayload> = yup.object({
    type: yup.number().nullable().required().label(labels.type),
    message: yup.string().nullable().required().label(labels.message),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const fields: FormBuilderProps['fields'] = {
    type: {
      name: 'type',
      label: t('dashboard.ticket.fields.type'),
      type: 'SearchableSelective',
      options: ticketTypes || [],
      ui: {
        grid: {
          xs: 12,
        },
      },
    },
    message: {
      name: 'message',
      label: t('dashboard.ticket.fields.message'),
      type: 'String',
      ui: {
        grid: {
          xs: 12,
        },
      },
      props: {
        multiline: true,
        rows: 6,
      },
    },
  };
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<InsetTicketPayload> = async (payload) => {
    await mutateAsync({ payload });
    props.onClose?.({}, 'escapeKeyDown');
    form.reset();
    queryClient.refetchQueries({
      queryKey: ['GET_USER_TICKET_LIST'],
    });
    gridRef?.current?.refreshServerSide({ purge: true });
  };

  return (
    <Dialog
      PaperComponent={FormPaper}
      onSubmit={form.handleSubmit(onSubmit)}
      title={t('dashboard.ticket.addDialogTitle')}
      {...props}
      dialogButtons={[
        {
          id: 'submit',
          children: t('buttons.submit'),
          type: 'submit',
          variant: 'contained',
          color: 'primary',
          sx: { color: 'common.white' },
          isLoading: isPending,
        },
      ]}
    >
      <FormProvider {...form}>
        <Grid container spacing={2}>
          <FormBuilder fields={fields} />
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default AddTicketDialog;
