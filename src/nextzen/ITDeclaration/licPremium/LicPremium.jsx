import React, { useEffect, useState } from 'react';
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
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import dayjs from 'dayjs';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import '../declarationDetails/DeclarationDetails.css';
import MuiAlert from '@mui/material/Alert';
import './LicPReimum.css';
// import { baseUrl } from 'src/nextzen/global/BaseUrl';
import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const headings = [
  'S.No',
  'Policy Number',
  'Commencement Date',
  'Name',
  'Ralationship',
  'Insured Person name ',
  ' Under 80U',
  'Under 80DDB',
  'Sum Assured',
  'Premium Amount For Which Proofs Attached Now',
  'Premium Amout Fall In Due',
  'Premium Considered For Deduction',
  'Action',
];


export default function LicPremium() {

  const baseUrl = "http://192.168.1.56:3001/erp/"
  const [policyData, setPolicyData] = useState([]);
  const payscheduleTypes = [{ type: 'Parents' }, { type: 'self spouse and child' }];
  const treatmentTypes = [{ type: 'No' }, { type: 'Yes' }];
  const pinjuredPersonDisability = [{ type: 'No' }, { type: 'Yes' }];
  const [isreloading, setISReloading] = useState(false);
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // State to manage the selected option in Autocomplete
  
  const [files, setFiles] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);

  const sampleRows = [
    {
      sno: 1,
      policyNumber: 'POL-001',
      commencementDate: dayjs(new Date()).format('YYYY-MM-DD'),
      nameRelationship: 'John Doe',
      sumAssured: '$100,000',
      premiumAmountAttached: '$50',
      premiumAmountFallInDue: '$20',
      annualPremium: '$500',
      premiumConsideredForDeduction: '$200',
    },
    // Add more sample rows as needed
  ];

 

  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  const [formData, setFormData] = useState({
    companyId: 'COMP3',
    companyName: 'wipro',
    employeeId: 'wipr1',
    employeeName: 'rameshav',
    financialYear: '2022-11-11',
    policyNumber: '',
    dateOfCommencementOfPolicy: '2022-11-11',
    insuredPersonName: '',
    sumOfAssured: '',
    relationship: '',
    premiumAmountForWhichProofAttachedNow: '',
    premiumAmountFallInDue: '',
    premiumConsiderForDeduction: '',
    treatmentForSpecifiedDiseas: '',
    doesTheInjuredPersonHaveDisability: '',
    fileName: [],
    fileContent: [],
  });
  var [attachedDocumment ,setAttachedDocument] = useState([])
var [attachedDocummentFileName ,setAttachedDocumentFileName] = useState([])
  const [openAttachmentDilog , setOpenAttchementDilog] = useState(false)

  // states to handle file Uploader component 
  var [landLordDocs, setLandLordDocs] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  var [fileName , setFileName] = useState([])
  var [fileContent, setFileContent] = useState([])
  const [selectedRowDocuments, setSelectedRowDocuments] = useState([]);
  const benak = () => {
    console.log('testing ');
  };
  const methods = useForm();


  // handling the file uploader compoent
  const handleLandLordattchment = (fileData) => {
    console.log(fileData, 'getting from uploader ');
    fileName = fileData?.map((doc) => doc.fileName);
    setFileName(fileName);
    fileContent = fileData?.map((doc) => doc.fileContent);
    setFileContent(fileContent);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      ID: item.id ? item.id : 0,
      fileName: item.fileName,
      fileContent: item.fileContent,
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
const handleLandLordDeletedID = ( data)=>{
  console.log(data , "delete")
  setLandLordDeletedID( (prevIDs) => [...prevIDs, data])
  console.log(landLordDeletedId, "deletedelete")
}
const handleRentDeletedID = ( data)=>{
  console.log(data , "delete")
  setRentDeletedID( (prevIDs) => [...prevIDs, data])
  console.log(rentDeletedId, "deletedelete")
}

// end of file uploader
  const attchementHandler = (rowData) =>{
    setSelectedRowDocuments(rowData.documents || []);
    setOpenAttchementDilog(true)
  }
  const closeAttchementDilod = () =>{
    setOpenAttchementDilog(false)
  }

  //  new mehiod


  const handleFormChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const integerValue = /^\d+$/.test(value) ? parseInt(value, 10) : value;

    // Assuming formData is an array of objects
    const updatedData = [...formData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [name]: integerValue };
    setFormData(updatedData);
  };

  const saveLicDetails = async (rowData) => {
    // Assuming you have a function to save data for a specific row
    // Adjust this function based on your actual implementation
    console.log('Saving data for row:', rowData);
  };
  // new mehod end 

  const handleUploadattchment =(data)=>{
    attachedDocumment = data
   setAttachedDocument(attachedDocumment)
  //  setFormData({ ...formData, [fileContent] :  attachedDocumment});
   setFormData((prevFormData) => ({
    ...prevFormData,
    fileContent: attachedDocumment,
  }));
   console.log(attachedDocumment ,data)
 }
 const handleUploadattchmentFileName =(data)=>{
   attachedDocummentFileName = data
   setAttachedDocumentFileName(attachedDocummentFileName)
   setFormData((prevFormData) => ({
    ...prevFormData,
    fileName: attachedDocummentFileName,
  }));
   console.log(attachedDocummentFileName ,data)
   setOpenAttchementDilog(false)
 }



  const handleAutocompleteChange1 = (event, newValue) => {
    const selectedValue = newValue;
    setSelectedOption(selectedValue);
    console.log(selectedValue, 'select', event);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const integerValue = /^\d+$/.test(value) ? parseInt(value, 10) : value;

    setFormData({ ...formData, [name]: integerValue });
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

    console.log('selected value ',name , mappedValue ,  selectedValue);
  };
  console.log(formData, 'formdata');

  const getLicPremium = async () => {
    const payload = { "employeeID":"INFO21" };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: "https://vshhg43l-3001.inc1.devtunnels.ms/erp/getLicPremiumDetails",
     
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo ',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setPolicyData(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'result');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const saveLicDetals = async () => {
    console.log(attachedDocumment ,attachedDocummentFileName, "saceasveasave")
   

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl +'addLicPremium',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo',
        'Content-Type': 'text/plain',
      },
      data: formData,
    };

    console.log(formData)
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setISReloading(!isreloading);
          setSnackbarSeverity('success');
          setSnackbarMessage('Lic details saved successfully!');
          setSnackbarOpen(true);
          console.log('success');
        }
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error saving Lic details. Please try again.');
        setSnackbarOpen(true);
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    // setOpen(false);
  };
  console.log(policyData, 'policydata');
  useEffect(() => {
    const fetchData = async () => {
      await getLicPremium();
    };
    fetchData();
    
  }, [isreloading]);

  const handleFormChange = (event, rowIndex) => {
    const { name, value } = event.target;
    const integerValue = /^\d+$/.test(value) ? parseInt(value, 10) : value;
 
    setPolicyData((prevData) => {
       const newData = [...prevData];
       newData[rowIndex] = { ...newData[rowIndex], [name]: integerValue };
       return newData;
    });
 };
 

  const userId  =  5
  return (
    <div>
      <FormProvider {...methods}>
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
  
       
          {/* Row 1 */}
          {policyData.length > 0 &&
          policyData?.map((row, rowIndex) => (
            <div key={rowIndex} style={{ marginTop: '2rem' }}>

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              {/* <Typography >Policy Number </Typography> */}
              <TextField
                label="Policy Number "
                variant="outlined"
                fullWidth
                name="policyNumber"
                value={row.policyNumber}
                onChange={(e) => handleFormChange(e, rowIndex)}
              />
            </Grid>
            <Grid item xs={4} style={{ paddingTop: '9px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Date Of Commencement Of Policy"
                    value={dates?.start_date}
                    defaultValue={dayjs(new Date())}
                    onChange={(newValue) => {
                      setDates((prev) => ({
                        ...prev,
                        start_date: newValue,
                      }));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Insured Person Name"
                variant="outlined"
                fullWidth
                name="insuredPersonName"
                value={row.insuredPersonName}
                onChange={(e) => handleFormChange(e, rowIndex)}
              />
            </Grid>
          </Grid>

          {/* Row 2 */}

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Sum Of Assured"
                variant="outlined"
                fullWidth
                type='number'
                name="sumOfAssured"
                value={row.sumOfAssured}
                onChange={(e) => handleFormChange(e, rowIndex)}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="relationship"
                id="combo-box-demo"
                options={payscheduleTypes.map((employeepayType) => employeepayType.type)}
                value={formData.relationship}
                onChange={(event, newValue) => handleAutocompleteChange('relationship', newValue)}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Relationship" />}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Premium Amount For Which Proof Attched Now "
                variant="outlined"
                fullWidth
                name="premiumAmountForWhichProofAttachedNow"
                value={row.premiumAmountForWhichProofAttachedNow}
                onChange={(e) => handleFormChange(e, rowIndex)}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Premium Amount Fall In Due"
                variant="outlined"
                fullWidth
                name="premiumAmountFallInDue"
                value={row.premiumAmountFallInDue}
                onChange={(e) => handleFormChange(e, rowIndex)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Premium Considered For Deduction"
                variant="outlined"
                fullWidth
                name="premiumConsiderForDeduction"
                value={row.premiumConsiderForDeduction}
                onChange={(e) => handleFormChange(e, rowIndex)}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="treatmentForSpecifiedDiseas"
                id="combo-box-demo"
                options={treatmentTypes.map((employeepayType) => employeepayType.type)}
                value={formData?.treatmentForSpecifiedDiseas === 1
                  ? 'Yes'
                  : formData.treatmentForSpecifiedDiseas === 0
                  ? 'No'
                  : formData.treatmentForSpecifiedDiseas
            }
                onChange={(event, newValue) =>
                  handleAutocompleteChange('treatmentForSpecifiedDiseas', newValue)
                }
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Treatment For Specific Disease Under 80DDB" />
                )}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="doesTheInjuredPersonHaveDisability"
                id="combo-box-demo"
                options={pinjuredPersonDisability.map((employeepayType) => employeepayType.type)}
                value={formData?.doesTheInjuredPersonHaveDisability === 1
                  ? 'Yes'
                  : formData.doesTheInjuredPersonHaveDisability === 0
                  ? 'No'
                  : formData.doesTheInjuredPersonHaveDisability
            }
                onChange={(event, newValue) =>
                  handleAutocompleteChange('doesTheInjuredPersonHaveDisability', newValue)
                }
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Does The Injured Person Have Disability under 80U"
                  />
                )}
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
                <Button className="button" onClick={()=>attchementHandler(row)}>Attchement</Button>
              </Grid>
              <Grid item>
                <Button className="button" onClick={saveLicDetals}>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button className="button">Cancel</Button>
              </Grid>
            </Grid>
            {/* Add more rows as needed */}

            <Grid
              item
              container
              xs={6}
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              direction="row"
              style={{ marginBottom: '1rem' }}
            >
              <Grid item>
                <Typography> Total Premium :{policyData?.length}</Typography>
              </Grid>
            </Grid>
            {/* Add more rows as needed */}
          </Grid>
          <Button onClick={() => saveLicDetails(row)} style={{ marginTop: '1rem' }}>
                Save
              </Button>
              {   openAttachmentDilog?   <FileUploader showAttachmentDilog = { openAttachmentDilog} closeAttchementDilod = {closeAttchementDilod} handleUploadattchmentFileName ={handleUploadattchmentFileName} handleUploadattchment ={handleLandLordattchment}   previousData={selectedRowDocuments}
          handleDeletedID = {handleLandLordDeletedID}/> : null}


 
            </div>
          ))}
        </Grid>
{/* 
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headings.map((heading, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: '#2196f3',
                      color: 'white',
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
              {policyData.length > 0 &&
                policyData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell style={{ textAlign: 'center'}}>{rowIndex + 1}</TableCell>
                    <TableCell>{row.dateOfCommencementOfPolicy}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.policyNumber}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.employeeName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.relationship}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.insuredPersonName}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.treatmentForSpecifiedDiseas}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.doesTheInjuredPersonhavedisability}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.sumOfAssured}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.premiumAmountForWhichProofAttachedNow}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.premiumAmountFallInDue}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.annualPremium}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.premiumConsiderForDeduction}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.action}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </FormProvider>
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
      
{   openAttachmentDilog?   <FileUploader showAttachmentDilog = { openAttachmentDilog} closeAttchementDilod = {closeAttchementDilod} handleUploadattchmentFileName ={handleUploadattchmentFileName} handleUploadattchment ={handleLandLordattchment}   previousData={landLordDocs}
          handleDeletedID = {handleLandLordDeletedID}/> : null}


 
    </div>
  );
}