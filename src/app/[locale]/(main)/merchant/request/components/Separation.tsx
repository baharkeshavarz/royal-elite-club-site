import {
  Alert,
  Card,
  CardActions,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@mui/material';
import { FC } from 'react';
import NextButton from './NextButton';
import { useTranslations } from 'next-intl';
import PrevButton from './PrevButton';

export interface SeparationProps {
  onNext: VoidFunction;
  onPrev: VoidFunction;
  value: string | null;
  onChange: ToggleButtonGroupProps['onChange'];
}
const Separation: FC<SeparationProps> = ({
  onNext,
  onPrev,
  value,
  onChange,
}) => {
  const t = useTranslations();

  return (
    <Stack spacing={2}>
      <PrevButton onClick={onPrev} />

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Alert
              color="info"
              icon={<></>}
              sx={{
                textAlign: 'center',
                fontSize: (theme) => theme.typography.body1.fontSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t('pages.merchantRequest.messages.enterType')}
            </Alert>

            <ToggleButtonGroup
              value={value}
              onChange={onChange}
              exclusive
              fullWidth
            >
              <ToggleButton
                fullWidth
                value={'natural'}
                sx={{
                  height: 100,
                }}
              >
                {t('common.fields.natural')}
              </ToggleButton>
              <ToggleButton value={'legal'} fullWidth>
                {t('common.fields.legal')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <NextButton disabled={value === null} onClick={onNext}>
            {t('common.buttons.continue')}
          </NextButton>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default Separation;
