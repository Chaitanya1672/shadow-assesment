'use client'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation'

import useHTTP from '../hooks/useHTTP';
import { DUMMY_URL } from '../utils/constants';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'body', headerName: 'Body', width: 400 },
];

const DataGridTable = () => {
  const [tableData, setTableData] = useState([]);
  const searchParams = useSearchParams()
  
  const {request, loading, error, statusCode} = useHTTP();
  
  useEffect(() => {
    const fetchData = async () => {
      const queryParams:Record<string, string> = {};
      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      const urlSearchParams = new URLSearchParams(queryParams).toString();
      const url = `${DUMMY_URL}?${urlSearchParams}`;
      const response:any = await request(url, 'GET', null, null);
      setTableData(response);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        data-testid="data-grid"
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        loading={loading}
      />
    </div>
  );

};

export default DataGridTable;
