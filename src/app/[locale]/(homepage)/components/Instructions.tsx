import LabelWithIcon from '@/components/common/LabelWithIcon';
import { DEFAULt_SMALL_LINE_HEIGHT } from '@/constants/general';
import { alpha, Box, Grid, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

const HomeInstructions = () => {
  const t = useTranslations();
  const theme = useTheme();

  const instructionsRules = {
    merchant: {
      title: t('pages.home.instructions.merchant.title'),
      steps: [
        {
          label: t('pages.home.instructions.merchant.steps.step1'),
          icon: null,
        },
        {
          label: t('pages.home.instructions.merchant.steps.step2'),
          icon: null,
        },
        {
          label: t('pages.home.instructions.merchant.steps.step3'),
          icon: null,
        },
        {
          label: t('pages.home.instructions.merchant.steps.step4'),
          icon: null,
        },
      ],
    },
    users: {
      title: t('pages.home.instructions.users.title'),
      steps: [
        {
          label: t('pages.home.instructions.users.steps.step1'),
          icon: null,
        },
        {
          label: t('pages.home.instructions.users.steps.step2'),
          icon: null,
        },
        {
          label: t('pages.home.instructions.users.steps.step3'),
          icon: null,
        },
      ],
    },
  };

  return (
    <Grid container spacing={2} display="flex" justifyContent="space-between">
      {Object.values(instructionsRules).flatMap((rule) => {
        return (
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.grey[300], 0.3),
                minHeight: 250,
                borderRadius: 2,
                p: 1,
              }}
            >
              <Typography variant="h5" color="grey.700" py={1}>
                {rule.title}
              </Typography>
              {rule.steps.map((step, index) => (
                <LabelWithIcon
                  key={`${rule.title}-${index}`}
                  label={step.label}
                  variant="body1"
                  icon={step?.icon}
                  color="grey.700"
                  lineHeight={DEFAULt_SMALL_LINE_HEIGHT}
                />
              ))}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default HomeInstructions;
