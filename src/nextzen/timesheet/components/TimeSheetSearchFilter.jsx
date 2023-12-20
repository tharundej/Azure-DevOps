import { useCallback, useEffect, useMemo, useState ,React} from 'react';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
import Badge from '@mui/material/Badge';
import {Card,TextField,CardContent,  InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';
import { keyframes } from '@emotion/react';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from '../../global/modalheader/ModalHeader';
import AddTimeSheet from './AddTimeSheet';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const TimeSheetSearchFilterm = ({currentUser,filterSearch,filterData}) => {

  const { enqueueSnackbar } = useSnackbar();
   // dialog
    // const values = watch();
    const [projectDetails ,setProjectDetails] = useState([])
    const [activityData ,SetActivityData] = useState([])
    const [timeSheetWeek , setTimeSheetWeek]=useState()
    const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
    const NewUserSchema = Yup.object().shape({
      employee_id: Yup.string(),
      monday: Yup.string(),
  
    });
  
    
  const defaultValues = useMemo(
    () => ({
   
        employee_id: currentUser?.employee_id || '',
        monday: currentUser?.monday || '',

    }),
    [currentUser]
  );


  const   methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset, 
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  

  useEffect(() => {
    console.log("useeffectttttt");
     getProjectName();
     getActivityName();
     getTimeSheetWeek();
  //   const fetchData = async () => {
  //     try {
  //        await getProjectName();
  //        await getActivityName();
       
  //     } catch (error) {
  //        // Handle errors
  //     }
  //  };

  //  fetchData();
   }, []);
  //  const managerID =localStorage.getItem('reportingManagerID');
  const getProjectName = async()=>{
    try {
    
      const data = {
        
          employeeId:employeeID,
          companyId:companyID,
         
        // Other data properties as needed
      };
      const response = await axios.post(baseUrl+'/listmanagersproject', data).then(
        (response) => {
          console.log('sucesswwww', response);
          setProjectDetails(response?.data?.data)
          // enqueueSnackbar(response?.data?.message , { variant: 'success' })
        
        },
        (error) => {
          console.log('lllll', error);
          // enqueueSnackbar(error?.response?.data?.message || "something wrong", { variant: 'warning' })
       
        }
      );

 
      
    } catch (error) {
      // Handle any errors (e.g., network error, request failure, etc.)
      console.error('Error:', error);
      // enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
      throw error; // Re-throw the error or handle it according to your needs
    }
  }
  
  const getActivityName = async ()=>{
    try {
    
      const data = {
        project_id: 4,
        // Other data properties as needed
      };
      const response = await axios.post(baseUrl+'/listactivityname', data).then(
        (response) => {
          console.log('sucess', response);
          SetActivityData(response?.data?.data)
        
        },
        (error) => {
          console.log('lllll', error);
       
        }
      );

  
  
      
      console.log('Response:', );
  
     
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }
  const getTimeSheetWeek = async()=>{
    try {
    
      // const data = {
      //   manager_id: 'info7',
      //   // Other data properties as needed
      // };
      const response = await axios.post(baseUrl+"/workweeklist").then(
        (response) => {
          // console.log('sucesswwwwoo', response);
          setTimeSheetWeek(response?.data)

        
        },
        (error) => {
          console.log('lllll', error);
       
        }
      );

 
      
    } catch (error) {
      // Handle any errors (e.g., network error, request failure, etc.)
      console.error('Error:', error);
      throw error; // Re-throw the error or handle it according to your needs
    }
  }
  console.log(projectDetails,activityData,"currentActivitytDatacurrentActivitytData")

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      data.company_id = JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      data.activity_id =String( currentActivitytData.activityId);;
      data.project_id =String( currentProjectData.projectId);
      data.date_of_activity = formatDateToYYYYMMDD(dayjs(new Date()));
      data.start_time = '2023-10-17 11:50:02.023';
      data.end_time = '2023-10-17 11:50:02.023';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
      // data.selectedActivity = selectedActivity;
      // data.companyID = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
      // data.employeeID = "info4";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addmytimesheet', data).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
        }
      );

    } catch (error) {
      console.error(error);
    }
  });

  // mui modal related
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
      const managerID =localStorage.getItem('reportingManagerID');
      const employeeID =localStorage.getItem('employeeID');
      const companyID =localStorage.getItem('companyID');

  // add dialog form data
  const [projectIdUpdate, setProjectIdUpdate]=useState("")
  console.log(projectIdUpdate,"projectIdUpdate")
  const [timesheetData, setTimesheetData] = useState({
    // timesheetId: null,
    
    companyId: companyID,
    employeeId: employeeID,
    employeeName: '',
    projectId: projectIdUpdate,
    activityName: '',
    startTime: '2023-12-04',
    endTime: '2023-12-10',
    monday: {
      hours: '',
      task: '',
      comments: '',
    },
    tuesday: {
      hours: '',
      task: '',
      comments: "",
    },
    wednesday: {
      hours: '',
      task: '',
      comments: '',
    },
    thursday: {
      hours: '',
      task: '',
      comments: '',
    },
    friday: {
      hours: '',
      task: '',
      comments: '',
    },
    saturday: {
      hours: '',
      task: '',
      comments: '',
    },
    sunday: {
      hours: '',
      task: '',
      comments: '',
    },
  });
console.log(timesheetData,"timesheetData")
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTimesheetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayInputChange = (day, field) => (event) => {
    const { value } = event.target;
    setTimesheetData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [field]: value,
      },
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log('Form submitted:', timesheetData);
  };

  const onSubmitEdit2 = async(timesheetData, event) => {

    //  timesheetData?.projectId = projectIdUpdate;
    
    console.log(timesheetData,"editDataeditData222")
    try {
      event.preventDefault();
      // timesheetData.claim_type=timesheetData?.claim_type?.label
      // timesheetData?.projectId = projectIdUpdate;
     console.log(timesheetData,"editDataeditData")
      
      const response = await axios.post(baseUrl+'/addmytimesheet', timesheetData).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
          handleClose()
        }
      );

      
    } catch (error) {
      handleClose()
      // alert("api hit not done")
      console.error(error);
    }
  }

  const handleSearch = (searchTerm) => {
 
    filterSearch(searchTerm)
    console.log(searchTerm,"search ........")
    };

    // filters
    const [datesData, setDatesData] = useState([]);
    const [dropdown, setDropdown] = useState({});
    const [dates, setDates] = useState({
      from: '',
      to: '',
      PaidDateFrom: '',
      PaidDateTo: '',
    });
    const [dropdownStatustype, setdropdownStatustype] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [datesFiledArray, setDatesFiledArray] = useState([
      {
        field: 'dateofactivity',
        from: 'from',
        to: 'to',
      },
    ]);
    const [dropdownFiledArray, setDropdownFiledArray] = useState([
      {
        field: 'Status',
        options: [],
      },
    ]);
  const handleClickOpen = () => {
    setOpenFilter(true);
  };
  const handleClickClose = () => {
    setOpenFilter(false);
  };
  const handleChangeDropDown = (event, field) => {
    const {
      target: { value },
    } = event;

    if (field === 'Status') {
      setdropdownStatustype(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    }
    else if(field === 'Project'){
      setdropdownProjectName(value);
      const obj = dropdown;
      obj[field]  = value;
      setDropdown(obj)
    }
  };
  const handleApply = async () => {
    setDatesData([]);
    const data = await formDateDataStructure();

    const data1 = await formWithDropdown(data);
    filterData(data);
    handleClickClose();
  };
  function formDateDataStructure() {
    return new Promise((resolve) => {
      const arr1 = {};
      datesFiledArray.forEach((item, index) => {
        arr1[item.field] = {
          from: dates[item?.from],
          to: dates[item?.to],
        };
      });
      setDatesData(arr1);
      resolve(arr1);
    });
  }
  function formWithDropdown(data) {
    return new Promise((resolve) => {
      const arr1 = {};
      dropdownFiledArray.forEach((item, index) => {
        if (dropdown[item.field]?.length > 0) {
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field] = commaSeparatedString;
        }
      });
      resolve(arr1);
    });
  }
  const handleCancel = async () => {
    // setdropdownStatustype([]);
    // setDates({
    //   statusStart: '',
    //   statusEnd: '',
    // });
    // setdropdownProjectName([]);
    setOpen(false);
  };

 

  return (
    <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            onChange={(e) => handleSearch(e.target.value)}

            />
            </Grid>
            <Grid md={2} xs={2} sx={{alignSelf:"center",textAlign:"center"}}>
               <Button variant='contained'  sx={{borderRadius:"4px"}}  color='primary' onClick={handleOpen }>Add Timesheet</Button>
              
               {/* onClick={buttonFunction} */}
            </Grid>

            <Grid md={2} xs={2} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
        {/* <Badge badgeContent={""} color="error"  anchorOrigin={{
    vertical: 'up',
    horizontal: 'left',
  }} > */}
 
            <Button style={{width:"80px"}}  onClick={handleClickOpen} >
           <Iconify icon="mi:filter"/>
           Filters
      </Button>
      {/* </Badge > */}

      </Stack>
      </Grid>
         </Grid>

         <Dialog
fullWidth
maxWidth={false}
open={open}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 720 },
}}

         >
        
          < AddTimeSheet EditData={{}} handleClose={handleClose}/>

     
      </Dialog>

      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={openFilter}
        PaperProps={{
          sx: { maxWidth: 500, overflow: 'auto' },
        }}
      >
        <DialogTitle sx={{ paddingBottom: 0, paddingTop: 2 }}>
          Filters
          <CancelOutlinedIcon
            sx={{ cursor: 'pointer', float: 'right' }}
            onClick={() => setOpen(false)}
          />
        </DialogTitle>
        <DialogContent sx={{ mt: 0, paddingBottom: 0, marginTop: 2 }}>
          <Grid container>
            <Typography>Date of Activity </Typography>
            <Grid container flexDirection="row">
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ minWidth: '20pc' }}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.from ? dayjs(dates.from) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          from: newValue ? formatDateToYYYYMMDD(newValue) : '',
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.to ? dayjs(dates.to) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          to: newValue ? formatDateToYYYYMMDD(newValue) : '',
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container flexDirection="row" marginTop="10px" xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel fullWidth id="Status">
                  Status Type
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownStatustype}
                  onChange={(e) => handleChangeDropDown(e, 'Status')}
                  input={<OutlinedInput label="Status Type" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid container flexDirection="row" marginTop="10px" xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel fullWidth id="Status">
                 Project Name
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownProjectName}
                  onChange={(e) => handleChangeDropDown(e, 'Status')}
                  input={<OutlinedInput label="Status Type" />}
                  MenuProps={MenuProps}
                >
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>
        </DialogContent>
        <div style={{ marginBottom: 16, marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ float: 'right', marginRight: 2 }}
            onClick={() => {
              handleApply();
            }}
          >
            Apply
          </Button>
          <Button
            sx={{ float: 'right', right: 15 }}
            variant="outlined"
            onClick={() => {
              // handleCancel();
              handleClickClose()
            }}
          >
            Cancel
          </Button>
        </div>
        
        
      </Dialog>
     

    



   
    </>
  )
}

export default TimeSheetSearchFilterm