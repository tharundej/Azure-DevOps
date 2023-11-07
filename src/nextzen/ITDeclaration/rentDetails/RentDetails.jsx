
import React, { useState ,useEffect} from 'react';
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
    Grid,Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Radio,
    RadioGroup,
    Typography,
    FormControlLabel,
    Autocomplete,
  } from '@mui/material';
  import InputAdornment from '@mui/material/InputAdornment';
  import { Icon } from '@iconify/react';
  import Snackbar from '@mui/material/Snackbar';
  import Iconify from 'src/components/iconify/iconify'
 import '../declarationDetails/DeclarationDetails.css';
 import MuiAlert from '@mui/material/Alert';
 import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function RentDetails() {

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
    { month: 'March', city_type: '', rentAmount: '', submittedAmount: '' },
    // Add more months as needed
  ]);
var [landLardName , setLandLardName] = useState("")
var [landLardAddress , setLandLardAddress] = useState("")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedValue, setSelectedValue] = useState('');
var [isShowPannumber , setIsShowPanNumber] = useState(false)
const [isPanValueThere  , setIsPanValueThere] = useState('')
const [isPanValueNumber  , setIsPanValueNumber] = useState('')
const [declarationSelectedValue ,setSeclarationSelectedValue]= useState('')
 var [isShowDeclaration , setIsShowDeclaration] = useState(false)
 const [isShowUpload , setIsShowUpload] = useState(false)
 const [open, setOpen] = useState(true);
 var [panNumbers, setPanNumbers] = useState(['', '', '']); // Initialize with three empty strings
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
const [rentDetailsData , setRendDetailsData] = useState([])
const [openAttachmentDilog , setOpenAttchementDilog] = useState(false)
  const handlePanNumberChange = (index) => (event) => {
    const newPanNumbers = [...panNumbers];
    newPanNumbers[index] = event.target.value;
    setPanNumbers(newPanNumbers);
  };
  const [openAttachmentDilogForLandLoard , setOpenAttchementDilogForLandLoard] = useState(false)
var [attachedDocumment ,setAttachedDocument] = useState([])
var [attachedDocummentFileName ,setAttachedDocumentFileName] = useState([])
var [landlord_file_content ,setLandlord_file_content] = useState([])
var [landlord_file_name ,setLandlord_file_name] = useState([])
const handleUploadattchment =(data)=>{
   attachedDocumment = data
  setAttachedDocument(attachedDocumment)
  console.log(attachedDocumment ,data)
}
const handleUploadattchmentFileName =(data)=>{
  attachedDocummentFileName = data
  setAttachedDocumentFileName(attachedDocummentFileName)
  console.log(attachedDocummentFileName ,data)
  setOpenAttchementDilog(false)
}

const handleUploadattchmentForlandlord =(data)=>{
  landlord_file_content = data
  setLandlord_file_content(landlord_file_content)
 console.log(landlord_file_content ,data)
}
const handleUploadattchmentFileNameForLandloard =(data)=>{
  landlord_file_name = data
  setLandlord_file_name(landlord_file_name)
  console.log(landlord_file_name ,data)
  setOpenAttchementDilogForLandLoard(false)
}
  const handleChange = (event) => {
   
    setSelectedValue(event.target.value);
    if(event.target.value === "Yes"){
      setIsShowPanNumber(true)
      setIsPanValueThere("Yes")
      setIsShowDeclaration(false)
    }else if(event.target.value === "No"){
      setIsPanValueThere("No")
      setIsShowPanNumber(false)
      setIsShowDeclaration(true)
    }
    console.log(event.target.value)
  };

  const handleChangeDeclaration = (event) =>{
    setSeclarationSelectedValue(event.target.value)
    if(event.target.value === "Yes"){
      setIsShowUpload(true)
    }else if(event.target.value === "No"){
      setIsShowUpload(false)
    }

  }

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
    console.log(newData)
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
   
 const handleLandloardNameChange = (e) =>{
  setLandLardName(e.target.value)
 }

 const handleLandloardAddressChange = (e) =>{
  setLandLardAddress(e.target.value)
 }
 
 const handlePanShowMethod = (event) =>{

 }
 const snackBarAlertHandleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
setSnackbarOpen(false)
  setOpen(false);
};


 const saveRentDetails = async () => {
 const payload = 
  {
    "company_id": "comp1",
    "employee_id": "info5",
    "financial_year": "2023-03-01",
    "name_of_landlord": landLardName,
    "address_of_landlord": landLardAddress,
    "data": data ,
    "pan_of_the_landlord": isPanValueThere,
    "pan_number": panNumbers,
    "declaration_received_from_landlord": false,
    "file_name": attachedDocummentFileName,
    "file_content" :attachedDocumment,
    "landlord_file_name" :landlord_file_name,
    "landlord_file_content" : landlord_file_content
  }
  

  const config = {
 method: 'post',
    maxBodyLength: Infinity,
    url: baseUrl + 'addRentDeclarationDetails ',
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo',
      'Content-Type': 'text/plain',
    },
    data: payload,
  };
  const result = await axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Rent details saved successfully!');
        setSnackbarOpen(true);
        console.log("success")
      }

    })
    .catch((error) => {
     
      setOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error saving rent details. Please try again.');
      setSnackbarOpen(true);
      console.log(error);
});
//  console.log(result, 'resultsreults');

};



const editRentDetails = async () => {
  const payload = 
   {
     "company_id": rentDetailsData?.companyId,
     "employee_id": rentDetailsData?.employeeId,
     "financial_year": rentDetailsData?.financialYear,
     "name_of_landlord": rentDetailsData?.nameOfLandlord,
     "address_of_landlord": rentDetailsData?.addressOfLandlord,
     "data": data ,
     "pan_of_the_landlord": rentDetailsData?.panOfTheLandlord,
     "declarationReceivedFromLandlord": rentDetailsData?.declarationReceivedFromLandlord, 
     "pan_number": rentDetailsData?.companyId,
     "declaration_received_from_landlord": rentDetailsData?.companyId,
     
     "file_content" :attachedDocumment ?attachedDocumment : rentDetailsData?.rentDocs,
   
   "landlord_file_content" :landlord_file_content? landlord_file_content : rentDetailsData?.landLordDocs
   }
   
 
   const config = {
  method: 'post',
     maxBodyLength: Infinity,
     url: baseUrl + 'updateRentDeclarationDetails ',
     headers: {
       Authorization:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo',
       'Content-Type': 'text/plain',
     },
     data: payload,
   };
   const result = await axios
     .request(config)
     .then((response) => {
       if (response.status === 200) {
         // const rowsData = response?.data?.data?.rows;
         // console.log(JSON.stringify(response.data));
         // setData(rowsData);
         setOpen(true);
         <Snackbar open={open} autoHideDuration={6000} />
         console.log("success")
       }
 
     })
     .catch((error) => {
      setOpen(true);
      <Snackbar open={open} autoHideDuration={6000} onClose={snackBarAlertHandleClose}>
      <Alert onClose={snackBarAlertHandleClose} severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
       console.log(error  ,"hello" ,open);
 });
 //  console.log(result, 'resultsreults');
 
 };

 const getRentDetails = async () => {
  const payload = { "employeeID" : "ibm2" };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    // url: baseUrl +'getSingleLicPremium',
    url : baseUrl + "getRentDeclarationDetails",
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
        setRendDetailsData(rowsData);
        setLandLardName(response?.data?.data?.nameOfLandlord)
        setLandLardAddress(response?.data?.data?.addressOfLandlord)
        setIsShowDeclaration(response?.data?.data?.declarationReceivedFromLandlord) 
        setIsShowPanNumber(response?.data?.data?.panOfTheLandlord) 
        response?.data?.data?.panOfTheLandlord ? setSelectedValue(response?.data?.data?.panOfTheLandlord)  : null
        setPanNumbers( response?.data?.data?.pan_number) 

        console.log(landLardName , landLardAddress ,isShowDeclaration ,isShowPannumber ,panNumbers  )

        setData(prevData => {
          return prevData.map(existingMonth => {
            const matchingMonth = rowsData?.data?.find(apiMonth => apiMonth.month === existingMonth.month);
      
            if (matchingMonth) {
              // If the month exists in the API response, update the data
              return {
                ...existingMonth,
                city_type: matchingMonth.cityType,
                rentAmount: matchingMonth.rentAmount,
                submittedAmount: matchingMonth.submittedAmount
              };
            }
      
            // If the month doesn't exist in the API response, keep the existing data
            return existingMonth;
          });
        });
        console.log(JSON.stringify(response?.data?.data), 'result');

        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  //  console.log(result, 'resultsreults');
};
console.log(rentDetailsData , "rentDetailsDatarentDetailsData")
const attchementHandler = () =>{
  setOpenAttchementDilog(true)
}
const landloardDeclarationAttachment = () =>{
  setOpenAttchementDilogForLandLoard(true)
}
const closeAttchementDilod = () =>{
  setOpenAttchementDilog(false)
}
const closeLandLordAttchementDilod = () =>{
  setOpenAttchementDilogForLandLoard(false)
}
 console.log(data, 'resultsreults');
useEffect(() => {
  const fetchData = async () => {
    getRentDetails();
  };
  fetchData();
  react-hooks/exhaustive-deps
}, []);



    
  console.log(data ,"datadatadata")
    return (
        <div>
          {/* <Grid container spacing={2} alignItems="center"  justifyContent="flex-end" direction="row"style={{marginBottom:"1rem"}}>
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
        <Grid item container xs={12} spacing={2} style={{marginBottom:"0.9rem" ,marginTop:"0.9rem"}}>
        <Grid item xs={6}>
      
          <TextField label="Name Of The Landloard " value={landLardName} variant="outlined" fullWidth  onChange={handleLandloardNameChange}/>
        </Grid>
       
        <Grid item xs={6}>
         
          <TextField label="Address Of The Landloard" value={landLardAddress} variant="outlined" fullWidth  onChange={handleLandloardAddressChange}/>
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
          renderInput={(params) => (
            <TextField {...params} label="Select" />
          )}
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
         <Grid container spacing={2}
          // alignItems="center" 
          direction="row" style={{ marginBottom: "1rem" }}>
      <Grid item container xs={4} spacing={2} 
      alignItems="center"
       justifyContent="space-evenly" direction="row" style={{ marginBottom: "1rem", height: "60px" }}>
        <Grid item><Button className="button" onClick={attchementHandler}>Attachment</Button></Grid> 
        <Grid item alignItems="center">
          <Button className="button" onClick={rentDetailsData? editRentDetails  : saveRentDetails}>Save</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} xs={8} alignItems="center" justifyContent="flex-end" direction="column" style={{ marginBottom: "1rem" }}>
        {/* Text and Radio Buttons in a single line */}
        <Grid item container direction="row" alignItems="center">
          <Typography component="span" marginLeft='10px' style={{color: '#7D7878', fontSize: '0.9rem'}}>
            Whether PAN Of The Landlord Available  &nbsp;: &nbsp;
          </Typography>
          <RadioGroup
            aria-label="options"
            name="options"
            value={selectedValue}
            onChange={handleChange}
            row // align radio buttons horizontally
          >
            <FormControlLabel
              value="Yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="No"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </Grid>

        {isShowPannumber ?
          <Grid item container direction="column" alignItems="center" spacing={2}>
                {panNumbers &&  panNumbers?.map((value, index) => (
      <TextField
        key={index}
        label={`If Yes PAN ${index + 1} Number`}
        variant="outlined"
        onChange={handlePanNumberChange(index)}
        value={value}
        style={{ marginBottom: "10px" }}
      />
    ))}
           
          </Grid>
          : null}
        {isShowDeclaration ?
         <> <Grid item container direction="row" alignItems="center">
            <Typography component="span" marginLeft='10px'style={{color: '#7D7878',  fontSize: '0.9rem'}}>
              If No, Whether Whether Declaration Received From Landlord  &nbsp;: &nbsp;
            </Typography>
            <RadioGroup
              aria-label="options"
              name="options"
              value={declarationSelectedValue}
              onChange={handleChangeDeclaration}
              row // align radio buttons horizontally
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
           {isShowUpload ? <Grid item><Button className="button" onClick={landloardDeclarationAttachment}>Declaration Attachment</Button></Grid> : null}</>
          : null}

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
        <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

{   openAttachmentDilog?   <FileUploader showAttachmentDilog = { openAttachmentDilog} closeAttchementDilod = {closeAttchementDilod} handleUploadattchmentFileName ={handleUploadattchmentFileName} handleUploadattchment ={handleUploadattchment} /> : null}
{   openAttachmentDilogForLandLoard?   <FileUploader showAttachmentDilog = { openAttachmentDilogForLandLoard} closeAttchementDilod = {closeLandLordAttchementDilod} handleUploadattchmentFileName ={handleUploadattchmentFileNameForLandloard} handleUploadattchment ={handleUploadattchmentForlandlord} previousData= {rentDetailsData?.landLordDocs}/> : null}

        </div>
      );
}

