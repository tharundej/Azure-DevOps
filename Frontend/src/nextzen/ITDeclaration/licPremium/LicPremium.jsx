
import React ,{useEffect, useState} from 'react';
import { Grid, Typography, TextField,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFTextField,RHFAutocomplete  } from 'src/components/hook-form';
import dayjs from 'dayjs';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar'
import '../declarationDetails/DeclarationDetails.css';
import MuiAlert from '@mui/material/Alert';
import './LicPReimum.css'


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const headings = [
  'S.No',
  'Policy Number',
  'Commencement Date',
  "Name",
  'Ralationship',
  "Insured Person name ",
 " Under 80U",
 "Under 80DDB",
  'Sum Assured',
  'Premium Amount For Which Proofs Attached Now',
  'Premium Amout Fall In Due',
  'Annual Premium',
  'Premium Considered For Deduction',
  'Action'
];
const demo =  {
  "licPremiumId": 124603,
  "companyId": "COMP2",
  "employeeId": "ibm1",
  "employeeName": "naveen",
  "financialYear": "2022-03-02",
  "policyNumber": "",
  "dateOfCommencementOfPolicy": "2022-02-10",
  "insuredPersonName": "abc",
  "sumOfAssured": 0.7,
  "relationship": "mother",
  "premiumAmountForWhichProofAttachedNow": 0.8,
  "premiumAmountFallInDue": 0.9,
  "premiumConsiderForDeduction": 0.6,
  "treatmentForSpecifiedDiseas": "covid1",
  "doesTheInjuredPersonhavedisability": "no"
}


export default function LicPremium() {
  const [policyData , setPolicyData] = useState([])
  const payscheduleTypes = [{ type: 'Parents' }, { type: 'self spouse and child' }];
  const treatmentTypes = [{ type: 'No' }, { type: 'Yes' }];
  const pinjuredPersonDisability = [{ type: 'NA' }, { type: 'No' } , {type:"Yes"}];
const [isreloading , setISReloading] = useState(false)
    // State for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
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

  const [formData, setFormData] = useState({
    "companyId":"COMP3",
    "companyName":"wipro",
    "employeeId":"wipr1",
    "employeeName":"nithya1",
    "financialYear":"2027-08-07",
    "policyNumber":"abcdefghi",
    "dateOfCommencementOfPolicy":"2021-01-11",
    "insuredPersonName":"kkk",
    "sumOfAssured":0.7,
    "relationship":"mother",
    "premiumAmountForWhichProofAttachedNow":0.8,
    "premiumAmountFallInDue":0.9,
    "premiumConsiderForDeduction":0.6,
    "treatmentForSpecifiedDiseas":"covid",
    "doesTheInjuredPersonHaveDisability":"no",
     "fileName" : [],
    "fileContent" :[]
   
           })

  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  const benak =()=>{
    console.log("testing ")
  }
  const methods = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleAutocompleteChange = (name, selectedValue) => {
    setFormData({ ...formData, [name]: selectedValue });
  };
console.log(formData ,"formdata")

const getLicPremium = async () => {
  
  const payload = 
  {"companyId":"COMP3",
    "employeeId":"wipr1"

   }
 
 
   const config = {
  method: 'post',
     maxBodyLength: Infinity,
     url: 'https://s1sjhlgs-3001.inc1.devtunnels.ms/erp/getSingleLicPremium',
     headers: {
       Authorization:
         ' ',
       'Content-Type': 'text/plain',
     },
     data: payload,
   };
   const result = await axios
     .request(config)
     .then((response) => {
       if (response.status === 200) {
        const rowsData = response?.data?.data;
        setPolicyData(rowsData)
        console.log(JSON.stringify(response?.data?.data) ,"result");

        console.log(response)
       }
 
     })
     .catch((error) => {
      
  console.log(error)
 });
 //  console.log(result, 'resultsreults');

 };

 const saveLicDetals = async () => {
  const payload ={
    "companyId":"COMP3",
    "companyName":"wipro",
    "employeeId":"wipr1",
    "employeeName":"nithya1",
    "financialYear":"2027-08-07",
    "policyNumber":"abcdefghi",
    "dateOfCommencementOfPolicy":"2021-01-11",
    "insuredPersonName":"kkk",
    "sumOfAssured":0.7,
    "relationship":"mother",
    "premiumAmountForWhichProofAttachedNow":0.8,
    "premiumAmountFallInDue":0.9,
    "premiumConsiderForDeduction":0.6,
    "treatmentForSpecifiedDiseas":"covid",
    "doesTheInjuredPersonHaveDisability":"no",
     "fileName" : [],

 

  "fileContent" :[]

  }

   
 
   const config = {
  method: 'post',
     maxBodyLength: Infinity,
     url: 'https://s1sjhlgs-3001.inc1.devtunnels.ms/erp/addLicPremium',
     headers: {
       Authorization:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo',
       'Content-Type': 'text/plain',
     },
     data: formData,
   };
   const result = await axios
     .request(config)
     .then((response) => {
       if (response.status === 200) {
        setISReloading(!isreloading)
         setSnackbarSeverity('success');
         setSnackbarMessage('Lic details saved successfully!');
         setSnackbarOpen(true);
         console.log("success")
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
setSnackbarOpen(false)
  // setOpen(false);
};
console.log(policyData ,"policydata")
 useEffect(() => {
  const fetchData = async () => {
    await getLicPremium();
  };
  fetchData();
  react-hooks/exhaustive-deps
}, [isreloading]);
  return (
    <div>
      <FormProvider {...methods}>
    <Grid container spacing={2} style={{marginTop:"1rem"}}>
                <Grid container spacing={2} alignItems="center"  justifyContent="flex-end" direction="row"style={{marginBottom:"1rem"}}>
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
        </Grid>
      {/* Row 1 */}

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6}>
          {/* <Typography >Policy Number </Typography> */}
          <TextField label="Name Of The Landloard " variant="outlined" fullWidth />
        </Grid>
       
        <Grid item xs={6}>
          {/* <Typography >Insured Person Name </Typography> */}
          <TextField label="Address Of The Landloard" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Policy Number </Typography> */}
          <TextField label="Policy Number " variant="outlined" fullWidth  name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}/>
        </Grid>
        <Grid item xs={4} style={{paddingTop:"9px"}}>
        {/* <Typography >Date Of Commencement Of Policy</Typography> */}
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
          {/* <Typography >Insured Person Name </Typography> */}
          <TextField label="Insured Person Name" variant="outlined" fullWidth  name="insuredPersonName"
                value={formData.insuredPersonName}
                onChange={handleChange} />
        </Grid>
      </Grid>

      {/* Row 2 */}
      
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Sum Of Assured</Typography> */}
          <TextField label="Sum Of Assured" variant="outlined" fullWidth  
           name="sumOfAssured"
           value={formData.sumOfAssured}
           onChange={handleChange}/>
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >RelationShip</Typography> */}
          <RHFAutocomplete 
                  name="payschedule_type"
                  label="RelationShip "
                  options={payscheduleTypes.map((payscheduleType) => payscheduleType.type)}
                />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Premium Amount For Which Proof Attched Now </Typography> */}
          <TextField label="Premium Amount For Which Proof Attched Now " variant="outlined" fullWidth
           name="premiumAmountForWhichProofAttachedNow"
           value={formData.premiumAmountForWhichProofAttachedNow}
           onChange={handleChange} />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Premium Amount Fall In Due </Typography> */}
          <TextField label="Premium Amount Fall In Due" variant="outlined" fullWidth 
            name="premiumAmountFallInDue"
            value={formData.premiumAmountFallInDue}
            onChange={handleChange} />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Premium Considered For Deduction</Typography> */}
          <TextField label="Premium Considered For Deduction" variant="outlined" fullWidth 
            name="premiumConsiderForDeduction"
            value={formData.premiumConsiderForDeduction}
            onChange={handleChange} />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Treatment For Specific Disease Under 80DDB</Typography> */}
          {/* <TextField label="Treatment For Specific Disease Under 80DDB" variant="outlined" fullWidth /> */}
          <RHFAutocomplete 
                  name="treatement_type"
                  label="Treatment For Specific Disease Under 80DDB"
                  options={treatmentTypes.map((payscheduleType) => payscheduleType.type)}
                />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Does The Injured Person Have Disability under 80U</Typography> */}
          {/* <TextField label="Does The Injured Person Have Disability under 80U" variant="outlined" fullWidth /> */}
          <RHFAutocomplete 
                  name="doesTheInjuredPersonHaveDisability"
                  label="Does The Injured Person Have Disability under 80U"
                  options={pinjuredPersonDisability.map((payscheduleType) => payscheduleType.type)}
                  onChange={(event, selectedValue) => handleAutocompleteChange('doesTheInjuredPersonHaveDisability', selectedValue)}
                />
        </Grid>
        {/* <Grid item xs={4}>
          <Typography >Premium Considered For Deduction</Typography>
          <TextField label="Text Field 5" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <Typography >Treatment For Specific Disease Under 80DDB</Typography>
          <TextField label="Text Field 6" variant="outlined" fullWidth />
        </Grid> */}
      </Grid>

{/* My buttons  */}

<Grid item container xs={12} spacing={2}>
<Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-Start" direction="row"style={{marginBottom:"1rem"}}>
        
          <Grid item>
           
          <Button className="button">Attchement</Button>
          </Grid>
          <Grid item>
            <Button className="button" onClick={saveLicDetals}>Save</Button>
          </Grid>
          <Grid item> 
            <Button className="button">Cancel</Button>
          </Grid>
        </Grid>
      {/* Add more rows as needed */}
  

    <Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-end" direction="row"style={{marginBottom:"1rem"}}>
        
          <Grid item>
          <Typography > Total Premium :{policyData?.length}</Typography>
          </Grid>
          
        </Grid>
      {/* Add more rows as needed */}
    </Grid>
    </Grid>

    <TableContainer component={Paper}>
      <Table>
        <TableHead >
          <TableRow>
            {headings.map((heading, index) => (
              <TableCell key={index}  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    whiteSpace: 'nowrap', // Prevent text wrapping
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

        {policyData.length > 0  &&  policyData?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex +1}</TableCell>
                <TableCell>{row.policyNumber}</TableCell>
                <TableCell>{row.dateOfCommencementOfPolicy}</TableCell>
                <TableCell>{row.employeeName}</TableCell>
                <TableCell>{row.relationship}</TableCell>
                <TableCell>{row.insuredPersonName}</TableCell>
                <TableCell>{row.treatmentForSpecifiedDiseas}</TableCell>
                <TableCell>{row.doesTheInjuredPersonhavedisability}</TableCell>
                <TableCell>{row.sumOfAssured}</TableCell>
                <TableCell>{row.premiumAmountForWhichProofAttachedNow}</TableCell>
                <TableCell>{row.premiumAmountFallInDue}</TableCell>
                <TableCell>{row.annualPremium}</TableCell>
                <TableCell>{row.premiumConsiderForDeduction}</TableCell>
                <TableCell>{row.action}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  


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
        <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
   
  );
}
