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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  Autocomplete,
  Card
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import '../declarationDetails/DeclarationDetails.css';
import MuiAlert from '@mui/material/Alert';
import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
// import { baseUrl } from 'src/nextzen/global/BaseUrl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UserContext from 'src/nextzen/context/user/UserConext';
import { LoadingScreen } from 'src/components/loading-screen';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function RentDetails() {
  // const baseUrl = 'https://xql1qfwp-3001.inc1.devtunnels.ms/erp';

  // const empId = JSON.stringify(getLoc)
  const [data, setData] = useState([
    { month: 'March', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'April', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'May', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'June', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'July', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'August', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'September', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'October', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'November', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'December', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'January', city_type: '', rentAmount: '', submittedAmount: '' },
    { month: 'February', city_type: '', rentAmount: '', submittedAmount: '' },

    // Add more months as needed
  ]);
  const {user} = useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''

const [loading,setLoading] = useState(false);
 
 
  const [isPreviousData, setIsPreviousData] = useState(false);
  const [reload, setReload] = useState(false);
  var [landLardName, setLandLardName] = useState('');
  var [landLardAddress, setLandLardAddress] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedValue, setSelectedValue] = useState('');
  var [isShowPannumber, setIsShowPanNumber] = useState();
  const [isPanValueThere, setIsPanValueThere] = useState(false);
  const [isPanValueNumber, setIsPanValueNumber] = useState('');
  const [declarationSelectedValue, setSeclarationSelectedValue] = useState('');
  var [isShowDeclaration, setIsShowDeclaration] = useState(false);
  const [isShowUpload, setIsShowUpload] = useState(false);
  const [open, setOpen] = useState(true);
  var [panNumbers, setPanNumbers] = useState(['', '', '']); // Initialize with three empty strings
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [rentDetailsData, setRendDetailsData] = useState([]);

  const [openAttachmentDilog, setOpenAttchementDilog] = useState(false);
  const handlePanNumberChange = (index) => (event) => {
    const newPanNumbers = [...panNumbers];
    newPanNumbers[index] = event.target.value;
    setPanNumbers(newPanNumbers);
  };
  const [openAttachmentDilogForLandLoard, setOpenAttchementDilogForLandLoard] = useState(false);
  var [attachedDocumment, setAttachedDocument] = useState([]);
  var [attachedDocummentFileName, setAttachedDocumentFileName] = useState([]);
  var [landlord_file_content, setLandlord_file_content] = useState([]);
  var [landlord_file_name, setLandlord_file_name] = useState([]);
  const [medicalTableDataDoc, setMedicalTableDataDoc] = useState([]);
  var [landlordFiledsIndex, setLandlordFieldsIndex] = useState([]);
  var [rentFiledsIndex, setRentFieldsIndex] = useState([]);
  var [landLordDocs, setLandLordDocs] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  const [landLordDeletedId, setLandLordDeletedID] = useState([]);
  const [rentDeletedId, setRentDeletedID] = useState([]);
  const currentYear = new Date().getFullYear();
  console.log(currentYear, 'current year');
  const startYear = 2022;
  const endYear = 2030;

  //    const financialYears = [];
  //    for (let year = startYear; year <= endYear; year++) {
  //      financialYears.push(`${year}-${year + 1}`);
  //    }
  //  console.log(financialYears ,
  //   "financialYears")
  const [selectedYear, setSelectedYear] = useState(null);
  const [
    financialYears, setFinancialYears] = useState([]);
  const handleYearChange = (_, value) => {
    setSelectedYear(value);
  };

  console.log(selectedYear, 'selectedYear');
  const handleUploadattchment = (data) => {
    attachedDocumment = data;
    setAttachedDocument(attachedDocumment);
    console.log(attachedDocumment, data);
  };
  const handleUploadattchmentFileName = (data) => {
    attachedDocummentFileName = data;
    setAttachedDocumentFileName(attachedDocummentFileName);
    console.log(attachedDocummentFileName, data);
    setOpenAttchementDilog(false);
  };

  const handleChange = (event) => {
    const selectedStringValue = event.target.value; // "Yes" or "No"
    // setSelectedValue(selectedStringValue);

    // Convert back to boolean
    const selectedBooleanValue = selectedStringValue === 'Yes';
    setSelectedValue(selectedBooleanValue);
    console.log(selectedBooleanValue, isShowPannumber, '_>>>>>>>isshowPan1');

    if (selectedBooleanValue) {
      setIsShowPanNumber(true);
      setIsPanValueThere(true);
      setIsShowDeclaration(false);
    } else {
      setIsPanValueThere(false);
      setIsShowPanNumber(false);
      setIsShowDeclaration(true);
    }
    console.log(isShowPannumber, panNumbers, 'handle pan change');

    console.log(event.target.value);
  };

  console.log(' selected', selectedValue, isPanValueNumber, 'isPanvlueNUmber');

  const handleChangeDeclaration = (event) => {
    setSeclarationSelectedValue(event.target.value);
    if (event.target.value === 'Yes') {
      setIsShowUpload(true);
    } else if (event.target.value === 'No') {
      setIsShowUpload(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleChange = (index, newValue) => {
    const newData = [...data];
    newData[index].city_type = newValue;
    setData(newData);
    console.log(newData);
  };

  const handleRentAmountChange = (index) => (event) => {
    const newData = [...data];
    newData[index].rentAmount = event.target.value;
    setData(newData);
  };

  const handleSubmittedAmountChange = (index) => (event) => {
    const newData = [...data];
    newData[index].submittedAmount = event.target.value;
    setData(newData);
  };

  const handleLandloardNameChange = (e) => {
    setLandLardName(e.target.value);
  };

  const handleLandloardAddressChange = (e) => {
    setLandLardAddress(e.target.value);
  };

  const handlePanShowMethod = (event) => {};
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };

  const handleLandLordattchment = (fileData) => {
    console.log(fileData, 'getting from uploader ');
    landlord_file_name = fileData?.map((doc) => doc.fileName);
    setLandlord_file_name(landlord_file_name);
    landlord_file_content = fileData?.map((doc) => doc.fileContent);
    setLandlord_file_content(landlord_file_content);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      landlordID: item.id ? item.id : 0,
      landlordFileName: item.fileName,
      landlordFileContent: item.fileContent,
    }));
    landLordDocs = transformedData;
    setLandLordDocs(landLordDocs);

    console.log(landLordDocs, 'landlordDocs');

    console.error('Arrays must have the same length');
    setOpenAttchementDilog(false);
  };
  const handleRentattchment = (fileData) => {
    console.log(fileData, 'getting from uploader ');
    attachedDocummentFileName = fileData?.map((doc) => doc.fileName);
    setAttachedDocumentFileName(attachedDocummentFileName);
    attachedDocumment = fileData?.map((doc) => doc.fileContent);
    setAttachedDocument(attachedDocumment);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      ID: item.id ? item.id : 0,
      fileName: item.fileName,
      fileContent: item.fileContent,
    }));
    rentDocs = transformedData;
    setRentDocs(rentDocs);

    console.log(rentDocs, 'landlordDocs');
    setOpenAttchementDilog(false);
  };
  console.log(rentDocs, 'landlordDocs');
  const handleLandLordDeletedID = (data) => {
    console.log(data, 'delete');
    setLandLordDeletedID((prevIDs) => [...prevIDs, data]);
    console.log(landLordDeletedId, 'deletedelete');
  };
  const handleRentDeletedID = (data) => {
    console.log(data, 'delete');
    setRentDeletedID((prevIDs) => [...prevIDs, data]);
    console.log(rentDeletedId, 'deletedelete');
  };
  const updatedData = data?.map((entry) => ({
    month: entry.month,
    city_type: entry.city_type,
    rentAmount: entry.rentAmount !== '' ? parseInt(entry.rentAmount, 10) : null,
    submittedAmount: entry.submittedAmount !== '' ? parseInt(entry.submittedAmount, 10) : null,
  }));
  var name = medicalTableDataDoc.map((item) => item.landlordFileName);
  console.log(name, 'name ');
  var testing = name;
  const saveRentDetails = async () => {
    setLoading(true)
    const payload = {
      companyId: cmpId,
      employeeId: empId,
      financialYear: selectedYear?.financialYear,
      nameOfLandlord: landLardName,
      addressOfLandlord: landLardAddress,
      data: updatedData,
      panOfTheLandlord: isShowPannumber,
      panNumber: panNumbers,
      declarationReceivedFFromLandlord: declarationSelectedValue == 'Yes' ? true : false,
      fileName: attachedDocummentFileName,
      fileContent: attachedDocumment,
      landlordFileName: landlord_file_name,
      landlordFileContent: landlord_file_content,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/addRentDeclarationDetails ',
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
          setLoading(false)
          setSnackbarSeverity('success');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          setReload(!reload);
        } else if (response.data.code === 400) {
          setLoading(false)
          setSnackbarSeverity('error');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        setOpen(true);
        setLoading(false)
        setSnackbarSeverity('error');
        setSnackbarMessage('Error saving rent details. Please try again.');
        setSnackbarOpen(true);
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const editRentDetails = async () => {
    setLoading(true)
    const payload = {
      //  "company_id": rentDetailsData?.companyId,
      //  "employee_id": rentDetailsData?.employeeId,
      companyId: cmpId,
      employeeId: empId,
      financialYear: selectedYear.financialYear,
      nameOfLandlord: rentDetailsData?.nameOfLandlord,
      addressOfLandlord: rentDetailsData?.addressOfLandlord,
      data: updatedData,
      panOfTheLandlord: isShowPannumber,
      declarationReceivedFromLandlord: rentDetailsData?.declarationReceivedFromLandlord,
      // declarationReceivedFromLandlord: true,
      panNumber: panNumbers,
      //  "declarationReceivedFromlandlord": rentDetailsData?.companyId,
      landLordDocs: landLordDocs,
      rentDocs: rentDocs,
      // rentFilelds: rentFiledsIndex,
      // landlordFilelds: landlordFiledsIndex,
      landLordIds: landLordDeletedId,
      rentIds: rentDeletedId,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/updateRentDeclarationDetails ',
      headers: {
        Authorization: token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        console.log('success', response);
        if (response.data.code === 200) {
          setLoading(false)
          setSnackbarSeverity('success');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          setReload(!reload);
        } else if (response.data.code === 400) {
          setLoading(false)
          setSnackbarSeverity('error');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        setLoading(false)
        setOpen(true);
        
        <Snackbar open={open} autoHideDuration={6000} onClose={snackBarAlertHandleClose}>
          <Alert onClose={snackBarAlertHandleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>;
        console.log(error, 'hello', open);
      });
  };

  const getRentDetails = async () => {
    setLoading(true)
    const payload = {
      employeeId: empId,
      financialYear: selectedYear?.financialYear,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/getRentDeclarationDetails',
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
          setLoading(false)
          const rowsData = response?.data?.data;
          if (rowsData !== null || undefined) {
            setIsPreviousData(true);
          }
          console.log(rowsData);
          setRendDetailsData(rowsData);
          setLandLardName(response?.data?.data?.nameOfLandlord);
          setLandLardAddress(response?.data?.data?.addressOfLandlord);
          setIsShowDeclaration(response?.data?.data?.declarationReceivedFromLandlord);
          setIsShowPanNumber(response?.data?.data?.panOfTheLandlord);
          setSelectedValue(response?.data?.data?.panOfTheLandlord);
          response?.data?.data?.panOfTheLandlord
            ? setSelectedValue(response?.data?.data?.panOfTheLandlord)
            : '';
          setPanNumbers(
            response?.data?.data?.panNumber == undefined || null
              ? ['', '', '']
              : response?.data?.data?.panNumber
          );
          // setSelectedYear(rowsData?.financialYear ?rowsData?.financialYear : null)
          rentFiledsIndex = setRentFieldsIndex(rowsData?.rentDocs?.map((doc) => doc.ID));
          landlordFiledsIndex = rowsData?.landLordDocs?.map((doc) => doc.landlordID);
          console.log(
            response?.data?.data?.landLordDocs ? rowsData?.landLordDocs : [],
            'response?.data?.data?.landLordDocs ? landLordDocsresponse?.data?.data?.landLordDocs : []'
          );
          setLandLordDocs(rowsData?.landLordDocs ? rowsData?.landLordDocs : []);
          setRentDocs(response?.data?.data?.rentDocs ? rowsData?.rentDocs : []);
          console.log(rowsData?.financialYear, 'rowsData?.financialYear');
          setLandlordFieldsIndex(landlordFiledsIndex);

          console.log(response, 'rentDocs in response');
          console.log(rowsData, 'in rowData rentDocs ');

          setData((prevData) => {
            return prevData.map((existingMonth) => {
              const matchingMonth = rowsData?.data?.find(
                (apiMonth) => apiMonth.month === existingMonth.month
              );

              if (matchingMonth) {
                // If the month exists in the API response, update the data
                return {
                  ...existingMonth,
                  city_type: matchingMonth.cityType,
                  rentAmount: matchingMonth.rentAmount,
                  submittedAmount: matchingMonth.submittedAmount,
                };
              }

              // If the month doesn't exist in the API response, keep the existing data
              return existingMonth;
            });
          });
          console.log(JSON.stringify(response?.data?.data), 'result');
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const getFinancialYear = async () => {
    setLoading(true)
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
          setLoading(false)
          const rowsData = response?.data?.data;
          console.log(rowsData, 'finacial year');
          setFinancialYears(rowsData);
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
  
  const attchementHandler = () => {
    setOpenAttchementDilog(true);
  };
  const landloardDeclarationAttachment = () => {
    setOpenAttchementDilogForLandLoard(true);
  };
  const closeAttchementDilod = () => {
    setOpenAttchementDilog(false);
  };
  const closeLandLordAttchementDilod = () => {
    setOpenAttchementDilogForLandLoard(false);
  };
  console.log(data, 'resultsreults');
  useEffect(() => {
    const fetchData = async () => {
      getRentDetails();
    };
    fetchData();
  }, [reload, selectedYear?.financialYear]);

  useEffect(() => {
    const fetchData = async () => {
      getFinancialYear();
    };
    fetchData();
  }, []);
  const handleEditOrsave = () => {
    rentDetailsData?.addressOfLandlord !== undefined ? editRentDetails() : saveRentDetails();
  };
  // useEffect to handle changes in landLordDocs
  useEffect(() => {
    console.log('Updated landLordDocs:', landLordDocs);
    // You can perform additional actions here when landLordDocs changes
  }, [landLordDocs]);



  return (
    <div>
    
      {loading ? 
  <Card sx={{height:"60vh"}}><LoadingScreen/></Card> :<>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        style={{ marginBottom: '0.9rem'}}
      >
         <Grid item xs={4}>
        <Autocomplete
          id="financialYear"
          options={financialYears}
          getOptionLabel={(option) => option.financialYear}
          value={selectedYear}
          onChange={handleYearChange}
          renderInput={(params) => <TextField {...params} label="Financial Year" />}
        />
      </Grid>
      
        <Grid item xs={4}>
          <TextField
            label="Name Of The Landloard "
            value={landLardName}
            variant="outlined"
            fullWidth
            onChange={handleLandloardNameChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Address Of The Landloard"
            value={landLardAddress}
            variant="outlined"
            fullWidth
            onChange={handleLandloardAddressChange}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '25%' }}>Months</TableCell>
              <TableCell style={{ width: '25%' }}>Metro/Non-Metro</TableCell>
              <TableCell style={{ width: '25%' }}>Rent Amount</TableCell>
              <TableCell style={{ width: '25%' }}>Submitted Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow
                style={{
                  height: '20px',
                  borderBottom: '1px solid black',
                  backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2',
                }}
                key={row.month}
              >
                <TableCell style={{ padding: '4px !important' }}>{row.month}</TableCell>
                <TableCell style={{ width: '150px' }}>
                  <Autocomplete
                    value={row.city_type}
                    onChange={(event, newValue) => handleRoleChange(index, newValue)}
                    options={['Metro', 'Non-Metro']}
                    renderInput={(params) => <TextField {...params} label="Select" />}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.rentAmount}
                    onChange={handleRentAmountChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.submittedAmount}
                    onChange={handleSubmittedAmountChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Grid
        container
        spacing={2}
        // alignItems="center"
        direction="row"
        style={{ marginBottom: '1rem' }}
      >
        <Grid
          item
          container
          xs={4}
          spacing={2}
          alignItems="center"
          justifyContent="space-evenly"
          direction="row"
          style={{ marginBottom: '1rem', height: '60px' }}
        >
          <Grid item>
            {/* <Button className="button" onClick={attchementHandler}>
              Attachment
            </Button>
            <Button className="button" onClick={attchementHandler}>Attachment</Button> */}

            <Button
              className="button"
              component="label"
              variant="contained"
              onClick={attchementHandler}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              {/* <VisuallyHiddenInput type="file" /> */}
            </Button>
          </Grid>
          <Grid item alignItems="center">
            <Button className="button" onClick={handleEditOrsave}>
              Save
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          xs={8}
          alignItems="center"
          justifyContent="flex-end"
          direction="column"
          style={{ marginBottom: '1rem' }}
        >
          {/* Text and Radio Buttons in a single line */}
          <Grid item container direction="row" alignItems="center">
            <Typography
              component="span"
              marginLeft="10px"
              style={{ color: '#7D7878', fontSize: '0.9rem' }}
            >
              Whether PAN Of The Landlord Available &nbsp;: &nbsp;
            </Typography>
            <RadioGroup
              aria-label="options"
              name="options"
              value={selectedValue ? 'Yes' : 'No'}
              onChange={handleChange}
              row // align radio buttons horizontally
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>

          {isShowPannumber ? (
            <Grid item container direction="column" alignItems="center" spacing={2}>
              {panNumbers &&
                panNumbers?.map((value, index) => (
                  <TextField
                    key={index}
                    label={`If Yes PAN ${index + 1} Number`}
                    variant="outlined"
                    onChange={handlePanNumberChange(index)}
                    value={value}
                    style={{ marginBottom: '10px' }}
                  />
                ))}
            </Grid>
          ) : null}
          {isShowDeclaration ? (
            <>
              {' '}
              <Grid item container direction="row" alignItems="center">
                <Typography
                  component="span"
                  marginLeft="10px"
                  style={{ color: '#7D7878', fontSize: '0.9rem' }}
                >
                  If No, Whether Whether Declaration Received From Landlord &nbsp;: &nbsp;
                </Typography>
                <RadioGroup
                  aria-label="options"
                  name="options"
                  value={declarationSelectedValue}
                  onChange={handleChangeDeclaration}
                  row // align radio buttons horizontally
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
              {isShowUpload ? (
                <Grid item>
                  {/* <Button className="button" onClick={landloardDeclarationAttachment}>
                    Declaration Attachment
                  </Button>
                  <Button className="button" onClick={attchementHandler}>Attachment</Button> */}

                  <Button
                    className="button"
                    component="label"
                    variant="contained"
                    onClick={landloardDeclarationAttachment}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    {/* <VisuallyHiddenInput type="file" /> */}
                  </Button>
                </Grid>
              ) : null}
            </>
          ) : null}
        </Grid>
      </Grid>
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

      {openAttachmentDilog ? (
        <FileUploader
          showAttachmentDilog={openAttachmentDilog}
          closeAttchementDilod={closeAttchementDilod}
          handleUploadattchmentFileName={handleUploadattchmentFileName}
          handleUploadattchment={handleRentattchment}
          handleDeletedID={handleRentDeletedID}
          previousData={rentDocs}
        />
      ) : null}
      {openAttachmentDilogForLandLoard ? (
        <FileUploader
          showAttachmentDilog={openAttachmentDilogForLandLoard}
          closeAttchementDilod={closeLandLordAttchementDilod}
          handleUploadattchmentFileName={handleUploadattchment}
          handleUploadattchment={handleLandLordattchment}
          previousData={landLordDocs}
          handleDeletedID={handleLandLordDeletedID}
        />
      ) : null}
     
      </>}
    </div>
  );
}
