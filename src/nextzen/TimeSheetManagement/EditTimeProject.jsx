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

export default function EditTimeProject({ currentUser,handleClose ,tableEDitData}) { 
  console.log("🚀 ~ file: EditTimeProject.jsx:40 ~ EditTimeProject ~ tableEDitData:", tableEDitData)
  const[commaSeparatedString,setCommaSepaatedString]=useState("")
  const[commaSepaatedEmployeString,setCommaSepaatedEmployeString]=useState("")
  const [datesUsed, setDatesUsed] = useState({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    dueDate: dayjs(new Date()),
    // activity_name:[]
  });


useEffect(() => {
  getEmployeReport1()
  // if (Array.isArray(currentReportingData) && currentReportingData.length > 0) {
  //   const firstEmployeeId = currentReportingData[0].employeeId;
  //   if (firstEmployeeId !== 0) {
  //     getEmployeList1();
  //   }
  // }

}, [])


  const [activity_name, setSelectedActivity] = useState([]);
  const [project_manager, setProject_manager] = useState([]);
  const [currentReportingData, setCurrentReportingData] = useState({});
  const [currentEmployeData, setCurrentEmployeData] = useState([]);
  const [employesListData,setEmployesListData]= useState([])
  const [EmployeList,setemployeeList]= useState([])
  console.log("🚀 ~ file: EditTimeProject.jsx:66 ~ EditTimeProject ~ employesListData:", employesListData)
  console.log("🚀 ~ file: EditTimeProject.jsx:56 ~ EditTimeProject ~ currentReportingData:", currentReportingData.employeeId)
  // const ReportingManager = currentReportingData.map()
  const handleSelectChange = (event, values) => {
    setSelectedActivity(values);
      console.log("🚀 ~ file: EditTimeProject.jsx:72 ~ handleSelectChange ~ values:", values)
      
     setCommaSepaatedString(activity_name.join(','))
  };
  const handleSelectEmployeChange = (event, values) => {
    setCurrentEmployeData(values);
     console.log("🚀 ~ file: EditTimeProject.jsx:79 ~ handleSelectEmployeChange ~ values:", values)
    //  setemployeeList ( currentEmployeData[0]?.employeeId);
      
    // setCommaSepaatedEmployeString(EmployeList.join(','))
  };

  const handleSelectRepoChange = async (event, values) => {
    setCurrentReportingData(values);
    console.log("🚀 ~ file: EditTimeProject.jsx:88 ~ handleSelectRepoChange ~ values:", values)
    await getEmployeList1(values.employeeId)
      
    // SetCommaSeparatedRepoString (values.join(','))
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    // project_name: Yup.string(),
    // startDate: Yup.string(),
    // endDate: Yup.string(),
    // dueDate: Yup.string().required('First Name is Required'),
    status: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        // project_name: currentUser?.project_name || '',
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
console.log("🚀 ~ file: EditTimeProject.jsx:102 ~ EditTimeProject ~ reportingManager:", reportingManager)


const getEmployeReport1 = async ()=>{
  try{
  const  data= {
      companyId:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
     
    };
    const response = await instance.post('/getReportingmanager',data);
    setReportingManagerData(response.data.list)
    console.log("🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport1 ~ response.data:", response.data)
  }catch(error){
console.error("Error", error);
throw error;
  }
}
let getEmployeList1 = async (props)=>{
  try{
  const  data= {
      companyId:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      reportinManagerId:currentReportingData[0]?.employeeId,
    };
    data.reportingManagerId =props;
    console.log("🚀 ~ file: EditTimeProject.jsx:149 ~ getEmployeList1 ~ data:", data)
    const response = await instance.post('/employeereporting',data);
    setEmployesListData(response.data.list)
    console.log("🚀 ~ file: EditTimeProject.jsx:119 ~ getEmployeReport1 ~ response.data:", response.data)
  }catch(error){
console.error("Error", error);
throw error;
  }
}

const join=()=>{
  const arr=[];
  for(let i=0;i<currentEmployeData.length;i+=1){
    arr.push(currentEmployeData[i].employeeId);
  }
  
  
  // ["empl1","emp2","emp3"];
  
  console.log("🚀 ~ file: EditTimeProject.jsx:176 ~ join ~ commaSepaatedEmployeString:", commaSepaatedEmployeString)
  console.log("🚀 ~ file: EditTimeProject.jsx:183 ~ join ~ arr:", arr)
  return arr;

  // ["anil","aswin"]
  // ["aswin,"]
}

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: EditTimeProject.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      // data.company_id = '0001';
      // data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.dueDate = formatDateToYYYYMMDD(datesUsed?.dueDate);
      data.endDate = formatDateToYYYYMMDD(datesUsed?.endDate);
      data.startDate = formatDateToYYYYMMDD(datesUsed?.startDate);
    //   data.activity_name = [commaSeparatedString];
      data.projectManager =currentReportingData?.employeeId;
      data.status = tableEDitData.status;
      data.projectId =JSON.stringify( tableEDitData?.projectID);
    //   data.lastupdated = dayjs(new Date());
      data.employeeId =join();
    //   data.delete =   0;
      

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('updateproject', data).then(
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

 
  const top100Films = [
    { title: 'Approve', year: 1994 },
    { title: 'Pending', year: 1972 },
    { title: 'Reject', year: 1974 },

  ];
  const startDate = tableEDitData?.startDate ? dayjs(tableEDitData.startDate, 'YYYY-MM-DD') : dayjs(new Date());
  const endDate = tableEDitData?.endDate ? dayjs(tableEDitData.endDate, 'YYYY-MM-DD') : dayjs(new Date());
  const dueDate = tableEDitData?.dueDate ? dayjs(tableEDitData.dueDate, 'YYYY-MM-DD') : dayjs(new Date());
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>

          <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'5px'}}>
                EDIT YOUR  POJECT  HERE .....
              </Typography>
            </Grid>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <TextField  label=" Project Name"  value={tableEDitData.projectName}  readOnly/>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Start date"
                      value={startDate}
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="End date"
                      value={endDate}
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Due Date"
                      value={dueDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          dueDate: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                {/* <RHFTextField name="status" label="status" value={tableEDitData.status}  readOnly /> */}
     <Grid md={10} xs={12} item>

     <Autocomplete
        // multiple
        id="status"
        options={top100Films.map((option) => option.title)}
        freeSolo
        onChange={handleSelectChange} // Attach the handleSelectChange function
        value={tableEDitData.status} // Pass the selected values
        renderTags={(value1, getTagProps) =>
          value1.map((option, index1) => (
            <Chip variant="" label={option} {...getTagProps({ index1 })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="status"
            placeholder="Favorites"
          />
        )}
      />

</Grid>
                <RHFTextField name="activityName" label="Activity Name" value={tableEDitData.activityName}  readOnly />
<Grid md={10} xs={12} item>
<Autocomplete
            
            disablePortal
            id="combo-box-demo"
            options={reportingManager || []}
            value={currentReportingData}
            getOptionLabel={(option) => option.firstName}
            // onChange={(e,newvalue)=>{
             
             
            //   setCurrentReportingData(newvalue
                
            //   );
              
             
              // const obj={
              //   company_id:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
              //   reporting_manager_id:newvalue?.employeeId
              // }
 
              // ApiHitDepartment(obj)
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
           
            // }}
            onChange={handleSelectRepoChange}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Project Manager" />}
          />
</Grid>

<Grid md={10} xs={12} item>
<Autocomplete
            multiple
            disablePortal
            id="hfh"
            options={employesListData || []}
            value={currentEmployeData}
            getOptionLabel={(option) => option.firstName}
            // onChange={(e,newvalue)=>{
             
             
            //   setCurrentEmployeData(newvalue
                
            //   );
              
             
              // const obj={
              //   company_id:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
              //   reporting_manager_id:newvalue?.employeeId
              // }
 
              // ApiHitDepartment(obj)
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
           
            // }}
            onChange={handleSelectEmployeChange}
            sx={{
              width: { xs: '100%', sm: '50%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label=" Select employee" />}
          />
</Grid>

              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Update Project'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}} onClick={handleClose}>Cancel</Button>
              </Stack>
             
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

EditTimeProject.propTypes = {
  currentUser: PropTypes.object,
  handleClose: PropTypes.func,
};
