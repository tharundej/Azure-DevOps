import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState, useEffect } from 'react';
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
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function AddTaxSectionConfig({
  currentUser,
  handleCloseAddRoleDilog,
  openAddRoleConfig,
}) {
  const [commaSeparatedString, setCommaSepaatedString] = useState('');
  const [datesUsed, setDatesUsed] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
    due_date: dayjs(new Date()),
    // activity_name:[]
  });
const baseUrl = "https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
  const empId = localStorage.getItem('employeeID');
  const cmpId = localStorage.getItem('companyID');
  const token = localStorage.getItem('accessToken');
  const [locationType, setLocationType] = useState([]);
  const [departmentType, setDepartmentType] = useState([]);
  const [designationType, setDesignationType] = useState([]);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [hitGetDepartment, setHitGetDepartment] = useState(false);

  const type = [
    { type: 'CGHS Contrubution' },
    { type: 'Medical Expenditure' },
    { type: 'Medical Insurance' },
    { type: 'Preventive Health Checkup' },
  ];
  const [formData, setFormData] = useState({
    
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // reset1();
  };
  //fromProvider
  const methods = useForm({
    
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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
      
    });

    // setFormData({ ...formData, [name]: integerValue });

    console.log(formData);
  };

  console.log(formData);
  const handleAutocompleteChange = (name, selectedValue, selectedOption) => {
    console.log(name, selectedValue, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedValue,
      locationID: selectedOption?.locationID,
      locationName: selectedOption?.locationName,
    });
  };



  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    // setOpen(false);
  };
 
  const getDepartment = async () => {
    const payload = {
      companyID: cmpId,
      //  "locationID": 30
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/onboardingDepartment',
      // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDepartment',
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
          setDepartmentType(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'result');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const getDesignation = async (id) => {
    console.log(id, 'id id id ');
    const payload = {
      companyID: cmpId,
      departmentID: id ? id : formData?.Department?.departmentID,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/onboardingDesignation',
      // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDesignation',
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
          setDesignationType(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'result');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const AddTaxConfiguration = async () => {
    const payload = 
    {
        companyId:cmpId,
        taxSection:formData?.taxSection,
        taxScheme:formData?.taxScheme,
        taxLimit:formData?.taxLimit
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/configureDeclarations ',
      // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/addDesignationGrade',
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
          setSnackbarSeverity('success');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          setHitGetDepartment(!hitGetDepartment);
          console.log('success');
        } else if (response.data.code === 400) {
          setSnackbarSeverity('error');
          setSnackbarMessage(response.data.message);
          setSnackbarOpen(true);
          setHitGetDepartment(!hitGetDepartment);
          console.log('success');
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
 



  console.log(departmentType, 'DEPARTMENT TYPE    ');
  console.log(formData, 'formdata ');
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
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* sai  */}

      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ margin: '20px', color: 'white', backgroundColor: '#3B82F6' }}
      >
        Tax Section
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
        <FormProvider>
          <ModalHeader heading="Tax Section Configuration" />
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
              <TextField
                label="Tax Section "
                name="taxSection"
                value={null}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Tax Scheme"
                name="taxScheme"
                value={null}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Limit"
                name="taxLimit"
                value={null}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />

              {/* <Button onClick={AddTaxConfiguration}>Add working</Button> */}

          
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
         
              <div style={{ marginBottom: 12, marginTop: 4 }}>
          {' '}
          <Button
            variant="contained"
            color="primary"
            sx={{ float: 'right', marginRight: 2 }}
            onClick={() => {
                AddTaxConfiguration()
            }}
          >
            Submit
          </Button>
          <Button
            sx={{ float: 'right', right: 15 }}
            variant="outlined"
            onClick={() => {
                handleClose();
            }}
          >
            Cancel
          </Button>
        </div>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}

AddTaxSectionConfig.propTypes = {
  currentUser: PropTypes.object,
};
