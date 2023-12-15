import React, { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';

import LoadingButton from '@mui/lab/LoadingButton';
import ModalHeader from '../../global/modalheader/ModalHeader';


import { Autocomplete, TextField,Chip,DialogContent,DialogActions,Grid , Box,Button ,OutlinedInput,InputLabel,MenuItem,FormControl,Select,Stack} from '@mui/material';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
    RHFAutocomplete,
  } from 'src/components/hook-form';
import { useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Select All',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function DeductionAddEdit({currentUser, EditData ,handleClose}) {

    const [employeeListData,setEmployesListData] = useState()
    const {user} = useContext(UserContext)
    useEffect(()=>{
        getEmployeesList()
    },[])
    const getEmployeesList =()=>{
        const data ={
          companyID:user?.companyID
        }
        const config={
          method:'POST',
          maxBodyLength:Infinity,
          url:baseUrl + '/getEmployeesForProjectManager',
          data:data
         }
         axios.request(config).then((response)=>{
          setEmployesListData(response?.data?.data)
         })
         .catch((error)=>{
          console.log(error)
         })
      }

    const defaultValues = useMemo(
        () => ({   
            employee_id: currentUser?.employee_id || '',
            monday: currentUser?.monday || '',   
        }),
        [currentUser]
      );
      const NewUserSchema = Yup.object().shape({
        companyId: Yup.string(),
        employeeId: Yup.string(),
       
    
      });
    
      const   methods = useForm({
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
    
  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
   setPersonName(event?.target?.value)
   
  };


  const list=[{id:"healthInsurancePremium",name:"Health Insurance Premium"},{id:"loanRequest",name:"Loan Request"},{id:"absenceDeductions",name:"Absence Deductions"},{id:"unionDues",name:'Union Dues'},{id:"garnishments",name:"Garnishments"},{id:"salaryAdvanceRequest",name:'Salary Advance'},{id:"otherDeductions",name:"Other Deductions"}]
  const [selectedOptions, setSelectedOptions] = React.useState();
  const [deductionDetails, setDeductionDetails] = React.useState([]);
  const [requestType,setRequestType] = useState([])
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOptions(event.target.value);
  };

  const handleTextFieldChange = (bonusName, field, value) => {
    setDeductionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
  
      const existingIndex = updatedDetails.findIndex(
        (detail) => detail.Type === bonusName
      );
  
      if (existingIndex !== -1) {
      if(field=="comments"){
        updatedDetails[existingIndex] = {
          ...updatedDetails[existingIndex],
          [field]: value
        };
      }
     
      else{
        updatedDetails[existingIndex] = {
          ...updatedDetails[existingIndex],
          [field]: parseInt(value)
        };
      }
      } else {
        const newDetail = {
          
          Type: bonusName,
          comments: '',
          amount: '',
          noOfInstallments:1,
          [field]: parseInt(value)
        };
        updatedDetails.push(newDetail);
      }
  
      return updatedDetails;
    });
  };
  
console.log(deductionDetails,"deductionDetails",requestType)
  const [selectCount,setSelectCount] = useState(1)
const handleRemove=(deductionType)=>{
  setSelectCount(selectCount-1)
  setSelectedOptions(null)
  setDeductionDetails((prevDetails) =>
  prevDetails.filter((detail) => detail.deductionType !== deductionType)
  );
}
console.log(personName,"personname")
const handleAdd =()=>{
  setSelectCount(selectCount+1)
}
// const updatedDeductionDetails = deductionDetails.filter(
//   (detail) => (detail.Type !== "loanRequest" || detail.Type!=="salaryAdvanceRequest")
// );

const AddDeductions=()=>{
  const payload ={
    companyID:user?.companyID,
    employeeID:personName,
    deductionType:deductionDetails
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/addOtherDeductions`,
    // url: baseUrl + `/approveLoanDetails`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    console.log(response,"responseeee")
    // handleClose()
    // enqueueSnackbar(response.data.message,{variant:'success'})
  
  })
    .catch((error) => {
      // handleClose()
      console.log(error,"Errorrrr")
      
    });
}
const [healthInsuranceupdate,sethealthInsuranceUpdate]= useState()
const [healthInsuranceDetails,setHealthInsuranceDetails]=useState()
const getLatestInstallmentNumber=()=>{
  const payload ={
    employeeID:personName,
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/getLatestInstallmentNumber`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    console.log(response,"responseeee")
    sethealthInsuranceUpdate(response.data)
    // enqueueSnackbar(response.data.message,{variant:'success'})
  
  })
    .catch((error) => {
      console.log(error,"Errorrrr")
      
    });
}

const getHealthInsuranceDetails=()=>{
  const payload ={
    employeeID:personName,
    deductionType:selectedOptions
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/getEmployeeInstallments`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    console.log(response,"responseeee")
    setHealthInsuranceDetails(response?.data)
  
  })
    .catch((error) => {
      console.log(error,"Errorrrr")
      
    });
}
const AddLoanRequestDeduction=()=>{
  const payload ={
    employeeID:personName,
    requestType:selectedOptions,
    companyID:user?.companyID
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/addDeductionDetails`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    console.log(response,"responseeee")
    // enqueueSnackbar(response.data.message,{variant:'success'})
  
  })
    .catch((error) => {
      console.log(error,"Errorrrr")
      
    });
}

useEffect(()=>{
  if(personName){
    getLatestInstallmentNumber()
  }
  if(selectedOptions=='loanRequest'){
    AddLoanRequestDeduction()
  }
},[personName,selectedOptions])
const [disableHealthInsurancePremium,setDisableHealthInsurancePremium]=useState()// Initialize outside useEffect

useEffect(() => {
  if (healthInsuranceupdate?.NumberOfInstallments > 0) {
    console.log(selectedOptions,"selectedoptionss")
    if(selectedOptions=="healthInsurancePremium"){
      console.log(selectedOptions,"selectedoptionss")
      deductionDetails.push({Type:selectedOptions})
      AddDeductions()
      getHealthInsuranceDetails()
      setDisableHealthInsurancePremium(true)
    }
    
  } else {
    setDisableHealthInsurancePremium(false);
  }
}, [healthInsuranceupdate?.NumberOfInstallments,selectedOptions]);


  return (
    <>
        <FormProvider  methods={methods} onSubmit={(event) => onSubmitEdit2(timesheetData, event)}>
        <ModalHeader heading={EditData?.employeeId ? 'Edit Deductions ' : 'Add Deductions '}/>
        <DialogContent>
            <Box
            rowGap={1}
            columnGap={1}
            display="grid"
            gridTemplateColumns={{
              // xs: 'repeat(1, 1fr)',
              // sm: 'repeat(7, 1fr)',
            }}
            
            >
              

      <FormControl sx={{ mt:1, width: "100%" }}>
      
      
        <InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          fullWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Employees" />}
          MenuProps={MenuProps}
        >
          {employeeListData?.map((employee) => (
            <MenuItem key={employee?.employeeID} value={employee?.employeeID} >
              {employee?.employeeName} 
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        {console.log(selectCount,"Selectcount")}
        {[...Array(selectCount)].map((_, index) => (
      <>
       <FormControl sx={{ mt:1, width: "100%" }}>
       
        <InputLabel id="demo-multiple-checkbox-label">Deductions</InputLabel>
      <Select
       labelId="demo-multiple-checkbox-label"
       id="demo-multiple-checkbox"
       fullWidth
       onChange={handleAutocompleteChange}
       MenuProps={MenuProps}
       input={<OutlinedInput label="Deductions" />}
      >
        {list?.map((options) => (
         
            <MenuItem key={options?.id} value={options?.id}>
             {options?.name}
          </MenuItem>
        ))}
      </Select>
   
      </FormControl>
     
    <Grid container spacing={1} flexDirection="row">
      
    <Grid item xs={12} md={6}>
    <TextField
        label="Deduction Amount"
        placeholder='Enter Deducting Amount'
        variant="outlined"
        fullWidth
        disabled={disableHealthInsurancePremium && selectedOptions === "healthInsurancePremium"}
        value={
          (selectedOptions === "healthInsurancePremium" && disableHealthInsurancePremium)
            ? healthInsuranceDetails?.deductionAmount
            : null
        }
        onChange={(e) => handleTextFieldChange(selectedOptions, 'amount', e.target.value)}
    />
    </Grid>
    {(!disableHealthInsurancePremium)?<Grid item xs={12} md={6}>
      <TextField
        label="Deduction Reason"
        variant="outlined"
        fullWidth
        onChange={(e) => handleTextFieldChange(selectedOptions,'comments',e.target.value)}
      />
    </Grid>:null}
  </Grid>
  {(selectedOptions=='healthInsurancePremium'&& !disableHealthInsurancePremium)&&
  <Grid container spacing={1} flexDirection="row">
       {/* <Grid item xs={12} md={6}>
      <TextField
        label="Current Installment"
        variant="outlined"
        fullWidth
        onChange={(e) => handleTextFieldChange(selectedOptions,'noOfInstallments',e.target.value)}
      />
    </Grid> */}
    <Grid item xs={12} md={12}>
      <TextField
        label="Duration of Health Insurance"
        placeholder="no.of months covered by insurance"
        variant="outlined"
        fullWidth
        onChange={(e) => handleTextFieldChange(selectedOptions,'totalInstallments',e.target.value)}
      />
    </Grid>
  </Grid>}
     </>
        ))}
      <div style={{display:"flex"}}>  <Button onClick={handleAdd}>ADD</Button>
        <Button onClick={()=>handleRemove(selectedOptions)}>Remove</Button>
        </div>
      </Box>
     
      <DialogActions>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
              <Button variant='outlined' onClick={handleClose} sx={{marginRight:1}}>Cancel</Button>
                <Button variant="contained" color='primary' onClick={AddDeductions}>
                  {/* {!currentUser ? 'Update Timesheet' : 'Add  TimeSheet'} */}
                  {EditData?.employeeId ? 'Edit Deductions' : 'Add Deductions '}
                </Button>
              
              </Stack>
             </DialogActions>
            </DialogContent>
      </FormProvider>
    </>
  );
}
