import React, { useState, useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

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

import { Button,Box,Autocomplete,TextField,Grid } from '@mui/material';

import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';

const employmentTypeOptions=[
  {label:"Permanent",id:'1'},
  {label:"Contract",id:'2'},

]

const EmployeeAboutEdit = ({open,handleEditClose,currentUserData}) => {
  const [type,setType]=useState({label:"Permanent",id:'1'})
    const [currentUser,setcurrentUserData]=useState(currentUserData)
     


    const NewUserSchema = Yup.object().shape({
       
        

       
        firstName: Yup.string(),
        middleName: Yup.string(),
        lastName: Yup.string(),
        emailID: Yup.string(),
        contactNumber: Yup.number(),
        emergencyContactNumber: Yup.number(),
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
        pPincode: Yup.number(),
        rAddressLine1: Yup.string(),
        rAddressLine2: Yup.string(),
        rCity: Yup.string(),
        rState: Yup.string(),
        rPincode: Yup.number()

    
      });
    
      const defaultValues1 = useMemo(
        () => ({
           


           
            firstName: currentUserData?.firstName||'',
            middleName: currentUserData?.middleName||'',
            lastName: currentUserData?.lastName||'',
            emailID: currentUserData?.emailID||'',
            contactNumber: currentUserData?.contactNumber||'',
            emergencyContactNumber: currentUserData?.emergencyContactNumber||'',
            dateOfBirth: dayjs(currentUserData?.dateOfBirth)?.$d||'',
            fatherName: currentUserData?.fatherName||'',
            motherName: currentUserData?.motherName||'',
            maritalStatus: currentUserData?.maritalStatus||'',
            nationality: currentUserData?.nationality||'',
            religion: currentUserData?.religion||'',
            bloodGroup: currentUserData?.bloodGroup||'',
            offerDate: dayjs(currentUserData?.offerDate)?.$d||'',
            joiningDate:dayjs(currentUserData?.joiningDate)?.$d||'',
            pAddressLine1: currentUserData?.pAddressLine1||'',
            pAddressLine2: currentUserData?.pAddressLine2||'',
            pCity: currentUserData?.pCity||'',
            pState: currentUserData?.pState||'',
            pPincode: currentUserData?.pPincode||'',
            rAddressLine1: currentUserData?.rAddressLine1||'',
            rAddressLine2: currentUserData?.rAddressLine2||'',
            rCity: currentUserData?.rCity||'',
            rState: currentUserData?.rState||'',
            rPincode: currentUserData?.rPincode||''
           
    
    
        }),
        [currentUserData]
      );

      const [defaultValues,setDefaultvalues]=useState({})

      useEffect(()=>{
        if(defaultValues1){
          setDefaultvalues(defaultValues1)
        }
      },[defaultValues1])
    console.log(defaultValues1,'defaultValuesdefaultValues')
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
    
        data.employeeID= currentUserData.employeeID
        data.offerDate=currentUserDataData.offerDate
        data.dateOfBirth=currentUserDataData.dateOfBirth
        data.joiningDate=currentUserDataData.joiningDate

        console.log(data,'ll')
    
        try {
         
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://vshhg43l-3001.inc1.devtunnels.ms/erp/updateOnboardingForm',
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
              'Content-Type': 'application/json', 
            },
            data : data
          };
           
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
         
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
             
             <Grid container flexDirection='column' >
             <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    id="firstName"
                     value={currentUserData?.firstName}
                    onChange={(e) => {
                      // handleChange(e, index, 'nameOfTheDegree');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="middleName"
                    label="Middle Name"
                    variant="outlined"
                    id="middleName"
                    value={currentUserData?.middleName}
                    onChange={(e) => {
                      // handleChange(e, index, 'nameOfTheDegree');
                    }}
                  />
                  </Grid>

             </Grid>
             

                
            
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
              // currentUserData.employmentType=newvalue
             
              
              
            
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
    handleEditClose:PropTypes.func,
    currentUserDataData:PropTypes.object
  };