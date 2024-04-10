'use client'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useParams, usePathname, useSearchParams } from 'next/navigation'

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
  // const pathname = usePathname()
  // const params = useParams()
  
  const {request, loading, error, statusCode} = useHTTP();
  
  useEffect(() => {
    console.log({searchParams})
    const id = searchParams.get('id')
    const email = searchParams.get('email')
    const name = searchParams.get('name')
    const body = searchParams.get('body')
    
    console.log({id, email, body})
    const fetchData = async () => {
      let url = `${DUMMY_URL}`
      if(id){
        url += `?id=${id}`
      }
      if(email){
        url += `?email=${email}`
      }
      if(name){
        url += `?name=${name}`
      }
      if(body){
        url += `?body=${body}`
      }
      try {
        const response:any = await request(url, 'GET', null, null);
        setTableData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      {/* <Typography variant="h4" gutterBottom>DataGrid</Typography> */}
      <DataGrid
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
        // checkboxSelection
        // disableSelectionOnClick
      />
    </div>
  );

};

export default DataGridTable;
