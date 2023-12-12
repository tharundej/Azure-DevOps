import React, { useState, useEffect, useContext } from 'react';
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
  Autocomplete,
  Card,
  FileInput,
  Input,
} from '@mui/material';
Autocomplete;
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import './DeclarationDetails.css';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import UserContext from 'src/nextzen/context/user/UserConext';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSnackbar } from '../../../components/snackbar';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const DeclarationDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(UserContext);
  const baseUrl = 'https://vshhg43l-3001.inc1.devtunnels.ms/erp';
  const [file, setFile] = useState(null);
  const empId = user?.employeeID ? user?.employeeID : '';
  const cmpId = user?.companyID ? user?.companyID : '';
  const roleId = user?.roleID ? user?.roleID : '';
  const token = user?.accessToken ? user?.accessToken : '';

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();
  const [reloading, setReloading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({});
  const currentYear = new Date().getFullYear();
  console.log(currentYear, 'current year');
  const startYear = 2022;
  const endYear = 2030;
  const [selectedFile, setSelectedFile] = useState(null);
  //  const financialYears = [];
  //  for (let year = startYear; year <= endYear; year++) {
  //    financialYears.push(`${year}-${year + 1}`);
  //  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    // Call your function to handle the zip file upload
    if (selectedFile) {
      handleZipFileUpload(selectedFile);
      // Clear the selected file after upload
      setSelectedFile(null);
    }
  }

  const [selectedYear, setSelectedYear] = useState(null);
  const [financialYears, setFinancialYears] = useState([]);
  const handleYearChange = (_, value) => {
    setSelectedYear(value);
    localStorage.setItem('selectedYear', JSON.stringify(value));
  };
  console.log(selectedYear, 'selectedYear');
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
    console.log('I am called');
    const inputValue = parseFloat(event.target.value);
    console.log('I am called', event.target.value);
    const sanitizedValue = isNaN(inputValue) ? 0 : inputValue;

    console.log(inputValue, 'inputvalue', sanitizedValue, 'sanitizedValue', configId);

    setData((prevData) => {
      const newData = prevData?.map((item) =>
        item.configId === configId
          ? {
              ...item,
              declared: isNaN(inputValue)
                ? null
                : sanitizedValue
                  ? sanitizedValue <= item.taxLimit
                    ? sanitizedValue
                    : item.taxLimit
                      ? item.taxLimit
                      : inputValue
                  : inputValue,
            }
          : item
      );

      console.log(newData, 'newData');
      return newData;
    });
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
        Authorization: token,
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
  }, [reloading, selectedYear?.financialYear]);

  const updateDeclarationsList = async () => {
    setLoading(true);
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
      url: baseUrl + '/updateDeclarations',
      headers: {
        Authorization: token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.data.code === 200) {
          enqueueSnackbar(response.data.message, { variant: 'success' });
          setLoading(false);
          setReloading(!reloading);
        } else if (response.data.code === 400) {
          setLoading(false);
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        setLoading(false);
        console.log(error);
      });
  };
  const getFinancialYear = async () => {
    setLoading(true);
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
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
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

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedYear');

    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      setSelectedYear(parsedValue);
    }
  }, []);
  const handleFileChangeForRow = (configId, event) => {
    const file = event.target.files[0];
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [configId]: file,
    }));
  };
  return (
    <div>
      {loading ? (
        <Card sx={{ height: '60vh' }}>
          <LoadingScreen />
        </Card>
      ) : (
        <>
          <Grid item xs={12} style={{ marginBottom: '0.9rem', marginTop: '0.9rem' }}>
            <Autocomplete
              id="financialYear"
              options={financialYears || []}
              getOptionLabel={(option) =>
                option?.financialYear ?? 'There Is No Financial Year Alloted! Please Connect To HR'
              }
              value={selectedYear}
              onChange={handleYearChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    financialYears && financialYears.length > 0
                      ? 'Please Select Financial Year'
                      : 'No Financial Years Available'
                  }
                />
              )}
            />
          </Grid>
          {selectedYear?.financialYear ? (
            <>
              <TableContainer
                component={Paper}
                style={{ marginBottom: '0.9rem', marginTop: '0.9rem' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tax Section</TableCell>
                      <TableCell>Tax Scheme</TableCell>
                      <TableCell>Limit</TableCell>
                      <TableCell>Declared</TableCell>
                      <TableCell>File Upload</TableCell>
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

                            {row.attachmentsRequired ? 
                            (
                              <TableCell>
                              <Button
                                className="button"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                component="label"
                              >
                                <Input
                                  type="file"
                                  accept=".zip"
                                  style={{ display: 'none' }}
                                  onChange={(event) => handleFileChangeForRow(row.configId, event)}
                                />
                                Upload Zip
                              </Button>
                              {selectedFiles[row.configId] && (
                          <span>{selectedFiles[row.configId].name}</span>
                        )}
                              
                            </TableCell>
                  ) : (
                    <TableCell> </TableCell>
                  )}
               




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
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default DeclarationDetails;
