import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import ModalHeader from '../../global/modalheader/ModalHeader';
import Iconify from 'src/components/iconify/iconify';
import { Autocomplete, TextField,Chip,Dialog,DialogContent,DialogActions,Grid ,IconButton,Tooltip,InputLabelProps, Box,Button ,OutlinedInput,InputLabel,MenuItem,FormControl,Select,Stack} from '@mui/material';
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
export default function DeductionAddEdit({currentUser, EditData ,handleClose}) {
    const [employeeListData,setEmployesListData] = useState()
    const {user} = useContext(UserContext)
    const [disableHealthInsurancePremium,setDisableHealthInsurancePremium]=useState()// Initialize outside useEffect
    const [fieldValues, setFieldValues] = useState([]);
    const [healthInsuranceupdate,sethealthInsuranceUpdate]= useState()
    const [healthInsuranceDetails,setHealthInsuranceDetails]=useState()
    const [selectCount,setSelectCount] = useState(1)
    const [deductionDetails, setDeductionDetails] = useState();
    const [personName, setPersonName] = useState();
    const [itemAdded,setItemAdded] = useState(true); 
    const list=[{id:"healthInsurancePremium",name:"Health Insurance Premium"},{id:"loanRequest",name:"Loan Request"},{id:"absenceDeductions",name:"Absence Deductions"},{id:"unionDues",name:'Union Dues'},{id:"garnishments",name:"Garnishments"},{id:"salaryAdvanceRequest",name:'Salary Advance'},{id:"otherDeductions",name:"Other Deductions"}]
    useEffect(()=>{
        getEmployeesList()
    },[])
    useEffect(()=>{
      if(personName){
        getLatestInstallmentNumber()
      }
    },[personName])
    
  
    // Initialize field values when selectCount changes
    useEffect(() => {
      setFieldValues((prevValues) => {
        const updatedValues = [...prevValues];
        if (updatedValues.length < selectCount) {
          for (let i = updatedValues.length; i < selectCount; i++) {
            updatedValues.push({
              Type: '',
              amount: 0,
              comments: '',
              noOfInstallments: 1,
              totalInstallments: 0,
            });
          }
        }
        return updatedValues;
      });
    }, [selectCount]);
    
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
      };
    
    const handleChange = (event) => {
    setPersonName(event?.target?.value)
    
    };
    
    const handleAutocompleteChange = (event, index) => {
      const { value } = event.target;

      setFieldValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].Type = value;
        return updatedValues;
      });
    };
    // const handleTextFieldChange = (bonusName, field, value) => {
    //   setDeductionDetails((prevDetails) => {
    //     const updatedDetails = [...prevDetails];
    
    //     const existingIndex = updatedDetails.findIndex(
    //       (detail) => detail.Type === bonusName
    //     );
    
    //     if (existingIndex !== -1) {
    //     if(field=="comments"){
    //       updatedDetails[existingIndex] = {
    //         ...updatedDetails[existingIndex],
    //         [field]: value
    //       };
    //     }
       
    //     else{
    //       updatedDetails[existingIndex] = {
    //         ...updatedDetails[existingIndex],
    //         [field]: parseInt(value)
    //       };
    //     }
    //     } else {
    //       const newDetail = {
            
    //         Type: bonusName,
    //         comments: '',
    //         amount: '',
    //         noOfInstallments:1,
    //         [field]: parseInt(value)
    //       };
    //       updatedDetails.push(newDetail);
    //     }
    
    //     return updatedDetails;
    //   });
    // };
  

    const handleTextFieldChange = (index, field, value) => {
      setFieldValues((prevValues) => {
        const updatedValues = prevValues.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              [field]: value,
            };
          }
    
          if (item.Type === prevValues[index].Type) {
            return {
              ...item,
              [field]: value,
            };
          }
    
          return item;
        });
        return updatedValues;
      });
    };
  
  

 
const handleRemove=()=>{
  setItemAdded(true)
  if (fieldValues.length > 0) {
    setFieldValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues.pop(); // Remove the last added deduction type
      return updatedValues;
    });
    setSelectCount((prevCount) => prevCount - 1);
  }
}
const handleAdd =()=>{
  setSelectCount(selectCount+1)
  setItemAdded(false)
}
const filteredFieldValues = fieldValues.filter(
  (value) => value.Type !== "loanRequest" && value.Type !== "salaryAdvanceRequest"
);
const AddDeductions=()=>{
  const payload ={
    companyID:user?.companyID,
    employeeID:personName,
    deductionType:filteredFieldValues
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
    deductionType:deductionDetails
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
const AddLoanRequestDeduction=(e)=>{
  const payload ={
    employeeID:personName,
    requestType:e,
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

useEffect(() => {
  console.log(fieldValues,"fieldValuess")
  const index = fieldValues.findIndex(
    (fieldValue) => fieldValue.Type === 'healthInsurancePremium'
  );

  {console.log(index,'indexValueee')}
  if (healthInsuranceupdate?.NumberOfInstallments > 0) {
    {console.log('ifffblockkk',healthInsuranceupdate)}
    if (index !== -1) {
      {console.log("ifindexxblock",index)}
      setDeductionDetails('healthInsurancePremium')
      setDisableHealthInsurancePremium(true);
      AddDeductions();
      getHealthInsuranceDetails();
    }
  } else {
    setDisableHealthInsurancePremium(false);
  }
  {console.log(deductionDetails,"deductionType")}
}, [healthInsuranceupdate?.NumberOfInstallments,fieldValues]);

useEffect(() => {
  fieldValues.forEach((value) => {
    if (value.Type === 'loanRequest' || value.Type === 'salaryAdvanceRequest') {
      AddLoanRequestDeduction(value.Type);
    }
  });
}, [fieldValues]);

// setHealthInsuranceDetails({deductionAmount:1000,loanID:50})
  return (
    <>
       
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
        {/* {[...Array(selectCount)].map((_, index) => (
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
        ))} */}<div>
    {fieldValues.map((fieldValue, index) => (
      <React.Fragment key={index}>
      
        <FormControl sx={{ mt:1, width: "100%" }}>
       
       <InputLabel id="demo-multiple-checkbox-label">Deductions</InputLabel>
     <Select
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      fullWidth
      onChange={(event) => handleAutocompleteChange(event, index)}
      MenuProps={MenuProps}
      input={<OutlinedInput label="Deductions" />}
     >
       {list?.map((options) => (
        
           <MenuItem key={options?.id} value={options?.id}>
            {options?.name}
         </MenuItem>
       ))}
     </Select>
  {console.log(fieldValue,"fieldValueee",disableHealthInsurancePremium)}
     </FormControl>
        <Grid container spacing={1} flexDirection="row" sx={{marginTop:1}}>
      
      <Grid item xs={12} md={6}>
        <TextField
          label="Deduction Amount"
          placeholder="Enter Deducting Amount"
          variant="outlined"
          fullWidth
          // value={
          //   (fieldValue.Type === "healthInsurancePremium" && disableHealthInsurancePremium)
          //     ? (healthInsuranceDetails?.deductionAmount || 0) // Convert to string if needed
          //     : ''
          // }
          // defaultValue={
          //   fieldValue.Type === "healthInsurancePremium" && disableHealthInsurancePremium
          //     ? (healthInsuranceDetails?.deductionAmount !== undefined
          //         ? healthInsuranceDetails.deductionAmount
          //         : '')
          //     : ''
          // }
          onChange={(e) =>
            handleTextFieldChange(
              index,
              'amount',
              e.target.value !== '' ? parseInt(e.target.value) : ''
            )
          }
        />
        </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          label="Deduction Reason"
          placeholder="Enter Remarks"
          variant="outlined"
          fullWidth
          // disabled={/* Disable logic */}
          onChange={(e) =>
            handleTextFieldChange(
              index,
              'comments',
              (e.target.value)
            )
          }
        />
        </Grid>
  </Grid>
        {(fieldValue.Type === "healthInsurancePremium" || fieldValue.totalInstallments>0) && <TextField
        label="Duration of Health Insurance"
        placeholder="no.of months covered by insurance"
        variant="outlined"
        fullWidth
        sx={{marginTop:1}}
        onChange={(e) => handleTextFieldChange(index,'totalInstallments',parseInt(e.target.value))}
      />}
      </React.Fragment>
    ))}
  </div>

      <div style={{display:"flex",float:'right',right:5,textAlign:'right',justifyContent:'right'}}>   
      {itemAdded ? (
    <Tooltip title="Add" placement="top">
      <IconButton onClick={handleAdd}>
        <Iconify icon="icons8:plus" sx={{color:'black'}}/>
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Remove" placement="top">
      <IconButton onClick={handleRemove}>
        <Iconify icon="icons8:minus" sx={{color:'black'}}/>
      </IconButton>
    </Tooltip>
  )}
        </div>
      </Box>
     
      <DialogActions>
              <Stack alignItems="flex-end" sx={{ display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
              <Button variant='outlined' onClick={handleClose} sx={{marginRight:1}}>Cancel</Button>
                <Button variant="contained" color='primary' onClick={AddDeductions}>
                  {/* {!currentUser ? 'Update Timesheet' : 'Add  TimeSheet'} */}
                  {EditData?.employeeId ? 'Edit Deductions' : 'Add Deductions '}
                </Button>
              
              </Stack>
             </DialogActions>
            </DialogContent>
     
    </>
  );
}
