import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import useActivityTypes from '@/hooks/useActivityTypes';
import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const ActivityTypes = () => {
  const t = useTranslations();
  const { data: activityTypeList } = useActivityTypes();

  const fields: FormBuilderProps['fields'] = {
    classOfActivity: {
      name: 'ActivityType',
      label: t('common.fields.activityType'),
      type: 'SearchableSelective',
      options: activityTypeList || [],
      ui: {
        grid: {
          xs: 12,
        },
      },
      multiple: true,
    },
  };

  return (
    <Grid container spacing={1}>
      <FormBuilder fields={fields} />
      {/* {storeTypeList &&
        storeTypeList.map((store) => (
          <Grid item key={store.id} xs={12} md={12}>
            <CustomCheckbox name="storeType" label={store.label!.toString()} />
          </Grid>
        ))} */}
    </Grid>
  );
};

export default ActivityTypes;
