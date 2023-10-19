import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useCallback, useMemo, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/iconify';
import axios from 'axios';

export const StatouryForm=(currentUser)=>{

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => {
  setOpen(false);
  reset()
}

const NewUserSchema = Yup.object().shape({
 
  aadharNumber: Yup.string(),
  panNumber:Yup.string(),
  passportNumber:Yup.string(),

  accountholderName: Yup.string(),
  bankAccountNumber: Yup.string(),
  bankName: Yup.string(),
  bankBranch: Yup.string(),
  ifscCode: Yup.string(),

  uan:Yup.number(),
  pfNumber: Yup.number(),
  esicNumber: Yup.number(),
  ptNumber: Yup.number(),
  lwfNumber: Yup.string(),
});

const defaultValues = useMemo(
  () => ({
    
    aadharNumber: currentUser?.aadharNumber || null,
    panNumber: currentUser?.panNumber || null,
    passportNumber: currentUser?.passportNumber || null,


    accountholderName:currentUser?.accountholderName || '',
    bankName: currentUser?.bankName || '',
    bankBranch:currentUser?.bankBranch || '',
    bankAccountNumber:currentUser?.bankAccountNumber || null,
    ifscCode: currentUser?.ifscCode || null,

    pfNumber: currentUser?.pfNumber || null,
    esicNumber: currentUser?.esicNumber || null,
    ptNumber: currentUser?.ptNumber || null,
    lwfNumber: currentUser?.lwfNumber || null,
    uan: currentUser?.uan || null,
  }),
  [currentUser]
);

const methods = useForm({
  resolver: yupResolver(NewUserSchema),
  defaultValues,
});
const payscheduleTypes = [{ type: 'Permanent' }, { type: 'Temporary' }];
//   const m2 = useForm();
const payTypes = [{ type: 'Karnataka' }, { type: 'Kerala' }];
const {
  setValue,
  handleSubmit,
  formState: { isSubmitting },
  reset
} = methods;

//   const values = watch();

const onSubmit = handleSubmit(async (data1) => {
  // console.log(data,'uyfgv');
  data1.employeeID="wipr1";
  data1.companyID="COMP3"
  try {
   
    
    
     
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://192.168.0.236:3001/erp/addStatutoryDetails',
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : data1
    };
    
     
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  } 
  
  catch (error) {
    console.error(error);
  }
});

const handleDrop = useCallback(
  (acceptedFiles) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (file) {
      setValue('avatarUrl', newFile, { shouldValidate: true });
    }
  },
  [setValue]
);
return (
  <>
    <Button onClick={handleOpen}  variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add Statoury</Button>
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
        {/* methods={methods} onSubmit={onSubmit} */}
        <DialogTitle>Add Statoury</DialogTitle>

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



            <RHFTextField name="aadharNumber" label="Aadhar Number" />
             <RHFTextField name="panNumber" label="Pan Number" />
             <RHFTextField name="passportNumber" label="Passport Number" />
             


              <RHFTextField name="accountholderName" label="Account Holder Name" />
              <RHFTextField name="bankAccountNumber" label="Account Number" />
            <RHFTextField name="bankName" label="Bank Name" />
            <RHFTextField name="bankBranch" label="Bank Branch" />   
            <RHFTextField name="ifscCode" label="IFSC Code" />
         
           
            <RHFAutocomplete
              name="pfType"
              label="PF Type"
              options={payTypes.map((payType) => payType.type)}
            />
            
            <RHFTextField name="uan" label="UAN Number" />
            <RHFTextField name="pfNumber" label="PF Number" />
            <RHFTextField name="esicNumber" label="ESIC Number" />
            <RHFTextField name="ptNumber" label="PT%" />
            <RHFTextField name="lwfNumber" label="LWF%" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  </>
);
}
// StatouryForm.propTypes = {
//     currentUser: PropTypes.object,
//   };