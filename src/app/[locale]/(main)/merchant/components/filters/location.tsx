import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import useGetCities from '@/hooks/useGetCities';
import useGetProvinces from '@/hooks/useGetProvinces';
import { Grid } from '@mui/material';
import React from 'react';
import { useWatch } from 'react-hook-form';

const Locations = () => {
  const ProvinceId = useWatch({ name: 'ProvinceId' });

  const { data: provinces } = useGetProvinces();
  const { data: cities } = useGetCities(ProvinceId);

  const fields: FormBuilderProps['fields'] = {
    ProvinceId: {
      name: 'ProvinceId',
      label: 'استان',
      type: 'SearchableSelective',
      options: provinces || [],
      ui: {
        grid: {
          xs: 12,
        },
      },
      props: {
        resetFieldsOnChange: ['CityId'],
      },
    },
    CityId: {
      name: 'CityId',
      label: 'شهر',
      type: 'SearchableSelective',
      options: cities || [],
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

export default Locations;
