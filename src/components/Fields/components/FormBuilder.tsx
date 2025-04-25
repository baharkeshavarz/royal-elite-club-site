import { Grid } from '@mui/material';
import { FC } from 'react';

import CustomSwitch from './CustomSwitch';
import CurrencyTextField from './CurrencyTextField';
import CustomAutoComplete from './CustomAutoComplete';
import CustomMultipleAutoComplete from './CustomMultipleAutoComplete';
import { Fields } from '../types';
import CustomCheckbox from './CustomCheckbox';
import CustomDatePicker from './CustomDatePicker';
import CustomRadioButtons from './CustomRadioButtons';
import CustomSelect from './CustomSelect';
import CustomTextField from './CustomTextField';

export interface FormBuilderProps<T extends string = any> {
  fields: Fields<T>;
}
const FormBuilder: FC<FormBuilderProps> = ({ fields }) => {
  return (
    <>
      {Object.keys(fields).map((key) => {
        const { ui, ...common } = fields[key];

        switch (common.type) {
          case 'Custom':
            return (
              <Grid item {...ui.grid}>
                {common.component}
              </Grid>
            );
          case 'RadioButtons':
            return (
              <Grid item {...ui.grid}>
                <CustomRadioButtons {...common} />
              </Grid>
            );
          case 'Switch':
            return (
              <Grid item {...ui.grid}>
                <CustomSwitch {...common} />
              </Grid>
            );
          case 'Checkbox':
            return (
              <Grid item {...ui.grid}>
                <CustomCheckbox {...common} />
              </Grid>
            );
          case 'String':
            return (
              <Grid item {...ui.grid}>
                <CustomTextField
                  size="small"
                  fullWidth
                  {...common}
                  {...common.props}
                />
              </Grid>
            );
          case 'Number':
            return (
              <Grid item {...ui.grid}>
                <CustomTextField
                  type="number"
                  size="small"
                  fullWidth
                  {...common}
                />
              </Grid>
            );
          case 'Currency':
            return (
              <Grid item {...ui.grid}>
                <CurrencyTextField fullWidth {...common} />
              </Grid>
            );
          case 'Date':
            return (
              <Grid item {...ui.grid}>
                <CustomDatePicker
                  fullWidth
                  {...common}
                  variant="outlined"
                  enableAccessibleFieldDOMStructure
                  formatDensity="dense"
                  selectedSections={null}
                />
              </Grid>
            );
          case 'Selective':
            return (
              <Grid item {...ui.grid}>
                <CustomSelect
                  size="small"
                  fullWidth
                  variant="outlined"
                  {...common}
                />
              </Grid>
            );
          case 'SearchableSelective':
            return (
              <Grid item {...ui.grid}>
                {common.multiple ? (
                  <CustomMultipleAutoComplete
                    fullWidth
                    size="small"
                    {...common}
                    multiple={true}
                  />
                ) : (
                  <CustomAutoComplete
                    fullWidth
                    size="small"
                    {...common}
                    {...common.props}
                    multiple={false}
                  />
                )}
              </Grid>
            );

          default:
            break;
        }
      })}
    </>
  );
};

export default FormBuilder;
