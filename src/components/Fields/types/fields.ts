import {
  AutocompleteProps,
  BaseSelectProps,
  ButtonProps,
  OutlinedTextFieldProps,
  RegularBreakpoints,
  SwitchProps,
  TextFieldProps,
} from '@mui/material';
import {
  DatePickerProps,
  DateTimePickerProps,
  PickerValidDate,
} from '@mui/x-date-pickers';
import { ReactNode } from 'react';
import { ControllerProps } from 'react-hook-form';

export interface Option {
  id: number | string;
  label: ReactNode;
  value: string | number;
  other?: Record<any, any>;
}

export interface ButtonWithLoadingProps extends ButtonProps {
  isLoading?: boolean;
  buttonType?: 'Reset';
}

export interface CustomDateTimePickerProps<TDate extends PickerValidDate>
  extends DateTimePickerProps<TDate> {
  name: string;
  label: string;
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  valueFormatter?: (value: any) => any;
}

export interface CustomDatePickerProps<TDate extends PickerValidDate>
  extends DatePickerProps<TDate> {
  name: string;
  label: string;
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  valueFormatter?: (value: any) => any;
}
export interface CustomSelectProps extends BaseSelectProps<Option> {
  resetFieldsOnChange?: string[];
  options: Option[];
  labelFormatter?: (option: Option) => ReactNode;
}

export interface CustomAutoCompleteProps<
  TData extends Option,
  TMultiple extends boolean = false,
  TDisableClearable extends boolean = false,
  TFreeSolo extends boolean = false,
> extends Omit<
    AutocompleteProps<TData, TMultiple, TDisableClearable, TFreeSolo>,
    'renderInput'
  > {
  resetFieldsOnChange?: string[];
  options: TData[];
  labelFormatter?: (option: Option) => ReactNode;
  name: string;
  label: string;
}

export type CustomAutoCompleteComponentProps = CustomAutoCompleteProps<
  Option,
  false,
  false,
  false
>;

export interface ServerSideAutoComplete<
  TData extends Option,
  TMultiple extends boolean = false,
  TDisableClearable extends boolean = false,
  TFreeSolo extends boolean = false,
> extends Omit<
    CustomAutoCompleteProps<TData, TMultiple, TDisableClearable, TFreeSolo>,
    'options'
  > {
  queryFn: (value?: string | null) => Promise<Option[]>;
  disabledOnChange: boolean;
}

export type ServerSideCustomAutoCompleteProps = ServerSideAutoComplete<
  Option,
  false,
  false,
  false
>;

export type NumberLimitations = Partial<{
  min: number;
  max: number;
}>;

export type TextLimitations = Partial<{
  minLength: number;
  maxLength: number;
  onlyNumbers: boolean;
}>;
export interface CustomTextFieldProps
  extends Partial<TextFieldProps<'outlined'>> {
  label: string;
  name: string;
  limitations?: TextLimitations & NumberLimitations;
  ControllerProps?: Partial<ControllerProps>;
}

export interface CurrencyTextFieldProps
  extends Partial<TextFieldProps<'outlined'>> {
  limitations?: NumberLimitations;
  currencyLabel?: ReactNode;
}

export type DateLimitations = Partial<{
  minDate: Date;
  maxDate: Date;
}>;

export interface CustomSwitchProps extends SwitchProps {
  label: string;
  name: string;
}

export interface CustomRadioButtonsProps {
  label: string;
  name: string;
  options: Option[];
}

export interface ICustomTextField {
  type: 'TextField';
  props: OutlinedTextFieldProps;
  defaultValue: unknown;
}

export interface ICustomDatePicker {
  type: 'DatePicker';
  props: Omit<
    CustomDatePickerProps<PickerValidDate>,
    'onSelectedSectionsChange'
  >;
  defaultValue: unknown;
}

export interface ICustomSelect {
  type: 'Select';
  props: CustomSelectProps;
  defaultValue: unknown;
}

export interface ICustomSwitch {
  type: 'Switch';
  props: CustomSwitchProps;
  defaultValue: unknown;
}

// export interface UploadFieldProps
//   extends Omit<FileUploadProps, 'onChange' | 'value'> {
//   name: string;
//   value?: FileUploadProps['value'];
//   showUploadBox?: boolean;
// }

export interface UIProperties {
  grid: RegularBreakpoints;
}

export interface ICustomComponent {
  type?: 'Custom';
  component: ReactNode;
}

export interface ICommonProperties<Keys extends string> {
  name: Keys;
  label: string;
}

export type FreeSoloLimitations = Partial<{
  onlyNumbers: boolean;
}>;

export type MultipleFreeSoloProps = Partial<
  AutocompleteProps<string, true, false, true>
> & {
  name: string;
  label: string;
  resetFieldsOnChange?: string[];
  limitations?: FreeSoloLimitations;
};

export type IFieldTypes =
  | {
      type?: 'Date';
      limitations?: DateLimitations;
    }
  | {
      type?: 'RadioButtons';
      options: Option[];
    }
  | {
      type?: 'Number';
      limitations?: NumberLimitations;
    }
  | {
      type?: 'Switch';
    }
  | {
      type?: 'Checkbox';
    }
  | {
      type?: 'String';
      limitations?: TextLimitations;
      props?: Partial<CustomTextFieldProps>;
    }
  | {
      type?: 'Currency';
      limitations?: NumberLimitations;
    }
  | {
      type: 'Selective';
      options: Option[];
    }
  | {
      type: 'SearchableSelective';
      options: Option[];
      multiple?: boolean;
      props?: Partial<CustomAutoCompleteComponentProps>;
    }
  | {
      type: 'FreeSoloSelective';
      props?: Partial<MultipleFreeSoloProps>;
      limitations?: FreeSoloLimitations;
    }
  | {
      type: 'ServerSideSelective';
      queryFn: (searchText?: string | null) => Promise<Option[]>;
      props?: Partial<ServerSideCustomAutoCompleteProps>;
    };

export type Fields<Keys extends string> = Record<
  Keys,
  ((IFieldTypes & ICommonProperties<Keys>) | ICustomComponent) & {
    ui: UIProperties;
  }
>;
