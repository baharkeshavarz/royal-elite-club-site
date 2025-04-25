import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import {
  ButtonWithLoading,
  ButtonWithLoadingProps,
} from '../ButtonWithLoading';
import { useAppContext } from '@/hooks/useAppContext';

export interface WrapperProps {
  title?: string;
  buttons?: (ButtonWithLoadingProps & { id: string })[];
}

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({
  children,
  buttons = [],
}) => {
  const { isMobile } = useAppContext();
  return (
    <Stack spacing={isMobile ? 0 : 2}>
      <Stack spacing={1} direction="row">
        {buttons.length > 0 &&
          buttons.map((button) => {
            return <ButtonWithLoading key={button.id} {...button} />;
          })}
      </Stack>
      {children}
    </Stack>
  );
};

export default Wrapper;
