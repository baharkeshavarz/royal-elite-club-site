import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import Locations from './filters/location';
import SearchTitle from './filters/search-title';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ActivitiesClass from './filters/activities-class';
import { RefreshOutlined } from '@mui/icons-material';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import FilterButton from './filters/filter-button';
import { useRouter } from 'next/navigation';
import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import ActivityTypes from './filters/activity-types';
import FilterWrapper from './filters/filter-wrapper';

type FieldNames = any;

const FiltersList = () => {
  const {
    navigate,
    provinceId,
    cityId,
    name,
    classOfActivities,
    activityType,
  } = useCustomSearchParams();

  const router = useRouter();

  const form = useForm<FieldNames>({
    defaultValues: {
      ClassOfActivities: [],
      Name: null,
      ProvinceId: null,
      CityId: null,
      ActivityType: [],
    },
  });
  const { handleSubmit, setValue, reset } = form;

  useEffect(() => {
    reset();
    setValue('ProvinceId', provinceId);
    setValue('CityId', cityId);
    setValue('Name', name);
    setValue('ClassOfActivities', classOfActivities);
    setValue('ActivityType', activityType);
  }, [provinceId]);

  const onClearFilters = () => {
    reset();
    navigate({});
    router.push(DEFAULT_MERCHANT_LIST_PATH);
  };

  const onSubmit: SubmitHandler<any> = async (filterData) => {
    navigate(filterData);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'sticky',
        top: (theme) => theme.spacing(0),
        minHeight: '70vh',
        mt: 4,
      }}
    >
      <CardContent sx={{ border: 0 }}>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} py={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">فیلترها</Typography>
                <Button variant="outlined" onClick={onClearFilters}>
                  حذف فیلترها <RefreshOutlined fontSize="small" />
                </Button>
              </Stack>
            </Grid>
            <SearchTitle />
            <FilterWrapper title="زمینه فعالیت" expanded={true}>
              <ActivitiesClass />
            </FilterWrapper>
            <FilterWrapper title="نوع فروشنده">
              <ActivityTypes />
            </FilterWrapper>
            <FilterWrapper title="موقعیت مکانی فروشگاه">
              <Locations />
            </FilterWrapper>
            <FilterButton />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default FiltersList;
