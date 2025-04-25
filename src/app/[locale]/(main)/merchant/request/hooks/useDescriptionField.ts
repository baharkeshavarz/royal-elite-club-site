import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useTranslations } from 'next-intl';

const useDescriptionField = () => {
  const t = useTranslations();
  const descriptionField: FormBuilderProps['fields'] = {
    description: {
      name: 'description',
      label: t('common.fields.description'),
      type: 'String',
      ui: {
        grid: {
          xs: 12,
        },
      },
      props: {
        multiline: true,
        rows: 4,
      },
    },
  };

  return descriptionField;
};

export default useDescriptionField;
