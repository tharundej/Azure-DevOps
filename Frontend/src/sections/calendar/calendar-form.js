import PropTypes from 'prop-types';
import { useCallback,useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LoadingButton } from '@mui/lab';
import { MenuItem,Typography,IconButton,Tooltip,Button,Stack,Box,DialogActions} from '@mui/material';
// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { createEvent, updateEvent, deleteEvent } from 'src/api/calendar';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch ,RHFSelect,RHFRadioGroup} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CalendarForm({ currentEvent, colorOptions, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [attachmentString,setAttachmentString] = useState("");
  const EventSchema = Yup.object().shape({
    leave_type_id:Yup.string(),
    company_id:Yup.string(),
    employee_id:Yup.string(),
    from_date: Yup.mixed(),
    to_date: Yup.mixed(),
    comments: Yup.string(),
    apply_date:Yup.string(),
    status:Yup.number(),
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

  const dateError = values.start && values.end ? values.start > values.end : false;

  const onSubmit = handleSubmit(async (data) => {

    const eventData = {
      leave_type_id:data?.leave_type_id,
      company_id: "C1",
      employee_id:"E1",
      comments: data?.comments,
      apply_date: data?.apply_date,
      from_date:data?.from_date,
      to_date:data?.to_date,
      status:data?.status,
      fullday:data?.fullday,
      firsthalf:data?.firsthalf,
      secondhalf:data?.secondhalf,
      attachment: attachmentString,
      status_date:""
    };

    try {
      if (!dateError) {
        if (currentEvent?.id) {
          await updateEvent(eventData);
          enqueueSnackbar('Update success!');
        } else {
          await createEvent(eventData);
          enqueueSnackbar('Create success!');
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
      await deleteEvent(`${currentEvent?.id}`);
      enqueueSnackbar('Delete success!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [currentEvent?.id, enqueueSnackbar, onClose]);

    
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
      console.log('Base64 string:', base64String);
      setAttachmentString(base64String)
      // setImage( [base64String]);
      // setViewImage(true);
      // Here, you can send the `base64String` to your server or perform other actions.
    };

    reader.readAsDataURL(file);
  }
}
const USER_STATUS_OPTIONS = 
[
  { 
    id:"1", 
    value:"Sick Leave" 
  },
  {
     id:"2",
     value:"Annual Leave"
  }
]
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ px: 3 }}>
      <RHFSelect name="leave_type_id" label="Leave Type">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem value={status.id} key={status.id}>
                  {status.value}
                </MenuItem>
              ))}
            </RHFSelect> 

        <RHFTextField name="comments" label="Comments" multiline rows={3} />
        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value)}
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(fTimestamp(newValue));
                }
              }}
              label="Start date"
              format="dd/MM/yyyy hh:mm a"
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              value={new Date(field.value)}
              onChange={(newValue) => {
                if (newValue) {
                  field.onChange(fTimestamp(newValue));
                }
              }}
              label="End date"
              format="dd/MM/yyyy hh:mm a"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: dateError,
                  helperText: dateError && 'End date must be later than start date',
                },
              }}
            />
          )}
        />
{/* 
        <Controller
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

<RHFRadioGroup
              row
              label="Day Span"
              spacing={4}
              options={[
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
      </Stack>

      <DialogActions>
        {!!currentEvent?.id && (
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
