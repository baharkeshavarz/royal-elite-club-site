import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { POSTAL_CODE_MAX_LENGTH } from '@/utils/yup/yup';
import { useTranslations } from 'next-intl';

const useAddressFields = () => {
  const t = useTranslations();
  const fields: FormBuilderProps['fields'] = {
    postalCode: {
      name: 'postalCode',
      type: 'String',
      label: t('common.fields.postalCode'),
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: POSTAL_CODE_MAX_LENGTH,
      },
    },
    address: {
      name: 'address',
      type: 'String',
      label: t('common.fields.address'),
      props: {
        multiline: true,
        rows: 4,
      },
      ui: {
        grid: {
          xs: 12,
        },
      },
    },
  };
  return fields;
};

export default useAddressFields;
