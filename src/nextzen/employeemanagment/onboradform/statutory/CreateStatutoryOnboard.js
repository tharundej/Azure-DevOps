import React, { useState, useMemo, useEffect,useImperativeHandle, forwardRef } from 'react';
import dayjs from 'dayjs';

 
import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller,useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
 
import { Button,Box,Autocomplete,TextField ,Grid,Stack} from '@mui/material';
 
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
 
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 
import axios from 'axios';
 
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
 
 
const employmentTypeOptions=[
  {label:"Permanent",id:'1'},
  {label:"Contract",id:'2'},
 
]
 
const CreateStatutoryOnboard =forwardRef ((props,ref) => {
 
  const [type,setType]=useState({label:"Permanent",id:'1'})
 
   const [currentUser,setCurrentUser]=useState({aadharNumber:'',panNumber:''})
   useImperativeHandle(ref, () => ({
    childFunctionStatutory() {
      onSubmit();
    },
  }));
 
  //  useEffect(()=>{
  //   if(currentUserData){
  //     delete currentUserData.employeeName;
  //     setCurrentUser(currentUserData)
  //   }
 
  //  },[currentUserData])
 
 
  // useEffect(()=>{
  //   if(currentUserEOC){
  //     console.log("oooo")
  //     setCurrentUser(currentUserEOC);
  //   }
  // },[currentUserEOC])
 
 
 
 
 
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
 
    console.log(defaultValues,'defaultValuesdefaultValues')
   
   
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
      const { enqueueSnackbar } = useSnackbar();
      const onSubmit = handleSubmit(async (data) => {
        if(currentUser?.aadharNumber===""||currentUser?.panNumber===""){
          enqueueSnackbar("Please fill AADHAAR and PAN card number", { variant: 'error' });
          return;

        }
        console.log(currentUser,'uyfgv');
        
        console.log(localStorage.getItem('employeeIdCreated'),'localStorage')
        currentUser.employeeID=localStorage.getItem('employeeIdCreated');
        currentUser.companyID=JSON.parse(localStorage.getItem('userDetails'))?.companyID
        props.handleLoader();
     
         
         
         
           
         
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/addStatutoryDetails`,
            // url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/${endpoint}`,
            headers: {
              'Authorization': JSON.parse(localStorage.getItem('userDetails'))?.accessToken,
              'Content-Type': 'application/json'
            },
            data : currentUser
          };
         
           
         
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            enqueueSnackbar(response?.data?.message, { variant: 'success' });
            // callApi();
            // onHandleClose();
            props.nextStep();
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar(error?.response?.data?.message || "Someting went wrong! please try again", { variant: 'error' });
            props.handleLoaderClose();
          });
      });
 
      const pfTypeOptions = ['pflimit', 'pfnolimit'];
  return (
    <>
 
        <Helmet>
        <title> Dashboard: Add Statoury</title>
      </Helmet>
      <Stack
        fullWidth
       
       
        // onClose={handleClose}
        // PaperProps={{
        //   sx: { maxWidth: 720 },
        // }}
      >
           <FormProvider methods={methods} onSubmit={onSubmit}>
        {/* methods={methods} onSubmit={onSubmit} */}
        {/* <DialogTitle>Add Statoury</DialogTitle> */}
        {/* <ModalHeader heading={endpoint==="/updateStatutoryDetails" ?"Edit Statoury Details": "Create Statoury details"} /> */}
 
       
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={2}
            // gridTemplateColumns={{
            //   xs: 'repeat(1, 1fr)',
            //   sm: 'repeat(2, 1fr)',
            // }}
          >
 
          <Grid container   spacing={2} md={12} xs={12} lg={12}  >
 
          <Grid md={6} xs={12} lg={6}item>
                  <TextField
                    fullWidth
                    type="number"
                    name="aadharNumber"
                    label={
                      <label >
                        AADHAAR Number
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                    }
                    variant="outlined"
                    id="accountNumber"
                     value={currentUser?.aadharNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=12){
                      setCurrentUser(prev=>({
                        ...prev,
                        aadharNumber: e?.target?.value
                      }
                      ))
                    }
                    }}
                  />
          </Grid>

          <Grid md={6} xs={12} lg={6}  fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="panNumber"
                    label={
                      <label >
                        PAN Number
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                    }
                    variant="outlined"
                    id="panNumber"
                     value={currentUser?.panNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=10){
                      setCurrentUser(prev=>({
                        ...prev,
                        panNumber:e?.target.value
                      }
                      ))}
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} lg={6}item>
                  <TextField
                    fullWidth
                    type="number"
                    name="accountNumber"
                    label="Account Number"
                    variant="outlined"
                    id="accountNumber"
                     value={currentUser?.accountNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=15){
                      setCurrentUser(prev=>({
                        ...prev,
                        accountNumber: parseInt(e.target.value, 10) || ''
                      }
                      ))
                    }
                    }}
                  />
          </Grid>
 
          <Grid md={6} xs={12}  fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="accountHolderName"
                    label="Account Holder Name"
                    variant="outlined"
                    id="accountHolderName"
                     value={currentUser?.accountHolderName}
                    onChange={(e) => {
                      setCurrentUser(prev=>({
                        ...prev,
                        accountHolderName:e?.target.value
                      }
                      ))
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
          <Grid md={6} xs={12}  fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="bankBranch"
                    label="Bank Branch"
                    variant="outlined"
                    id="employeeName"
                     value={currentUser?.bankBranch}
                    onChange={(e) => {
                      setCurrentUser(prev=>({
                        ...prev,
                        bankBranch:e?.target.value
                      }
                      ))
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
 
          <Grid md={6} xs={12}  fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="bankName"
                    label="Bank Name"
                    variant="outlined"
                    id="bankName"
                     value={currentUser?.bankName}
                    onChange={(e) => {
                      setCurrentUser(prev=>({
                        ...prev,
                        bankName:e?.target.value
                      }
                      ))
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="esicNumber"
                    label="ESIC Number"
                    variant="outlined"
                    id="esicNumber"
                     value={currentUser?.esicNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=17){
                      setCurrentUser(prev=>({
                        ...prev,
                        esicNumber: parseInt(e.target.value, 10) || ''
                      }
                      )) }
                    }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} lg={6}  fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="ifscCode"
                    label="IFSC Code"
                    variant="outlined"
                    id="ifscCode"
                     value={currentUser?.ifscCode}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=11){
                      setCurrentUser(prev=>({
                        ...prev,
                        ifscCode:e?.target.value
                      }
                      )) }
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} lg={6}  fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="lwfNumber"
                    label="LWF Number"
                    variant="outlined"
                    id="lwfNumber"
                     value={currentUser?.lwfNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=45){
                      setCurrentUser(prev=>({
                        ...prev,
                        lwfNumber:e?.target.value
                      }
                      ))}
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
 
         
 
 
          <Grid md={6} xs={12} lg={6} fullWidth  item>
                  <TextField
                    fullWidth
               
                    name="passportNumber"
                    label="Passport Number"
                    variant="outlined"
                    id="passportNumber"
                     value={currentUser?.passportNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=12){
                      setCurrentUser(prev=>({
                        ...prev,
                        passportNumber:e?.target.value
                      }
                      ))}
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} lg={6} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="pfNumber"
                    label="PF Number"
                    variant="outlined"
                    id="pfNumber"
                     value={currentUser?.pfNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=12){
                      setCurrentUser(prev=>({
                        ...prev,
                        pfNumber: parseInt(e.target.value, 10) || ''
                      }
                      ))}
                    }}
                  />
          </Grid>
 
          <Grid md={6} xs={12}  lg={6} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="ptNumber"
                    label="PT Number"
                    variant="outlined"
                    id="ptNumber"
                     value={currentUser?.ptNumber}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=11){
                      setCurrentUser(prev=>({
                        ...prev,
                        ptNumber: parseInt(e.target.value, 10) || ''
                      }
                      ))}
                    }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} lg={6} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="uan"
                    label="UAN"
                    variant="outlined"
                    id="uan"
                     value={currentUser?.uan}
                    onChange={(e) => {
                      if(e?.target?.value?.length<=12){
                      setCurrentUser(prev=>({
                        ...prev,
                        uan: parseInt(e.target.value, 10) || ''
                      }
                      )) }
                    }}
                  />
          </Grid>
 
          <Grid md={6} xs={12} lg={6} item>
          <Autocomplete
              value={currentUser?.pfType}
              onChange={(e,nw)=>{
                setCurrentUser(prev=>({
                  ...prev,
                  pfType: nw
                }
                ))
              }}
              options={pfTypeOptions}
              renderInput={(params) => <TextField {...params} label="PF Type" />}
      />
          </Grid>
 
          </Grid>
 
         
          </Box>
      
 
       
      </FormProvider>
       
       
 
        {/* <DialogActions>
            <Button variant="outlined" onClick={onHandleClose}>
              Cancel
            </Button>
 
            <LoadingButton  variant="contained" sx={{backgroundColor:'#3B82F6'}} onClick={onSubmit}>
              Save
            </LoadingButton>
          </DialogActions> */}
        </Stack>
    </>
  )
})
 
export default CreateStatutoryOnboard
 
CreateStatutoryOnboard.propTypes = {
    open: PropTypes.string,
    onHandleClose:PropTypes.func,
    currentUser:PropTypes.object,
    employeeIDToCreate:PropTypes.string,
    endpoint:PropTypes.string,
    employeeIDForApis:PropTypes.string,
    callApi:PropTypes.func
  };
