import { InsertNaturalMerchantRequestPayload } from '@/services/merchant/types';
import { onInvalidSubmit } from '@/utils/form';
import {
  BRANCHES_COUNT_MAX,
  BUSINESS_LICENSE_NUMBER_MAX_LENGTH,
} from '@/utils/yup/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useCommon from '../hooks/useCommon';
import useNaturalBusinessFields from '../hooks/useNaturalBusinessFields';
import useOwnerFields from '../hooks/useOwnerFields';
import Sections from './Sections';

export interface NaturalFieldsProps {
  onSubmit: SubmitHandler<InsertNaturalMerchantRequestPayload>;
  isLoading: boolean;
  onPrev: VoidFunction;
}
const NaturalFields: FC<NaturalFieldsProps> = ({
  onSubmit,
  isLoading,
  onPrev,
}) => {
  const naturalBusinessFields = useNaturalBusinessFields();
  const ownerFields = useOwnerFields();

  const common = useCommon();

  const t = useTranslations();

  const sections = [
    {
      label: t('pages.merchantRequest.sections.businessInformation'),
      fields: naturalBusinessFields,
    },
    {
      label: t('pages.merchantRequest.sections.ownerInformation'),
      fields: ownerFields,
    },
    ...common.sections,
  ];

  const schema: yup.ObjectSchema<InsertNaturalMerchantRequestPayload> =
    common.schema.shape({
      storeName: yup.string().globalMaxLength().nullable().required(),
      businessLicenseNumber: yup
        .string()
        .max(BUSINESS_LICENSE_NUMBER_MAX_LENGTH)
        .nullable()
        .required(),
      classOfActivity: yup.string().globalMaxLength().nullable().required(),
      branchCount: yup.number().max(BRANCHES_COUNT_MAX).min(1).nullable(),
      activityType: yup.number().nullable(),
      businessHistory: yup.string().globalMaxLength().nullable(),

      ownerFullName: yup.string().globalMaxLength().nullable().required(),
      ownerNationalCode: yup.string().isNationalCode().nullable().required(),
      ownerPhoneNumber: yup.string().isMobileNumber().nullable().required(),
      telephoneNumber: yup.string().isPhone().nullable(),
      email: yup.string().globalMaxLength().email().nullable(),
    });

  const form = useForm<InsertNaturalMerchantRequestPayload>({
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit(true))}>
        <Sections onPrev={onPrev} isLoading={isLoading} sections={sections} />
      </form>
    </FormProvider>
  );
};

export default NaturalFields;
