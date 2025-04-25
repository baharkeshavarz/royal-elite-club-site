'use client';
import { Breadcrumbs, Link } from '@mui/material';

const DashboardBreadcrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="common.black" href="/dashboard">
        خانه
      </Link>
      <Link underline="hover" color="common.black">
        ویرایش پروفایل من
      </Link>

      {/* {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <NextLink href={to} passHref key={to}>
            <Link color="inherit" underline="hover">
              {value}
            </Link>
          </NextLink>
        ); */}
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
