import { FormBuilderProps } from '@/components/Fields/components/FormBuilder';
import { useTranslations } from 'next-intl';

const useAgentFields = () => {
  const t = useTranslations();
  const fields: FormBuilderProps['fields'] = {
    agentFullName: {
      name: 'agentFullName',
      label: t('pages.merchantRequest.fields.agentFullName'),
      type: 'String',
      ui: {
        grid: {
          lg: 3,
          md: 6,
          xs: 12,
        },
      },
    },

    agentPhoneNumber: {
      name: 'agentPhoneNumber',
      label: t('pages.merchantRequest.fields.agentPhoneNumber'),
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
        maxLength: 11,
      },
    },
  };
  return fields;
};

export default useAgentFields;
