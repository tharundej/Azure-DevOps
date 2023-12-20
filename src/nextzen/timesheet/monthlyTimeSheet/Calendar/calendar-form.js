import PropTypes from 'prop-types';
import { useCallback, useState,useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Stack,Button,Tooltip,IconButton,DialogActions,DialogContent,Typography,MenuItem,Card,Grid,CardContent, TextField} from '@mui/material';
// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { createEvent, updateEvent, deleteEvent, useGetEvents } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField,RHFRadioGroup,RHFSelect, } from 'src/components/hook-form';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { LoadingScreen } from 'src/components/loading-screen';
import UserContext from 'src/nextzen/context/user/UserConext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { duration, styled } from '@mui/material/styles';
import Label from 'src/components/label/label';
import { getAvailableLeaveAPI, getLeaveTypeAPI, getLossOfPayAPI } from 'src/api/HRMS/LeaveManagement';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function CalendarForm({ currentEvent, colorOptions,selectedRange,onClose,projectInfo, editData ,eventClickMe,date}) {
  const {user} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();
  const [attachmentString,setAttachmentString] = useState("");
  const [listLeave,setListLeave] = useState();
  const [loader,setLoader] = useState(false);
  const [availableLeaves,setAvailableLeaves]= useState();
  const [lop,setLOP] = useState()
  const EventSchema = Yup.object().shape({
    leaveTypeId:Yup.lazy((value) => {
    return value === 0
      ? Yup.number().notOneOf([0], 'Please Select Leave Type').required('Please Select Leave Type')
      : Yup.number().required('Please Select Leave Type');
  }),
    companyId:Yup.string(),
    employeeId:Yup.string(),
    fromDate: Yup.string(),
    toDate: Yup.string(),
    comments: Yup.string().required('Please Enter Reason'),
    applyDate:Yup.mixed(),
    status:Yup.string(),
    fullday:Yup.string(),
    firsthalf:Yup.string(),
    secondhalf:Yup.string(),
    attachment:Yup.string(),
    statusDate:Yup.string(),
    color:Yup.string(),
    lop:Yup.number()
  });
  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: currentEvent,
  });
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
  
  const [datesUsed, setDatesUsed] = useState({
    fromDate:(selectedRange?.start)?dayjs(selectedRange?.start):dayjs(new Date()),
    toDate:(selectedRange?.end)?dayjs(selectedRange?.end):dayjs(new Date()),
    
  });
  const [leaveType,setLeaveType] = useState();
  useEffect(()=>{
    lossOfPay()
    },[leaveType,datesUsed?.toDate])
    
    const numericalValue = lop?.lop ? lop.lop.replace(/[^\d.]/g, '') : null;
    
    console.log(numericalValue,"valuee")
  const dateError = datesUsed?.fromDate && datesUsed?.toDate ? datesUsed?.fromDate >= datesUsed?.toDate : false;
  const onSubmit = handleSubmit(async (data) => {
    const selectedValue = data?.day_span;
    const fulldayValue = selectedValue === "full_day" ? "1" : "0";
    const firsthalfValue = selectedValue === "first_half" ? "1" : "0";
    const secondhalfValue = selectedValue === "second_half" ? "1" : "0";
    const eventData = {
      leaveTypeId:data?.leaveTypeId,
      companyId: (user?.companyID)?user?.companyID:'',
      employeeId:(user?.employeeID)?user?.employeeID:'',
      comments: data?.comments,
      applyDate: "",
      fromDate:(datesUsed?.fromDate)?formatDateToYYYYMMDD(datesUsed?.fromDate):selectedRange?.start,
      toDate:(datesUsed?.toDate)?formatDateToYYYYMMDD(datesUsed?.toDate):selectedRange?.end,
      status:data?.status,
      fullday:fulldayValue,
      firsthalf:firsthalfValue,
      secondhalf:secondhalfValue,
      attachment: attachmentString,
      statusDate:"",
      color:(data?.leaveTypeId===1)?"#0c1f31":(data?.leaveTypeId===2)?"#d4a085":(data?.leaveTypeId===3)?"#c9de8c":"#ffbed1",
      lop: parseFloat(numericalValue)
    };
    try {
      const result = await createEvent(eventData,user);
      onClose();
      enqueueSnackbar(result.message, { variant: 'success' });
      reset();
    } 
    catch (error) {
      console.log(error,"calendarerror")
      enqueueSnackbar(error.response.data.message,{variant:'error'})
      onClose();
      // Handle the error, e.g., show a snackbar.
    }
  });
  const onDelete = useCallback(async () => {
    try {
      const {leaveId,employeeId}= currentEvent
      const result =  await deleteEvent(leaveId,employeeId,user);
      enqueueSnackbar(result.message,{variant:'success'});
      onClose();
    } 
    catch (error) {
      enqueueSnackbar(error.message,{variant:'error'})
    }
  }, [currentEvent?.leaveId, onClose]);
  
  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 const [fileName,setFileName] = useState()
 function handleFileSelect(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  setFileName(file.projectName)
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target.result;
      setAttachmentString(base64String.split(',')[1]);
    };
    reader.readAsDataURL(file);
  }
}
useEffect(()=>{
  AvailableLeaves();
  getLeaveList();
},[])
const getLeaveList = async () => {
  setLoader(true);
  try{ 
   const LeaveTypePayload = {
    companyId: user?.companyID,
    employeeId: user?.employeeID
  }
  const leaveTypeResponse = await getLeaveTypeAPI(LeaveTypePayload)
  setListLeave(leaveTypeResponse?.data?.list)
  setLoader(false);
 }
  catch(error) {
      enqueueSnackbar(`Error: ${error.response?.data?.message || "Something went wrong"}`, { variant: 'error' });
      console.log(error);
      setLoader(false);
  };
}
const AvailableLeaves = async () => {
  setLoader(true);
  try{
  const AvailableLeavesPayload = {
    companyId:user?.companyID,
     employeeId:user?.employeeID
  }
  const LeaveResponse = await getAvailableLeaveAPI(AvailableLeavesPayload)
  setAvailableLeaves(LeaveResponse?.data)
  setLoader(false);
 }
  catch(error){
      enqueueSnackbar(`Error: ${error.response?.data?.message || "Something went wrong"}`, { variant: 'error' });
        console.log(error);
        setLoader(false);
  };
}
const isSameDay = dayjs(datesUsed.fromDate).isSame(datesUsed.toDate, 'day');
const lossOfPay = async()=>{
  try {
    const LossOfPayPayload = {
      companyId: user?.companyID,
      employeeId: user?.employeeID,
      leaveTypeId: leaveType,
      fromDate: formatDateToYYYYMMDD(datesUsed?.fromDate),
      toDate: formatDateToYYYYMMDD(datesUsed?.toDate)
      }
      const lopResponse = await getLossOfPayAPI(LossOfPayPayload)
      setLOP(lopResponse?.data)
  } 
  catch(error) {
        console.log(error,"error in loss of pay");
  };
}


// surendra work
const [projectData,setProjectData]=useState(
//   {
//   projectID:[ { projectId: 1, projectName: 'ERP',  },
//   { projectId: 2, projectName: 'HRMS',  },
//   { projectId: 3, projectName: 'ACCOUNTS', },],
  
// }
projectInfo
)
// useEffect(()=>{
//   if (projectInfo){
//     setProjectData(projectInfo)
//   }
// },[])
console.log(projectInfo,"data from calendar time sheet",projectData,projectData?.projectID.length)
//  to store data


// const [projectDetails, setProjectDetails] = useState({
//   employeeName:projectInfo?.employeeName,
//   projectID:projectInfo?.projectID,
//   todayDate:date?.start,
// });

// const editData=[
//   ACCOUNTS={
//     "hours": "sd",
//     "des": "dfer"
// }
// HRMS={
//     "hours": "12",
//     "des": "23"
// }
// ]
// const [projectDetails, setProjectDetails] = useState({
//   employeeName: projectInfo?.employeeName,
//   projectID: [
//     { "projectId": 1, "projectName": "ERP" },
//     { "projectId": 3, "projectName": "ACCOUNTS" }
//   ],
//   todayDate: date?.start,
//   // Dynamically create properties for each project
//   ...Object.fromEntries(
//     projectInfo?.projectID?.map((project) => [
//       project.projectName,
//       { hours: "", des: "" }
//     ]) || []
//   )
// });


// const editData = [
//   {
//     ACCOUNTS: {
//       hours: "sd",
//       des: "dfer"
//     }
//   },
//   {
//     HRMS: {
//       hours: "12",
//       des: "23"
//     }
//   }
// ];
console.log(editData,"editttttttdata")
// const initialProjectDetails = {
//   employeeName: projectInfo?.employeeName,
//   projectID: [
//     { "projectId": 1, "projectName": "ERP" },
//     { "projectId": 3, "projectName": "ACCOUNTS" }
//   ],
//   todayDate: date?.start,
//   // Dynamically create properties for each project with empty values
//   ...Object.fromEntries(
//     projectInfo?.projectID?.map((project) => [
//       project.projectName,
//       { description: "",employeename:"",hours: "",projectId:"",projectName:"" }
//     ]) || []
//   )
// };
// second method
const initialProjectDetails = {
  employeeName: projectInfo?.employeeName,
  projectID: [
    { "projectId": 1, "projectName": "ERP" },
    { "projectId": 3, "projectName": "ACCOUNTS" }
  ],
  todayDate: date?.start,
  // Dynamically create properties for each project with empty values
  ...Object.fromEntries(
    projectInfo?.projectID?.map((project) => [
      project.projectName,
      { description: "", employeename: "", hours: "", projectId: "", projectName: "" }
      
    ]) || []
  )
};

// Update properties based on editData
editData.forEach((editItem) => {
  const projectKey = initialProjectDetails.projectID.find((p) => p.projectId === editItem.projectId)?.projectName;
  if (projectKey) {
    initialProjectDetails[projectKey] = {
      description: editItem.description || "",
      employeename: editItem.employeename || "",
      hours: editItem.hours || "",
      projectId: editItem.projectId || "",
      projectName: editItem.projectName || ""
    };
  }
});

// Log the updated initialProjectDetails
console.log(initialProjectDetails);


// If editData is not empty, update the initial state
if (editData) {
  editData.forEach((editItem) => {
    for (const [key, value] of Object.entries(editItem)) {
      if (initialProjectDetails.hasOwnProperty(key)) {
        initialProjectDetails[key] = { ...initialProjectDetails[key], ...value };
      }
    }
  });
  console.log(initialProjectDetails,"initialProjectDetails")
}

const [projectDetails, setProjectDetails] = useState(initialProjectDetails);


  const handleTextFieldChange = (projectname, field, value) => {
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [projectname]: { ...(prevDetails[projectname] || {}), [field]: value },
    }));
  };
  console.log(projectDetails,"projectDetails",projectData,editData)

  // eventdata print 
  // console.log( eventData," eventDataeventData")

  // dates 
  console.log(date,"datedatedate")
  return (
  
  <>
{/* <h1>hello</h1> */}


<FormProvider methods={methods} onSubmit={onSubmit}>
<DialogContent>
<Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  // xs: 'repeat(1, 1fr)',
                  // sm: 'repeat(7, 1fr)',
                }}
              >
{projectData?.projectID?.length > 0 && (
  <>
    {projectData.projectID.map((project) => (
        <Grid container spacing={1} mt={0.4} key={project.projectId}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={`${project.projectName} hours`}
              value={(projectDetails[project.projectName]?.hours || '')}
              onChange={(e) =>
                handleTextFieldChange(project.projectName, 'hours', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={`${project.projectName} des`}
              value={(projectDetails[project.projectName]?.des || '')}
              onChange={(e) =>
                handleTextFieldChange(project.projectName, 'des', e.target.value)
              }
            />
          </Grid>
        </Grid>
      ))}
  </>
)}
</Box>
</DialogContent>
      <DialogActions>
       

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          // disabled={dateError}
          color='primary'
        >
          Save Changes
        </LoadingButton>
      </DialogActions>
    </FormProvider>
    </>
  );
}
CalendarForm.propTypes = {
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  currentEvent: PropTypes.object,
  onClose: PropTypes.func,
};