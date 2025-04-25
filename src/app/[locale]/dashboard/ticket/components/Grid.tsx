import { DataGrid } from '@/components/DataGrid';
import {
  CopyableChipRenderer,
  DateRenderer,
} from '@/components/DataGrid/components';
import useFiltersContext from '@/components/Filters/hooks/useFiltersContext';
import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import { getTicketList } from '@/services/ticket';
import { ITicket } from '@/services/ticket/types';
import { Box } from '@mui/material';
import { AgGridReactProps } from 'ag-grid-react';
import { HttpStatusCode } from 'axios';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import OperationRenderer from './OperationRenderer';

const Grid = () => {
  const { filters } = useFiltersContext();

  const serverSideDataSource: AgGridReactProps['serverSideDatasource'] =
    useMemo(() => {
      return {
        getRows: async (params: any) => {
          params.api.hideOverlay();
          const page = params.api.paginationGetCurrentPage() + 1;
          const page_size = params.api.paginationGetPageSize();

          const { data, status } = await getTicketList({
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

  const columnDefs: AgGridReactProps<ITicket>['columnDefs'] = [
    {
      headerName: t('common.fields.rowNumber'),
      field: 'rowNumber',
      width: 80,
    },
    {
      headerName: t('buttons.operation'),
      field: 'id',
      cellRenderer: ({ data }: { data: ITicket }) => (
        <OperationRenderer props={data} />
      ),
    },
    {
      headerName: t('dashboard.ticket.fields.trackingCode'),
      field: 'trackingCode',
      cellRenderer: CopyableChipRenderer,
    },
    {
      headerName: t('dashboard.ticket.fields.type'),
      field: 'type',
    },
    {
      headerName: t('dashboard.ticket.fields.status'),
      field: 'status',
    },
    {
      headerName: t('dashboard.ticket.fields.createDate'),
      field: 'createDate',
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
