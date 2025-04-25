import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import useClassOfActivityList from '@/hooks/useClassOfActivityList';
import { Grid } from '@mui/material';
import React from 'react';

const ActivitiesClass = () => {
  const { data: classOfActivityList } = useClassOfActivityList();

  const fields: FormBuilderProps['fields'] = {
    classOfActivity: {
      name: 'ClassOfActivities',
      label: 'زمینه فعالیت پذیرنده',
      type: 'SearchableSelective',
      options: classOfActivityList || [],
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
    </Grid>
  );
};

export default ActivitiesClass;
