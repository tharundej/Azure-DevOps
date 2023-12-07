
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
  Card, IconButton,
  Menu,
  MenuItem,
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
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
const empName =(user?.employeeName)?user?.employeeName:''
console.log(user , "userDetails")
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
  const [formData, setFormData] = useState({
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
  });
  const [fieldErrors, setFieldErrors] = useState({
    companyId: cmpId,
    companyName: '',
    employeeId: empId,
    employeeName: empName,
    financialYear:  selectedYear?.financialYear,
    policyNumber: '',
    dateOfCommencementOfPolicy:'',
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
  const validateFormData = () => {
    let isValid = true;
    const newFieldErrors = {};
    console.log('Before Validation:', formData.doesTheInjuredPersonHaveDisability);
    console.log('Before Validation1:', isValid);

  
 
    // Validation for policyNumber
    if (!formData.policyNumber) {
      newFieldErrors.policyNumber = 'Policy Number is required';
      isValid = false;
    
    }
   
    // Validation for dateOfCommencementOfPolicy
    if (!formData.dateOfCommencementOfPolicy) {
      newFieldErrors.dateOfCommencementOfPolicy = 'Date of Commencement of Policy is required';
      isValid = false;
     
    }
   
    // Validation for insuredPersonName
    if (!formData.insuredPersonName) {
      newFieldErrors.insuredPersonName = 'Insured Person Name is required';
      isValid = false;
    
    }
    ;
    // Validation for sumOfAssured
    if (!formData.sumOfAssured) {
      newFieldErrors.sumOfAssured = 'Sum of Assured is required';
      isValid = false;
     
    } else if (isNaN(formData.sumOfAssured)) {
      newFieldErrors.sumOfAssured = 'Sum of Assured must be a valid number';
      isValid = false;
      
    }
   
    // Validation for relationship
    if (!formData.relationship) {
      newFieldErrors.relationship = 'Relationship is required';
      isValid = false;
     
    }
  
    // Validation for premiumAmountForwhichProofAssured
    if (!formData.premiumAmountForwhichProofAssured) {
      newFieldErrors.premiumAmountForwhichProofAssured = 'Premium Amount for which Proof Attached Now is required';
      isValid = false;
    } else if (isNaN(formData.premiumAmountForwhichProofAssured)) {
      newFieldErrors.premiumAmountForwhichProofAssured = 'Premium Amount for which Proof Attached Now must be a valid number';
      isValid = false;
    }
  
    // Validation for premiumAmountFallInDue
    if (!formData.premiumAmountFallInDue) {
      newFieldErrors.premiumAmountFallInDue = 'Premium Amount Fall in Due is required';
      isValid = false;
    } else if (isNaN(formData.premiumAmountFallInDue)) {
      newFieldErrors.premiumAmountFallInDue = 'Premium Amount Fall in Due must be a valid number';
      isValid = false;
    }
  
    console.log('Before Validation133:', isValid);
    // Validation for premiumConsiderForDeduction
    if (!formData.premiumConsiderForDeduction) {
      newFieldErrors.premiumConsiderForDeduction = 'Premium Considered for Deduction is required';
      isValid = false;
    } else if (isNaN(formData.premiumConsiderForDeduction)) {
      newFieldErrors.premiumConsiderForDeduction = 'Premium Considered for Deduction must be a valid number';
      isValid = false;
    }
   // Validation for treatmentForSpecifiedDiseases
if (formData.treatmentForSpecifiedDiseases !== "Yes" && formData.treatmentForSpecifiedDiseases !== "No") {
  newFieldErrors.treatmentForSpecifiedDiseases = 'Please select a valid value for Treatment for Specified Diseases';
  isValid = false;
}
// Validation for doesTheInjuredPersonHaveDisability

console.log(formData.doesTheInjuredPersonHaveDisability ,"formData.doesTheInjuredPersonHaveDisability")
if (formData.doesTheInjuredPersonHaveDisability !== "Yes" && formData.doesTheInjuredPersonHaveDisability !== "No") {
  newFieldErrors.doesTheInjuredPersonHaveDisability = 'Please select a valid value for Does The Injured Person Have Disability';
  isValid = false;
}
    setFieldErrors(newFieldErrors);
  
    return isValid;
  };
  const hasError = (fieldName) => !!fieldErrors[fieldName];

  const getHelperText = (fieldName) => fieldErrors[fieldName] || '';
 
  var [attachedDocumment ,setAttachedDocument] = useState([])
var [attachedDocummentFileName ,setAttachedDocumentFileName] = useState([])
  const [openAttachmentDilog , setOpenAttchementDilog] = useState(false)

  // states to handle file Uploader component 
  var [landLordDocs, setLandLordDocs] = useState([]);
  const [landLordDeletedId, setLandLordDeletedID] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  var [fileName , setFileName] = useState([])
  var [fileContent, setFileContent] = useState([])
 

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const currentYear = new Date().getFullYear();
   console.log(currentYear ,"current year")
   const startYear = 2022;
   const endYear = 2030;
 
  
   const [financialYears, setFinancialYears] = useState([]);
   const handleYearChange = (_, value) => {
    setSelectedYear(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      financialYear: value?.financialYear,
    }));
    localStorage.setItem('selectedYear', JSON.stringify(value));
  };


  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
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
     // Clear the error when the user starts typing
     setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    
  };

  const handleAutocompleteChange = (name, selectedValue) => {
   

    setFormData({ ...formData, [name]: selectedValue });
     // Clear the error when the user starts typing
     setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    console.log('selected value ',name ,   selectedValue);
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
    try {
      const isValid = validateFormData();
console.log(isValid , "isValidisValid")
      if (isValid) {
        const payload = {
          licPremiumID: formData.licPremiumID,
          companyId: formData.companyId,
          companyName:formData.companyName,
          employeeID: formData.employeeId,
          employeeName: formData.employeeName,
          financialYear: formData.financialYear,
                    policyNumber: formData.policyNumber,
                    dateOfCommencementOfPolicy: formData.dateOfCommencementOfPolicy,
                    insuredPersonName: formData.insuredPersonName,
                    sumOfAssured:parseFloat (formData.sumOfAssured),
                    relationship: formData.relationship,
                    premiumAmountForWhichProofAttachedNow: parseFloat(formData.premiumAmountForwhichProofAssured),
                    premiumAmountFallInDue:parseFloat (formData.premiumAmountFallInDue),
                    premiumConsiderForDeduction: parseFloat(formData.premiumConsiderForDeduction),
                    treatmentForSpecifiedDiseas: parseInt(formData.treatmentForSpecifiedDiseases),
                    doesTheInjuredPersonHaveDisability: formData.doesTheInjuredPersonHaveDisability,
                    fileName: fileName,
                    fileContent: fileContent,
            
        
      };
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
          data: payload,
        };
    
        
    console.log(formData ,"datainformsave")
        console.log(formData)
        const result = await axios
          .request(config)
          .then((response) => {
           console.log(response ,"responseresponse")
              if (response.data.status === 200) {
                enqueueSnackbar(response.data.message,{variant:'success'})
                setLoading(false)
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
                setFieldErrors({
                  companyId: cmpId,
    companyName: '',
    employeeId: empId,
    employeeName: '',
    financialYear:  selectedYear?.financialYear,
    policyNumber: '',
    dateOfCommencementOfPolicy:'',
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
                getLicPremium()
              }else    if (response.data.code === 400) {
                enqueueSnackbar(response.data.message,{variant:'error'})
                setLoading(false)
    
              }
            }
          )
          .catch((error) => {
            enqueueSnackbar("Something Went Wrong!",{variant:'error'})
            setLoading(false)
     
            console.log(error);
          })
      
      } else {
        console.log('Form is invalid');
      }
    } catch (error) {
      enqueueSnackbar("Something Went Wrong!",{variant:'error'})
            setLoading(false)
     
            console.log(error);
    }
  };

  const editcDetails = async () => {
    try {
      const isValid = validateFormData();
console.log(isValid , "isValidisValid")
      if (isValid) {
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
                      treatmentForSpecifiedDiseases: parseInt(formData.treatmentForSpecifiedDiseases),
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
              
                setFieldErrors({
                  companyId: cmpId,
    companyName: '',
    employeeId: empId,
    employeeName: '',
    financialYear:  selectedYear?.financialYear,
    policyNumber: '',
    dateOfCommencementOfPolicy:'',
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
                setIsEdit(false)
                getLicPremium()
              }
              else if(response.data.status === 400){
                enqueueSnackbar(response.data.message,{variant:'error'})
                setLoading(false)
                console.log('success',response);
                
              }
             
              
            }
          )
          .catch((error) => {
            enqueueSnackbar(response.data.message,{variant:'success'})
            setLoading(false)
            setOpen(true);
            console.log(error);
          });
      
      } else {
        console.log('Form is invalid');
      }
    } catch (error) {
      enqueueSnackbar("Something Went Wrong!",{variant:'error'})
            setLoading(false)
     
            console.log(error);
    }

  
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
 
    });

  };

  const handleSubmit10= ()=>{
    console.log(isEdit ,"isEditisEdit")
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


  return (
    <div>
     {loading ? 
  <Card sx={{height:"60vh"}}><LoadingScreen/></Card> :
  <>   
   <FormProvider 
 
   >

 
        <Grid container spacing={2} >
  
        <Grid  item xs={12}>
            
            <Autocomplete
              id="financialYear"
              options={financialYears || []}
              getOptionLabel={(option) => option?.financialYear ?? "There Is No Financial Year Alloted! Please Connect To HR"}
            
              value={selectedYear}
              onChange={handleYearChange}
              renderInput={(params) => <TextField {...params}
              label={financialYears && financialYears.length > 0 ? "Please Select Financial Year" : "No Financial Years Available"}/>}
          
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
                error={hasError('policyNumber')}
                helperText={getHelperText('policyNumber')}
               
              />
          
             
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
              {hasError('dateOfCommencementOfPolicy') && (
  <Typography color="error" variant="caption">
    {getFieldError('dateOfCommencementOfPolicy')}
  </Typography>
)}
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
                error={hasError('insuredPersonName')}
  helperText={getHelperText('insuredPersonName')}
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
                value={formData.sumOfAssured}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleChange}
                error={hasError('sumOfAssured')}
  helperText={getHelperText('sumOfAssured')}
              />
               {/* <span>{errors.sumOfAssured?.message}</span> */}
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
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="Relationship" />
                    {fieldErrors.relationship && (
                      <Typography color="error" variant="caption">
                        {fieldErrors.relationship}
                      </Typography>
                    )}
                  </>
                )}
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
                error={hasError('premiumAmountForwhichProofAssured')}
                helperText={getHelperText('premiumAmountForwhichProofAssured')}
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
                error={hasError('premiumAmountFallInDue')}
                helperText={getHelperText('premiumAmountFallInDue')}
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
                error={hasError('premiumConsiderForDeduction')}
                helperText={getHelperText('premiumConsiderForDeduction')}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="treatmentForSpecifiedDiseases"
                id="combo-box-demo"
                options={treatmentTypes.map((employeepayType) => employeepayType.type)}
                value={formData?.treatmentForSpecifiedDiseases 
                 
            }
            onChange={(event, newValue) => {
              // Convert the value to a number before updating the state
             
          
              handleAutocompleteChange('treatmentForSpecifiedDiseases', newValue);
            }}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="Treatment For Specific Disease Under 80DDB" />
                    {fieldErrors.treatmentForSpecifiedDiseases && (
                      <Typography color="error" variant="caption">
                        {fieldErrors.treatmentForSpecifiedDiseases}
                      </Typography>
                    )}
                  </>
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
                value={formData?.doesTheInjuredPersonHaveDisability 
            }
            onChange={(event, newValue) => {
              // Convert the value to a number before updating the state
              
          
              handleAutocompleteChange('doesTheInjuredPersonHaveDisability', newValue);
            }}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="Does The Injured Person Have Disability under 80U" />
                    {fieldErrors.doesTheInjuredPersonHaveDisability && (
                      <Typography color="error" variant="caption">
                        {fieldErrors.doesTheInjuredPersonHaveDisability}
                      </Typography>
                    )}
                  </>
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
                <Button className="button"  
                // type="submit"
                  onClick={handleSubmit10}
                // onClick={handleSubmit((event)=>onSubmit(event))}
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
              <TableCell style={{ textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }}>
  <IconButton onClick={(event) => handleClick(event, row)}>
    <MoreVertIcon />
  </IconButton>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl && selectedRow === row)}
    onClose={handleClose}
  >
    <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
    {/* Add more options if needed */}
  </Menu>
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