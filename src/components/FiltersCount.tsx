import { Chip, Typography } from '@mui/material';
import useFiltersContext from './Filters/hooks/useFiltersContext';
import { useTranslations } from 'next-intl';

const FiltersCount = () => {
  const { filters } = useFiltersContext();

  const filtersCount = Object.keys(filters || {}).filter(
    (key) => ![undefined, null].includes(filters[key]),
  ).length;

  const t = useTranslations();

  return (
    <Typography>
      {t('buttons.filters')}
      {filtersCount > 0 ? (
        <>
          {' '}
          <Chip color="primary" size="small" label={`${filtersCount}`} />
        </>
      ) : null}
    </Typography>
  );
};

export default FiltersCount;
