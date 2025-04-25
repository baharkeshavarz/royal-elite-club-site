import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import useActivityTypes from '@/hooks/useActivityTypes';
import {
  BRANCHES_COUNT_MAX,
  BUSINESS_LICENSE_NUMBER_MAX_LENGTH,
} from '@/utils/yup/yup';
import { useTranslations } from 'next-intl';

const useNaturalBusinessFields = () => {
  const activityTypes = useActivityTypes();

  const t = useTranslations();

  const fields: FormBuilderProps['fields'] = {
    storeName: {
      name: 'storeName',
      label: t('common.fields.storeName'),
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
      label: t('common.fields.businessLicenseNumber'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
      limitations: {
        maxLength: BUSINESS_LICENSE_NUMBER_MAX_LENGTH,
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
      limitations: {
        min: 1,
        max: BRANCHES_COUNT_MAX,
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

export default useNaturalBusinessFields;
