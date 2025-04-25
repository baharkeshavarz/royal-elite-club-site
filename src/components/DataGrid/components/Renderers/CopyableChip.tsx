import { CopyOutlined } from '@ant-design/icons';
import { Chip, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

const CopyableChipRenderer = ({ displayValue = null, ...props }) => {
  const t = useTranslations();

  let value: string = props.value;

  if (value === undefined || value === null) {
    return <span>-</span>;
  }

  const handleClickOnCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success(t('common.messages.toast.copied'));
      })
      .catch((err) => {});
  };

  return (
    <Chip
      onClick={handleClickOnCopy}
      variant="outlined"
      size="small"
      sx={{
        cursor: 'pointer',
      }}
      label={
        <Stack direction="row" spacing={1} alignItems="center">
          <CopyOutlined />
          <Typography>{displayValue || value}</Typography>
        </Stack>
      }
    />
  );
};

export default CopyableChipRenderer;
