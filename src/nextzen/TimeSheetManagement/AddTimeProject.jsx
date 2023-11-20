import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import instance  from 'src/api/BaseURL';
import { Autocomplete } from '@mui/lab';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import formatDateToYYYYMMDD from '../global/GetDateFormat';
export default function AddTimeProject({ currentUser,handleClose }) {
  const[commaSeparatedString,setCommaSepaatedString]=useState("")
  const[commaSepaatedEmployeString,setCommaSepaatedEmployeString]=useState("")
  const [datesUsed, setDatesUsed] = useState({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    dueDate: dayjs(new Date()),
    // activityName:[]
  });
useEffect(() => {
  getEmployeReport()
  // if (Array.isArray(currentReportingData) && currentReportingData.length > 0) {
  //   const firstemployeeId = currentReportingData[0].employeeId;
  //   if (firstemployeeId !== 0) {
  //     getEmployeList();
  //   }
  // }
}, [])
  const [activityName, setSelectedActivity] = useState([]);
  const [projectManager, setprojectManager] = useState([]);
  const [currentReportingData, setCurrentReportingData] = useState([]);
  const [currentEmployeData, setCurrentEmployeData] = useState([]);
  const [employesListData,setEmployesListData]= useState([])
  const [EmployeList,setemployeeList]= useState([])
  // const ReportingManager = currentReportingData.map()
  const handleSelectChange = (event, values) => {
    setSelectedActivity(values);
      
     setCommaSepaatedString(activityName.join(','))
  };
  const handleSelectEmployeChange = (event, values) => {
    setCurrentEmployeData(values);
  };
  const handleSelectRepoChange = async (event, values) => {
    setCurrentReportingData(values);
    await getEmployeList(values[0]?.employeeId)
      
    // SetCommaSeparatedRepoString (values.join(','))
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    projectName: Yup.string(),
    // startDate: Yup.string(),
    // endDate: Yup.string(),
    // dueDate: Yup.string().required('First Name is Required'),
    status: Yup.string(),
   
   
  });
  const defaultValues = useMemo(
    () => ({
   
        projectName: currentUser?.projectName || '',
        startDate: currentUser?.startDate || '',
        endDate: currentUser?.endDate || '',
        dueDate: currentUser?.dueDate || '',
        status: currentUser?.status || '',
  
   
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
  const values = watch();
const [sendData, setSendData] = useState({
  projectId : '',  
})
const [reportingManager,setReportingManagerData]= useState([])
const getEmployeReport = async ()=>{
  try{
  const  data= {
      companyId:'COMP1',
     
    };
    const response = await instance.post('getReportingmanager',data);
    setReportingManagerData(response.data.list)
  }catch(error){
console.error("Error", error);
throw error;
  }
}
let getEmployeList = async (props)=>{
 
  try{
  const  data= {
      companyId:'COMP1',
      reportingManagerId:currentReportingData[0]?.employeeId,
    };
    data.reportingManagerId =props;
    const response = await instance.post('employeereporting',data);
    setEmployesListData(response.data.list)
  }
  catch(error)
  {
    throw error;
  }
}
const join=()=>{
  const arr=[];
  for(let i=0;i<currentEmployeData.length;i+=1){
    arr.push(currentEmployeData[i].employeeId);
  }
  
  return arr;
}
  const onSubmit = handleSubmit(async (data) => {
    try {
      // data.companyId = '0001';
      // data.company_name = 'infbell';
      // const FinalDal=data+"companyId": "0001"+"company_name": "infbell",
      data.endDate = formatDateToYYYYMMDD(datesUsed?.endDate);
      data.startDate = formatDateToYYYYMMDD(datesUsed?.startDate);
      data.projectManager=data?.projectManager?.employeeId
      data.companyId = "COMP2";
      data.employeeId =join();
      data.delete =   0;
      const response = await instance.post('addProject', data).then(
        (successData) => {
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
 
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography variant="subtitle2" sx={{marginLeft:'5px'}}>
                ADD PROJECT
              </Typography>
            </Grid>
            <Card sx={{ p: 1 }}>
            <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <RHFTextField name="projectName" label="Project Name" fullWidth/>
              </Grid>
                <Grid md={6} xs={12} item>
                    <RHFTextField name="projectDescription" label="Project Description"/>
                </Grid>
            </Grid>
<Grid container spacing={2}>
   <Grid item md={6} xs={12}>
   <RHFAutocomplete
          name="projectManager"
          label="Project Manager"
          options={reportingManager}
          getOptionLabel={(option) => option.firstName}
          isOptionEqualtoValue={(option) => option.employeeId}
          />    
   </Grid>
   <Grid item md={6} xs={12}>
   <RHFAutocomplete
          name="reportingManager"
          label="Reporting Manager"
          options={reportingManager}
          getOptionLabel={(option) => option.firstName}
          isOptionEqualtoValue={(option) => option.employeeId}
          />
   </Grid>
</Grid>
<Grid container spacing={2}>
<Grid item md={6} xs={12}>
    
<LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Start date"
                      value={datesUsed?.startDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          startDate: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
</Grid>
                           <Grid item md={6} xs={12}>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="End date"
                      value={datesUsed?.endDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          date_of_birth: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                           </Grid>
</Grid>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                save Project
                </LoadingButton>
                <Button sx={{ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}
AddTimeProject.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
