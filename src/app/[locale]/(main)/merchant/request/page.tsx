'use client';

import { insertMerchantRequest } from '@/services/merchant';
import {
  InsertLegalMerchantRequestPayload,
  InsertNaturalMerchantRequestPayload,
} from '@/services/merchant/types';
import { Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Confirm from './components/Confirm';
import LegalFields from './components/LegalFields';
import NaturalFields from './components/NaturalFields';
import MerchantRules from './components/Rules';
import Separation, { SeparationProps } from './components/Separation';
import Breadcrumb from '@/components/common/breadcrumb/DynamicBreadcrumbs';
import { BreadcrumbTypes } from '@/services/types/setting';

enum Steps {
  Rules = 0,
  Separation = 1,
  Form = 2,
  Confirm = 3,
}

const MerchantRequest = () => {
  const [step, setStep] = useState(Steps.Rules);

  const goToNextStep = () => {
    setStep((prevState) => prevState + 1);
  };

  const goToPrevStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const [type, setType] = useState<'legal' | 'natural' | null>(null);

  const handleChangeType: SeparationProps['onChange'] = (event, value) => {
    if (value) {
      setType(value);
    }
  };

  const mutation = useMutation({
    mutationFn: insertMerchantRequest,
  });

  const onSubmitNatural: SubmitHandler<
    InsertNaturalMerchantRequestPayload
  > = async (payload) => {
    await mutation.mutateAsync({
      payload: { ...payload, isLegal: type === 'legal' },
    });
    goToNextStep();
  };

  const onSubmitLegal: SubmitHandler<
    InsertLegalMerchantRequestPayload
  > = async (payload) => {
    await mutation.mutateAsync({
      payload: { ...payload, isLegal: type === 'legal' },
    });
    goToNextStep();
  };

  return (
    <>
      <Breadcrumb capitalizeLinks bradCrumbType={BreadcrumbTypes.Navigation} />
      <Grid container spacing={2} pt={2}>
        <Grid item xs={12}>
          {step === Steps.Rules && <MerchantRules onClick={goToNextStep} />}

          {step === Steps.Separation && (
            <Separation
              onChange={handleChangeType}
              value={type}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}

          {step === Steps.Form && (
            <>
              {type === 'natural' && (
                <NaturalFields
                  onSubmit={onSubmitNatural}
                  isLoading={mutation.isPending}
                  onPrev={goToPrevStep}
                />
              )}

              {type === 'legal' && (
                <LegalFields
                  onSubmit={onSubmitLegal}
                  isLoading={mutation.isPending}
                  onPrev={goToPrevStep}
                />
              )}
            </>
          )}
          {step === Steps.Confirm && (
            <Confirm value={mutation.data?.data?.value ?? ''} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MerchantRequest;
