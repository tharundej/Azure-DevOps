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
import MenuItem from '@mui/material/MenuItem';
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
  RHFSelect,
} from 'src/components/hook-form';
import axios from 'axios';
import instance  from 'src/api/BaseURL';
import { Autocomplete } from '@mui/lab';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import formatDateToYYYYMMDD from '../global/GetDateFormat';
import { baseUrl } from '../global/BaseUrl';
export default function AddTimeProject({ handleClose }) {
 
  const [datesUsed, setDatesUsed] = useState({
    startDate: '',
    endDate: '',
    actualStartDate:'',
    actualEndDate:''
  });
useEffect(() => {
  getEmployeReport(),
  getLocation()
 
}, [])
  const [employesListData,setEmployesListData]= useState([])
 const [locationList,setLocationList] = useState([])
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    projectName: Yup.string(),
    startDate: Yup.string(),
    endDate: Yup.string(),
    actualStartDate:Yup.string(),
    actualEndDate:Yup.string(),
    projectDescription:Yup.string(),
    status: Yup.string(),
   
   
  });
  const defaultValues = useMemo(
    () => ({
   
        projectName:'',
        startDate:'',
        endDate: '',
        status:'',
        actualStartDate:'',
        actualEndDate:'',
        projectDescription:''
  
   
    }),
    []
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

const [reportingManager,setReportingManagerData]= useState([])
const getEmployeReport = async ()=>{
  try
  {
  const  data= {
      companyId:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    };
    const response = await instance.post('getReportingmanager',data);
    setReportingManagerData(response.data.list)
  }
  catch(error){
throw error;
  }
}
let getEmployeList = async (props)=>{
 
  try{
  const  data= {
      companyId:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      reportingManagerId:'',
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

  const onSubmit = handleSubmit(async (data) => {
    try {
   
      data.endDate = datesUsed?.endDate;
      data.startDate = datesUsed?.startDate;
      data.actualStartDate=datesUsed?.actualStartDate;
      data.actualEndDate=datesUsed?.actualEndDate;
      data.projectManager=data?.projectManager?.employeeId;
      data.reportingManager= data?.reportingManager?.employeeId;
      data.locationId = selectedLocationID,
      data.companyId = JSON.parse(localStorage.getItem('userDetails'))?.companyID;
      const response = await axios.post('https://kz7mdxrb-3001.inc1.devtunnels.ms/erp/addProject', data).then(
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
  const [selectedLocationID, setSelectedLocationID] = useState(null); 
  const handleLocationSelection = (selectedOption) => {
    if (selectedOption) {
      setSelectedLocationID(selectedOption.locationID); 
     
    }
  };

  console.log(selectedLocationID,"selectedlocationID")
  const getLocation=()=>{
    const data={
      "companyID":JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    }
     const config={
      method:'POST',
      maxBodyLength:Infinity,
      url:baseUrl + '/locationOnboardingDepartment',
      data:data
     }
     axios.request(config).then((response)=>{
      setLocationList(response?.data?.data)
     })
     .catch((error)=>{
      console.log(error)
     })
  }
 
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography variant="subtitle2" sx={{textAlign:'center'}}>
                ADD PROJECT
              </Typography>
            </Grid>
            <Card sx={{ p: 1 }}>
            <Grid container spacing={2}>
             <Grid item md={6} xs={12}>
                <RHFTextField name="projectName" label="Project Name" fullWidth/>
              </Grid>
               <Grid item md={6} xs={12}>
               <RHFAutocomplete
          name="locationId"
          label="Location"
          options={locationList}
          getOptionLabel={(option) => option.locationName}
          isOptionEqualtoValue={(option) => option.locationId}
          onChange={(event, selectedOption) => handleLocationSelection(selectedOption)}
          />  
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
<Grid container sx={{mt:1}}>
            <Grid md={12} xs={12} item>
                    <RHFTextField name="projectDescription" label="Project Description"/>
                </Grid>
            </Grid>
<Grid container spacing={2} >
<Grid item md={6} xs={12}>
    
<LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Start date"
                      value={datesUsed?.startDate?dayjs(datesUsed?.startDate):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          startDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={datesUsed?.endDate?dayjs(datesUsed?.endDate):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          endDate: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                           </Grid>
</Grid>

<Grid container spacing={2}>
<Grid item md={6} xs={12}>
    
<LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Actual Start date"
                      value={datesUsed?.actualStartDate?dayjs(datesUsed?.actualStartDate):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          actualStartDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      label="Actual End date"
                      value={datesUsed?.actualEndDate?dayjs(datesUsed?.actualEndDate):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          actualEndDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
  handleClose: PropTypes.func,
};
