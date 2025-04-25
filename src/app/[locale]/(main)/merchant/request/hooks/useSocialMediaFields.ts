import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useTranslations } from 'next-intl';

const useSocialMediaFields = () => {
  const t = useTranslations();
  const fields: FormBuilderProps['fields'] = {
    instagram: {
      name: 'instagram',
      label: t('common.fields.instagram'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    telegram: {
      name: 'telegram',
      label: t('common.fields.telegram'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    linkedIn: {
      name: 'linkedIn',
      label: t('common.fields.linkedin'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    x: {
      name: 'x',
      label: t('common.fields.x'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    facebook: {
      name: 'facebook',
      label: t('common.fields.facebook'),
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

export default useSocialMediaFields;
