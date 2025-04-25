import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomSwitchProps } from '../types';
import useLocalFormContext from '../hooks/useLocalFormContext';
import CustomSkeleton from '@/components/CustomSkeleton';

const CustomCheckbox: FC<CustomSwitchProps> = ({ label, name, ...props }) => {
  const { control } = useFormContext();
  const { isLoading } = useLocalFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field }) => {
        const value = !!field.value || false;
        return (
          <CustomSkeleton isLoading={isLoading}>
            <FormControlLabel
              value={value}
              checked={value}
              defaultChecked={value}
              onChange={field.onChange}
              control={<Checkbox size="small" {...props} />}
              label={label}
              labelPlacement="start"
            />
          </CustomSkeleton>
        );
      }}
    />
  );
};

export default CustomCheckbox;
