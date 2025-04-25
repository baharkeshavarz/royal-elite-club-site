import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import { IMainMerchant } from '@/services/merchant/types';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { FC } from 'react';
import {
  CardBox,
  CardButton,
  CardContainer,
  CardLeftContent,
  ContextContainer,
  Image,
  ImageBlock,
  RightButtonContainer,
} from './components/Card';
import { DEFAULt_NO_IMAGE } from '@/constants/general';

interface MerchantCardProps {
  card: IMainMerchant;
}

const MerchantCard: FC<MerchantCardProps> = ({ card }) => {
  const t = useTranslations();
  return (
    <CardBox>
      <ImageBlock>
        {card.url ? (
          <Link href={`${DEFAULT_MERCHANT_LIST_PATH}/${card.id}`}>
            <Image src={card.url} alt={card.name} />
          </Link>
        ) : (
          <Image alt="" src={DEFAULt_NO_IMAGE} height={270} />
        )}
      </ImageBlock>
      <CardContainer>
        <CardLeftContent>
          <ContextContainer>
            <Typography variant="subtitle1">{card.name}</Typography>
          </ContextContainer>
        </CardLeftContent>
        <RightButtonContainer>
          <Link href={`${DEFAULT_MERCHANT_LIST_PATH}/${card.id}`}>
            <CardButton variant="outlined">{t('buttons.see')}</CardButton>
          </Link>
        </RightButtonContainer>
      </CardContainer>
    </CardBox>
  );
};

export default MerchantCard;
