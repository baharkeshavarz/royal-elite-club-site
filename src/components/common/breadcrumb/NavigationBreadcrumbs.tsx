'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, Typography } from '@mui/material';
import useBreadCrumbsMapper from './breadcrumbMapper';
import { Link } from '@/navigation';
import { DEFAULT_HOME_PAGE_PATH } from '@/constants/routes';
import { useTranslations } from 'next-intl';

type TBreadCrumbProps = {
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NavigationBreadcrumbs = ({
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const t = useTranslations();
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  const navigationLabels = useBreadCrumbsMapper();
  const lastChildIndex = pathNames.length - 1;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ display: 'flex' }}>
      <Link
        href={DEFAULT_HOME_PAGE_PATH}
        style={{ textDecoration: 'none', color: 'primary.main' }}
      >
        <Typography color="primary.main" sx={{ textDecoration: 'none' }}>
          {t('header.navigation.home')}
        </Typography>
      </Link>
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join('/')}`;
        const label = capitalizeLinks
          ? navigationLabels[`/${link}`]?.label || link
          : link;

        return lastChildIndex !== index ? (
          <Link
            key={index}
            href={href}
            style={{ textDecoration: 'none', color: 'primary.main' }}
          >
            <Typography color="primary.main">{label}</Typography>
          </Link>
        ) : (
          <Typography color="grey.800">{label}</Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
