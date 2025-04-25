'use client';

import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from '@/navigation';
import { IBreadCrumbItem } from '@/services/types/setting';
import { DEFAULT_HOME_PAGE_PATH } from '@/constants/routes';
import { useTranslations } from 'next-intl';

type TBreadCrumbProps = {
  activeClasses?: string;
  capitalizeLinks?: boolean;
  bradCrumbItems: IBreadCrumbItem[];
};

const StaticBreadcrumbs = ({
  activeClasses = '',
  capitalizeLinks = false,
  bradCrumbItems,
}: TBreadCrumbProps) => {
  const t = useTranslations();
  const lastChildIndex = bradCrumbItems.length - 1;

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
      {bradCrumbItems.map((item, index) => {
        const isLast = index === lastChildIndex;

        return isLast ? (
          <Typography
            key={index}
            color="grey.800"
            className={activeClasses}
            sx={{
              textTransform: capitalizeLinks ? 'capitalize' : 'none',
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link key={index} href={item.link} style={{ textDecoration: 'none' }}>
            <Typography
              color="primary.main"
              sx={{
                textTransform: capitalizeLinks ? 'capitalize' : 'none',
              }}
            >
              {item.label}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
export default StaticBreadcrumbs;
