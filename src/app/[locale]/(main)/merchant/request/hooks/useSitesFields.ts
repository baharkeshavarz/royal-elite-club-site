import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useTranslations } from 'next-intl';

const useSitesFields = () => {
  const t = useTranslations();

  const fields: FormBuilderProps['fields'] = {
    website1: {
      name: 'website1',
      type: 'String',
      label: t('pages.merchantRequest.fields.website1'),
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    website2: {
      name: 'website2',
      type: 'String',
      label: t('pages.merchantRequest.fields.website2'),
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },
    website3: {
      name: 'website3',
      type: 'String',
      label: t('pages.merchantRequest.fields.website3'),
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

export default useSitesFields;
