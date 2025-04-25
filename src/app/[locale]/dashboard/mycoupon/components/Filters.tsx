import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { FormBuilder, ResetButton } from '@/components/Fields';
import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import useFiltersContext from '@/components/Filters/hooks/useFiltersContext';
import FiltersCount from '@/components/FiltersCount';
import { useAppContext } from '@/hooks/useAppContext';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

const Filters = () => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const form = useForm();

  const { onChanged } = useFiltersContext();
  const onSubmit = form.handleSubmit(onChanged);

  const fields: FormBuilderProps['fields'] = {
    partner: {
      name: 'Partner',
      label: t('dashboard.coupon.fields.partner'),
      type: 'String',
      ui: {
        grid: {
          xs: isMobile ? 6 : 4,
        },
      },
    },
    code: {
      name: 'CouponCode',
      label: t('dashboard.coupon.fields.code'),
      type: 'String',
      ui: {
        grid: {
          xs: isMobile ? 6 : 4,
        },
      },
    },
    expiryDate: {
      name: 'ExpiryDate',
      label: t('dashboard.coupon.fields.expiryDate'),
      type: 'Date',
      ui: {
        grid: {
          xs: isMobile ? 12 : 4,
        },
      },
    },
  };

  return (
    <FormProvider {...form}>
      <Accordion variant="outlined">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <FiltersCount />
        </AccordionSummary>
        <AccordionDetails>
          <Grid component="form" container spacing={1} onSubmit={onSubmit}>
            <FormBuilder fields={fields} />
            <Grid item xs={12}>
              <Stack spacing={1} direction="row">
                <ResetButton size="small" onClick={onSubmit}>
                  {t('buttons.reset')}
                </ResetButton>

                <ButtonWithLoading
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="small"
                  sx={{ width: 100, color: 'common.white' }}
                >
                  {t('buttons.submitFilters')}
                </ButtonWithLoading>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </FormProvider>
  );
};

export default Filters;
