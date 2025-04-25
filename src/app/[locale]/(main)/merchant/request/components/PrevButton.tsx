import { ChevronLeft } from '@mui/icons-material';
import { IconButton, IconButtonProps, Stack, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const PrevButton: FC<IconButtonProps> = (props) => {
  const t = useTranslations();
  return (
    <Stack direction="row" justifyContent="flex-end">
      <Tooltip title={t('buttons.return')}>
        <IconButton
          sx={{
            border: '1px solid',
            borderColor: 'divider',
          }}
          color="inherit"
          {...props}
        >
          <ChevronLeft />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default PrevButton;
