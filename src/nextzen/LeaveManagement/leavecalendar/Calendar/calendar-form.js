import PropTypes from 'prop-types';
import { useCallback, useState,useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Stack,Button,Tooltip,IconButton,DialogActions,Typography,MenuItem} from '@mui/material';

// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { createEvent, updateEvent, deleteEvent } from 'src/api/calendar';
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
// ----------------------------------------------------------------------

export default function CalendarForm({ currentEvent, colorOptions, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [attachmentString,setAttachmentString] = useState("");
  const [listLeave,setListLeave] = useState();
  const [availableLeaves,setAvailableLeaves]= useState();
  const EventSchema = Yup.object().shape({
    leave_type_id:Yup.number(),
    company_id:Yup.string(),
    employee_id:Yup.string(),
    from_date: Yup.string(),
    to_date: Yup.string(),
    comments: Yup.string(),
    apply_date:Yup.mixed(),
    status:Yup.string(),
    fullday:Yup.string(),
    firsthalf:Yup.string(),
    secondhalf:Yup.string(),
    attachment:Yup.string(),
    status_date:Yup.string()
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
    fromDate: dayjs(new Date()),
    toDate: dayjs(new Date()),
    
  });
  const dateError = datesUsed?.fromDate && datesUsed?.toDate ? datesUsed?.fromDate > datesUsed?.toDate : false;
  const onSubmit = handleSubmit(async (data) => {

    const selectedValue = data?.day_span;

    const fulldayValue = selectedValue === "full_day" ? "1" : "0";
    const firsthalfValue = selectedValue === "first_half" ? "1" : "0";
    const secondhalfValue = selectedValue === "second_half" ? "1" : "0";
    
    
  console.log(data, "dataaaaaaaaaaaaaaaa");

    const eventData = {
      leave_type_id:data?.leave_type_id,
      company_id: "C1",
      employee_id:"E1",
      comments: data?.comments,
      apply_date: "",
      from_date: formatDateToYYYYMMDD(datesUsed?.fromDate),
      to_date: formatDateToYYYYMMDD(datesUsed?.toDate),
      status:data?.status,
      fullday:fulldayValue,
      firsthalf:firsthalfValue,
      secondhalf:secondhalfValue,
      attachment: attachmentString,
      status_date:""
    };
    console.log(eventData, "payload dataaaa");
    try {
      if (!dateError) {
        if (currentEvent?.leave_id) {
          await updateEvent(eventData);
          enqueueSnackbar('Update success!');
        } 
        else {
          try {
            await createEvent(eventData);
            // enqueueSnackbar('Create success!', { variant: 'success' });
          }
           catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              // Display the error message from the response
              enqueueSnackbar(error.response.data.message, { variant: 'error' });
            } else {
              // Display a generic error message
              enqueueSnackbar('An error occurred while creating the event.', { variant: 'error' });
            }
          }
        }
        onClose();
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onDelete = useCallback(async () => {
    try {
      await deleteEvent(`${currentEvent?.leave_id}`);
      enqueueSnackbar('Delete success!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [currentEvent?.leave_id, enqueueSnackbar, onClose]);

  
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
      console.log('Base64 string:', base64String.split(',')[1]);
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
  const payload = {
      company_id: "C1"
  }
 
  const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `https://qx41jxft-3001.inc1.devtunnels.ms/erp/getLeaveType`,
    data:  payload
  };

  axios.request(config).then((response) => {
    console.log(response,"responsssee",response?.list)
    setListLeave(response?.data?.list)
  })

    .catch((error) => {
      console.log(error);
    });
}

const AvailableLeaves = () => {
  const payload = {
      company_id: "C1",
      employee_id:"E1"
  }
 
  const config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `https://qx41jxft-3001.inc1.devtunnels.ms/erp/availableLeave`,
    data:  payload
  };

  axios.request(config).then((response) => {
    console.log(response,"responsssee",response?.data)
    setAvailableLeaves(response?.data)
  })

    .catch((error) => {
      console.log(error);
    });
}


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
<div style={{marginLeft:"25px",fontWeight:"700"}}>Available Leaves</div>
<Stack spacing={1} sx={{display:"flex",px:3,mb:2}}> 
  {availableLeaves?.balances.map((itm)=> (
    <Typography>{itm?.leave_type_name} : {itm?.leave_balance}</Typography>
  ))}
</Stack>
      <Stack spacing={3} sx={{ px: 3 }}>
     <RHFSelect name="leave_type_id" label="Leave Type">
              {listLeave?.map((status) => (
                <MenuItem value={status.leave_Type_ID} key={status.leave_Type_ID}>
                  {status.leave_Type_Name}
                </MenuItem>
              ))}
            </RHFSelect> 
     <RHFTextField name="comments" label="Comments" multiline rows={3} />
     <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%', paddingLeft: '3px' }}
                label="From"
                value={datesUsed?.fromDate}
                defaultValue={dayjs(new Date())}
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
            value={datesUsed?.toDate}
            defaultValue={dayjs(new Date())}
            onChange={(newValue) => {
              setDatesUsed((prev) => ({
                ...prev,
                toDate: newValue,
              }));
            }}
          />
     </DemoContainer>
     </LocalizationProvider>
         <RHFRadioGroup
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
            />
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
        {!!currentEvent?.leave_id && (
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
          loading={isSubmitting}
          disabled={dateError}
        >
          Save Changes
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}

CalendarForm.propTypes = {
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  currentEvent: PropTypes.object,
  onClose: PropTypes.func,
};
