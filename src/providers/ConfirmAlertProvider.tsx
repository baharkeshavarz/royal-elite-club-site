'use client';

import { ConfirmProvider, ConfirmProviderProps } from 'material-ui-confirm';
import { useTranslations } from 'next-intl';
import React, { FC, PropsWithChildren, memo, useMemo } from 'react';

const ConfirmAlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();

  const defaultOptions = useMemo(() => {
    const defaultOptions: ConfirmProviderProps['defaultOptions'] = {
      confirmationButtonProps: {
        size: 'small',
        variant: 'contained',
        color: 'primary',
        sx: {
          color: 'common.white',
        },
      },
      cancellationButtonProps: {
        size: 'small',
        variant: 'contained',
        color: 'error',
      },
      cancellationText: t('buttons.no'),
      confirmationText: t('buttons.yes'),

      title: t('confirmAlert.title'),
      dialogProps: {
        PaperProps: {
          sx: {
            width: 320,
          },
        },
      },
      allowClose: true,
      dialogActionsProps: {
        sx: {
          gap: 1,
        },
      },
    };
    return defaultOptions;
  }, [t]);

  return (
    <ConfirmProvider defaultOptions={defaultOptions}>
      {children}
    </ConfirmProvider>
  );
};

export default memo(ConfirmAlertProvider);
