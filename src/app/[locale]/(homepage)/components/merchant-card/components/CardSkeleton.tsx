import { Skeleton } from '@mui/material';

import {
  CardBox,
  CardButton,
  CardContainer,
  CardLeftContent,
  ContextContainer,
  ImageBlock,
  RightButtonContainer,
} from './Card';

const CardSkeleton = () => {
  return (
    <CardBox>
      <ImageBlock>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </ImageBlock>
      <CardContainer>
        <CardLeftContent>
          <ContextContainer>
            <Skeleton variant="text" width="100%" height="100%" />
          </ContextContainer>
        </CardLeftContent>
        <RightButtonContainer>
          <CardButton variant="contained">
            <Skeleton variant="text" width="100%" height="100%" />
          </CardButton>
        </RightButtonContainer>
      </CardContainer>
    </CardBox>
  );
};

export default CardSkeleton;
