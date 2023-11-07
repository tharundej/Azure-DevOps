import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';

import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller,useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

import { Button,Box,Autocomplete,TextField } from '@mui/material';

import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const employmentTypeOptions=[
  {label:"Permanent",id:'1'},
  {label:"Contract",id:'2'},

]

const StatouryForm = ({open,onHandleClose,currentUser}) => {
  const [type,setType]=useState({label:"Permanent",id:'1'})


  
const payTypes = [{ type: 'TypeA' }, { type: 'TypeB' }];
    // const currentUser=
    //   {
    //       "employeeID": "ibm1",
    //       "firstName": "ram",
    //       "middleName": null,
    //       "lastName": "r",
    //       "emailID": "anilraina0310@gmail.com",
    //       "contactNumber": 8908765334,
    //       "emergencyContactNumber": null,
    //       "dateOfBirth": "2023-02-11",
    //       "fatherName": "nithya",
    //       "motherName": "abc",
    //       "maritalStatus": "unmarried",
    //       "nationality": "indian",
    //       "religion": "hindu",
    //       "bloodGroup": "A+",
    //       "offerDate": "2022-03-03",
    //       "joiningDate": "2022-03-03",
    //       "pAddressLine1": "robersonpet",
    //       "pAddressLine2": "bpet",
    //       "pCity": "blore",
    //       "pState": "kolar",
    //       "pPincode": 64286,
    //       "rAddressLine1": "2,304,d",
    //       "rAddressLine2": "bbb",
    //       "rCity": "canada",
    //       "rState": "kolar",
    //       "rPincode": 84686,
    //       "employmentType": null,
    //       "departmentName": null,
    //       "Designation": null,
    //       "gradeName": null,
    //       "ctc": null,
    //       "workingLocation": null,
    //       "reportingManagerName": null
    //   }


    const NewUserSchema = Yup.object().shape({
 
      aadharNumber: Yup.string(),
      panNumber:Yup.string(),
      passportNumber:Yup.string(),
    
      accountholderName: Yup.string(),
      bankAccountNumber: Yup.number(),
      bankName: Yup.string(),
      bankBranch: Yup.string(),
      ifscCode: Yup.string(),
    
      uan:Yup.number(),
      pfNumber: Yup.number(),
      esicNumber: Yup.number(),
      ptNumber: Yup.number(),
      lwfNumber: Yup.string(),
      pfType:Yup.string()
    });
    
    const defaultValues = useMemo(
      () => ({
        
        aadharNumber: currentUser?.aadharNumber || "",
        panNumber: currentUser?.panNumber || "",
        passportNumber: currentUser?.passportNumber || "",
    
    
        accountholderName:currentUser?.accountholderName || '',
        bankName: currentUser?.bankName || '',
        bankBranch:currentUser?.bankBranch || '',
        bankAccountNumber:currentUser?.bankAccountNumber || undefined,
        ifscCode: currentUser?.ifscCode || "",
    
        pfNumber: currentUser?.pfNumber || undefined,
        esicNumber: currentUser?.esicNumber || undefined,
        ptNumber: currentUser?.ptNumber || undefined,
        lwfNumber: currentUser?.lwfNumber || "",
        uan: currentUser?.uan || undefined,
    
        pfType:currentUser?.pfType || '',
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
    
      const onSubmit = handleSubmit(async (data) => {
        console.log(data,'uyfgv');
    
        try {
         
            console.log('aa')
         
        } catch (error) {
          console.error(error);
        }
      });
  return (
    <>

        <Helmet>
        <title> Dashboard: myclaims</title>
      </Helmet>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        // onClose={handleClose}
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
              <RHFTextField name="bankAccountNumber" label="Account Number" type="number" />
            <RHFTextField name="bankName" label="Bank Name" />
            <RHFTextField name="bankBranch" label="Bank Branch" />   
            <RHFTextField name="ifscCode" label="IFSC Code" />
         
           
            <RHFAutocomplete
                name="pfType"
                
                label="PFType"
                options={payTypes.map((country) => country.type)}
                getOptionLabel={(option) => option}
                
                isOptionEqualToValue={(option, value) =>{ 
                  
                 
                  return option === value}}
                renderOption={(propss, option) => {
                  const { type } = payTypes.filter(
                    (country) => country.type === option
                  )[0];

                  if (!type) {
                    return null;
                  }

                  return (
                    <li {...propss} key={type}>
                      
                      {type} 
                    </li>
                  );
                }}
              />
            
            <RHFTextField name="uan" label="UAN Number" type="number" />
            <RHFTextField name="pfNumber" label="PF Number" type="number" />
            <RHFTextField name="esicNumber" label="ESIC Number"  type="number"/>
            <RHFTextField name="ptNumber" label="PT%" type="number" />
            <RHFTextField name="lwfNumber" label="LWF%" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={()=>{onHandleClose()}}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
        
        

        <DialogActions>
            <Button variant="outlined" onClick={onHandleClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" onClick={onSubmit}>
              Save
            </LoadingButton>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default StatouryForm

StatouryForm.propTypes = {
    open: PropTypes.string,
    onHandleClose:PropTypes.func,
    currentUser:PropTypes.object
  };