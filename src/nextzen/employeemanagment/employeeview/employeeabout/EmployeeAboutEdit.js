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

const EmployeeAboutEdit = ({open,handleEditClose}) => {
  const [type,setType]=useState({label:"Permanent",id:'1'})
    const currentUser=
      {
          "employeeID": "ibm1",
          "firstName": "ram",
          "middleName": null,
          "lastName": "r",
          "emailID": "anilraina0310@gmail.com",
          "contactNumber": 8908765334,
          "emergencyContactNumber": null,
          "dateOfBirth": "2023-02-11",
          "fatherName": "nithya",
          "motherName": "abc",
          "maritalStatus": "unmarried",
          "nationality": "indian",
          "religion": "hindu",
          "bloodGroup": "A+",
          "offerDate": "2022-03-03",
          "joiningDate": "2022-03-03",
          "pAddressLine1": "robersonpet",
          "pAddressLine2": "bpet",
          "pCity": "blore",
          "pState": "kolar",
          "pPincode": 64286,
          "rAddressLine1": "2,304,d",
          "rAddressLine2": "bbb",
          "rCity": "canada",
          "rState": "kolar",
          "rPincode": 84686,
          "employmentType": null,
          "departmentName": null,
          "Designation": null,
          "gradeName": null,
          "ctc": null,
          "workingLocation": null,
          "reportingManagerName": null
      }


    const NewUserSchema = Yup.object().shape({
       
        

       
        firstName: Yup.string(),
        middleName: Yup.string(),
        lastName: Yup.string(),
        emailID: Yup.string(),
        contactNumber: Yup.string(),
        emergencyContactNumber: Yup.string(),
        dateOfBirth: Yup.mixed().nullable(),
        fatherName: Yup.string(),
        motherName: Yup.string(),
        maritalStatus: Yup.string(),
        nationality: Yup.string(),
        religion: Yup.string(),
        bloodGroup: Yup.string(),
        offerDate:  Yup.mixed().nullable(),
        joiningDate: Yup.mixed().nullable(),
        pAddressLine1: Yup.string(),
        pAddressLine2: Yup.string(),
        pCity: Yup.string(),
        pState: Yup.string(),
        pPincode: Yup.string(),
        rAddressLine1: Yup.string(),
        rAddressLine2: Yup.string(),
        rCity: Yup.string(),
        rState: Yup.string(),
        rPincode: Yup.string()

    
      });
    
      const defaultValues = useMemo(
        () => ({
           


           
            firstName: currentUser?.firstName||'',
            middleName: currentUser?.middleName||'',
            lastName: currentUser?.lastName||'',
            emailID: currentUser?.emailID||'',
            contactNumber: currentUser?.contactNumber||'',
            emergencyContactNumber: currentUser?.emergencyContactNumber||'',
            dateOfBirth: dayjs(currentUser?.dateOfBirth)?.$d||'',
            fatherName: currentUser?.fatherName||'',
            motherName: currentUser?.motherName||'',
            maritalStatus: currentUser?.maritalStatus||'',
            nationality: currentUser?.nationality||'',
            religion: currentUser?.religion||'',
            bloodGroup: currentUser?.bloodGroup||'',
            offerDate: dayjs(currentUser?.offerDate)?.$d||'',
            joiningDate:dayjs(currentUser?.joiningDate)?.$d||'',
            pAddressLine1: currentUser?.pAddressLine1||'',
            pAddressLine2: currentUser?.pAddressLine2||'',
            pCity: currentUser?.pCity||'',
            pState: currentUser?.pState||'',
            pPincode: currentUser?.pPincode||'',
            rAddressLine1: currentUser?.rAddressLine1||'',
            rAddressLine2: currentUser?.rAddressLine2||'',
            rCity: currentUser?.rCity||'',
            rState: currentUser?.rState||'',
            rPincode: currentUser?.rPincode||''
           
    
    
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
             
             
             

                
            
            <RHFTextField name="firstName" label="First Name"  value={values.firstName}/>
            <RHFTextField name="middleName" label="Middle Name" />
            <RHFTextField name="lastName" label="Last Name" />
            <RHFTextField name="emailID" label="Email ID" />
            <RHFTextField name="contactNumber" label="Contact Number" type="number" />
            <RHFTextField name="emergencyContactNumber" label="Emergency Contact Number" type="number"/>

            {/* <RHFTextField name="dateOfBirth" label="Date Of Birth" /> */}
            <Controller
                name="dateOfBirth"
                control={control}
                render={({ field, fieldState: { error } }) => (
                <DatePicker
                    label="Date Of Birth"
                    value={field.value}
                    onChange={(newValue) => {
                    field.onChange(newValue);
                    }}
                    slotProps={{
                    textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                    },
                    }}
                />
                )}
            />

            <RHFTextField name="fatherName" label="Father Name" />
            <RHFTextField name="motherName" label="Mother Name" />

            <RHFTextField name="maritalStatus" label="Marital Status" />

            <RHFTextField name="nationality" label="Nationality" />
            <RHFTextField name="religion" label="Religion" />
            <RHFTextField name="bloodGroup" label="Blood Group" />
            <Controller
                name="offerDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                <DatePicker
                    label="Offer Date"
                    value={field.value}
                    onChange={(newValue) => {
                    field.onChange(newValue);
                    }}
                    slotProps={{
                    textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                    },
                    }}
                />
                )}
            />

                <Controller
                name="joiningDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                <DatePicker
                    label="Joining Date"
                    value={field.value}
                    onChange={(newValue) => {
                    field.onChange(newValue);
                    }}
                    slotProps={{
                    textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                    },
                    }}
                />
                )}
            />

            {/* <RHFTextField name="offerDate" label="Offer Date" /> */}

            {/* <RHFTextField name="joiningDate" label="Joining Date" /> */}

            <RHFTextField name="pAddressLine1" label="P Address Line 1" />
            <RHFTextField name="pAddressLine2" label="P Address Line 2" />
            <RHFTextField name="pCity" label="P City" />
            <RHFTextField name="pState" label="P State" />
            <RHFTextField name="pPincode" label="P Pincode" />
            <RHFTextField name="rAddressLine1" label="R Address Line 1" />
            <RHFTextField name="rAddressLine2" label="R Address Line 2" />
            <RHFTextField name="rCity" label="R City" />
            <RHFTextField name="rState" label="R State" />
            <RHFTextField name="rPincode" label="R Pincode" />

            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employmentTypeOptions}
            value={type}
            getOptionLabel={(option) => option.label}
            onChange={(e,newvalue)=>{
              setType(newvalue)
              // currentUser.employmentType=newvalue
             
              
              
            
            }}
            // sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="employmentType" />}
          />
          


        
{/* 
            <RHFTextField name="departmentName" label="Department Name" />

            <RHFTextField name="Designation" label="Designation" />

            <RHFTextField name="gradeName" label="Grade Name" />
           
            <RHFTextField name="workingLocation" label="Working Location" />

            <RHFTextField name="reportingManagerName" label="Reporting Manager Name" /> */}
             
              {/* <RHFTextField name="phoneNumber" label=" Attachment" /> */}
             
             




            </Box>

            </DialogContent>

            </FormProvider>
        
        

        <DialogActions>
            <Button variant="outlined" onClick={handleEditClose}>
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

export default EmployeeAboutEdit

EmployeeAboutEdit.propTypes = {
    open: PropTypes.string,
    handleEditClose:PropTypes.func
  };