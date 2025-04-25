import { InsertLegalMerchantRequestPayload } from '@/services/merchant/types';
import { onInvalidSubmit } from '@/utils/form';
import {
  BRANCHES_COUNT_MAX,
  BUSINESS_LICENSE_NUMBER_MAX_LENGTH,
} from '@/utils/yup/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useAgentFields from '../hooks/useAgentFields';
import useLegalBusinessFields from '../hooks/useBusinessFields';
import useCEOFields from '../hooks/useCEOFields';
import useCommon from '../hooks/useCommon';
import Sections from './Sections';
import { useTranslations } from 'next-intl';

export interface LegalFieldsProps {
  onSubmit: SubmitHandler<InsertLegalMerchantRequestPayload>;
  isLoading: boolean;
  onPrev: VoidFunction;
}

const LegalFields: FC<LegalFieldsProps> = ({ onSubmit, isLoading, onPrev }) => {
  const legalBusinessFields = useLegalBusinessFields();
  const ceoFields = useCEOFields();
  const agentFields = useAgentFields();

  const common = useCommon();

  const t = useTranslations();

  const sections = [
    {
      label: t('pages.merchantRequest.sections.businessInformation'),
      fields: legalBusinessFields,
    },
    {
      label: t('pages.merchantRequest.sections.ceoInformation'),
      fields: ceoFields,
    },
    {
      label: t('pages.merchantRequest.sections.agentInformation'),
      fields: agentFields,
    },
    ...common.sections,
  ];

  const schema: yup.ObjectSchema<InsertLegalMerchantRequestPayload> =
    common.schema.shape({
      companyName: yup.string().globalMaxLength().nullable().required(),
      brandName: yup.string().globalMaxLength().nullable().required(),
      businessLicenseNumber: yup
        .string()
        .max(BUSINESS_LICENSE_NUMBER_MAX_LENGTH)
        .nullable()
        .required(),
      classOfActivity: yup.string().globalMaxLength().nullable().required(),
      branchCount: yup.number().max(BRANCHES_COUNT_MAX).min(1).nullable(),
      activityType: yup.number().nullable(),
      businessHistory: yup.string().globalMaxLength().nullable(),

      agentFullName: yup.string().globalMaxLength().nullable(),
      agentPhoneNumber: yup.string().isMobileNumber().nullable(),

      ceoFullName: yup.string().globalMaxLength().nullable().required(),
      ceoNationalCode: yup.string().isNationalCode().nullable().required(),
      ceoPhoneNumber: yup.string().isMobileNumber().nullable().required(),
      telephoneNumber: yup.string().isPhone().nullable(),
      email: yup.string().globalMaxLength().email().nullable(),
    });

  const form = useForm<InsertLegalMerchantRequestPayload>({
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

export default LegalFields;
