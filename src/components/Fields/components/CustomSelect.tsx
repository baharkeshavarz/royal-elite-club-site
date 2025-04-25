import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSkeleton from '../../CustomSkeleton';
import useLocalFormContext from '../hooks/useLocalFormContext';
import { CustomSelectProps } from '../types';
import ClearButtonAdornment from './ClearButtonAdornment';

interface ICustomSelectProps extends CustomSelectProps {
  multiple?: boolean;
}

const CustomSelect: FC<ICustomSelectProps> = ({
  options = [],
  name = '',
  size,
  labelFormatter,
  resetFieldsOnChange = [],
  ...props
}) => {
  const { isLoading } = useLocalFormContext();
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const labelId = `${field.name}-label`;

        let _value: number | number[] | boolean | '' = props?.multiple
          ? []
          : '';
        if (field?.value?.[0]?.id) {
          _value = field.value.map((item: any) => item.id);
        } else if (field?.value?.id) {
          _value = field.value.id;
        } else if (typeof field.value === 'number') {
          _value = field.value;
        } else if (
          Array.isArray(field.value) ||
          typeof field.value === 'boolean'
        ) {
          _value = field.value;
        } else {
          _value = field.value || '';
        }

        const onChange: CustomSelectProps['onChange'] = (...args) => {
          props?.onChange?.(...args);
          field.onChange(args[0]);

          if (resetFieldsOnChange?.length) {
            resetFieldsOnChange.forEach((key) => {
              setValue(key, null);
            });
          }
        };

        return (
          <CustomSkeleton isLoading={isLoading}>
            <FormControl fullWidth error={!!errors[field.name]} size={size}>
              <InputLabel id={labelId}>{props.label}</InputLabel>
              <Select
                {...props}
                endAdornment={
                  (_value ?? true) && (
                    <ClearButtonAdornment
                      onChange={field.onChange}
                      sx={{ mr: 1.5 }}
                    />
                  )
                }
                labelId={labelId}
                id={`${field.name}-select`}
                value={_value as any}
                onChange={onChange}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option.id} value={option.value}>
                      {labelFormatter?.(option) || option.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errors[field.name]?.['message']?.toString()}
              </FormHelperText>
            </FormControl>
          </CustomSkeleton>
        );
      }}
    />
  );
};

export default CustomSelect;
