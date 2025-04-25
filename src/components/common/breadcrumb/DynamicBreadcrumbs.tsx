'use client';

import { BreadcrumbTypes, IBreadCrumbItem } from '@/services/types/setting';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import StaticBreadcrumbs from './StaticBreadcrumbs';
import NavigationBreadcrumbs from './NavigationBreadcrumbs';

type TBreadCrumbProps = {
  bradCrumbType?: BreadcrumbTypes;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  bradCrumbItems?: IBreadCrumbItem[];
};

const Breadcrumb = ({
  bradCrumbType,
  activeClasses,
  capitalizeLinks,
  bradCrumbItems,
}: TBreadCrumbProps) => {
  const t = useTranslations();

  return (
    <Box display="flex" alignItems="center" pt={2} p={1}>
      {bradCrumbType === BreadcrumbTypes.Static && (
        <StaticBreadcrumbs
          activeClasses={activeClasses}
          capitalizeLinks={capitalizeLinks}
          bradCrumbItems={bradCrumbItems!}
        />
      )}

      {bradCrumbType === BreadcrumbTypes.Navigation && (
        <NavigationBreadcrumbs
          activeClasses={activeClasses}
          capitalizeLinks={capitalizeLinks}
        />
      )}
    </Box>
  );
};

export default Breadcrumb;
