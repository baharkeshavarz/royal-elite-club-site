import FormBuilder, {
  FormBuilderProps,
} from '@/components/Fields/components/FormBuilder';
import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import React, { FC } from 'react';
import NextButton from './NextButton';
import { useTranslations } from 'next-intl';
import PrevButton from './PrevButton';

export interface Section {
  label: string;
  fields: FormBuilderProps['fields'];
}
export interface SectionsProps {
  sections: Section[];
  isLoading: boolean;
  onPrev: VoidFunction;
}

const Sections: FC<SectionsProps> = ({ sections, onPrev, isLoading }) => {
  const t = useTranslations();

  return (
    <Stack spacing={2}>
      <PrevButton onClick={onPrev} />

      {sections.map((section) => {
        return (
          <Card variant="outlined" key={section.label}>
            <CardHeader
              title={section.label}
              titleTypographyProps={{
                color: 'primary',
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <FormBuilder fields={section.fields} />
              </Grid>
            </CardContent>
          </Card>
        );
      })}

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          pb: 4,
        }}
      >
        <NextButton type="submit" isLoading={isLoading}>
          {t('pages.merchantRequest.buttons.registerRequest')}
        </NextButton>
      </Stack>
    </Stack>
  );
};

export default Sections;
