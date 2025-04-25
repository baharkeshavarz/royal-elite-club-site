import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useTranslations } from 'next-intl';

const useCEOFields = () => {
  const t = useTranslations();
  const fields: FormBuilderProps['fields'] = {
    ceoFullName: {
      name: 'ceoFullName',
      label: t('pages.merchantRequest.fields.ceoFullName'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    ceoNationalCode: {
      name: 'ceoNationalCode',
      label: t('pages.merchantRequest.fields.ceoNationalCode'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        maxLength: 10,
        onlyNumbers: true,
      },
    },

    ceoPhoneNumber: {
      name: 'ceoPhoneNumber',
      label: t('pages.merchantRequest.fields.ceoPhoneNumber'),
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
      },
    },

    telephoneNumber: {
      name: 'telephoneNumber',
      label: t('common.fields.telephoneNumber'),
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
      },
    },

    email: {
      name: 'email',
      label: t('common.fields.email'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
  };

  return fields;
};

export default useCEOFields;
