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

import {ApiHitDepartment,ApiHitDesgniation,ApiHitDesgniationGrade,ApiHitLocations,ApiHitManager,ApiHitRoles,} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import { baseUrl } from 'src/nextzen/global/BaseUrl';


const EmployeeAboutEdit = ({open,handleEditClose,currentUserData,userlocation,dropDownOptions,dropDownvalue,employeeIDForApis}) => {
   console.log(dropDownOptions,'dropDownOptionsdropDownOptions')
   const [userdropDownOptions,setUserDropDownOptions]=useState("");
   const [userdropDownvalue,setUserDropDownValue]=useState("")
  useEffect(()=>{
    if(dropDownOptions){
     
      setUserDropDownOptions(dropDownOptions)
      
    }
  },[dropDownOptions])

  useEffect(()=>{
    if(dropDownOptions){
      console.log(dropDownOptions,'dropDownOptionsm')
      setUserDropDownValue(dropDownvalue)
      
    }
  },[dropDownvalue])
 
  

  const [locations,setLocations]=useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations1 = await ApiHitLocations();
        setLocations(locations1);
        //console.log(locations, 'locations');
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }, []);

  const [type,setType]=useState({label:"Permanent",id:'1'})
    const [currentUser,setcurrentUser]=useState()

    useEffect(()=>{
      if(currentUserData){
      //  currentUserData.dateOfBirth=new Date(currentUserData.dateOfBirth);
        setcurrentUser(currentUserData)
      }
      console.log(currentUser,'currentUsercurrentUser')
    },[currentUserData])

    
     


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
    
        currentUser.employeeID= employeeIDForApis
       

        console.log(currentUser,userdropDownvalue,'userdropDownvalue')
        const obj={
          ...currentUser,
          departmentID:userdropDownvalue?.departmentValue?.departmentID || "",
          desginationGradeID:userdropDownvalue?.desginationGradeValue?.desginationGradeID || "",
          desginationID:userdropDownvalue?.desginationValue?.desginationID || "",
          locationID:userdropDownvalue?.locationValue?.locationID || "",
          managerID:userdropDownvalue?.managerValue?.managerID || "",
          roleID:userdropDownvalue?.rolesValue?.roleID || "",



        }
    
        try {
         
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/updateOnboardingForm`,
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA', 
              'Content-Type': 'application/json', 
            },
            data : obj
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
                // xs: 'repeat(1, 1fr)',
                // sm: 'repeat(2, 1fr)',
              }}
            >

              {/* <Grid container>      */}

             <Grid container   spacing={2} md={12} xs={12} lg={12}  >

            
             <Grid md={6} xs={12}  fullWidth  item>
                  <TextField
                    fullWidth
                
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    id="firstName"
                     value={currentUser?.firstName}
                    onChange={(e) => {
                      setcurrentUser(prev=>({
                        ...prev,
                        firstName:e?.target.value
                      }
                      ))
                    }}
                    style={{ paddingLeft: 0, width: '100%' }}
                  />
                </Grid>
                <Grid md={6} xs={12}  fullWidth item>
                  <TextField
                    fullWidth
                
                    name="middleName"
                    label="Middle Name"
                    variant="outlined"
                    id="middleName"
                    value={currentUser?.middleName}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        middleName:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    id="firstName"
                     value={currentUser?.lastName}
                    onChange={(e) => {
                      setcurrentUser(prev=>({
                        ...prev,
                        lastName:e?.target.value
                      }
                      ))
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="emailID"
                    label="Email ID"
                    variant="outlined"
                    id="middleName"
                    value={currentUser?.emailID}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        emailID:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="contactNumber"
                    label="Contact Number"
                    variant="outlined"
                    id="contactNumber"
                     value={currentUser?.contactNumber}
                    onChange={(e) => {
                      setcurrentUser(prev=>({
                        ...prev,
                        contactNumber: parseInt(e.target.value, 10) || ''
                      }
                      ))
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="emergencyContactNumber"
                    label="Emergency Contact Number"
                    variant="outlined"
                    id="emergencyContactNumber"
                    value={currentUser?.emergencyContactNumber}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        emergencyContactNumber: parseInt(e.target.value, 10) || ''
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <DatePicker
                  fullWidth
                    value={currentUser?.dateOfBirth ? dayjs(currentUser?.dateOfBirth).toDate() : null}
                    onChange={(date) => {
                      setcurrentUser(prev => ({
                        ...prev,
                        dateOfBirth: date ? dayjs(date).format('YYYY-MM-DD') : null
                      }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="yyyy-MM-dd"
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date Of Birth"
                  />
                  
                </Grid>

                <Grid md={6} xs={12} item>
                  <DatePicker
                  fullWidth
                    value={currentUser?.joiningDate ? dayjs(currentUser?.joiningDate).toDate() : null}
                    onChange={(date) => {
                      setcurrentUser(prev => ({
                        ...prev,
                        joiningDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                      }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="yyyy-MM-dd"
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Joining Date"
                  />
                  
                </Grid>

                <Grid md={6} xs={12} item>
                  <DatePicker
                  fullWidth
                    value={currentUser?.offerDate ? dayjs(currentUser?.offerDate).toDate() : null}
                    onChange={(date) => {
                      setcurrentUser(prev => ({
                        ...prev,
                        offerDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                      }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="yyyy-MM-dd"
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Offer Date"
                  />
                  
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="emergencyContactNumber"
                    label="Emergency Contact Number"
                    variant="outlined"
                    id="emergencyContactNumber"
                    value={currentUser?.emergencyContactNumber}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        emergencyContactNumber:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="fatherName"
                    label="Father Name"
                    variant="outlined"
                    id="fatherName"
                    value={currentUser?.fatherName}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        fatherName:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="motherName"
                    label="Mother Name"
                    variant="outlined"
                    id="motherName"
                    value={currentUser?.motherName}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        motherName:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="maritalStatus"
                    label="mMrital Status"
                    variant="outlined"
                    id="motherName"
                    value={currentUser?.maritalStatus}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        maritalStatus:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="nationality"
                    label="Nationality"
                    variant="outlined"
                    id="nationality"
                    value={currentUser?.nationality}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        nationality:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="religion"
                    label="Religion"
                    variant="outlined"
                    id="religion"
                    value={currentUser?.religion}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        religion:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="bloodGroup"
                    label="Blood Group"
                    variant="outlined"
                    id="BloodGroup"
                    value={currentUser?.bloodGroup}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        bloodGroup:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="pAddressLine1"
                    label="pAddressLine1"
                    variant="outlined"
                    id="pAddressLine1"
                    value={currentUser?.pAddressLine1}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        pAddressLine1:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="pAddressLine2"
                    label="pAddressLine2"
                    variant="outlined"
                    id="pAddressLine2"
                    value={currentUser?.pAddressLine2}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        pAddressLine2:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="pCity"
                    label="City"
                    variant="outlined"
                    id="pCity"
                    value={currentUser?.pCity}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        pAdpCitydressLine1:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="pState"
                    label="State"
                    variant="outlined"
                    id="pState"
                    value={currentUser?.pState}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        pState:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="pPincode"
                    label="Pincode"
                    variant="outlined"
                    id="pState"
                    value={currentUser?.pPincode}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        pPincode:parseInt(e.target.value, 10) || ''
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="rAddressLine1"
                    label="rAddressLine1"
                    variant="outlined"
                    id="rAddressLine1"
                    value={currentUser?.rAddressLine1}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        rAddressLine1:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="rAddressLine2"
                    label="rAddressLine2"
                    variant="outlined"
                    id="rAddressLine2"
                    value={currentUser?.rAddressLine2}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        rAddressLine2:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="rCity"
                    label="City"
                    variant="outlined"
                    id="rCity"
                    value={currentUser?.rCity}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        rCity:e?.target.value
                      }))
                    }}
                  />
                  </Grid>

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="rState"
                    label="State"
                    variant="outlined"
                    id="pState"
                    value={currentUser?.rState}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        rState:e?.target.value
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="rPincode"
                    label="Pincode"
                    variant="outlined"
                    id="pState"
                    value={currentUser?.rPincode}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        rPincode:parseInt(e.target.value, 10) || ''
                      }))
                    }}
                  />
                  </Grid>

                
              
              <Grid item xs={12} md={6} paddingLeft='16px'>
              
                <Autocomplete
                  disablePortal
                  id="locationsOptions"
                  options={userdropDownOptions?.locationsOptions || []}
                  value={userdropDownvalue?.locationValue}
                  getOptionLabel={(option) => option?.locationName}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...userdropDownvalue };
                    newArr.locationValue=newvalue;
                   
                    
                    console.log(newArr)
                   
                    // try{
                    //   const deptObj={
                    //     companyID:'COMP1',
                    //     locationID:newvalue?.locationID
                    //   }
                    //   const department=await ApiHitDepartment(deptObj);
                    //   var optionsArr={...userdropDownOptions};
                    //   optionsArr.departmentOptions=department;
                    //   optionsArr.desginationGradeOptions=[];
                    //   optionsArr.desginationOptions=[];
                    //   console.log(optionsArr,'optionsArroptionsArr')
                    //   setUserDropDownOptions(optionsArr)

                    // }
                    // catch(error){
                      
                    // }

                   
                    
                    setUserDropDownValue(newArr)
                  }
                  
                }

                 
                  
                  renderInput={(params) => <TextField {...params} label="Location"
                  style={{  width: '100%' }} />}
                />
              </Grid>
            
              <Grid item xs={12} md={6} lg={6} paddingLeft='16px'>
              {/* {console.log(typeof userdropDownOptions?.departmentOptions,userdropDownOptions,'ppppp')} */}
                <Autocomplete
                  disablePortal
                  id="departmentName"
                  options={typeof userdropDownOptions?.departmentOptions===undefined ? []:userdropDownOptions?.departmentOptions}

                  value={userdropDownvalue?.departmentValue}

                  getOptionLabel={(option) => option.departmentName}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...userdropDownvalue };
                    newArr.departmentValue=newvalue;
                    newArr.desginationValue=undefined;
                    newArr.desginationGradeValue=undefined
                    
                    console.log(newArr)
                   
                    try{
                      const desgObj={
                        companyID:'COMP1',
                        departmentID:newvalue?.departmentID
                      }
                      const desgination=await ApiHitDesgniation(desgObj);
                      var optionsArr={...userdropDownOptions};
                      optionsArr.desginationOptions=desgination;
                      optionsArr.desginationGradeOptions=[];
                      
                     
                      setUserDropDownOptions(optionsArr)

                    }
                    catch(error){
                      
                    }

                   
                    
                    setUserDropDownValue(newArr)
                  }}
                  renderInput={(params) => <TextField {...params} label="Department"
                  style={{ width: '100%' }} />}
                />
              </Grid>
           

           
              <Grid item xs={12} md={6} lg={6} paddingLeft='16px'>
               
                <Autocomplete
                  disablePortal
                  id="Desgination"
                  options={userdropDownOptions?.desginationOptions  || []}
                  value={userdropDownvalue?.desginationValue}
                  getOptionLabel={(option) => option.designationName}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...userdropDownvalue };
                    newArr.desginationValue=newvalue;
                  
                    newArr.desginationGradeValue=undefined
                    
                    console.log(newArr)
                   
                    try{
                      const desgGradeObj={
                        companyID:'COMP1',
                        designationID:newvalue?.designationID
                      }
                      const desginationGrade=await ApiHitDesgniationGrade(desgGradeObj);
                      var optionsArr={...userdropDownOptions};
                      optionsArr.desginationGradeOptions=desginationGrade;
                      
                      
                     
                      setUserDropDownOptions(optionsArr)

                    }
                    catch(error){
                      
                    }

                   
                    
                    setUserDropDownValue(newArr)
                  }}
                  renderInput={(params) => <TextField {...params} label="Desgination"
                  style={{ width: '100%' }} />}
                />
              </Grid>
           

          
              <Grid item xs={12} md={6} paddingLeft='16px'>
              
                <Autocomplete
                  disablePortal
                  id="DesginationGrade"
                  options={userdropDownOptions?.desginationGradeOptions  || []}
                  value={userdropDownvalue?.desginationGradeValue}
                  getOptionLabel={(option) => option.designationGradeName}

                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...userdropDownvalue };
                    newArr.desginationGradeValue=newvalue;
                  
                  
                    
                  

                   
                    
                    setUserDropDownValue(newArr)
                  }}
                  renderInput={(params) => <TextField {...params} label="DesginationGrade"
                  style={{ width: '100%' }} />}
                />
              </Grid>
            
             </Grid>

            
             {/* </Grid> */}

             

                
            
           
             
             




            </Box>

            </DialogContent>

            </FormProvider>
        
        

        <DialogActions>
            <Button variant="outlined" onClick={handleEditClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" sx={{backgroundColor:'#3B82F6'}} onClick={onSubmit}>
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
    currentUserData:PropTypes.object,
    userlocation:PropTypes.object,
    dropDownOptions:PropTypes.array,
    dropDownvalue:PropTypes.array,
    employeeIDForApis:PropTypes.string

  };