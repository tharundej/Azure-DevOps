import PropTypes from 'prop-types';
import { useCallback, useState,useEffect, useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Stack,Button,Tooltip,IconButton,DialogActions,Typography,MenuItem,Card,Grid} from '@mui/material';

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
import formatDateToYYYYMMDD from '../../../global/GetDateFormat';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { LoadingScreen } from 'src/components/loading-screen';
import UserContext from 'src/nextzen/context/user/UserConext';
// ----------------------------------------------------------------------

export default function CalendarForm({ currentEvent, colorOptions,selectedRange,onClose }) {
  const {user} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();
  const [attachmentString,setAttachmentString] = useState("");
  const [listLeave,setListLeave] = useState();
  const [loader,setLoader] = useState(false);
  const [availableLeaves,setAvailableLeaves]= useState();
  const EventSchema = Yup.object().shape({
    leaveTypeId:Yup.number(),
    companyId:Yup.string(),
    employeeId:Yup.string(),
    fromDate: Yup.string(),
    toDate: Yup.string(),
    comments: Yup.string(),
    applyDate:Yup.mixed(),
    status:Yup.string(),
    fullday:Yup.string(),
    firsthalf:Yup.string(),
    secondhalf:Yup.string(),
    attachment:Yup.string(),
    statusDate:Yup.string(),
    color:Yup.string()
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
      color:(data?.leaveTypeId===1)?"#0c1f31":(data?.leaveTypeId===2)?"#d4a085":(data?.leaveTypeId===3)?"#c9de8c":"#ffbed1"
    };
    try {
      const result = await createEvent(eventData,user);
      onClose();
      enqueueSnackbar(result.message, { variant: 'success' });
      reset();
    } 
    catch (error) {
      enqueueSnackbar(error.message,{variant:'error'})
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

 function handleFileSelect(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result;
      setAttachmentString(base64String.split(',')[1]);
      // setImage( [base64String]);
      // setViewImage(true);
      // Here, you can send the `base64String` to your server or perform other actions.
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

  return (
  
  <>
  {currentEvent?.leaveStatus==="pending" ? 
  <>
  
  <Grid sx={{margin:1}}>
      <Typography variant="subtitle2">Applied Leave: {currentEvent?.leaveTypeName}
      <Tooltip title="Delete Event" sx={{float:"right",right:5}}>
    <IconButton onClick={onDelete}>
      <Iconify icon="solar:trash-bin-trash-bold" />
    </IconButton>
  </Tooltip></Typography>
      <Typography variant="subtitle2">From Date: {currentEvent?.fromDate}</Typography>
      <Typography variant="subtitle2">To Date: {currentEvent?.toDate}</Typography>
     <Typography variant="subtitle2">Status: {currentEvent?.leaveStatus}</Typography>
      
  </Grid>
   
  </>
  : (currentEvent?.leaveStatus==="approved")?
  <Grid sx={{marginLeft:1}}>
      <Typography variant="subtitle2">Applied Leave: {currentEvent?.leaveTypeName}</Typography>
      <Typography variant="subtitle2">From Date: {currentEvent?.fromDate}</Typography>
      <Typography variant="subtitle2">To Date: {currentEvent?.toDate}</Typography>
      <Typography variant="subtitle2">Status: {currentEvent?.leaveStatus}</Typography>
  </Grid>
  :
  <>
   {loader?<Card sx={{height:"70vh"}}><LoadingScreen/></Card>:  
    <FormProvider methods={methods} onSubmit={onSubmit}>
<div style={{marginLeft:"25px",fontWeight:"700"}}>Available Leaves</div>
<Stack spacing={1} sx={{display:"flex",px:3,mb:2}}> 
  {availableLeaves?.balances?.map((itm)=> (
    <Typography>{itm?.leaveTypeName} : {itm?.leaveBalance}</Typography>
  ))}
</Stack>
      <Stack spacing={3} sx={{ px: 3 }}>
     <RHFSelect name="leaveTypeId" label="Leave Type">
              {listLeave?.map((status) => (
                <MenuItem value={status.leaveTypeID} key={status.leaveTypeID}>
                  {status.leaveTypeName}
                </MenuItem>
              ))}
            </RHFSelect> 
     <RHFTextField sx={{minHeight:"25px"}} fullWidth name="comments" label="Comments" />
     <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%', paddingLeft: '3px' }}
                label="From"
                value={(selectedRange?.start)?dayjs(selectedRange?.start):datesUsed?.fromDate}
                defaultValue={(selectedRange?.start)?dayjs(selectedRange?.start):dayjs(new Date())}
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
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                toDate: newValue,
              }));
            }}
          />
     </DemoContainer>
     </LocalizationProvider>
        {(isSameDay)? <RHFRadioGroup
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
<Typography variant="subtitle2">Attachments</Typography>
<input
  type="file"
  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  id="fileInput"
  onChange={(e)=>{
    handleFileSelect(e)
  }}
/>
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
          Save Changes
        </LoadingButton>
      </DialogActions>
    </FormProvider>}
    </>}</>
  );

}

CalendarForm.propTypes = {
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  currentEvent: PropTypes.object,
  onClose: PropTypes.func,
};