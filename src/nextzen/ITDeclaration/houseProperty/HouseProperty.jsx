import React, { useState, useEffect, useCallback, useContext } from 'react';
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
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider';
import './houseProperty.css';
import axios from 'axios';
import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AppTopAuthors from 'src/sections/overview/app/app-top-authors';
import { _mock } from 'src/_mock';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingScreen } from 'src/components/loading-screen';
import UserContext from 'src/nextzen/context/user/UserConext';
import {useSnackbar} from '../../../components/snackbar'

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const _appAuthors = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  // avatarUrl: _mock.image.avatar(index),
  totalFavorites: _mock.number.nativeL(index),
}));
const headings = [
  'S.No',
  'Property Reference',
  'Name Of The Owners',
  'Address Of Property',
  'Pan Of Lenders',
  'Loan Amount',
  'Purpose Of Loan',
  'Date Of Sanction Of Loan',
  'Interest Payable',
  'Property Occupied',
  'Share Of Interest',
  'Gross Rental Income',
  'Municipal Taxes Paid',
  'Action',
];

export default function HouseProperty() {

  const {enqueueSnackbar} = useSnackbar()
// const baseUrl ="https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
  // const baseUrl = ' https://2d56hsdn-3001.inc1.devtunnels.ms/erp'
  const {user} = useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''
const payMode = [{ type: 'Yes ' }, { type: 'No' }];
const loanType = [{ type: 'Construction' }, { type: 'Purchase' } , { type: 'Repair/Renewal' }];
const [loading,setLoading] = useState(false);
 

  const [reload, setREload] = useState(false);

 
  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  var [attachedDocumment, setAttachedDocument] = useState([]);
  var [attachedDocummentFileName, setAttachedDocumentFileName] = useState([]);
  const [openAttachmentDilog, setOpenAttchementDilog] = useState(false);
  var [rentFiledsIndex, setRentFieldsIndex] = useState([]);
  var [landLordDocs, setLandLordDocs] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  const [landLordDeletedId, setLandLordDeletedID] = useState([]);
  const [rentDeletedId, setRentDeletedID] = useState([]);
  const [housingData, sethousingData] = useState([]);
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const currentYear = new Date().getFullYear();
  console.log(currentYear, 'current year');
  const startYear = 2022;
  const endYear = 2030;

  //  const financialYears = [];
  //  for (let year = startYear; year <= endYear; year++) {
  //    financialYears.push(`${year}-${year + 1}`);
  //  }
  const [financialYears, setFinancialYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const handleYearChange = (_, value) => {
    setSelectedYear(value);
    localStorage.setItem('selectedYear', JSON.stringify(value));
  };
  const [formData, setFormData] = useState({
    propertyReferenceSlNo: null,
    name_of_the_owners: '',
    addressOfProperty: '',
    panOfTheLanders: '',
    amountOfHousingloanTakenFromTheProperty: '',
    purposeOfLoan: '',
    dateOfSanction: dayjs().format('YYYY-MM-DD'),
    interestPaybleOnYear: '',
    isPropertySelfOccupiedOrLetOu: '',
    ifJointPropertyThenEnterInterestRate: '',
    grossRentalAmount: '',
    municipalTaxesPaid: '',
  });


  const [fieldErrors, setFieldErrors] = useState({
    propertyReferenceSlNo: null,
    name_of_the_owners: '',
    addressOfProperty: '',
    panOfTheLanders: '',
    amountOfHousingloanTakenFromTheProperty: '',
    purposeOfLoan: '',
    dateOfSanction: '',
    interestPaybleOnYear: '',
    isPropertySelfOccupiedOrLetOu: '',
    ifJointPropertyThenEnterInterestRate: '',
    grossRentalAmount: '',
    municipalTaxesPaid: '',
    fileContent: [],
  });
  const validateFormData = () => {
    let isValid = true;
    const newFieldErrors = {};
    
    console.log('Before Validation1:', isValid);

  
 
    // Validation for policyNumber
    if (!formData.propertyReferenceSlNo) {
      newFieldErrors.propertyReferenceSlNo = 'Property Reference Sl No is required';
      isValid = false;
    
    }
   
    // Validation for dateOfCommencementOfPolicy
    if (!formData.name_of_the_owners) {
      newFieldErrors.name_of_the_owners = 'Name Of The Owner is required';
      isValid = false;
     
    }
   
    // Validation for insuredPersonName
    if (!formData.addressOfProperty) {
      newFieldErrors.addressOfProperty = 'Address  is required';
      isValid = false;
    
    }
    ;
    // Validation for sumOfAssured
    if (!formData.amountOfHousingloanTakenFromTheProperty) {
      newFieldErrors.amountOfHousingloanTakenFromTheProperty = 'This Field is required';
      isValid = false;
     
    } else if (isNaN(formData.amountOfHousingloanTakenFromTheProperty)) {
      newFieldErrors.amountOfHousingloanTakenFromTheProperty = 'This Field must be a valid number';
      isValid = false;
      
    }
   
    // Validation for relationship
    if (!formData.interestPaybleOnYear) {
      newFieldErrors.interestPaybleOnYear = 'Interest Payble On Year is required';
      isValid = false;
     
    }
    if (!formData.panOfTheLanders) {
      newFieldErrors.panOfTheLanders = 'Pan Of The Landers is required';
      isValid = false;
     
    }
    if (!formData.purposeOfLoan) {
      newFieldErrors.purposeOfLoan = 'Purpose Of Loan is required';
      isValid = false;
     
    }
    if (!formData.ifJointPropertyThenEnterInterestRate) {
      newFieldErrors.ifJointPropertyThenEnterInterestRate = 'This Field is required';
      isValid = false;
     
    }
    if (!formData.isPropertySelfOccupiedOrLetOu) {
      newFieldErrors.isPropertySelfOccupiedOrLetOu = 'This Field is required';
      isValid = false;
     
    }
    // Validation for premiumAmountForwhichProofAssured
    if (!formData.grossRentalAmount) {
      newFieldErrors.grossRentalAmount = 'This Filed is required';
      isValid = false;
    } else if (isNaN(formData.grossRentalAmount)) {
      newFieldErrors.grossRentalAmount = 'This Field must be a valid number';
      isValid = false;
    }
  
    // Validation for premiumAmountFallInDue
    if (!formData.municipalTaxesPaid) {
      newFieldErrors.municipalTaxesPaid = 'This Filed is required';
      isValid = false;
    } else if (isNaN(formData.municipalTaxesPaid)) {
      newFieldErrors.municipalTaxesPaid = 'This Filed  must be a valid number';
      isValid = false;
    }
  
  
 
    setFieldErrors(newFieldErrors);
  
    return isValid;
  };
  const hasError = (fieldName) => !!fieldErrors[fieldName];

  const getHelperText = (fieldName) => fieldErrors[fieldName] || '';
 
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    // setOpen(false);
  };
  const attchementHandler = () => {
    setOpenAttchementDilog(true);
  };
  const closeAttchementDilod = () => {
    setOpenAttchementDilog(false);
  };
  const handleUploadattchment = (data) => {
    attachedDocumment = data;
    setAttachedDocument(attachedDocumment);
    //  setFormData({ ...formData, [fileContent] :  attachedDocumment});
    setFormData((prevFormData) => ({
      ...prevFormData,
      fileContent: attachedDocumment,
    }));
    console.log(attachedDocumment, data);
  };
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
  const benak = () => {
    console.log('testing ');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
     // Clear the error when the user starts typing
     setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };


  // Send the payload to your API
  // console.log(payload);

  // You can make an axios request here to send the data to your server.
  const getHousePRoterty = async () => {
    setLoading(true)
    const payload = {
      companyId: cmpId,
      employeeId: empId,
      financialYear: selectedYear?.financialYear,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl+'getMedicalInsuranceDetails',
      url: baseUrl + '/getHousingProperty',
// url: "https://2d56hsdn-3001.inc1.devtunnels.ms/erp/getHousingProperty",
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
          sethousingData(rowsData);
          console.log(JSON.stringify(response?.data), 'resultMedical');

          console.log(response);
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
    console.log(result, 'resultsreults');
  };
  const addHousingProperity = useCallback(async () => {
    try {
      const isValid = validateFormData();
console.log(isValid , "isValidisValid")
      if (isValid) {
        setLoading(true)
        console.log(formData.dateOfSanction, 'date ');
        const payload = {
          companyId: cmpId,
          employeeId: empId,
          financialYear: selectedYear?.financialYear,
          nameOfTheOwners: formData.name_of_the_owners,
          propertyReferenceSlNo: parseFloat(formData.propertyReferenceSlNo),
          addressOfProperty: formData.addressOfProperty,
          panOfTheLanders: formData.panOfTheLanders,
          amountOfHousingloanTakenFromTheProperty: parseFloat(
            formData.amountOfHousingloanTakenFromTheProperty
          ),
          purposeOfLoan: formData.purposeOfLoan,
          // dateOfSanctionOfLoan: formData.dateOfSanction,
          dateOfSanctionOfLoan: formData.dateOfSanction,
          interestPaybleOnYear: parseFloat(formData.interestPaybleOnYear),
          isPropertySelfOccupiedOrLetOut: formData.isPropertySelfOccupiedOrLetOu,
          ifJointPropertyThenEnterInterestRate: parseFloat(
            formData.ifJointPropertyThenEnterInterestRate
          ),
          grossRentalAmount: parseFloat(formData.grossRentalAmount),
          muncipalTaxPaid: parseFloat(formData.municipalTaxesPaid),
          documents: landLordDocs,
          oldFields: landLordDeletedId,
        };
    
        console.log(payload, 'payload');
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: baseUrl + '/housingProperty',
          headers: {
            Authorization: token,
            'Content-Type': 'text/plain',
          },
          data: payload,
        };
        axios
          .request(config)
          .then((response) => {
            console.log('success', response, response.data.message);
            if (response.data.code === 201 || 200) {
              enqueueSnackbar(response.data.message,{variant:'success'})
              setLoading(false)
              // setSnackbarSeverity('success');
              // setSnackbarMessage(response.data.message);
              // setSnackbarOpen(true);
    
              setREload(!reload);
              setFormData({
                propertyReferenceSlNo: null,
                name_of_the_owners: '',
                addressOfProperty: '',
                panOfTheLanders: '',
                amountOfHousingloanTakenFromTheProperty: '',
                purposeOfLoan: '',
                dateOfSanction: dayjs().format('YYYY-MM-DD'),
                interestPaybleOnYear: '',
                isPropertySelfOccupiedOrLetOu: '',
                ifJointPropertyThenEnterInterestRate: '',
                grossRentalAmount: '',
                municipalTaxesPaid: '',
              });
              setFieldErrors({
                propertyReferenceSlNo: null,
                name_of_the_owners: '',
                addressOfProperty: '',
                panOfTheLanders: '',
                amountOfHousingloanTakenFromTheProperty: '',
                purposeOfLoan: '',
                dateOfSanction: '',
                interestPaybleOnYear: '',
                isPropertySelfOccupiedOrLetOu: '',
                ifJointPropertyThenEnterInterestRate: '',
                grossRentalAmount: '',
                municipalTaxesPaid: '',
                fileContent: [],
              })
            } else if (response.data.code === 400) {
              enqueueSnackbar(error.response.data.message,{variant:'error'})
              // setSnackbarSeverity('error');
              // setSnackbarMessage(response.data.message);
              // setSnackbarOpen(true);
            }
          })
          .catch((error) => {
            enqueueSnackbar(error.response.data.message,{variant:'error'})
            setLoading(false)
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

    
  }, [formData, landLordDocs]);

  useEffect(() => {
    const fetchData = async () => {
      await getHousePRoterty();
    };
    fetchData();
  }, [reload ,selectedYear?.financialYear]);
  const handleLandLordattchment = (fileData) => {
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
  // handle edit
  const handleEdit = (rowData) => {
    console.log(rowData, 'rowData1234');
    setLandLordDocs(rowData.documents);
    setFormData({
      employeeId: rowData.employeeId,
      companyId: rowData.companyId,
      propertyReferenceSlNo: rowData.propertyReferenceSlNo,
      name_of_the_owners: rowData.nameOfTheOwners,
      addressOfProperty: rowData.addressOfProperty,
      panOfTheLanders: rowData.panOfTheLanders,
      amountOfHousingloanTakenFromTheProperty: rowData.amountOfHousingloanTakenFromTheProperty,
      purposeOfLoan: rowData.purposeOfLoan,
      dateOfSanction: rowData.dateOfSanctionOfLoan,
      interestPaybleOnYear: rowData.interestPaybleOnYear,
      isPropertySelfOccupiedOrLetOu: rowData.isPropertySelfOccupiedOrLetOu,
      ifJointPropertyThenEnterInterestRate: rowData.ifJointPropertyThenEnterInterestRate,
      grossRentalAmount: rowData.grossRentalAmount,
      municipalTaxesPaid: rowData.muncipalTaxPaid,

      // Add other fields as needed
    });

    // Set the attached documents if available
    if (rowData.documents && rowData.documents.length > 0) {
      setLandLordDocs([...rowData.documents]);
    }
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
  const [show , setShow] = useState(false)
  const handleAutocompleteChange = (name, selectedValue) => {
    let mappedValue;

    if (selectedValue === 'Yes') {
      mappedValue = 1;
      if(name == "isPropertySelfOccupiedOrLetOu" ){
        setShow(true)
      }
    } else if (selectedValue === 'No') {
      mappedValue = 0;
      if(name == "isPropertySelfOccupiedOrLetOu" ){
        setShow(false)
      }
    } else {
      mappedValue = selectedValue;
    }

    setFormData({ ...formData, [name]: mappedValue });
  };
  return (
    <div>
  {    loading ? 
  <Card sx={{height:"60vh"}}><LoadingScreen/></Card> :
   <>
      
      <Grid
        container
        spacing={2}
      
        direction="row"
        xs={12}
        lg={12}
        md={12}
      >
        <Grid item xs={12}>
            <Autocomplete
              id="financialYear"
              options={financialYears || []}
          getOptionLabel={(option) => option?.financialYear ?? "There Is No Financial Year Alloted! Please Connect To HR"}
        
              value={selectedYear}
              onChange={handleYearChange}
              style={{marginTop:"0.9rem"}}
              renderInput={(params) => <TextField {...params} 
              label={financialYears && financialYears.length > 0 ? "Please Select Financial Year" : "No Financial Years Available"}/>}
          
            />
          </Grid>
  {selectedYear?.financialYear?
   <>
        <Grid item container xs={12} lg={8} md={8} spacing={2}>
        
          <Grid item container xs={12} lg={12} md={12} spacing={2}>
          
            <Grid item xs={4}>
              {/* <Typography >Property Reference Sl.No(Enter 1,2,3 Etc) </Typography> */}
              <TextField
                label="Property Reference Number "
                name="propertyReferenceSlNo"
                value={formData.propertyReferenceSlNo}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('propertyReferenceSlNo')}
                helperText={getHelperText('propertyReferenceSlNo')}
               
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Typography >Name[S] Of The Owner[S] Of The Property</Typography> */}
              <TextField
                label="Name[S] Of The Owner[S] Of The Property"
                name="name_of_the_owners"
                value={formData.name_of_the_owners}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('name_of_the_owners')}
                helperText={getHelperText('name_of_the_owners')}
               
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Typography >addressOfProperty Of The Property </Typography> */}
              <TextField
                label="Address Of The Property "
                name="addressOfProperty"
                value={formData.addressOfProperty}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('addressOfProperty')}
                helperText={getHelperText('addressOfProperty')}
               
              />
            </Grid>
          </Grid>

          {/* Row 2 */}

          <Grid item container xs={12} lg={12} md={12} spacing={2}>
         
            <Grid item xs={4}>
              {/* <Typography >PAN Of The Lender(S)</Typography> */}
              <TextField
                label="PAN Of The Lender(S)"
                name="panOfTheLanders"
                value={formData.panOfTheLanders}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('panOfTheLanders')}
                helperText={getHelperText('panOfTheLanders')}
               
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Typography >Amount Of Housing loan Taken For The Property</Typography> */}
              <TextField
                label="loan Taken For The Property"
                name="amountOfHousingloanTakenFromTheProperty"
                value={formData.amountOfHousingloanTakenFromTheProperty}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('amountOfHousingloanTakenFromTheProperty')}
                helperText={getHelperText('amountOfHousingloanTakenFromTheProperty')}
               
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Typography >PurPose Of Loan</Typography> */}
              {/* <TextField
                label="Purpose Of Loan"
                name="purposeOfLoan"
                value={formData.purposeOfLoan}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('purposeOfLoan')}
                helperText={getHelperText('purposeOfLoan')}
               
              /> */}

<Autocomplete
                  disablePortal
                  name="purposeOfLoan"
                  id="combo-box-demo"
                  options={loanType.map((employeepayType) => employeepayType.type)}
                  value={formData.purposeOfLoan}
                  onChange={(event, newValue) => handleAutocompleteChange('purposeOfLoan', newValue)}
                  // sx={{ width: 300 }}
              

                  renderInput={(params) => (
                    <>
                      <TextField {...params} label="Purpose Of Loan" />
                      {fieldErrors.purposeOfLoan && (
                        <Typography color="error" variant="caption">
                          {fieldErrors.purposeOfLoan}
                        </Typography>
                      )}
                    </>
                 )}
                />
            </Grid>
          </Grid>

          <Grid item container xs={12} lg={12} md={12} spacing={2}>
         
            <Grid item xs={4} style={{ paddingTop: '9px' }}>
              {/* <Typography >Date Of Sanction Of Loan</Typography> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Date Of Sanction Of Loan"
                    value={dayjs(formData.dateOfSanction, { format: 'YYYY-MM-DD' })} // Use the appropriate form data field
                    // defaultValue={dayjs(new Date())}

                    onChange={(newValue) => {
                      console.log(newValue);
                      const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        dateOfSanction: formattedDate,
                      }));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              {/* <Typography >Intrest Payable On Housing Loan For The Year</Typography> */}
              <TextField
                label="Interest on Housing Loan/Year"
                name="interestPaybleOnYear"
                value={formData.interestPaybleOnYear}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('interestPaybleOnYear')}
                helperText={getHelperText('interestPaybleOnYear')}
               
              />
            </Grid>
            <Grid item xs={4}>
            
                <Autocomplete
                  disablePortal
                  name="isPropertySelfOccupiedOrLetOu"
                  id="combo-box-demo"
                  options={payMode.map((employeepayType) => employeepayType.type)}
                  value={formData.isPropertySelfOccupiedOrLetOu}
                  onChange={(event, newValue) => handleAutocompleteChange('isPropertySelfOccupiedOrLetOu', newValue)}
                  // sx={{ width: 300 }}
              

                  renderInput={(params) => (
                    <>
                      <TextField {...params} label="Self Occupied Property" />
                      {fieldErrors.isPropertySelfOccupiedOrLetOu && (
                        <Typography color="error" variant="caption">
                          {fieldErrors.isPropertySelfOccupiedOrLetOu}
                        </Typography>
                      )}
                    </>
                 )}
                />
            </Grid>
          </Grid>

          <Grid item container xs={12} lg={12} md={12} spacing={2}>

            { console.log(show ,"fieldErrors.isPropertySelfOccupiedOrLetOu " ,show)}
        {  show ? null :
            <Grid item xs={4}>
              {/* <Typography >IF Joint Property, Then Enter The Share Of Intrest[%] </Typography> */}
              <TextField
                label="IF Joint Property,Enter Share[%]"
                name="ifJointPropertyThenEnterInterestRate"
                value={formData.ifJointPropertyThenEnterInterestRate}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('ifJointPropertyThenEnterInterestRate')}
                helperText={getHelperText('ifJointPropertyThenEnterInterestRate')}
               
              />
            </Grid>}
            <Grid item xs={4}>
              {/* <Typography >Gross Rental Income</Typography> */}
              <TextField
                label="Gross Rental Income"
                name="grossRentalAmount"
                value={formData.grossRentalAmount}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('grossRentalAmount')}
                helperText={getHelperText('grossRentalAmount')}
               
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Typography >Less : MUnicipal Taxes Paid :</Typography> */}
              <TextField
                label="Less : Municipal Taxes Paid"
                name="municipalTaxesPaid"
                value={formData.municipalTaxesPaid}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={hasError('municipalTaxesPaid')}
                helperText={getHelperText('municipalTaxesPaid')}
               
              />
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={12} md={12} spacing={2}>
         
        </Grid> */}
        </Grid>
        <Grid
          item
          container
          xs={12}
          lg={4}
          md={4}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
          style={{ marginBottom: '1rem' }}
        >
          <Paper elevation={3} style={{ marginTop: '1rem' }}>
            <Paper
              elevation={0}
              style={{
                padding: '10px',
                backgroundColor: '#F4F6F8',
                color: '#637381',
                border: 'none',
              }}
            >
              <Typography>Housing Property Calculation</Typography>
            </Paper>
            <Paper elevation={0} style={{ border: 'none' }}>
              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                Gross Rental Income
              </Typography>
              <Divider style={{ backgroundColor: '#F4F6F8' }} />

              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                Less : Municipal Taxes Paid
              </Typography>
              <Divider style={{ backgroundColor: '#F4F6F8' }} />

              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>Balance</Typography>
              <Divider style={{ backgroundColor: '#F4F6F8' }} />

              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                Less : Standard Deduction 30%
              </Typography>
              <Divider style={{ backgroundColor: '#F4F6F8' }} />

              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                Less : Intest On Housing Loan
              </Typography>
              <Divider style={{ backgroundColor: '#F4F6F8' }} />

              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                Net Income(loss) From House Property
              </Typography>
            </Paper>
          </Paper>
        </Grid>

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
              {/* <Button className="button" onClick={() => setOpenAttchementDilog(true)}>
                Attachment 
              </Button> */}

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
            <Grid item>
              <Button className="button" onClick={addHousingProperity}>
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
              <Typography> Total Property :{housingData?.length} </Typography>
            </Grid>
          </Grid>
          {/* Add more rows as needed */}
        </Grid>
        </> 
        : null}
      </Grid>
      {housingData?.length > 0 ? (
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
              {housingData?.length > 0 &&
                housingData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell style={{ textAlign: 'center' }}>{rowIndex + 1}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.propertyReferenceSlNo ? row.propertyReferenceSlNo : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.nameOfTheOwners ? row.nameOfTheOwners : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.addressOfProperty ? row.addressOfProperty : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.panOfTheLanders ? row.panOfTheLanders : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.amountOfHousingloanTakenFromTheProperty
                        ? row.amountOfHousingloanTakenFromTheProperty
                        : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.purposeOfLoan ? row.purposeOfLoan : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.dateOfSanctionOfLoan ? row.dateOfSanctionOfLoan : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.interestPaybleOnYear ? row.interestPaybleOnYear : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.isPropertySelfOccupiedOrLetOu ? row.isPropertySelfOccupiedOrLetOu : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.ifJointPropertyThenEnterInterestRate
                        ? row.ifJointPropertyThenEnterInterestRate
                        : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.grossRentalAmount ? row.grossRentalAmount : '-'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.muncipalTaxPaid ? row.muncipalTaxPaid : '-'}
                    </TableCell>{' '}
                    <TableCell style={{ textAlign: 'center' }}>
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      {openAttachmentDilog ? (
        <FileUploader
          showAttachmentDilog={openAttachmentDilog}
          closeAttchementDilod={closeAttchementDilod}
          handleUploadattchmentFileName={handleUploadattchmentFileName}
          handleUploadattchment={handleLandLordattchment}
          previousData={landLordDocs}
          handleDeletedID={handleLandLordDeletedID}
        />
      ) : null}
      </>}
    </div>
  );
}
