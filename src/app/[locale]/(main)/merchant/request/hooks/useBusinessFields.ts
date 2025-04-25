import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import useActivityTypes from '@/hooks/useActivityTypes';
import { useTranslations } from 'next-intl';

const useLegalBusinessFields = () => {
  const t = useTranslations();
  const activityTypes = useActivityTypes();

  const fields: FormBuilderProps['fields'] = {
    companyName: {
      name: 'companyName',
      label: t('common.fields.companyName'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    brandName: {
      name: 'brandName',
      label: t('common.fields.brandName'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    businessLicenseNumber: {
      name: 'businessLicenseNumber',
      label: t('pages.merchantRequest.fields.economicNumber'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    classOfActivity: {
      name: 'classOfActivity',
      label: t('common.fields.classOfActivity'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    branchCount: {
      name: 'branchCount',
      label: t('common.fields.branchCount'),
      type: 'Number',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    activityType: {
      name: 'activityType',
      label: t('common.fields.activityType'),
      type: 'Selective',
      options: activityTypes.data || [],
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    businessHistory: {
      name: 'businessHistory',
      label: t('common.fields.businessHistory'),
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

export default useLegalBusinessFields;
