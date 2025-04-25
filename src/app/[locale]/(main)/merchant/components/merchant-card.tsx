import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import { IMerchantsMain } from '@/services/merchant/types';
import LanguageIcon from '@mui/icons-material/Language';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { DEFAULt_NO_IMAGE } from '@/constants/general';
import Image from '@/components/common/Image';

interface MerchantCardProps {
  merchant: IMerchantsMain;
}

const MerchantCard: FC<MerchantCardProps> = ({ merchant }) => {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Stack
      spacing={3}
      p={1}
      display="flex"
      justifyContent="start"
      alignItems="center"
    >
      {merchant.url ? (
        <Link href={`${DEFAULT_MERCHANT_LIST_PATH}/${merchant.id}`}>
          <Image
            src={merchant.url}
            alt={merchant.name}
            width={270}
            height={270}
          />
        </Link>
      ) : (
        <Image alt="" src={DEFAULt_NO_IMAGE} width={270} height={270} />
      )}

      <Stack spacing={1}>
        <Box display="flex" justifyContent="center" alignItems="center" p={1}>
          <Link
            href={`${DEFAULT_MERCHANT_LIST_PATH}/${merchant.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant="h5" fontWeight={600} color="common.black">
              {merchant.name}
            </Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="start" alignItems="center">
          <ShoppingCartIcon
            fontSize="small"
            sx={{ mx: 0.2, color: theme.palette.grey[800] }}
          />
          <Typography variant="body2">
            {t('pages.merchant.activityType')}:
          </Typography>
          <Typography variant="caption" ml={0.5}>
            {merchant.activityType}
          </Typography>
        </Box>
        {merchant?.siteAddress && (
          <Box display="flex" justifyContent="start" alignItems="center">
            <LanguageIcon
              fontSize="small"
              sx={{ mx: 0.2, color: theme.palette.grey[800] }}
            />
            <Link
              href={merchant?.siteAddress}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="body2" color="common.black">
                {t('common.fields.website')}
              </Typography>
            </Link>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default MerchantCard;
