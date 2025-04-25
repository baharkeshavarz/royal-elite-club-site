import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { BANK_FIELD_MAX_LENGTH } from '@/utils/yup/yup';
import { useTranslations } from 'next-intl';

const useBankAccountFields = () => {
  const t = useTranslations();

  const fields: FormBuilderProps['fields'] = {
    accountNumber: {
      name: 'accountNumber',
      label: t('pages.merchantRequest.fields.accountNumber'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: BANK_FIELD_MAX_LENGTH,
      },
    },

    terminalNumber1: {
      name: 'terminalNumber1',
      label: t('pages.merchantRequest.fields.terminalNumber1'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: BANK_FIELD_MAX_LENGTH,
      },
    },
    terminalNumber2: {
      name: 'terminalNumber2',
      label: t('pages.merchantRequest.fields.terminalNumber2'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: BANK_FIELD_MAX_LENGTH,
      },
    },
    terminalNumber3: {
      name: 'terminalNumber3',
      label: t('pages.merchantRequest.fields.terminalNumber3'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: BANK_FIELD_MAX_LENGTH,
      },
    },
  };

  return fields;
};

export default useBankAccountFields;
