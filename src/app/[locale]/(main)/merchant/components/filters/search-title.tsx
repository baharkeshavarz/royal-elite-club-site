import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import { Grid } from '@mui/material';
import React from 'react';

const SearchTitle = () => {
  const fields: FormBuilderProps['fields'] = {
    Name: {
      name: 'Name',
      label: 'نام پذیرنده',
      type: 'String',
      ui: {
        grid: {
          xs: 12,
        },
      },
    },
  };

  return (
    <Grid container spacing={1}>
      <FormBuilder fields={fields} />
    </Grid>
  );
};

export default SearchTitle;
