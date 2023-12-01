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
  RHFSelect,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import Stack from '@mui/material/Stack';
import { Autocomplete, TextField, DialogContent, DialogActions ,MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';

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
  const {user} = useContext(UserContext)
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
  const actions =   [ { name: "Approve",id:'approved',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-tick"},
  { name: "Reject",id:'rejected',type:'serviceCall',endpoint:"/approveSalaryAdvance",icon:"charm:circle-cross"},];

  const [showForm, setShowForm] = useState(false);
      const [showApproveForm,setApproveForm]= useState(false);
      const [showRejectForm,setRejectForm]= useState(false);
      const [showEditForm,setShowEditForm]= useState(false);
      const [commentsValue,setCommentsValue]=useState("");
  const handleClose = () => {
    setShowForm(false);
    setShowEditForm(false);
    setApproveForm(false);
    setRejectForm(false);
  }
  const [rowData,setRowData] = useState();
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
    hrComments:Yup.string(),
    status:Yup.string(),
    employeeID:Yup.string()
  });

  const defaultValues = useMemo(
    () => ({
      hrComments:"",
    status:"approved",
    employeeID:(user?.employeeID)?user?.employeeID:'',
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

  // const onSubmit = handleSubmit(async (data) => {
  //   console.log('🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:', data);
  //   console.log('uyfgv');

  //   try {
  //     data.company_id = 'COMP2';
  //     data.activity_id = String(currentActivitytData.activityId);
  //     data.project_id = String(currentProjectData.projectId);
  //     data.date_of_activity = formatDateToYYYYMMDD(dayjs(new Date()));
  //     data.start_time = '2023-10-17 11:50:02.023';
  //     data.end_time = '2023-10-17 11:50:02.023';
  //     // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
  //     // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
  //     // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
  //     // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
  //     // data.selectedActivity = selectedActivity;
  //     // data.companyID = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
  //     // data.employeeID = "info4";

  //     console.log(data, 'data111ugsghghh');

  //     const response = await instance.post('addmytimesheet', data).then(
  //       (response) => {
  //         console.log('sucess', successData);
  //         handleClose();
  //       },
  //       (error) => {
  //         console.log('lllll', error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

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
      } 
      else if(eventData?.name==="Approve")
      {
        setRowData(rowData)
        setApproveForm(true)
      }
      else if(eventData?.name==="Reject"){
        setRowData(rowData)
        setRejectForm(true)
      }
    } else {
      // navigate[event.eventData.route]
    }
  };
  //Approve
  const handleApprove=(obj)=>{
    const config = {
      method: 'POST',
      maxBodyLength:Infinity,
      url: baseUrl + `/approveSalaryAdvance`,
      data: obj
    
    }

    axios.request(config).then((response) => {
      enqueueSnackbar(response.data.message,{variant:'success'})
      handleClose();
    })
      .catch((error) => {
        enqueueSnackbar(error.message,{variant:'Error'})
        handleClose();
      });
  }
  const onSubmit = handleSubmit(async (data)=>{
    data.salaryAdvanceID=rowData?.SalaryAdvanceID

    try{
      apihit(data)
    }
    catch (error){
      console.error(error)
    }
  });
  // Reject
  const handleReject=()=>{
    var payload =
    {
      "employeeID":(user?.employeeID)?user?.employeeID:'',
      "hrComments":commentsValue,
      "status":"rejected",
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url: baseUrl + `/approveSalaryAdvance`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    enqueueSnackbar(response.data.message,{variant:'success'})
  })
    .catch((error) => {
      enqueueSnackbar(error.message,{variant:'Error'})
    });
  
  }
  useEffect(() => {
    getActivityList();
  }, []);
  console.log(timesheetData, 'kkkkkkk');
  console.log(selectedActivity, 'selectedActivity');
  return (
    <>
      {/* <h1>hello</h1> */}

      {(showEditForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showEditForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
    <ModalHeader heading="Edit Request"/>
  <DialogContent>
  <Grid container spacing={2}>
    
      <Grid  xs={12} md={12} sx={{marginLeft:5,marginTop:2}}>
      <TextField
                
                fullWidth
                defaultValue={rowData?.requestAmount}
                value={amountValue}
                onChange={handleChange}
                label="Amount"
              />
      </Grid>
     </Grid>
  </DialogContent>
  <Stack alignItems="flex-end" sx={{ mb:2,display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
  <Button  sx={{mr:"4px"}} onClick={handleClose} variant="outlined">Cancel</Button>
               <Button variant="contained" sx={{marginRight:2}} color="primary" disabled={amountValue===undefined || 0} onClick={handleEditSalary}>Apply</Button>
              </Stack>
      </Dialog>
    )}

{(showApproveForm) && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showApproveForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
<FormProvider methods={methods} onSubmit={onSubmit}>
    <ModalHeader heading="Approve Request"/>
<DialogContent>
<Grid container flexDirection="row" spacing={2}>

<Grid item xs={12} md={12}>
<RHFSelect name="status" label="Status">
  <MenuItem value="approve">Approve</MenuItem>
</RHFSelect>

</Grid>
</Grid>
<Grid item xs={12} md={6} sx={{marginTop:2}}>
  <RHFTextField name="hrComments" label="Comments"/>
</Grid>
<Grid>

  </Grid>
<Button variant="contained" color="primary" sx={{float:"right",right:5,marginTop:2,color:"white"}} type="submit">Approve Request</Button>
<Button sx={{float:"right",right:10,marginTop:2}} variant="outlined" onClick={()=>setApproveForm(false)}>Cancel</Button>
</DialogContent>
</FormProvider>
      </Dialog>
    )}
    {(showRejectForm) && (
<Dialog
fullWidth
maxWidth={false}
open={showRejectForm}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 500 , overflow:'hidden'},
}}
className="custom-dialog">
     <ModalHeader heading="Reject Request"/>
<TextField 
label="Comments"
placeholder='comments'
onChange={(e)=>handleComments(e)}
sx={{margin:2}}
/>
<div style={{display:"flex",justifyContent:"right",marginBottom:4}}>
<Button  onClick={()=>setRejectForm(false)} sx={{marginRight:2}} variant="outlined">Cancel</Button>
<Button variant="contained" color="primary" sx={{float:'right',right:5}}  onClick={handleReject}>Reject</Button>
</div>
</Dialog>
      )
    }

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
