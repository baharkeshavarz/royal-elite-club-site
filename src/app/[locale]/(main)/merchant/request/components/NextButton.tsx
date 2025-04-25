import { ButtonWithLoadingProps } from '@/components/Fields';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { FC } from 'react';

export interface NextButtonProps extends ButtonWithLoadingProps {}
const NextButton: FC<NextButtonProps> = (props) => {
  return (
    <ButtonWithLoading
      sx={{
        maxWidth: '100%',
        color: 'common.white',
        width: {
          md: 200,
          xs: '100%',
        },
      }}
      variant="contained"
      size="large"
      {...props}
    />
  );
};

export default NextButton;
