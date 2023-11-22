import { useCallback, useEffect, useMemo, useState ,React} from 'react';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import LoadingButton from '@mui/lab/LoadingButton';

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
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';




const TimeSheetSearchFilter = ({currentUser}) => {


   // dialog
    // const values = watch();
    const [projectDetails ,setProjectDetails] = useState([])
    const [activityData ,SetActivityData] = useState([])
    const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
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

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      data.company_id = 'COMP2';
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
      // data.companyID = "COMP1";
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
  return (
    <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            // onChange={(e) => handleSearch(e.target.value)}

            />
            </Grid>
            <Grid md={2} xs={2} sx={{alignSelf:"center",textAlign:"center"}}>
               <Button variant='contained'  sx={{borderRadius:"4px"}}  onClick={handleOpen }>Add Timesheet</Button>
              
               {/* onClick={buttonFunction} */}
            </Grid>

            <Grid md={2} xs={2} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
        {/* <Badge badgeContent={""} color="error"  anchorOrigin={{
    vertical: 'up',
    horizontal: 'left',
  }} > */}
 
            <Button style={{width:"80px"}}  >
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

<Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'8px'}}>
                ADD YOUR TIMELINE TO PROJECT IS HERE .....
              </Typography>
              <Typography sx={{marginLeft:'8px'}}>
                Time Sheet
              </Typography>
            </Grid>
            
               <Grid container spacing={1} >
                <Grid item xs={12} sm={6} fullWidth>
                < Autocomplete
                
            // disablePortal
            id="cobo-box-demo"
            options={projectDetails || []}
            value={currentProjectData.projectId}
            getOptionLabel={(option) => option.projectcdName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentProjectData(newvalue
              )
              
           
            }}
          
            renderInput={(params) => <TextField {...params} label="Project Name" />}
          /></Grid>
          <Grid item  xs={12} sm={6} fullWidth>
                <Autocomplete
            disablePortal
            id="combo-box-dmo"
            options={activityData || []}
            value={currentActivitytData.activityId}
            getOptionLabel={(option) => option.activityName}
            onChange={(e,newvalue)=>{
             
             
              setCurrentActivitytData(newvalue
              )
             
           
           
            }}
         
            renderInput={(params) => <TextField {...params} label="Activity Name" />}
          />
          </Grid>
          </Grid>
          <Typography>Monday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <RHFTextField name="monday" label="monday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="tuesday" label="tuesday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="wednseday" label="wednseday" />
                </Grid>
               
                

                </Grid>
                <Typography>Tuesday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <RHFTextField name="monday" label="monday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="tuesday" label="tuesday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="wednseday" label="wednseday" />
                </Grid>
               
                

                </Grid>
                <Typography>Wednesday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <RHFTextField name="monday" label="monday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="tuesday" label="tuesday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="wednseday" label="wednseday" />
                </Grid>
               
                

                </Grid>
                <Typography>Thursday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <RHFTextField name="monday" label="monday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="tuesday" label="tuesday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="wednseday" label="wednseday" />
                </Grid>
               
                

                </Grid>
                <Typography>Friday</Typography>
          <Grid container spacing={1}>
            
               <Grid item sm={4}>
                <RHFTextField name="monday" label="monday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="tuesday" label="tuesday" />
                </Grid>
                <Grid item sm={4}>
                <RHFTextField name="wednseday" label="wednseday" />
                </Grid>
               
                

                </Grid>
                
             
              </Box>
    
            
             <DialogActions>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'Add  Timeline'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}}  onClick={handleClose}>Cancel</Button>
              </Stack>
             </DialogActions>
           
      
        </DialogContent>
      </FormProvider>
      </Dialog>
     

    



   
    </>
  )
}

export default TimeSheetSearchFilter