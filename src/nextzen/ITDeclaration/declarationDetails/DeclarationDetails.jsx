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
  Button,Autocomplete
} from '@mui/material';
Autocomplete
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import './DeclarationDetails.css';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const DeclarationDetails = () => {
const baseUrl ="https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
  const empId = localStorage.getItem('employeeID')
  const cmpId= localStorage.getItem('companyID')
  const token = localStorage.getItem('accessToken')
  console.log(empId ,"emp")
  const [data, setData] = useState();
  const [reloading, setReloading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
   // State for Snackbar
   const [snackbarOpen, setSnackbarOpen] = useState(false);
   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
   const [snackbarMessage, setSnackbarMessage] = useState('');

   const currentYear = new Date().getFullYear();
   console.log(currentYear ,"current year")
   const startYear = 2022;
   const endYear = 2030;
 
  //  const financialYears = [];
  //  for (let year = startYear; year <= endYear; year++) {
  //    financialYears.push(`${year}-${year + 1}`);
  //  }
 
   const [selectedYear, setSelectedYear] = useState(null);
   const [financialYears, setFinancialYears] = useState([]);
   const handleYearChange = (_, value) => {
     setSelectedYear(value);
   };
   const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    // setOpen(false);
  };
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
    const inputValue = parseFloat(event.target.value);
    const sanitizedValue = isNaN(inputValue) ? 0 : inputValue;

    console.log(inputValue ,"inoutvalue" ,sanitizedValue ,"sanitizedValue")
    const newData = data?.map((item) =>
      item.configId === configId ? {
        ...item,
        declared:isNaN(inputValue) ?  null : sanitizedValue <= item.taxLimit ? sanitizedValue : item.taxLimit,
      }
    : item
    );

    console.log(newData  ,"newData")
    setData(newData);
    console.log(data, ' datadataaaaaaa');
  };

  const getDeclarationsList = async () => {
    const payload = {
      employeeId: empId,

      companyId: cmpId,

      financialYear: selectedYear?.financialYear,

      rowsPerPage: rowsPerPage,

      PageNum: 0,

    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/getDeclarations',
      headers: {
        Authorization:token,
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
      employeeId: empId,

      companyId: cmpId,

      financialYear: selectedYear?.financialYear,

      records: newArray,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+ '/updateDeclarations',
      headers: {
        Authorization:token,
           'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.data.code === 200) {
          setReloading(!reloading);
          console.log(JSON.stringify(response.data));
          setSnackbarSeverity('success');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          console.log("response", response)
        }
        else if(response.data.code === 400){
          setSnackbarSeverity('error');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFinancialYear = async () => {
    const payload = {
      companyID: cmpId,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/GetFinancialYear',
      headers: {
        Authorization: token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          console.log(rowsData, 'finacial year');
          setFinancialYears(rowsData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  useEffect(() => {
    const fetchData = async () => {
      await getFinancialYear();
    };
    fetchData();
    
  }, []);

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={snackBarAlertHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Autocomplete
          id="financialYear"
          options={financialYears}
          getOptionLabel={(option) => option?.financialYear}
          value={selectedYear}
          onChange={handleYearChange}
          renderInput={(params) => <TextField {...params} label="Financial Year" />}
        />
      </Grid>
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
                        // inputProps={{
                        //   max: row.taxLimit,
                        // }}
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
