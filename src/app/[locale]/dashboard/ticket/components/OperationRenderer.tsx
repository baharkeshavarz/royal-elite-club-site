import { IconButton, Stack, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITicket } from '@/services/ticket/types';
import DetailsDialog from './DetailsDialog';

interface OperationRendererProps {
  props: ITicket;
}

const OperationRenderer: FC<OperationRendererProps> = ({ props }) => {
  const t = useTranslations();
  const ticketId = props?.id || '';

  const [detailDialog, setDetailDialog] = useState(false);

  const handleToggleDetailDialog = () => {
    setDetailDialog((prevState) => !prevState);
  };

  return (
    <>
      {detailDialog && (
        <DetailsDialog
          ticketId={ticketId}
          open={detailDialog}
          onClose={handleToggleDetailDialog}
        />
      )}
      <Stack alignItems="center" direction="row" spacing={0.5}>
        <Tooltip title={t('buttons.detail')}>
          <IconButton color="warning" onClick={handleToggleDetailDialog}>
            <VisibilityIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

export default OperationRenderer;
