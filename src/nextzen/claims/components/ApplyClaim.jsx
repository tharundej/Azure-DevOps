
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState,} from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import Stack from '@mui/material/Stack';
import { Autocomplete, TextField,DialogContent,DialogActions } from '@mui/material';
import  Grid from '@mui/material/Grid';
import ModalHeader from '../../global/modalheader/ModalHeader';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ApplyClaim({currentUser,handleCloseAddEdit}) {
 
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const managerID = localStorage.getItem('reportingManagerID');
  const employeeID = localStorage.getItem('employeeID');
  const companyID = localStorage.getItem('companyID');
  const NewUserSchema = Yup.object().shape({
    claimAmount: Yup.number().required('Claim Amount is Required'),
    comment: Yup.string(),
    file_name: Yup.string(),
    companyId: Yup.string(),
    employeeId: Yup.string(),
    currency: Yup.string(),
    expenseStartDate: Yup.string(),
    expenseEndDate: Yup.string(),
    file_format: Yup.string(),
    file: Yup.mixed(),
    expenseConfigId: Yup.number(),
    currency: Yup.string(),
  });
  const [selectedDate, setSelectedDate] = useState({
    expenseStartDate: null,
    expenseEndDate: null,
    error: ""

  });

  const defaultValues = useMemo(
    () => ({
      claimAmount: currentUser?.claimAmount || null,
      comment: currentUser?.comment || '',
      // type_oc_claim: currentUser?.type_oc_claim|| '',
      currency: currentUser?.currency || 'INR',
      companyId: currentUser?.companyId || companyID,
      employeeId: currentUser?.employeeId || employeeID,
      expenseConfigId: currentUser?.expenseConfigId || 1,
      expenseStartDate: currentUser?.expenseStartDate || selectedDate?.expenseStartDate || null,
      expenseEndDate: currentUser?.expenseEndDate ||  selectedDate?.expenseEndDate|| null,
      // file_format: currentUser?.file_format || "pdf",
      file: currentUser?.file,

      
     
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
  const [claimTypeOptions, setClaimTypeOptions] = useState([]);

  const claimTypePayLoad = {
    companyId: companyID,
  }
  // console.log(claimTypePayLoad,"claimTypePayLoad")
  const claimTypeOptionsApi = async (claimTypePayLoad) => {
    console.log(claimTypePayLoad,"claimTypePayLoad")
    const response = await axios.post(baseUrl + '/GetClaimType',claimTypePayLoad).then(
      (response) => {
        console.log('sucesswwwwee00000000', response?.data?.data);
        setClaimTypeOptions(response?.data?.data);
      },
      (error) => {
        console.log('lllll', error);
      }
    );
  }

  useEffect(()=>{
    claimTypeOptionsApi(claimTypePayLoad)

  },[])
  const formatDateToYYYYMMDD = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      // Handle invalid date
      return null;
    }
  
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  
  
  const [editData, setEditData] = useState({

  })
  console.log(editData,"editadata",defaultValues)
  const handleDateChange = (newValue, dateFieldName) => {
    const selectedDateValue = dayjs(newValue).format("YYYY-MM-DD");
    const currentDate = dayjs().format("YYYY-MM-DD");

    if (dateFieldName === "expenseStartDate") {
      const lastMonthDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
      if (dayjs(selectedDateValue).isAfter(lastMonthDate) && dayjs(selectedDateValue).isBefore(currentDate)) {
        setSelectedDate((prev) => ({
          ...prev,
          [dateFieldName]: selectedDateValue,
          error: "",
        }));
      } else {
        setSelectedDate((prev) => ({
          ...prev,
          error: "Plaese Select Valid Expense Start Date.",
        }));
      }
    }

    if (dateFieldName === "expenseEndDate") {
      if (selectedDate.expenseStartDate &&
        (dayjs(selectedDateValue).isBefore(currentDate) && dayjs(selectedDateValue).isAfter(selectedDate.expenseStartDate)) ||
        dayjs(selectedDateValue).isSame(selectedDate.expenseStartDate)
      ) {
        setSelectedDate((prev) => ({
          ...prev,
          [dateFieldName]: selectedDateValue,
          error: "",
        }));
      } else {
        setSelectedDate((prev) => ({
          ...prev,
          errorend: "Plaese Select Valid Expense End Date.",
        }));
      }
    }
  };
  const handleEditChange = (field, value) => {

    console.log(field, value, "sssssssss")

    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

   // file upload using formaadata
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(e, "event1")
  };
// console.log(claimTypeOptions,"claimTypeOptions")

useEffect(() => {
  getCurrentDate()
}, [])
const [currentDate, setCurrentDate] = useState()
// get current Date
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  setCurrentDate(formattedDate);
  return formattedDate;
}
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
        <ModalHeader heading="ADD EDIT"/>
      <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(timesheetData, event)}>
      <DialogContent>
      <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
              <RHFAutocomplete
                name="claimType"
                label="Claim Type"
                options={claimTypeOptions}
                getOptionLabel={(option) => option.expenseName}
                value={editData?.claimType}
                onChange={(event, newValue) => {
                  console.log("newValue", newValue);
                  handleEditChange('claimType', newValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Claim Type" variant="outlined" />
                )}
              />
                <RHFAutocomplete
                name="currency"
                label="currency"
                required
                // options={(currency?.map((claimtype) => claimtype.label)) || []}
                options={ []}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />
               <RHFTextField name="claimAmount" label="Claim Amount"
                value={editData?.claimAmount}
                onChange={(event) => handleEditChange('claimAmount', parseInt(event.target.value, 10))}
              />

              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    readOnly
                   
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Claim Date"
                  //   value={dayjs(editData['claimDate'] || null)}
                  // onChange={(newValue) => {
                  //   handleEditChange('claim_date', formatDateToYYYYMMDD(newValue));
                  // }}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
             
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   name="expenseStartDate"
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense Start Date"
                    value={dayjs(editData['expenseStartDate'] || null)}
                    onChange={(newValue) => {
                      handleDateChange('expenseStartDate', formatDateToYYYYMMDD(newValue));
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>               
                  <DatePicker
                  name="expenseEndDate"
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense End Date"
                    value={dayjs(editData['expenseEndDate'] || null)}
                    onChange={(newValue) => {
                      handleDateChange('expenseEndDate', formatDateToYYYYMMDD(newValue));
                    }}
                  />  
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="comment" label="comments" />
              <Grid sx={{ alignSelf: "flex-end" }}>
                <input
                  // {...field}
                  type="file"
                  accept=".doc, .pdf"
                  onChange={handleFileChange}
                />

                {/* <Controller
                  name="file"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="file"
                      accept=".doc, .pdf"
                      onChange={handleFileChange}
                    />
                  )}
                /> */}
              </Grid>
            </Box>
             <DialogActions>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                  {/* {!currentUser ? 'Update Timesheet' : 'Add  TimeSheet'} */}
                  {/* { 'Edit TimeSheet' : 'Add TimeSheet '} */} Add
                </LoadingButton>
                <Button  onClick={handleCloseAddEdit}>Cancel</Button>
              </Stack>
             </DialogActions>
           
      
        </DialogContent>
      </FormProvider>
    </div>
  );
}


ApplyClaim.propTypes = {
  handleCloseAddEdit: PropTypes.any,
  // handleEditRowParent: PropTypes.any,
};