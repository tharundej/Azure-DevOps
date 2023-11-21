import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { baseUrl } from 'src/nextzen/global/BaseUrl';
import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';
import ReusableForm from 'src/nextzen/global/reUseableForm/ReusableForm';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
const headings = [
  'Type',
  'Policy Number',
  'Date Of Commencement Of Policy Or Date Paid',
  'Insured Persion Name(S)',
  'Relationship Of The Insured Person',

  'Pay Mode',
  'Policy Citizenship Type',
  'Amount Of Premium Or Expense',
  'Eligible Decduction For The Policy Expense',
  'Action',
];

export default function MedicalPremium() {
  // const baseUrl = 'https://vshhg43l-3001.inc1.devtunnels.ms/erp/';
   
  const empId = localStorage.getItem('employeeID')
  const cmpId= localStorage.getItem('companyID')
  const token = localStorage.getItem('accessToken')
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(true);
  const payscheduleTypes = [{ type: 'Permanent' }, { type: 'Temporary' }];
  const relationshipType = [{ type: 'Parents' }, { type: 'Self Spouse and CHild' }];
  const type = [
    { type: 'CGHS Contrubution' },
    { type: 'Medical Expenditure' },
    { type: 'Medical Insurance' },
    { type: 'Preventive Health Checkup' },
  ];
  const [isreloading, setISReloading] = useState(false);
  const policyCItizenshipType = [{ type: 'Normal' }, { type: 'Senior Citizen' }];
  const payMode = [{ type: 'Cahs ' }, { type: 'Other Than Cash' }];
  const [medicalTableData, setMedicalTableData] = useState([]);
  const [medicalTableDataDoc, setMedicalTableDataDoc] = useState([]);
  const [formData, setFormData] = useState({
    companyID: cmpId,
    employeeID: empId,
    type: '',
    policyNumber: '',
    dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
    insuredPersonName: '',
    relationshipType: '',
    payMode: '',
    policyCitizenshipType: '',
    amountOfPremium: '',
    eligibleDeduction: '',
    documents: [],
  });
  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  var [attachedDocumment, setAttachedDocument] = useState([]);
  var [attachedDocummentFileName, setAttachedDocumentFileName] = useState([]);
  const [openAttachmentDilog, setOpenAttchementDilog] = useState(false);
  var [landLordDocs, setLandLordDocs] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  const [landLordDeletedId, setLandLordDeletedID] = useState([]);
  const [rentDeletedId, setRentDeletedID] = useState([]);
  const [isEdit , setIsEdit] =useState(false)
  const methods = useForm();

  const attchementHandler = () => {
    setOpenAttchementDilog(true);
  };
  const closeAttchementDilod = () => {
    setOpenAttchementDilog(false);
  };
  const handleUploadattchment = (files, fileNames) => {
    console.log(files, fileNames, 'getting from uploader ');

    // Create a new array to store the objects
    const newArray = [];

    // Ensure both arrays have the same length
    if (files.length === fileNames.length) {
      for (var i = 0; i < files.length; i++) {
        var obj = {
          fileContent: files[i],
          fileName: fileNames[i],
        };
        newArray.push(obj);
      }

      // Update medicalTableDataDoc by merging with the existing array of objects
      setMedicalTableDataDoc((prevFormData) => [...prevFormData, ...newArray]);

      console.log(medicalTableDataDoc, 'updated');
    } else {
      console.error('Arrays must have the same length');
    }
  };

  console.log(medicalTableDataDoc, 'updated22');
  const handleUploadattchmentFileName = (data) => {
    attachedDocummentFileName = data;
    setAttachedDocumentFileName(attachedDocummentFileName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      fileName: attachedDocummentFileName,
    }));
    console.log(attachedDocummentFileName, data);
    setOpenAttchementDilog(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const integerValue = /^\d+$/.test(value) ? parseInt(value, 10) : value;
    let calculatedEligibleDeduction = integerValue;

    // Check if amountOfPremium is greater than 2500
    if (name === 'amountOfPremium' && integerValue > 25000) {
      calculatedEligibleDeduction = 25000;
    }

    setFormData({
      ...formData,
      [name]: integerValue,
      eligibleDeduction: calculatedEligibleDeduction,
    });

    // setFormData({ ...formData, [name]: integerValue });

    console.log(formData);
  };

  const handleAutocompleteChange = (name, selectedValue) => {
    let mappedValue;

    if (selectedValue === 'Yes') {
      mappedValue = 1;
    } else if (selectedValue === 'No') {
      mappedValue = 0;
    } else {
      mappedValue = selectedValue;
    }

    setFormData({ ...formData, [name]: mappedValue });
  };

  const saveMedicalDetails = async () => {
    const payload = {
      companyID: cmpId,
      employeeID: empId,
      type: formData?.type,
      policyNumber: formData?.policyNumber,
      dateOfCommencementOfPolicy: '2023-10-15',
      insuredPersonName: formData?.insuredPersonName,
      relationshipType: formData?.relationshipType,
      payMode: formData?.payMode,
      policyCitizenshipType: formData?.policyCitizenshipType,
      amountOfPremium: formData?.amountOfPremium,
      eligibleDeduction: formData?.eligibleDeduction,
      fileName: attachedDocummentFileName,
      fileContent: attachedDocumment,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/addMedicalInsuranceDetails',
      headers: {
        Authorization:
        token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
       
        if (response.data.code === 200) {
          setSnackbarSeverity('success');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          
          setISReloading(!isreloading);
          setFormData({
            companyID: cmpId,
            employeeID: empId,
            type: '',
            policyNumber: '',
            dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
            insuredPersonName: '',
            relationshipType: '',
            payMode: '',
            policyCitizenshipType: '',
            amountOfPremium: '',
            eligibleDeduction: '',
            documents: [],
          })
     
        }else    if (response.data.code === 400) {
          setSnackbarSeverity('error');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
        
    
        }
      })
      .catch((error) => {
        setOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error saving Medical Insurance details. Please try again.');
        setSnackbarOpen(true);
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const editMedicalDetails = async () => {
    console.log(" i am calling fine info042" , formData)
    const payload = {
     
    
          companyID: formData.companyID,
          employeeID:formData.employeeID,
         
          employeeName: formData.employeeName,
          premiumID: formData?.premiumID,
          type: formData?.type,
          policyNumber: formData?.policyNumber,
          dateOfCommencementOfPolicy: formData.dateOfCommencementOfPolicy,
          insuredPersonName: formData?.insuredPersonName,
          relationshipType: formData?.relationshipType,
          payMode: formData?.payMode,
          policyCitizenshipType: formData?.policyCitizenshipType,
          amountOfPremium: formData?.amountOfPremium,
          eligibleDeduction: formData?.eligibleDeduction,
          documents: rentDocs ? rentDocs : [],
          oldFields:rentDeletedId
      
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'updateMedicalInsuranceDetails',
      url: baseUrl+'/updateMedicalInsuranceDetails',
      headers: {
        Authorization:
       token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
       

        if (response.data.code === 200) {
          setSnackbarSeverity('success');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          
          setISReloading(!isreloading);
          setFormData({
            companyID: cmpId,
            employeeID: empId,
            type: '',
            policyNumber: '',
            dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
            insuredPersonName: '',
            relationshipType: '',
            payMode: '',
            policyCitizenshipType: '',
            amountOfPremium: '',
            eligibleDeduction: '',
            documents: [],
          })
     
        }else    if (response.data.code === 400) {
          setSnackbarSeverity('error');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
        
    
        }
        // if (response.data. === 200) {
        //   setISReloading(!isreloading);
        //   setSnackbarSeverity('success');
        //   setSnackbarMessage('Medical Insurance  Updated successfully!');
        //   setSnackbarOpen(true);
        //   console.log('success');
          
        // }
      })
      .catch((error) => {
        setOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error Medical Insurance  Updating. Please try again.');
        setSnackbarOpen(true);
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const getMedicalPremumDetails = async () => {
    const payload = { employeeId: empId };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl+'getMedicalInsuranceDetails',
      url:baseUrl +'/getMedicalInsuranceDetails',

      headers: {
        Authorization:
       token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setMedicalTableData(rowsData);
          console.log(JSON.stringify(response?.data), 'resultMedical');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(result, 'resultsreults');
  };
  console.log(medicalTableData, 'resultsreults');
  const getMedicalPremumDetailsDocs = async () => {
    const payload = { employeeId: empId };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/getMedicalInsuranceDocuments',
      headers: {
        Authorization:
         token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setMedicalTableDataDoc(rowsData);

          console.log(JSON.stringify(response?.data), 'setMedicalTableDataDoc');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  // handle edit
  const handleEdit = (rowData) => {
    setIsEdit(true)
    console.log(rowData ,"rowData");
    setRentDocs(rowData.documents)
    setFormData({
      companyID: rowData.companyID,
      employeeID: rowData.employeeID,
      type: rowData.type,
      employeeName : rowData.employeeName,
      policyNumber: rowData.policyNumber,
      dateOfCommencementOfPolicy: rowData.dateOfCommencementOfPolicy, 
      insuredPersonName: rowData.insuredPersonName,
      relationshipType: rowData.relationshipType,
      payMode: rowData.payMode,
      policyCitizenshipType: rowData.policyCitizenshipType,
      amountOfPremium: rowData.amountOfPremium,
      eligibleDeduction: rowData.eligibleDeduction,
      premiumID: rowData.medicalInsurancePremiumID
      // Add other fields as needed
    });

    // Set the attached documents if available
    if (rowData.documents && rowData.documents.length > 0) {
      setMedicalTableDataDoc([...rowData.documents]);
    }
  };

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMedicalPremumDetails();
      getMedicalPremumDetailsDocs();
    };
    fetchData();
    setIsEdit(false)
  }, [isreloading]);

  // handling documents
 
  const handleRentattchment = (fileData) => {
    console.log(fileData, 'getting from uploader ');
    attachedDocummentFileName = fileData?.map((doc) => doc.fileName);
    setAttachedDocumentFileName(attachedDocummentFileName);
    attachedDocumment = fileData?.map((doc) => doc.fileContent);
    setAttachedDocument(attachedDocumment);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      id: item.id ? item.id : 0,
      fileName: item.fileName,
      fileContent: item.fileContent,
    }));
    rentDocs = transformedData;
    setRentDocs(rentDocs);

    console.log(rentDocs, 'landlordDocs');
    setOpenAttchementDilog(false);
  };
  console.log(rentDocs, 'landlordDocs');
 
  const handleRentDeletedID = (data) => {
    console.log(data, 'delete');
    setRentDeletedID((prevIDs) => [...prevIDs, data]);
    console.log(rentDeletedId, 'deletedelete');
  };

  const handleSubmit = ()=>{
    isEdit ? editMedicalDetails() :saveMedicalDetails()
  }
  const handleCancle = ()=>{
    setIsEdit(false)
     setFormData({
      companyID: cmpId,
      employeeID: empId,
      type: '',
      policyNumber: '',
      dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
      insuredPersonName: '',
      relationshipType: '',
      payMode: '',
      policyCitizenshipType: '',
      amountOfPremium: '',
      eligibleDeduction: '',
      documents: [],
    });

  }
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
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          {/* grid 1 */}
          <Grid item container spacing={2} xs={12} style={{ marginTop: '1rem' }}>
            {/* search and filter  */}
            {/* <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            style={{ marginBottom: '1rem' }}
          >
            <Grid item>
              <TextField
                sx={{ width: '20vw' }}
                // value={filters.name}
                // onChange={handleFilterName}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                  border: 'none',
                }}
              />
            </Grid>
            <Grid item>
              <Button className="button">Filter</Button>
            </Grid>
            <Grid item>
              <Button className="button">Report</Button>
            </Grid>
          </Grid> */}
            {/* Row 1 */}
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  name="type"
                  id="combo-box-demo"
                  options={type.map((employeepayType) => employeepayType.type)}
                  value={formData.type}
                  onChange={(event, newValue) => handleAutocompleteChange('type', newValue)}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Type" />}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Policy Number"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} style={{ paddingTop: '9px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Date Of Commencement Of Policy Or Date Paid"
                      value={dayjs(formData.dateOfCommencementOfPolicy, { format: 'YYYY-MM-DD' })}  // Use the appropriate form data field
                      defaultValue={dayjs(new Date())}
    onChange={(newValue) => {
      console.log(newValue)
      const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfCommencementOfPolicy: formattedDate,
      }));
    }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
              </Grid>
            </Grid>

            {/* Row 2 */}

            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Insured Persion Name(S)"
                  variant="outlined"
                  fullWidth
                  name="insuredPersonName"
                  value={formData.insuredPersonName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  name="relationship"
                  id="combo-box-relationshipType"
                  options={relationshipType.map((employeepayType) => employeepayType.type)}
                  value={formData.relationship}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange('relationshipType', newValue)
                  }
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Relationship Type" />}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  name="policyCitizenshipType"
                  id="combo-box-demo"
                  options={policyCItizenshipType.map((employeepayType) => employeepayType.type)}
                  value={formData.policyCitizenshipType}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange('policyCitizenshipType', newValue)
                  }
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Policy Citizenship Type" />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  name="Pay Mode"
                  id="combo-box-demo"
                  options={payMode.map((employeepayType) => employeepayType.type)}
                  value={formData.payMode}
                  onChange={(event, newValue) => handleAutocompleteChange('payMode', newValue)}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Pay Mode" />}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Amount Of Premium"
                  variant="outlined"
                  fullWidth
                  name="amountOfPremium"
                  value={formData.amountOfPremium}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Eligible Deduction"
                  variant="outlined"
                  fullWidth
                  // disabled
                  name="eligibleDeduction"
                  value={formData.eligibleDeduction}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {/* My buttons  */}
            <Grid item container xs={12} spacing={2}>
              <Grid
                item
                container
                xs={6}
                spacing={2}
                alignItems="center"
                justifyContent="flex-Start"
                direction="row"
                style={{ marginBottom: '1rem' }}
              >
                <Grid item>
                  <Button className="button" onClick={attchementHandler}>
                    Attachment
                  </Button>
                </Grid>
                <Grid item>
                  <Button className="button" onClick={handleSubmit}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button className="button" onClick={handleCancle}>Cancel</Button>
                </Grid>
              </Grid>
            </Grid>
            {/* card */}
          </Grid>
          {/* grid 1 end  */}

          {/* grid 2 for the table to keep left side  */}
          {/* <Grid item xs={4}>
            <Grid
              item
              container
              xs={12}
              spacing={2}
              alignItems="center"
              justifyContent="center"
              direction="column"
              style={{ marginBottom: '1rem', marginTop: '1rem' }}
            >
              <Grid xs={6}>
                <Grid
                  item
                  container
                  xs={12}
                  style={{
                    padding: '10px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  <Grid item xs={6}>
                    Total Decduction U/S 80D
                  </Grid>
                  <Grid item xs={6}>
                    Overal Deduction
                  </Grid>
                </Grid>
                <Divider style={{ backgroundColor: 'black' }} />
                <Grid
                  item
                  container
                  xs={12}
                  style={{ backgroundColor: '#f0eded', padding: '10px' }}
                >
                  <Grid item xs={6}>
                    Self Spouse & Child
                  </Grid>
                  <Grid item xs={6}>
                    0
                  </Grid>
                </Grid>
                <Divider style={{ backgroundColor: 'black' }} />
                <Grid item container xs={12} style={{ padding: '10px' }}>
                  <Grid item xs={6}>
                    Parent(s)
                  </Grid>
                  <Grid item xs={6}>
                    0
                  </Grid>
                </Grid>
                <Divider style={{ backgroundColor: 'black' }} />
                <Grid
                  item
                  container
                  xs={12}
                  style={{ backgroundColor: '#f0eded', padding: '10px' }}
                >
                  <Grid item xs={6}>
                    Total Deduction
                  </Grid>
                  <Grid item xs={6}>
                    0
                  </Grid>
                </Grid>
                <Divider style={{ backgroundColor: 'black' }} />
              </Grid>
            </Grid>
          </Grid> */}
          {/* grid 2 end  */}
        </Grid>
{medicalTableData?.length > 0?
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headings.map((heading, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: '#F4F6F8',
                      color: '#637381',
                      whiteSpace: 'nowrap', // Prevent text wrapping
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalTableData?.length > 0 &&
                medicalTableData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {/* <TableCell>{rowIndex + 1}</TableCell> */}
                    <TableCell style={{ textAlign: 'center' }}>{row.type}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.policyNumber}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.dateOfCommencementOfPolicy}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.insuredPersonName}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.relationshipType}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.payMode}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.policyCitizenshipType}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.amountOfPremium}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.eligibleDeduction}</TableCell>

                    <TableCell style={{ textAlign: 'center' }}>
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer> : null}
        <Grid
          item
          container
          xs={12}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
          style={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          <Grid xs={6}>
            <Grid
              item
              container
              xs={12}
              style={{
                padding: '10px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
              }}
            >
              <Grid item xs={6}>
                Total Decduction U/S 80D
              </Grid>
              <Grid item xs={6}>
                Overal Deduction
              </Grid>
            </Grid>
            <Divider style={{ backgroundColor: 'black' }} />
            <Grid item container xs={12} style={{ backgroundColor: '#f0eded', padding: '10px' }}>
              <Grid item xs={6}>
                Self Spouse & Child
              </Grid>
              <Grid item xs={6}>
                0
              </Grid>
            </Grid>
            <Divider style={{ backgroundColor: 'black' }} />
            <Grid item container xs={12} style={{ padding: '10px' }}>
              <Grid item xs={6}>
                Parent(s)
              </Grid>
              <Grid item xs={6}>
                0
              </Grid>
            </Grid>
            <Divider style={{ backgroundColor: 'black' }} />
            <Grid item container xs={12} style={{ backgroundColor: '#f0eded', padding: '10px' }}>
              <Grid item xs={6}>
                Total Deduction
              </Grid>
              <Grid item xs={6}>
                0
              </Grid>
            </Grid>
            <Divider style={{ backgroundColor: 'black' }} />
          </Grid>
        </Grid>
      </FormProvider>
      {openAttachmentDilog ? (
        <FileUploader
          showAttachmentDilog={openAttachmentDilog}
          closeAttchementDilod={closeAttchementDilod}
          handleUploadattchmentFileName={handleUploadattchmentFileName}
          handleUploadattchment={handleRentattchment}
          previousData={rentDocs}
          handleDeletedID={handleRentDeletedID}
        />
      ) : null}
    </div>
  );

}
