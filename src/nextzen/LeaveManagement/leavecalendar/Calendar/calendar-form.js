import PropTypes from 'prop-types';
import { useCallback, useState,useEffect, useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Stack,Button,Tooltip,IconButton,DialogActions,Typography,MenuItem,Card,Grid,CardContent} from '@mui/material';

// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { createEvent, updateEvent, deleteEvent, useGetEvents } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField,RHFRadioGroup,RHFSelect } from 'src/components/hook-form';

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
export default function CalendarForm({ currentEvent, colorOptions,selectedRange,onClose }) {

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
      await deleteEvent(leaveId,employeeId,user);
      enqueueSnackbar('Delete success!');
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
  setFileName(file.name)
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


const getLeaveList = () => {
  setLoader(true);
  const payload = {
    companyId: (user?.companyID)?user?.companyID:'',
    employeeId: (user?.employeeID)?user?.employeeID:''
  }
  const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: baseUrl + `/getLeaveType`,
    data:  payload
  };

  axios.request(config).then((response) => {
    setLoader(false);
    setListLeave(response?.data?.list)
  })

    .catch((error) => {
      enqueueSnackbar(`Error: ${error.response?.data?.message || "Something went wrong"}`, { variant: 'error' });
      console.log(error);
      setLoader(false);
    });
}

const AvailableLeaves = () => {
  setLoader(true);
  const payload = {
    companyId: (user?.companyID)?user?.companyID:'',
     employeeId:(user?.employeeID)?user?.employeeID:''
  }
 
  const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: baseUrl + `/availableLeave`,
    data:  payload
  };

  axios.request(config).then((response) => {
    setLoader(false);
    setAvailableLeaves(response?.data)
  })

    .catch((error) => {
         enqueueSnackbar(`Error: ${error.response?.data?.message || "Something went wrong"}`, { variant: 'error' });
      console.log(error);
      setLoader(false);
    });
}

const isSameDay = dayjs(datesUsed.fromDate).isSame(datesUsed.toDate, 'day');

const lossOfPay = ()=>{
  const payload = {
  companyId: user?.companyID,
  employeeId: user?.employeeID,
  leaveTypeId: leaveType,
  fromDate: formatDateToYYYYMMDD(datesUsed?.fromDate),
  toDate: formatDateToYYYYMMDD(datesUsed?.toDate)
  }
  const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    // url:`https://g3nshv81-3001.inc1.devtunnels.ms/erp/getLossOfPay`,
    url:baseUrl+'/getLossOfPay',
    data:  payload
  };
  axios.request(config).then((response) => {
    setLOP(response?.data)
    // enqueueSnackbar((response?.data?.lop), { variant: 'success' ,autoHideDuration:3000});
   console.log(response,"response dataa")
  })

    .catch((error) => {
      console.log(error,"error in loss of pay");
     
    });

}


  return (
  
  <>
  {currentEvent?.leaveStatus==="pending" ? 
  <>
  
  <Grid sx={{margin:1}}>
      <Typography variant="subtitle2">Applied Leave: {currentEvent?.leaveTypeName}
      <Tooltip title="Delete Request" sx={{float:"right",right:5}}>
    <IconButton onClick={onDelete}>
      <Iconify icon="solar:trash-bin-trash-bold" />
    </IconButton>
  </Tooltip></Typography>
      <Typography variant="subtitle2">From Date: {formatDate(currentEvent?.fromDate)}</Typography>
      <Typography variant="subtitle2">To Date: {formatDate(currentEvent?.toDate)}</Typography>
     <Typography variant="subtitle2">Status: 
     <Label variant="soft" color={(currentEvent?.leaveStatus=="Pending" || currentEvent?.leaveStatus=="pending")?"warning":"success"}>
     {currentEvent?.leaveStatus}
      </Label></Typography>
      
  </Grid>
   
  </>
  : (currentEvent?.leaveStatus==="approved")?
  <Grid sx={{margin:1}}>
      <Typography variant="subtitle2">Applied Leave: {currentEvent?.leaveTypeName}</Typography>
      <Typography variant="subtitle2">From Date: {formatDate(currentEvent?.fromDate)}</Typography>
      <Typography variant="subtitle2">To Date: {formatDate(currentEvent?.toDate)}</Typography>
      <Typography variant="subtitle2">Status:   <Label variant="soft" color={(currentEvent?.leaveStatus=="Pending" || currentEvent?.leaveStatus=="pending")?"warning":"success"}>
     {currentEvent?.leaveStatus}
      </Label></Typography>
  </Grid>
  :
  <>
   {loader?<Card sx={{height:"70vh"}}><LoadingScreen/></Card>:  
    <FormProvider methods={methods} onSubmit={onSubmit}>
    <Typography variant="subtitle1" sx={{ px: 4 }}>Available Leaves</Typography>
<Grid container spacing={1} sx={{ px: 3 , py:2}}>

      {availableLeaves? (
    availableLeaves?.balances?.map((itm) => (
          <Grid item xs={6} md={4} lg={4} key={itm?.leaveTypeId}>
            <Stack direction="row" alignItems="center" spacing={1}>
          
             <Card >
              <CardContent sx={{ px: 1,pt:0.5}} style={{paddingBottom:'2px'}}>
              <Box sx={{ flexGrow: 1,display:'flex' ,alignItems: 'center',justifyContent:'center'}} flexDirection="row">
                <Typography variant="subtitle2">{itm?.leaveTypeName} :</Typography>&nbsp;

                <Typography
                  variant="body2"
                  sx={{
                    color:'black'
                  }}
                >
                 {itm?.leaveBalance}
                </Typography>
              </Box>
              </CardContent>
              </Card>
            </Stack>
          </Grid>
    ))):
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          No AvailableLeaves
        </Typography>
      </Grid>
    }

      </Grid>
      
      <Stack spacing={3} sx={{ px: 3 }}>
     <RHFSelect name="leaveTypeId" label="Leave Type">
              {listLeave?.map((status) => (
                <MenuItem value={status.leaveTypeID} key={status.leaveTypeID}  onClick={() => setLeaveType(status.leaveTypeID)}>
                  {status.leaveTypeName}
                </MenuItem>
              ))}
            </RHFSelect> 
     <RHFTextField sx={{minHeight:"25px"}} fullWidth name="comments" label="Leave Reason" />
     <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%', paddingLeft: '3px' }}
                label="From"
                value={(selectedRange?.start)?dayjs(selectedRange?.start):datesUsed?.fromDate}
                defaultValue={(selectedRange?.start)?dayjs(selectedRange?.start):dayjs(new Date())}
                minDate={dayjs().startOf('day')} // Set minDate to today's date (disable past dates)
                onChange={(newValue) => {
                  setDatesUsed((prev) => ({
                    ...prev,
                    fromDate: newValue,
                  }));
                }}
                
              />
              </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
        
            <DatePicker
            sx={{ width: '100%', paddingLeft: '3px' }}
            label="To"
            value={(selectedRange?.end)?dayjs(selectedRange?.end):datesUsed?.toDate}
            defaultValue={(selectedRange?.end)?dayjs(selectedRange?.end):dayjs(new Date())}
            minDate={dayjs().startOf('day')} // Set minDate to today's date (disable past dates)
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                toDate: newValue,
              }));
            }}
          />
     </DemoContainer>
     </LocalizationProvider>
     <Stack sx={{px: 1,display:'flex',flexDirection:'row'}}>
        {(lop?.lop) ? <>Loss of Pay : <span style={{color:'red'}}>{lop?.lop}</span></>:null}
      </Stack>
      <Stack  sx={{ px: 1 }}>
      {(isSameDay)? <RHFRadioGroup  sx={{ px: 1 }}
              row
              name="day_span"
              label="Day Span"
              spacing={4}
              options={
                [
                { value: 'full_day', label: 'Full Day' },
                { value: 'first_half', label:'First Half' },
                { value: 'second_half', label: 'Second Half' },
              ]}
            />:null}
      </Stack>
<Typography sx={{px:1}} variant="subtitle2">Attachments</Typography>
<Stack spacing={1} sx={{display:'flex',flexDirection:'row'}}>
<Button sx={{marginLeft:2}}
  onChange={(e)=>{ handleFileSelect(e)}}
  component="label" variant="contained" color="primary" startIcon={<CloudUploadIcon />}>Upload file<VisuallyHiddenInput type="file" />
  </Button>
 <Typography variant="subtitle2">{fileName}</Typography>
 </Stack>
{/* <input
  type="file"
  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  id="fileInput"
  onChange={(e)=>{
    handleFileSelect(e)
  }}
/> */}
        {/* <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              selected={field.value}
              onSelectColor={(color) => field.onChange(color)}
              colors={colorOptions}
            />
          )}
        /> */}
      </Stack>

      <DialogActions>
        {!!currentEvent?.leaveId && (
          <Tooltip title="Delete Event">
            <IconButton onClick={onDelete}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isSubmitting}
          // disabled={dateError}
        >
          Apply Leave
        </LoadingButton>
      </DialogActions>
    </FormProvider>}
    </>}
    
{/* Confirmation Dialog I need to keeppppp */}



    </>
  );

}

CalendarForm.propTypes = {
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  currentEvent: PropTypes.object,
  onClose: PropTypes.func,
};