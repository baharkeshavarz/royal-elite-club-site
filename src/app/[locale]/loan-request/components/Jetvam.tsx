import JetvamLogo from '@/components/common/JetvamLogo';
import { useAppContext } from '@/hooks/useAppContext';
import { CircleOutlined } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';

const JetvamInfo = () => {
  const { isMobile } = useAppContext();

  return (
    <Grid container p={2} spacing={2} gap={3}>
      <Grid
        item
        xs={12}
        md={12}
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="center"
        alignItems="center"
      >
        <JetvamLogo />
        <Stack direction="column" p={1} spacing={1}>
          <Typography variant="h5" color="grey.800" pb={2}>
            شرایط لازم جهت دریافت اعتبار خرید اقساطی رویال الیت (طرح جت وام با
            تامین اعتبار بانک ملت):
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircleOutlined
              sx={{
                fontSize: 10,
              }}
            />
            <Typography variant="subtitle1" color="primary.main">
              یک برگ چک صیادی
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <CircleOutlined
              sx={{
                fontSize: 10,
              }}
            />
            <Typography variant="subtitle1" color="primary.main">
              امتیاز اعتبار سنجی بانکی
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default JetvamInfo;
