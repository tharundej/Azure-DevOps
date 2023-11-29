// import React from 'react'

// const TimeSheetApproval = () => {
//   return (
//     <div>TimeSheetApproval</div>
//   )
// }

// export default TimeSheetApproval

import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../../Table/BasicTable';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import Stack from '@mui/material/Stack';
import { Autocomplete, TextField, DialogContent, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';

const TimeSheetApproval = ({ currentUser, filterSearch }) => {
  const TABLE_HEAD = [
    // {

    //   id: "",

    //   label: " SL_NO",

    //   type: "text",

    //   containesAvatar: false,

    //   secondaryText: "text",

    // },
    { id: 'projectId', label: 'Project Id', width: 180, type: 'text' },

    { id: 'projectName', label: 'Project Name', width: 220, type: 'text' },

    { id: 'dateOfActivity', label: 'Date of Activity', width: 200, type: 'text' },

    { id: 'activityName', label: 'Activity Name', width: 200, type: 'text' },
    { id: 'managerName', label: 'Manager Name', width: 100, type: 'text' },
    { id: 'startTime', label: 'Start Time', width: 200, type: 'text' },
    { id: 'endTime', label: 'End Time', width: 200, type: 'text' },

    { id: 'status', label: 'Status', width: 100, type: 'badge' },

    // { id: '', width: 88 },
  ];

  const managerID = localStorage.getItem('reportingManagerID');
  const employeeID = localStorage.getItem('employeeID');
  const companyID = localStorage.getItem('companyID');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const defaultPayload = {
    companyId: companyID,
    employeeId: employeeID,
    page: 0,
    count: 5,
    search: '',
    externalFilters: {
      projectName: '',
      Status: '',
      from: '',
      to: '',
    },
    sort: {
      key: 0,
      orderBy: 'p.project_name',
    },
  };
  const actions = [{ name: 'Edit', icon: 'solar:pen-bold', id: 'edit', type: 'edit' }];

  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleTimeForm = () => {
    setShowForm(true);
    // console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
  };
  // dialog
  // const values = watch();
  const [projectDetails, setProjectDetails] = useState([]);
  const [activityData, SetActivityData] = useState([]);
  const [currentProjectData, setCurrentProjectData] = useState({});
  const [currentActivitytData, setCurrentActivitytData] = useState([]);
  const [selectedActivitytData, setSelectedActivitytData] = useState();
  const NewUserSchema = Yup.object().shape({
    employee_id: Yup.string(),
    monday: Yup.string(),
    tuesday: Yup.string(),
    wednseday: Yup.string(),
    thursday: Yup.string(),
    friday: Yup.string(),
    saturday: Yup.string(),
    sunday: Yup.string(),
    comments: Yup.string(),
    // start_date: Yup.string(),
    // end_date: Yup.string(),
    // due_date: Yup.string().required('First Name is Required'),
    // commentStatus: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      employee_id: currentUser?.employee_id || '',
      monday: currentUser?.monday || '',
      tuesday: currentUser?.tuesday || '',
      wednseday: currentUser?.wednseday || '',
      thursday: currentUser?.thursday || '',
      friday: currentUser?.friday || '',
      saturday: currentUser?.saturday || '',
      sunday: currentUser?.sunday || '',
      comments: currentUser?.comments || '',
    }),
    [currentUser]
  );

  const methods = useForm({
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

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');

    try {
      data.company_id = 'COMP2';
      data.activity_id = String(currentActivitytData.activityId);
      data.project_id = String(currentProjectData.projectId);
      data.date_of_activity = formatDateToYYYYMMDD(dayjs(new Date()));
      data.start_time = '2023-10-17 11:50:02.023';
      data.end_time = '2023-10-17 11:50:02.023';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
      // data.selectedActivity = selectedActivity;
      // data.companyID = "COMP1";
      // data.employeeID = "info4";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addmytimesheet', data).then(
        (response) => {
          console.log('sucess', successData);
          handleClose();
        },
        (error) => {
          console.log('lllll', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  // edit dialog form data
  const [timesheetData, setTimesheetData] = useState({
    timesheetId: '',
    flag: 3,
    companyId: companyID,
    employeeId: employeeID,
    employeeName: '',
    projectId: '1',
    activityId: '2',
    activityName: '',
    startTime: '',
    endTime: '',
    monday: {
      hours: '',
      task: '',
      comments: '',
    },
    tuesday: {
      hours: '',
      task: '',
      comments: '',
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
  });
  console.log(timesheetData, 'timesheetData1222');
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

  const onSubmitEdit2 = async (timesheetData, event) => {
    const newId = timesheetData?.timeSheetId;
    console.log(newId, 'newId');

    const updateTimesheetId = (newId) => {
      // Convert newId to a string before updating the state
      setTimesheetData((prevData) => ({
        ...prevData,
        timesheetId: String(newId),
      }));
    };

    try {
      event.preventDefault();

      //  timesheetData?.timesheetData="28"

      console.log(timesheetData, 'editDataeditData');

      const response = await axios.post(baseUrl + '/addmytimesheet', timesheetData).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );
    } catch (error) {
      alert('api hit not done');
      console.error(error);
    }
  };

  const getActivityList = () => {
    console.log('calling getActivityList');
    const payload = {
      project_id: 4,
    };
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: baseUrl + `/listactivityname`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
      },
      data: payload,
    };
    try {
      axios.request(config).then((response) => {
        setCurrentActivitytData(response?.data?.data);
        if (response?.data?.Code === '200') {
          setSnackbarSeverity('success');
          setSnackbarMessage(response?.data?.message);
          setSnackbarOpen(true);
          setCurrentActivitytData(response?.data?.data);
        }
        if (response?.data?.Code === '400') {
          setSnackbarSeverity('error');
          setSnackbarMessage(response?.data?.message);
          setSnackbarOpen(true);

          console.log('error', response);
        }
        console.log(response?.data?.data, 'sucesslist');
      });
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Editing. Please try again.');
      setSnackbarOpen(true);
      console.log(' ', error);
    }
  };
  console.log(timesheetData, 'vvvvvvvvvvv');
  console.log('aaaaaaaa', currentActivitytData);
  // mui modal related
  const [open, setOpenEdit] = useState(false);
  const handleOpen = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const onclickActions = async (rowData, eventData) => {
    console.log(rowData, eventData, 'CompoffAprrove from to basic table');
    if (rowData && eventData) {
      console.log(rowData, 'rowDatarowData');
      // hit api for options return the resposnse.data.data
      // const arr= await ApiHitClaimTypeOptions()

      const updatedRowData = {
        ...rowData,
        flag: 3,
        // company_id: 'COMP2',
      };

      setTimesheetData(updatedRowData);

      if (eventData?.type === 'edit') {
        handleOpen();

        console.log('kl');
      } else {
      }
    } else {
      // navigate[event.eventData.route]
    }
  };
  // edit
  const handleActivity = (name, value) => {
    setSelectedActivity(value?.activityName);
    setTimesheetData((prevdata) => ({
      ...prevdata,
      [name]: value?.activityName,
    }));
  };
  useEffect(() => {
    getActivityList();
  }, []);
  console.log(timesheetData, 'kkkkkkk');
  console.log(selectedActivity, 'selectedActivity');
  return (
    <>
      {/* <h1>hello</h1> */}

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(timesheetData, event)}>
          <DialogContent>
            <Box
              rowGap={1}
              columnGap={1}
              display="grid"
              gridTemplateColumns={
                {
                  // xs: 'repeat(1, 1fr)',
                  // sm: 'repeat(7, 1fr)',
                }
              }
            >
              <Grid sx={{ padding: '8px' }}>
                <Typography sx={{ marginLeft: '8px' }}>
                  ADD YOUR TIMELINE TO PROJECT IS HERE .....
                </Typography>
                <Typography sx={{ marginLeft: '8px' }}>Time Sheet</Typography>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} fullWidth>
                  <Autocomplete
                    // disablePortal
                    id="cobo-box-demo"
                    options={projectDetails || []}
                    value={currentProjectData.projectId}
                    getOptionLabel={(option) => option.projectcdName}
                    onChange={(e, newvalue) => {
                      setCurrentProjectData(newvalue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Project Name" />}
                  />

                  <Grid item  fullWidth>
                     <TextField
                    label="Status"
                    fullWidth
                     value={null}
                    // onChange={handleDayInputChange('status', 'task')}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} fullWidth>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Commemt..."
                    style={{ width: '100%' }} // Adjust width as needed
                  />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} fullWidth>
                  <Autocomplete
                    disablePortal
                    id="combo-box-dmo"
                    options={currentActivitytData} // Pass the activities array directly
                    value={selectedActivity?.activityName} // Display the selected activity's name
                    getOptionLabel={(option) => option.activityName} // Render the activity name
                    onChange={(e, newValue) => {
                      handleActivity('activityName', newValue); // Store the selected activity object
                    }}
                    renderInput={(params) => <TextField {...params} label="Activity Name" />}
                  />
                </Grid>
              </Grid>
              <Typography>Monday</Typography>
              <Grid container spacing={1}>
                <Grid item sm={4}>
                  <TextField
                    label="Monday Hours"
                    fullWidth
                    inputProps={{
                      pattern: '[0-9]',
                      maxLength: 2,
                    }}
                    value={timesheetData?.monday?.hours}
                    onChange={handleDayInputChange('monday', 'hours')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Monday Task"
                    fullWidth
                    value={timesheetData?.monday?.task}
                    onChange={handleDayInputChange('monday', 'task')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Monday Comments"
                    fullWidth
                    value={timesheetData?.monday?.comments}
                    onChange={handleDayInputChange('monday', 'comments')}
                  />
                </Grid>
              </Grid>
              <Typography>Tuesday</Typography>
              <Grid container spacing={1}>
                <Grid item sm={4}>
                  <TextField
                    label="Tuesday Hours"
                    fullWidth
                    inputProps={{
                      pattern: '[0-9]',
                      maxLength: 2,
                    }}
                    value={timesheetData?.tuesday?.hours}
                    onChange={handleDayInputChange('tuesday', 'hours')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Tuesday Task"
                    fullWidth
                    value={timesheetData?.tuesday?.task}
                    onChange={handleDayInputChange('tuesday', 'task')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Tuesday Comments"
                    fullWidth
                    value={timesheetData?.tuesday?.comments}
                    onChange={handleDayInputChange('tuesday', 'comments')}
                  />
                </Grid>
              </Grid>
              <Typography>Wednesday</Typography>
              <Grid container spacing={1}>
                <Grid item sm={4}>
                  <TextField
                    label="Wednesday Hours"
                    fullWidth
                    inputProps={{
                      pattern: '[0-9]',
                      maxLength: 2,
                    }}
                    value={timesheetData?.wednesday?.hours}
                    onChange={handleDayInputChange('wednesday', 'hours')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    name="wednesdayTask"
                    label="Wednesday Task"
                    fullWidth
                    value={timesheetData?.wednesday?.task}
                    onChange={handleDayInputChange('wednesday', 'task')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Wednesday Comments"
                    fullWidth
                    value={timesheetData?.wednesday?.comments}
                    onChange={handleDayInputChange('wednesday', 'comments')}
                  />
                </Grid>
              </Grid>
              <Typography>Thursday</Typography>
              <Grid container spacing={1}>
                <Grid item sm={4}>
                  <TextField
                    name="thursdayHours"
                    label="Thursday Hours"
                    fullWidth
                    inputProps={{
                      pattern: '[0-9]',
                      maxLength: 2,
                    }}
                    value={timesheetData?.thursday?.hours}
                    onChange={handleDayInputChange('thursday', 'hours')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Thursday Task"
                    fullWidth
                    value={timesheetData?.thursday?.task}
                    onChange={handleDayInputChange('thursday', 'task')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Thursday Comments"
                    fullWidth
                    value={timesheetData?.thursday?.comments}
                    onChange={handleDayInputChange('thursday', 'comments')}
                  />
                </Grid>
              </Grid>
              <Typography>Friday</Typography>
              <Grid container spacing={1}>
                <Grid item sm={4}>
                  <TextField
                    name="Friday"
                    label="Friday"
                    fullWidth
                    inputProps={{
                      pattern: '[0-9]',
                      maxLength: 2,
                    }}
                    value={timesheetData?.friday?.hours}
                    onChange={handleDayInputChange('friday', 'hours')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    name="fridayTask"
                    label="Friday Task"
                    fullWidth
                    value={timesheetData?.friday?.task}
                    onChange={handleDayInputChange('friday', 'task')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    label="Friday Comments"
                    fullWidth
                    value={timesheetData?.friday?.comments}
                    onChange={handleDayInputChange('friday', 'comments')}
                  />
                </Grid>
              </Grid>
            </Box>

            <DialogActions>
              <Stack
                alignItems="flex-end"
                sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add  Timeline'}
                </LoadingButton>
                <Button sx={{ backgroundColor: '#d12317', ml: '5px' }} onClick={handleCloseEdit}>
                  Cancel
                </Button>
              </Stack>
            </DialogActions>
          </DialogContent>
        </FormProvider>
      </Dialog>

      <BasicTable
        defaultPayload={defaultPayload}
        headerData={TABLE_HEAD}
        rowActions={actions}
        endpoint="/Mytimesheets"
        bodyData="data"
        filterName="TimeSearchFilter"
        onClickActions={onclickActions}
      />
    </>
  );
};

export default TimeSheetApproval;
