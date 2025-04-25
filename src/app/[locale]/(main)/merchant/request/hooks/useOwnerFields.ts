import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { PHONE_MAX_LENGTH } from '@/utils/yup/yup';
import { useTranslations } from 'next-intl';

const useOwnerFields = () => {
  const t = useTranslations();
  const fields: FormBuilderProps['fields'] = {
    ownerFullName: {
      name: 'ownerFullName',
      label: t('common.fields.ownerFullName'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    ownerNationalCode: {
      name: 'ownerNationalCode',
      label: t('common.fields.ownerNationalCode'),
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

    ownerPhoneNumber: {
      name: 'ownerPhoneNumber',
      label: t('common.fields.ownerPhoneNumber'),
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
      props: {
        type: 'tel',
      },
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        onlyNumbers: true,
        maxLength: PHONE_MAX_LENGTH,
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

export default useOwnerFields;
