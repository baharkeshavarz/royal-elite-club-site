import {
  CircularProgress,
  IconButton,
  IconButtonProps,
  Tooltip,
} from '@mui/material';
import { FC } from 'react';

export interface IconButtonWithLoadingProps extends IconButtonProps {
  isLoading?: boolean;
  title?: any;
}
const IconButtonWithLoading: FC<IconButtonWithLoadingProps> = ({
  isLoading,
  title = null,
  ...props
}) => {
  const component = (
    <IconButton {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <CircularProgress color="inherit" size={16} />
      ) : (
        props.children
      )}
    </IconButton>
  );

  if (title) {
    return <Tooltip title={title}>{component}</Tooltip>;
  }

  return component;
};

export default IconButtonWithLoading;
