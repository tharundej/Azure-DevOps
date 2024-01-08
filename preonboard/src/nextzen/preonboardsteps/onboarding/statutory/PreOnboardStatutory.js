import React, { useState, useMemo, useEffect,useImperativeHandle, forwardRef } from 'react';
import dayjs from 'dayjs';

 
import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import { baseUrl } from '../../../../components/baseUrl';
 
import { Button,Box,Autocomplete,TextField ,Grid,Stack} from '@mui/material';
 

 
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 
import axios from 'axios';
 

const PreOnboardStatutory = forwardRef((props,ref) => {
    useImperativeHandle(ref, () => ({
        childFunctionStatutory() {
          onSubmit();
        },
      }));
      const [currentUser,setCurrentUser]=useState({aadharNumber:'',panNumber:''})
      useImperativeHandle(ref, () => ({
       childFunctionStatutory() {
         onSubmit();
       },
     }));
     const onSubmit = (async (data) => {
        if(currentUser?.aadharNumber===""||currentUser?.panNumber===""){
         // enqueueSnackbar("Please fill AADHAAR and PAN card number", { variant: 'error' });
          return;

        }
        console.log(currentUser,'uyfgv');
        
        console.log(localStorage.getItem('employeeIdCreated'),'localStorage')
       // currentUser.employeeID=localStorage.getItem('employeeIdCreated');
       currentUser.applicantID=JSON.parse(localStorage.getItem("onboardDetails")).applicantID
        //currentUser.companyID=JSON.parse(localStorage.getItem('userDetails'))?.companyID
        currentUser.companyID=JSON.parse(localStorage.getItem("onboardDetails")).companyID
        props.handleLoader();
     
         
         
         
           
         
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
           // url: `${baseUrl}/addStatutoryDetails`,
            // url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/${endpoint}`,
            url: `https://mallard-blessed-lobster.ngrok-free.app/erp/addStatutoryDetailsA`,
            headers: {
              'Authorization': JSON.parse(localStorage.getItem('userDetails'))?.accessToken,
              'Content-Type': 'application/json'
            },
            data : currentUser
          };
         
           
         
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            // enqueueSnackbar(response?.data?.message, { variant: 'success' });
            // callApi();
            // onHandleClose();
            props.handleLoaderClose();
            props.nextStep();
          })
          .catch((error) => {
            console.log(error);
            // enqueueSnackbar(error?.response?.data?.message || "Someting went wrong! please try again", { variant: 'error' });
            props.handleLoaderClose();
          });
      });
      const pfTypeOptions = ['pflimit', 'pfnolimit'];
  return (
    <div>

<Stack
        fullWidth
       
       
        // onClose={handleClose}
        // PaperProps={{
        //   sx: { maxWidth: 720 },
        // }}
      >
           <Stack >
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
      
 
       
      </Stack>
       
       
 
        {/* <DialogActions>
            <Button variant="outlined" onClick={onHandleClose}>
              Cancel
            </Button>
 
            <LoadingButton  variant="contained" sx={{backgroundColor:'#3B82F6'}} onClick={onSubmit}>
              Save
            </LoadingButton>
          </DialogActions> */}
        </Stack>
    </div>
  )
})

export default PreOnboardStatutory