import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { AgGridReactProps } from 'ag-grid-react';
import { DataGrid } from '@/components/DataGrid';
import useFiltersContext from '@/components/Filters/hooks/useFiltersContext';
import { useTranslations } from 'next-intl';
import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import {
  CopyableChipRenderer,
  DateRenderer,
} from '@/components/DataGrid/components';
import { IUserHistoryCouponCodes } from '@/services/club/types';
import { getUserCouponCode } from '@/services/club';
import { HttpStatusCode } from 'axios';

const Grid = () => {
  const { filters } = useFiltersContext();

  const serverSideDataSource: AgGridReactProps['serverSideDatasource'] =
    useMemo(() => {
      return {
        getRows: async (params: any) => {
          params.api.hideOverlay();
          const page = params.api.paginationGetCurrentPage() + 1;
          const page_size = params.api.paginationGetPageSize();

          const { data, status } = await getUserCouponCode({
            params: {
              PageIndex: page,
              PageSize: page_size,
              ...filters,
            },
          });

          if (status === HttpStatusCode.Ok) {
            const rowCount = data.value.total;

            params.success({
              rowData: data.value.list,
              rowCount,
            });
            params.api.setRowCount(rowCount);

            if (!rowCount) {
              params.api.showNoRowsOverlay();
            }
          } else {
            params.fail();
          }
        },
      };
    }, [filters]);

  const t = useTranslations();

  const columnDefs: AgGridReactProps<IUserHistoryCouponCodes>['columnDefs'] = [
    {
      headerName: t('common.fields.rowNumber'),
      field: 'rowNumber',
    },
    {
      headerName: t('dashboard.coupon.fields.partner'),
      field: 'partner',
    },
    {
      headerName: t('dashboard.coupon.fields.code'),
      field: 'code',
      cellRenderer: CopyableChipRenderer,
    },
    {
      headerName: t('dashboard.coupon.fields.discountAmount'),
      field: 'value',
    },
    {
      headerName: t('dashboard.coupon.fields.expiryDate'),
      field: 'expiryDate',
      cellRenderer: DateRenderer,
      flex: 1,
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rowModelType="serverSide"
        serverSideDatasource={serverSideDataSource}
        defaultColDef={{
          valueFormatter: (params: any) => params.value || '-',
        }}
        columnDefs={columnDefs}
        serverSideEnableClientSideSort
        pagination
        paginationPageSize={DEFAULT_PAGE_SIZE}
        maxBlocksInCache={DEFAULT_PAGE_SIZE}
        paginationPageSizeSelector={[5, 10, 15, 20]}
        cacheBlockSize={DEFAULT_PAGE_SIZE}
      />
    </Box>
  );
};

export default Grid;
