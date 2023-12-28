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
import axios from 'axios';
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

console.log(projectInfo,"data from calendar time sheet",projectData,projectData?.projectID.length)
//  to store data




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



console.log(editData,"editttttttdata",projectInfo)
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
  // employeeName: projectInfo?.employeeName,
  companyId: "COMP22",
  employeeId:"GANG12",
  // projectID: [
  //   { "projectId": 1, "projectName": "ERP" },
  //   { "projectId": 3, "projectName": "ACCOUNTS" }
  // ],
  dateOfActivity: date?.start,
  // Dynamically create properties for each project with empty values
  ...Object.fromEntries(
    projectInfo?.projectID?.map((project) => [
      project.projectName,
      { description: "", 
      // employeename: "", 
      hours: "", 
      projectId: "", 
      // projectName: "" 
    }
    ]) || []
  ),
  // Update properties based on editData
  
  ...Object.fromEntries(
    editData?.map((editItem) => [
      Object.keys(editItem)[0], // Get the project name from the object
      {
        description: editItem[Object.keys(editItem)[0]].description || "",
        hours: editItem[Object.keys(editItem)[0]].hours || "",
        projectId: editItem[Object.keys(editItem)[0]].projectId || "",
      }
    ]) || []
  )
  
};

// 3rd method
// const initialProjectDetails = {
//   employeeName: projectInfo?.employeeName,
//   companyId: "COMP1",
//   // projectID: [
//   //   { "projectId": 1, "projectName": "ERP" },
//   //   { "projectId": 3, "projectName": "ACCOUNTS" }
//   // ],
//   projectData:[],
//   todayDate: date?.start,
//   // Dynamically create properties for each project with empty values
//   ...Object.fromEntries(
//     projectInfo?.projectID?.map((project) => [
//       project.projectName,
//       { description: "", hours: "" }
//     ]) || []
//   ),
//   // Initialize the projectData property
//   projectData: [],
// };

// Update properties based on editData
// editData?.forEach((editItem) => {
//   const projectName = editItem.projectName;

//   // Check if the project already exists in projectData
//   const existingProject = initialProjectDetails.projectData.find(
//     (project) => project.projectName === projectName
//   );

//   // If the project exists, update its properties; otherwise, create a new project
//   if (existingProject) {
//     existingProject.description = editItem.description || "";
//     existingProject.hours = editItem.hours || "";
//   } else {
//     initialProjectDetails.projectData.push({
//       projectName,
//       description: editItem.description || "",
//       hours: editItem.hours || "",
//     });
//   }
// });

// Log the updated initialProjectDetails
console.log(initialProjectDetails);




// // If editData is not empty, update the initial state
// if (editData) {
//   editData.forEach((editItem) => {
//     for (const [key, value] of Object.entries(editItem)) {
//       if (initialProjectDetails.hasOwnProperty(key)) {
//         initialProjectDetails[key] = { ...initialProjectDetails[key], ...value };
//       }
//     }
//   });
//   console.log(initialProjectDetails,"initialProjectDetails")
// }

const [projectDetails, setProjectDetails] = useState(initialProjectDetails);

console.log(projectDetails,"projectDetails12")
const handleTextFieldChange = (projectname, field, value, projectId) => {
  console.log(projectId,"projectId12345")
  setProjectDetails((prevDetails) => ({
    ...prevDetails,
    [projectname]: {
      ...(prevDetails[projectname] || {}),
      [field]: value,
      projectId: typeof projectId === 'number' ? projectId.toString() : projectId
      // [field1]: value1, // Add the additional field and value
    },
  }));
};

  // project data updation
  // const handleTextFieldChange = (projectname, field, value) => {
  //   setProjectDetails((prevDetails) => {
  //     const updatedProjectDetails = {
  //       ...prevDetails,
  //       [projectname]: {
  //         ...(prevDetails[projectname] || {}),
  //         [field]: value,
  //       },
  //     };
  
  //     // Extract projectData array from updatedProjectDetails
  //     const projectDataArray = Object.keys(updatedProjectDetails)
  //       .filter(
  //         (key) =>
  //           key !== "employeeName" &&
  //           key !== "todayDate" &&
  //           key !== "companyId" &&
  //           key !== "projectID"
  //       )
  //       .map((key) => ({
  //         projectName: key,
  //         ...updatedProjectDetails[key],
  //       }));
  
  //     return {
  //       ...updatedProjectDetails,
  //       projectData: projectDataArray,
  //     };
  //   });
  // };
  

  // const handleTextFieldChange = (projectId, field, value) => {
  //   setProjectDetails((prevDetails) => ({
  //     ...prevDetails,
  //     projects: prevDetails.projects.map((project) =>
  //       project.projectId === projectId
  //         ? { ...project, [field]: value }
  //         : project
  //     ),
  //   }));
  // };
  console.log(projectDetails,"projectDetails",projectData,editData)

  // eventdata print 
  // console.log( eventData," eventDataeventData")

  // dates 
  console.log(date,"datedatedate",editData)

  // api hit before
  // Extract projectData array from the input
const projectDataArray = Object.keys(projectDetails)
.filter(
  (key) =>
    key !== "employeeName" &&
    key !== "projectName" &&
    key !== "employeeId" &&
    key !== "dateOfActivity" &&
    key !== "companyId" &&
    key !== "projectID"
)
.map((key) => ({
  // projectName: key,
  ...projectDetails[key]
}));

// Create the final output object
const output = {
...projectDetails,
projectData: projectDataArray
};

// for deleting
// ["employeeName", "dateOfActivity", "companyId", "projectID"].forEach((key) => {
//   delete projectDetails[key];
// });
console.log(projectDetails,"projectDetails")
console.log(projectDataArray,"projectDataArray",output)

// api hit 
const onSubmitEdit2 = async (editData, event) => {


  try {
    event.preventDefault();     
    console.log(editData, "editDataeditData")
    const keysToKeep = ["employeeId","employeeName", "dateOfActivity",  "projectData","companyId", ];

// Extract the keys you want to keep and create a new object
const keptKeysObject = Object.fromEntries(
  Object.entries(editData).filter(([key]) => keysToKeep.includes(key))
);

const projectDataArray = Object.keys(editData)
  .filter((key) => !keysToKeep.includes(key))
  .map((key) => ({
    // projectName: key,
    ...editData[key]
  }));

// Create the final output object
const output = {
  ...keptKeysObject,
  projectData: projectDataArray
};

console.log(output);


    
    const response = await axios.post( baseUrl +"/newupdateTimeSheet", output).then(
      (res) => {
        console.log('sucess', res);
        
      },
      (error) => {
        console.log('lllll', error);
       
      }
    );
  } catch (error) {
    console.error(error);
   
  }
}
  return (
  
  <>
{/* <h1>hello</h1> */}


<FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(output, event)}>
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
                handleTextFieldChange(project.projectName, 'hours', e.target.value, project.projectId)
                
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={`${project.projectName} description`}
              value={(projectDetails[project.projectName]?.description|| '')}
              onChange={(e) =>
                handleTextFieldChange(project.projectName, 'description', e.target.value, project.projectId)
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