import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Grid,
  Button,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import './DeclarationDetails.css';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';

const DeclarationDetails = () => {
  const [data, setData] = useState();
  const [reloading, setReloading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNameChange = (id) => (event) => {
    const newData = data?.map((item) =>
      item.id === id ? { ...item, name: event.target.value } : item
    );
    setData(newData);
  };

  const handleAgeChange = (configId) => (event) => {
    console.log('i am called ');
    const newData = data?.map((item) =>
      item.configId === configId ? { ...item, declared: event.target.value } : item
    );
    setData(newData);
    console.log(data, ' datadataaaaaaa');
  };

  const getDeclarationsList = async () => {
    const payload = {
      employeeid: 'Info1',

      companyid: 'comp1',

      financialyear: 2019,

      rowsperpage: 6,

      pagenum: 1,

      filterby: [],

      sortOrder: [],

      orderBy: [],

      search: '',
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + 'getDeclarations',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc1OTksInJhbmRvbSI6MjAxOX0.jcut3PMaM8Sem9s6tB5Llsp1dcii2dxJwaU2asmn-Zc',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data?.rows;
          console.log(JSON.stringify(response.data));
          setData(rowsData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(result, 'resultsreults');
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDeclarationsList();
    };
    fetchData();
    
  }, [reloading]);
  const updateDeclarationsList = async () => {
    const newArray = data?.map((item) => ({
      configId: item.configId,
      declared: parseInt(item.declared, 10),
    }));
    console.log(newArray, 'newarray');
    const payload = {
      employee_id: 'Info1',

      company_id: 'comp1',

      financial_year: 2019,

      records: newArray,
    };

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: baseUrl+ 'updateDeclarations',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc1OTksInJhbmRvbSI6MjAxOX0.jcut3PMaM8Sem9s6tB5Llsp1dcii2dxJwaU2asmn-Zc',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setReloading(!reloading);
          console.log(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
     
      <TableContainer component={Paper} style={{marginBottom:"0.9rem" ,marginTop:"0.9rem"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tax Section</TableCell>
              <TableCell>Tax Scheme</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Declared</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <TableRow
                    style={{
                      height: '20px',
                      borderBottom: '1px solid black',
                      backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2',
                    }}
                    key={row.configId}
                  >
                    <TableCell style={{ width: '35rem', padding: '4px !important' }}>
                      {row.taxSection}
                    </TableCell>
                    <TableCell>{row.taxScheme}</TableCell>
                    <TableCell>{row.taxLimit}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.declared}
                        onChange={handleAgeChange(row.configId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        container
        spacing={2}
        alignItems="center"
        xs={12}
        direction="row"
        style={{ marginBottom: '1rem' }}
      >
        <Grid
          item
          container
          xs={12}
          spacing={2}
          alignItems="center"
          justifyContent="flex-Start"
          direction="row"
          style={{ marginBottom: '1rem' }}
        >
          <Grid item xs={4} sm={2}>
            <Button className="button" onClick={updateDeclarationsList}>
              Save
            </Button>
          </Grid>
          <Grid item xs={8} sm={10}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeclarationDetails;
