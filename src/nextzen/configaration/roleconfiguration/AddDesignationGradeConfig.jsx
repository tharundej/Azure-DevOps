
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState  ,useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// utils
// routes
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import instance from 'src/api/BaseURL';
import { Autocomplete } from '@mui/lab';
import { Alert, Button, Snackbar } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { baseUrl } from 'src/nextzen/global/BaseUrl';



export default function AddDesignationGradeConfig({ currentUser ,handleCloseAddRoleDilog ,openAddRoleConfig }) {
  const [commaSeparatedString, setCommaSepaatedString] = useState('');
  const [datesUsed, setDatesUsed] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
    due_date: dayjs(new Date()),
    // activity_name:[]
  });

  const empId = localStorage.getItem('employeeID')
  const cmpId= localStorage.getItem('companyID')
  const token = localStorage.getItem('accessToken')
  const [locationType, setLocationType] = useState([]);
  const [departmentType, setDepartmentType] = useState([]);
  const [designationType, setDesignationType] = useState([]);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

    // State for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

const [hitGetDepartment , setHitGetDepartment] = useState(false)

  const type = [
    { type: 'CGHS Contrubution' },
    { type: 'Medical Expenditure' },
    { type: 'Medical Insurance' },
    { type: 'Preventive Health Checkup' },
  ];
  const [formData, setFormData] = useState({
    companyID: '',
    employeeID: '',
    type: '',
    policyNumber: '',
    dateOfCommencementOfPolicy: '',
    insuredPersonName: '',
    relationshipType: '',
    payMode: '',
    policyCitizenshipType: '',
    amountOfPremium: '',
    eligibleDeduction: '',
    fileName: [],
    fileContent: '',
  });


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // reset1();
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
  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {

    console.log(name  ,  selectedValue , selectedOption)
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };

  const handleDesignationChange= (name, selectedValue, selectedOption) => {
    const id = selectedValue?.departmentID
    if(name ==="Department"){
        console.log("calling me " , selectedValue?.departmentID)
        getDesignation(id)
    }
    console.log(name, selectedValue, selectedOption ,"name, selectedValue, selectedOption")
    setFormData({
      ...formData,
      [name]: selectedValue,
      departmentID: selectedOption?.departmentID,
      departmentName: selectedOption?.departmentName,
    });

   
  };;
  const handleDesignationGradeChange= (name, selectedValue, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedValue,
      departmentID: selectedOption?.departmentID,
      departmentName: selectedOption?.departmentName,
    });
  };;

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  setSnackbarOpen(false)
    // setOpen(false);
  };
  const getLocation = async () => {
    const payload = {
        "companyID":cmpId
    }
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
    //   url : baseUrl + "getRentDeclarationDetails",
    url : baseUrl+'/locationOnboardingDepartment',
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
          setLocationType(rowsData)
          console.log(JSON.stringify(response?.data?.data), 'result');
  
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
  const AddDepartment = async () => {
    const payload = 
   
    {
        "companyID":"COMP1",
        "departmentName": formData?.department,
        "locationID": formData?.Location?.locationID
    }
   
     const config = {
    method: 'post',
       maxBodyLength: Infinity,
    //    url: baseUrl + 'addRentDeclarationDetails ',
    url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addDepartment',
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
           setSnackbarMessage('Department Added successfully!');
           setSnackbarOpen(true);
           setHitGetDepartment(!hitGetDepartment)
           console.log("success")
         }
   
       })
       .catch((error) => {
        
        //  setOpen(true);
         setSnackbarSeverity('error');
         setSnackbarMessage('Error Department Adding. Please try again.');
         setSnackbarOpen(true);
         console.log(error);
   });
   //  console.log(result, 'resultsreults');
   
   };

   const getDepartment = async () => {
    const payload =
    {
        "companyID": cmpId,
        //  "locationID": 30
    }
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url : baseUrl + "/onboardingDepartment",
    // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDepartment',
      headers: {
        Authorization:
      token, 'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setDepartmentType(rowsData)
          console.log(JSON.stringify(response?.data?.data), 'result');
  
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const AddDesignation = async () => {
    const payload = 
   
    
    {
        "companyID": "COMP1",
        "departmentID" : formData?.Department?.departmentID,
        "designationName": formData?.designation,
    }
   
     const config = {
    method: 'post',
       maxBodyLength: Infinity,
    //    url: baseUrl + 'addRentDeclarationDetails ',
    url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addDesignation',
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
           setSnackbarMessage('Designation Added successfully!');
           setSnackbarOpen(true);
           setHitGetDepartment(!hitGetDepartment)
           console.log("success")
         }
   
       })
       .catch((error) => {
        
        //  setOpen(true);
         setSnackbarSeverity('error');
         setSnackbarMessage('Error Designation Adding . Please try again.');
         setSnackbarOpen(true);
         console.log(error);
   });
   //  console.log(result, 'resultsreults');
   
   };

   const getDesignation = async (id) => {
    console.log(id , "id id id ")
    const payload =
    {
        "companyID":cmpId,
        "departmentID":id? id: formData?.Department?.departmentID,
    }
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url : baseUrl + "/onboardingDesignation",
    // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDesignation',
      headers: {
        Authorization:
       token , 'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setDesignationType(rowsData)
          console.log(JSON.stringify(response?.data?.data), 'result');
  
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const AddDesignationGrade = async () => {
    const payload = 
   
    
    {
        "companyID": cmpId,
        "designationID" : formData?.Designation?.designationID,
        "designationGradeName": formData?.designationGrade,
    }
   
     const config = {
    method: 'post',
       maxBodyLength: Infinity,
       url: baseUrl + '/addDesignationGrade ',
    // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addDesignationGrade',
       headers: {
         Authorization:
        token ,'Content-Type': 'text/plain',
       },
       data: payload,
     };
     const result = await axios
       .request(config)
       .then((response) => {
         if (response.status === 200) {
           setSnackbarSeverity('success');
           setSnackbarMessage('Designation Added successfully!');
           setSnackbarOpen(true);
           setHitGetDepartment(!hitGetDepartment)
           console.log("success")
         }
   
       })
       .catch((error) => {
        
        //  setOpen(true);
         setSnackbarSeverity('error');
         setSnackbarMessage('Error Designation Adding . Please try again.');
         setSnackbarOpen(true);
         console.log(error);
   });
   //  console.log(result, 'resultsreults');
   
   };
  useEffect(() => {
    const fetchData = async () => {
  
      getDesignation()
      getDepartment()
    };
    fetchData();
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      getDepartment();
      getDesignation()
    };
    fetchData();
    
  }, [hitGetDepartment]);


console.log(departmentType ,"DEPARTMENT TYPE    ")
  console.log(formData ,"formdata ")
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      }}
    >
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
     
       
        {/* sai  */}
       
<Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px',color:'white',backgroundColor:'#3B82F6' }}
      >
        Designation Grade
      </Button>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {/* <FormProvider methods={methods1} onSubmit={onSubmit1}> */}
        <FormProvider >
          <DialogTitle>Designation Grade Config</DialogTitle>
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(3, 1fr)', // Add this line for three items in a row
              }}
            >
        
        
           
              {/* <TextField
                label="Department "
                name="department"
                value={null}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
         
           
            <Autocomplete
              disablePortal
              name="Location"
              id="combo-box-demo"
              options={locationType?.map((employeepayType) => ({
                label: employeepayType.locationName,
                value: employeepayType.locationName,
                ...employeepayType,
              }))}
              value={formData.Location}
              onChange={(event, newValue, selectedOption) =>
                handleAutocompleteChange('Location', newValue, selectedOption)
              }
                renderInput={(params) => <TextField {...params} label="Location" />}
              />
         
          
              <Button  onClick={AddDepartment}>Add</Button>
         */}
          {/* Row 2 */}

         
      
          
              <Autocomplete
                disablePortal
                name="Department"
                id="combo-box-demo"
                options={departmentType?.map((department) => ({
                    label: department.departmentName,
                    value: department.departmentName,
                    ...department,
                  }))}
                value={formData.Department}
                onChange={(event, newValue ,selectedOption) => handleDesignationChange('Department', newValue ,selectedOption)}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Department" />}
              />
           
         
              {/* <Typography >Property Reference Sl.No(Enter 1,2,3 Etc) </Typography> */}

              {/* <TextField
                label="Designation"
                name="designation"
                value={null}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
          

       
              <Button onClick={AddDesignation}>Add</Button>
              
           */}

         
            <Autocomplete
              disablePortal
              name="Designation"
              id="Designation"
              options={designationType?.map((employeepayType) => ({
                label: employeepayType.designationName,
                value: employeepayType.designationName,
                ...employeepayType,
              }))}
              value={formData.Designation}
              onChange={(event, newValue, selectedOption) =>
                handleDesignationGradeChange('Designation', newValue, selectedOption)
              }
                renderInput={(params) => <TextField {...params} label="Designation " />}
              />
          
              <TextField
                label="Designation Grade"
                name="designationGrade"
                value={null}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
          
              <Button onClick={AddDesignationGrade}>Add</Button>
         

          {/*       
        <Grid item container xs={12} spacing={2} alignItems="center" justifyContent="center" direction="row">
        <Grid item xs={6} spacing={2} alignItems="center" justifyContent="flex-Start" direction="row" style={{ marginBottom: '1rem', textAlign: 'center' }}>
         */}
          {/* <Grid
            item
            container
            xs={10}
            spacing={2}
            alignItems="center"
            justifyContent="center"
            direction="row"
            style={{ marginBottom: '1rem', textAlign: 'center' }}
          >
            <Grid item xs={2}>
              <Button className="button">Save</Button>
            </Grid>
            <Grid item xs={2}>
              <Button className="button">Cancel</Button>
            </Grid>
          </Grid> */}
      
              
            </Box>
          </DialogContent>
 
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            {/* <LoadingButton
              type="submit"
              variant="contained"
              onClick={()=> {console.log("hi")}}
              loading={()=> {console.log("hi")}}
            >
              Save
            </LoadingButton> */}
          </DialogActions>
        </FormProvider>
      </Dialog>
  
    </div>
  );
}

AddDesignationGradeConfig.propTypes = {
  currentUser: PropTypes.object,
};