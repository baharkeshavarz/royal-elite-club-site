import { InsertMerchantRequestCommon } from '@/services/merchant/types';
import { BANK_FIELD_MAX_LENGTH, POSTAL_CODE_MAX_LENGTH } from '@/utils/yup/yup';
import * as yup from 'yup';
import useBankAccountFields from './useBankAccountFields';
import useAddressFields from './useAddressFields';
import useSitesFields from './useSitesFields';
import useSocialMediaFields from './useSocialMediaFields';
import useDescriptionField from './useDescriptionField';
import { useTranslations } from 'next-intl';

const useCommon = () => {
  const bankAccountFields = useBankAccountFields();
  const addressFields = useAddressFields();
  const sitesFields = useSitesFields();
  const socialMediaFields = useSocialMediaFields();
  const descriptionField = useDescriptionField();

  const t = useTranslations();

  const sections = [
    {
      label: t('pages.merchantRequest.sections.bankInformation'),
      fields: bankAccountFields,
    },
    {
      label: t('pages.merchantRequest.sections.businessLocation'),
      fields: addressFields,
    },
    {
      label: t('pages.merchantRequest.sections.sites'),
      fields: sitesFields,
    },
    {
      label: t('pages.merchantRequest.sections.socialMedia'),
      fields: socialMediaFields,
    },
    {
      label: t('pages.merchantRequest.sections.description'),
      fields: descriptionField,
    },
  ];

  const schema: yup.ObjectSchema<InsertMerchantRequestCommon> = yup
    .object()
    .shape({
      accountNumber: yup.string().max(BANK_FIELD_MAX_LENGTH).nullable(),
      terminalNumber1: yup.string().max(BANK_FIELD_MAX_LENGTH).nullable(),
      terminalNumber2: yup.string().max(BANK_FIELD_MAX_LENGTH).nullable(),
      terminalNumber3: yup.string().max(BANK_FIELD_MAX_LENGTH).nullable(),

      website1: yup.string().globalMaxLength().url().nullable(),
      website2: yup.string().globalMaxLength().url().nullable(),
      website3: yup.string().globalMaxLength().url().nullable(),

      postalCode: yup
        .string()
        .min(POSTAL_CODE_MAX_LENGTH)
        .max(POSTAL_CODE_MAX_LENGTH)
        .nullable(),
      address: yup.string().globalTextAreaMaxLength().nullable(),

      instagram: yup.string().globalMaxLength().nullable(),
      telegram: yup.string().globalMaxLength().nullable(),
      linkedIn: yup.string().globalMaxLength().nullable(),
      x: yup.string().globalMaxLength().nullable(),
      facebook: yup.string().globalMaxLength().nullable(),

      description: yup.string().globalTextAreaMaxLength().nullable(),
    });

  return {
    schema,
    sections,
  };
};

export default useCommon;
