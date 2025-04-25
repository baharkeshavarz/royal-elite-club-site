import { DataGrid } from '@/components/DataGrid';
import { DateRenderer } from '@/components/DataGrid/components';
import useFiltersContext from '@/components/Filters/hooks/useFiltersContext';
import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import { Box } from '@mui/material';
import { AgGridReactProps } from 'ag-grid-react';
import { HttpStatusCode } from 'axios';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { getTransactionList } from '@/services/financial';
import { ITransaction } from '@/services/financial/types';
import Number from '@/components/DataGrid/components/Renderers/Number';

const Grid = () => {
  const { filters } = useFiltersContext();

  const serverSideDataSource: AgGridReactProps['serverSideDatasource'] =
    useMemo(() => {
      return {
        getRows: async (params: any) => {
          params.api.hideOverlay();
          const page = params.api.paginationGetCurrentPage() + 1;
          const page_size = params.api.paginationGetPageSize();

          const { data, status } = await getTransactionList({
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

  const columnDefs: AgGridReactProps<ITransaction>['columnDefs'] = [
    {
      headerName: t('common.fields.rowNumber'),
      field: 'rowNumber',
      width: 80,
    },
    {
      headerName: t('dashboard.transaction.fields.amount'),
      field: 'amount',
      cellRenderer: Number,
    },
    {
      headerName: t('dashboard.transaction.fields.merchantName'),
      field: 'merchantName',
    },
    {
      headerName: t('dashboard.transaction.fields.description'),
      field: 'description',
    },
    {
      headerName: t('dashboard.transaction.fields.transactionDate'),
      field: 'transactionDate',
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
