import Filters from './Filters';
import { useTranslations } from 'next-intl';
import FiltersProvider from '@/components/Filters/providers/FiltersProvider';
import MainContentMobile from './MainContentMobile';
import MobileHeader from '../../components/shared/MobileHeader';
import { useRouter } from '@/navigation';

const MyCouponMobileView = () => {
  const t = useTranslations();
  const router = useRouter();

  const onBackClick = () => {
    router.back();
  };

  return (
    <FiltersProvider>
      <MobileHeader
        title={t('dashboard.navigation.myCoupons')}
        onBackClick={onBackClick}
      />
      <Filters />
      <MainContentMobile />
    </FiltersProvider>
  );
};

export default MyCouponMobileView;
