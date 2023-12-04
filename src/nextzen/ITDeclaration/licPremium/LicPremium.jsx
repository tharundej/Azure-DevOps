import React, { useContext, useEffect, useState } from 'react';
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
  Card,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import dayjs from 'dayjs';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import '../declarationDetails/DeclarationDetails.css';
import MuiAlert from '@mui/material/Alert';
import './LicPReimum.css';
// import { baseUrl } from 'src/nextzen/global/BaseUrl';
import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UserContext from 'src/nextzen/context/user/UserConext';
import { LoadingScreen } from 'src/components/loading-screen';
import {useSnackbar} from '../../../components/snackbar'
//form alidation 
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// Create a Yup schema for your form
const schema = yup.object().shape({
  policyNumber: yup.string().required('Policy Number is required'),
  dateOfCommencementOfPolicy: yup.date().required('Date of Commencement is required'),
  insuredPersonName: yup.string().required('Insured Person Name is required'),
  sumOfAssured: yup.number().required('Sum of Assured is required'),
  relationship: yup.string().required('Relationship is required'),
  premiumAmountForwhichProofAssured: yup.number().required('Premium Amount is required'),
  premiumAmountFallInDue: yup.number().required('Premium Amount Fall in Due is required'),
  treatmentForSpecifiedDiseases: yup.string().required('Treatment for Specified Diseases is required'),
  doesTheInjuredPersonHaveDisability: yup.string().required('Injured Person Disability is required'),
});
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
  // "Annual Premuium ",
  'Premium Considered For Deduction',
  'Action',
];


export default function LicPremium() {
 // const baseUrl = 'https://xql1qfwp-3001.inc1.devtunnels.ms/erp';
 const {enqueueSnackbar} = useSnackbar()
  const {user} = useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''

const [loading,setLoading] = useState(false);
 
  // const cmpName =localStorage.getItem('accessToken')
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
  const [isEdit , setIsEdit] =useState(false)
  const [files, setFiles] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);

  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  const [selectedYear, setSelectedYear] = useState(null);
  // const [formData, setFormData] = useState({
  //   companyId: cmpId,
  //   companyName: '',
  //   employeeId: empId,
  //   employeeName: '',
  //   financialYear:  selectedYear?.financialYear,
  //   policyNumber: '',
  //   dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
  //   insuredPersonName: '',
  //   sumOfAssured: '',
  //   relationship: '',
  //   premiumAmountForwhichProofAssured: '',
  //   premiumAmountFallInDue: '',
  //   premiumConsiderForDeduction: '',
  //   treatmentForSpecifiedDiseases: '',
  //   doesTheInjuredPersonHaveDisability: '',
  //   fileName: [],
  //   fileContent: [],
  // });
  //formvalidation 
  const [formData, setFormData] = useState({}); // Your form data state
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv' ,data);})
  var [attachedDocumment ,setAttachedDocument] = useState([])
var [attachedDocummentFileName ,setAttachedDocumentFileName] = useState([])
  const [openAttachmentDilog , setOpenAttchementDilog] = useState(false)

  // states to handle file Uploader component 
  var [landLordDocs, setLandLordDocs] = useState([]);
  const [landLordDeletedId, setLandLordDeletedID] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  var [fileName , setFileName] = useState([])
  var [fileContent, setFileContent] = useState([])
 

  const currentYear = new Date().getFullYear();
   console.log(currentYear ,"current year")
   const startYear = 2022;
   const endYear = 2030;
 
  //  const financialYears = [];
  //  for (let year = startYear; year <= endYear; year++) {
  //    financialYears.push(`${year}-${year + 1}`);
  //  }
 
  
   const [financialYears, setFinancialYears] = useState([]);
   const handleYearChange = (_, value) => {
    setSelectedYear(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      financialYear: value?.financialYear,
    }));
    localStorage.setItem('selectedYear', JSON.stringify(value));
  };

  // handling the file uploader compoent
  const handleLandLordattchment = (fileData) => {
    console.log(fileData ,"fileData")
    console.log(fileData, 'getting from uploader ');
    fileName = fileData?.map((doc) => doc.fileName);
    setFileName(fileName);
    fileContent = fileData?.map((doc) => doc.fileContent);
    setFileContent(fileContent);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      id: item.id ? item.id : 0,
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
    // setSelectedRowDocuments(rowData.documents || []);
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
    setLoading(true)
    const payload = { "employeeID":empId,
    financialYear: selectedYear?.financialYear, };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl +"/getLicPremiumDetails",
     
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
          setLoading(false)
          const rowsData = response?.data?.data;
          setPolicyData(rowsData);
        
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const saveLicDetals = async () => {
    console.log(attachedDocumment ,attachedDocummentFileName, "saceasveasave")
   
    setLoading(true)
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl +'/addLicPremium',
      headers: {
        Authorization:
         token,
        'Content-Type': 'text/plain',
      },
      data: formData,
    };

    console.log(formData)
    const result = await axios
      .request(config)
      .then((response) => {
       
          if (response.data.status === 200) {
            enqueueSnackbar(error.response.data.message,{variant:'error'})
            setLoading(false)
            // setSnackbarSeverity('success');
            // setSnackbarMessage(response.data.message);
            // setSnackbarOpen(true);
            
            setISReloading(!isreloading);
            setFormData({
              companyId: cmpId,
              companyName: '',
              employeeId: empId,
              employeeName: '',
              financialYear:  selectedYear?.financialYear,
              policyNumber: '',
              dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
              insuredPersonName: '',
              sumOfAssured: '',
              relationship: '',
              premiumAmountForwhichProofAssured: '',
              premiumAmountFallInDue: '',
              premiumConsiderForDeduction: '',
              treatmentForSpecifiedDiseases: '',
              doesTheInjuredPersonHaveDisability: '',
              fileName: [],
              fileContent: [],
            })
            getLicPremium()
          }else    if (response.data.status === 400) {
            enqueueSnackbar(error.response.data.message,{variant:'error'})
            setLoading(false)
            // setSnackbarSeverity('error');
            // setSnackbarMessage(response.data.message);
            // setSnackbarOpen(true);
          
      
          }
        }
      )
      .catch((error) => {
        enqueueSnackbar(error.response.data.message,{variant:'error'})
        setLoading(false)
        // setSnackbarSeverity('error');
        // setSnackbarMessage('Error saving Lic details. Please try again.');
        // setSnackbarOpen(true);
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
  const editcDetails = async () => {
    setLoading(true)
    console.log(" i am calling fine info042" , formData)
    const payload = {
        licPremiumID: formData.licPremiumID,
                  companyID: formData.companyId,
                  employeeID: formData.employeeId,
                  employeeName: formData.employeeName,
                  financialYear: formData.financialYear,
                  policyNumber: formData.policyNumber,
                  dateOfCommencementOfPolicy: formData.dateOfCommencementOfPolicy,
                  insuredPersonName: formData.insuredPersonName,
                  sumOfAssured:parseFloat (formData.sumOfAssured),
                  relationship: formData.relationship,
                  premiumAmountForwhichProofAssured: parseFloat(formData.premiumAmountForwhichProofAssured),
                  premiumAmountFallInDue:parseFloat (formData.premiumAmountFallInDue),
                  premiumConsiderForDeduction: parseFloat(formData.premiumConsiderForDeduction),
                  treatmentForSpecifiedDiseaseses: parseInt(formData.treatmentForSpecifiedDiseases),
                  doesTheInjuredPersonHaveDisability: formData.doesTheInjuredPersonHaveDisability,
                  documents :landLordDocs,
                  oldFields:landLordDeletedId
          
      
    };
    console.log(payload ,"payloaddd")

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'updateMedicalInsuranceDetails',
      url: baseUrl +'/updateLicPremiumDetails',
      headers: {
        Authorization:
       token ,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
     
        console.log(response , "success")
          if(response.data.status === 200){
            enqueueSnackbar(response.data.message,{variant:'success'})
            setLoading(false)
            console.log('success',response);
            setISReloading(!isreloading);
            // setSnackbarSeverity('success');
            setFormData({
              companyId: cmpId,
              companyName: '',
              employeeId: empId,
              employeeName: '',
              financialYear:   selectedYear?.financialYear,
              policyNumber: '',
              dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
              insuredPersonName: '',
              sumOfAssured: '',
              relationship: '',
              premiumAmountForwhichProofAssured: '',
              premiumAmountFallInDue: '',
              premiumConsiderForDeduction: '',
              treatmentForSpecifiedDiseases: '',
              doesTheInjuredPersonHaveDisability: '',
              fileName: [],
              fileContent: [],
            })
            // setSnackbarMessage(response.data.message);
            // setSnackbarOpen(true);
            setIsEdit(false)
            getLicPremium()
          }
          else if(response.data.status === 400){
            enqueueSnackbar(error.response.data.message,{variant:'error'})
            console.log('success',response);
            // setISReloading(!isreloading);
            // setSnackbarSeverity('error');
           
            // setSnackbarMessage(response.data.message);
            // setSnackbarOpen(true);
            // setIsEdit(false)
          }
         
          
        }
      )
      .catch((error) => {
        enqueueSnackbar(response.data.message,{variant:'success'})
        setLoading(false)
        setOpen(true);
        // setSnackbarSeverity('error');
        // setSnackbarMessage(response.message   );
        // setSnackbarOpen(true);
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
    setIsEdit(false)
    
  }, []);

  const handleFormChange = (event, rowIndex) => {
    const { name, value } = event.target;
    const integerValue = /^\d+$/.test(value) ? parseInt(value, 10) : value;
 
    setPolicyData((prevData) => {
       const newData = [...prevData];
       newData[rowIndex] = { ...newData[rowIndex], [name]: integerValue };
       return newData;
    });
 };
   // handle edit
   const handleEdit = (rowData) => {
    setIsEdit(true)
    console.log(rowData ,"rowData");
    setLandLordDocs(rowData.documents)
    setFormData({
      licPremiumID:rowData.licPremiumID,
      companyId: rowData.companyID,
    companyName: rowData.companyName,
    employeeId: rowData.employeeID,
    employeeName: rowData.employeeName,
    financialYear: rowData.financialYear,
    policyNumber: rowData.policyNumber,
    dateOfCommencementOfPolicy: rowData.dateOfCommencementOfPolicy,
    insuredPersonName: rowData.insuredPersonName,
    sumOfAssured: rowData.sumOfAssured,
    relationship: rowData.relationship,
    premiumAmountForwhichProofAssured: rowData.premiumAmountForwhichProofAssured,
    premiumAmountFallInDue: rowData.premiumAmountFallInDue,
    premiumConsiderForDeduction: rowData.premiumConsiderForDeduction,
    treatmentForSpecifiedDiseases: rowData.treatmentForSpecifiedDiseases,
    doesTheInjuredPersonHaveDisability: rowData.doesTheInjuredPersonHaveDisability,
 
      // Add other fields as needed
    });

    // Set the attached documents if available
    // if (rowData.documents && rowData.documents.length > 0) {
    //   setMedicalTableDataDoc([...rowData.documents]);
    // }
  };

  const handleSubmit1 = ()=>{
    isEdit ? editcDetails() :saveLicDetals()
  }
  const handleCancle = ()=>{
    setIsEdit(false)
     setFormData({
      companyId: cmpId,
    companyName: '',
    employeeId: empId,
    employeeName: '',
    financialYear: '2022-11-11',
    policyNumber: '',
    dateOfCommencementOfPolicy: dayjs().format('YYYY-MM-DD'),
    insuredPersonName: '',
    sumOfAssured: '',
    relationship: '',
    premiumAmountForwhichProofAssured: '',
    premiumAmountFallInDue: '',
    premiumConsiderForDeduction: '',
    treatmentForSpecifiedDiseases: '',
    doesTheInjuredPersonHaveDisability: '',
    fileName: [],
    fileContent: [],
    });

  }
  const userId  =  5

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
  useEffect(() => {
    const fetchData = async () => {
      await getFinancialYear();
    };
    fetchData();
    
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await getLicPremium();
    };
    fetchData();
    setIsEdit(false)
    
  }, [selectedYear?.financialYear ,isreloading]);
  useEffect(() => {
    const storedValue = localStorage.getItem('selectedYear');

  
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      setSelectedYear(parsedValue);
    }
  }, []);
  console.log(" financialYear: selectedYear?.financialYear," , selectedYear?.financialYear,)
  return (
    <div>
     {loading ? 
  <Card sx={{height:"60vh"}}><LoadingScreen/></Card> :
  <>   
   <FormProvider >

        <Grid container spacing={2} >
  
        <Grid  item xs={12}>
            
            <Autocomplete
              id="financialYear"
              options={financialYears}
              getOptionLabel={(option) => option.financialYear}
              value={selectedYear}
              onChange={handleYearChange}
              renderInput={(params) => <TextField {...params} label="Please Select Financial Year" />}
              style={{marginTop:"0.9rem"}}
            />
       
                </Grid>


 {  selectedYear?.financialYear ? <>
          <Grid item container xs={12} spacing={2}>
           
            <Grid item xs={4}>
              <TextField
                label="Policy Number "
                variant="outlined"
                fullWidth
                name="policyNumber"
                value={formData.policyNumber}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
              />
                <span>{methods?.errors?.policyNumber?.message}</span>
         
            </Grid>
            <Grid item xs={4} style={{ paddingTop: '9px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Date Of Commencement Of Policy"
                    value={dayjs(formData.dateOfCommencementOfPolicy, { format: 'YYYY-MM-DD' })}  // Use the appropriate form data field
                    // defaultValue={dayjs(new Date())}
  onChange={(newValue) => {
    console.log(newValue)
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfCommencementOfPolicy: formattedDate,
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
                value={formData.insuredPersonName}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
              />
                <span>{methods?.errors?.insuredPersonName?.message}</span>
         
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
                value={formData.sumOfAssured}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
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
                name="premiumAmountForwhichProofAssured"
                value={formData.premiumAmountForwhichProofAssured}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
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
                value={formData.premiumAmountFallInDue}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Premium Considered For Deduction"
                variant="outlined"
                fullWidth
                name="premiumConsiderForDeduction"
                value={formData.premiumConsiderForDeduction}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="treatmentForSpecifiedDiseases"
                id="combo-box-demo"
                options={treatmentTypes.map((employeepayType) => employeepayType.type)}
                value={formData?.treatmentForSpecifiedDiseaseses === 1
                  ? 'Yes'
                  : formData.treatmentForSpecifiedDiseases === 0
                  ? 'No'
                  : formData.treatmentForSpecifiedDiseases
            }
                onChange={(event, newValue) =>
                  handleAutocompleteChange('treatmentForSpecifiedDiseases', newValue)
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
              
                <Button className="button" component="label" variant="contained" onClick={attchementHandler} startIcon={<CloudUploadIcon />}>
      Upload file
  
    </Button>
              </Grid>
              <Grid item>
                <Button aclassName="button"  type="submit" 
                 onClick={handleSubmit}
                 >
                  Save 
                </Button>
              
              </Grid>
              <Grid item>
                <Button className="button" onClick={handleCancle}>Cancel</Button>
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
                <Typography style={{fontSize:"0.9rem"}}> Total Premium :{policyData?.length}</Typography>
              </Grid>
            </Grid>
            {/* Add more rows as needed */}
          </Grid>
          </> : null}
        </Grid>
        {/* </form> */}
      </FormProvider>
{policyData?.length > 0 ?
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
              {policyData?.length > 0 &&
                policyData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell style={{ textAlign: 'center'}}>{rowIndex + 1}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.policyNumber ?row.policyNumber : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.dateOfCommencementOfPolicy  ?row.policyNumber : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.employeeName  ?row.employeeName : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.relationship  ?row.relationship : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.insuredPersonName ?row.insuredPersonName : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.treatmentForSpecifiedDiseaseses ?row.treatmentForSpecifiedDiseaseses === "0" ? "N0": "Yes" : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.doesTheInjuredPersonHaveDisability ?row.doesTheInjuredPersonHaveDisability=== "0" ? "N0": "Yes"  : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.sumOfAssured ?row.sumOfAssured : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.premiumAmountForwhichProofAssured ?row.premiumAmountForwhichProofAssured : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>{row.premiumAmountFallInDue ?row.premiumAmountFallInDue : "-"}</TableCell>
                    {/* <TableCell style={{ textAlign: 'center'}}>{row.annualPremium ?row.annualPremium : "-"}</TableCell> */}
                    <TableCell style={{ textAlign: 'center'}}>{row.premiumConsiderForDeduction ?row.premiumConsiderForDeduction : "-"}</TableCell>
                  
                    <TableCell style={{ textAlign: 'center' }}>
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer> :null}
     
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
      </>  }
{   openAttachmentDilog?   <FileUploader showAttachmentDilog = { openAttachmentDilog} closeAttchementDilod = {closeAttchementDilod} handleUploadattchmentFileName ={handleUploadattchmentFileName} handleUploadattchment ={handleLandLordattchment}   previousData={landLordDocs}
          handleDeletedID = {handleLandLordDeletedID}/> : null}



    </div>
  );
}