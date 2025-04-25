import { IconButtonWithLoading } from '@/components/IconButtonWithLoading';
import { Stack, Switch, TooltipProps } from '@mui/material';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { useConfirm } from 'material-ui-confirm';
import { FC } from 'react';

export interface SwitchRendererProps {
  value: boolean;
  mutationFn?: MutationFunction<unknown>;
  title?: TooltipProps['title'];
  disabled?: boolean;
  refreshOnSuccess?: boolean;
}
const SwitchRenderer: FC<SwitchRendererProps> = ({
  value,
  mutationFn,
  title,
  disabled = false,
}) => {
  const confirm = useConfirm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn,
  });
  const onChange = () => {
    confirm().then(async () => {
      mutateAsync(null);
    });
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButtonWithLoading title={title} isLoading={isPending}>
        <Switch
          color="success"
          onChange={disabled ? () => {} : onChange}
          checked={value}
          size="small"
        />
      </IconButtonWithLoading>
    </Stack>
  );
};

export default SwitchRenderer;
