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
    const [deductionDetails, setDeductionDetails] = useState("");
    const [personName, setPersonName] = useState();
    const [itemAdded,setItemAdded] = useState(true);
    const [loanStatus,setLoanStatus]=useState()
    const [filteredFieldValues,setFilteredValues]=useState(); 
    const list=[{id:"Health Insurance Premium",name:"Health Insurance Premium"},{id:"Loan Request",name:"Loan Request"},{id:"Union Dues",name:'Union Dues'},{id:"Garnishments",name:"Garnishments"},{id:"Salary Advance Request",name:'Salary Advance'},{id:"Other Deductions",name:"Other Deductions"}]
    useEffect(()=>{
        getEmployeesList()
    },[])
    useEffect(()=>{
      if(personName){
        getLatestInstallmentNumber()
        getLoanRequestStatus()
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


useEffect(()=>{
  if(disableHealthInsurancePremium && healthInsuranceupdate?.NumberOfInstallments)
{
   const filteredField =  fieldValues.filter((value) => value.Type !== "Health Insurance Premium");
   setFilteredValues(filteredField)
}
else{
  setFilteredValues(fieldValues)
}
},[healthInsuranceupdate?.NumberOfInstallments,fieldValues])

const AddDeductions=()=>{
  const payload ={
    companyID:user?.companyID,
    employeeID:personName,
    deductionType:filteredFieldValues
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:baseUrl + `/addOtherDeductions`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    handleClose()
    enqueueSnackbar(response.data.message,{variant:'success'})
  
  })
    .catch((error) => {
      handleClose()
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
    url:baseUrl + `/getLatestInstallmentNumber`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    sethealthInsuranceUpdate(response.data)
    // enqueueSnackbar(response.data.message,{variant:'success'})
  
  })
    .catch((error) => {
      console.log(error,"Errorrrr")
      
    });
}

const getLoanRequestStatus =()=>{
  const data = {
    "employeeID":personName
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + `/checkEmployeeStatus`,
    data:data
   }
   axios.request(config).then((response)=>{
   setLoanStatus(response?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}

useEffect(() => {
  const index = fieldValues.findIndex(
    (fieldValue) => fieldValue.Type == 'Health Insurance Premium'
  );

  if (healthInsuranceupdate?.NumberOfInstallments > 0) {
    if (index !== -1) {
      setDeductionDetails('Health Insurance Premium')
      setDisableHealthInsurancePremium(true);
     
      // AddDeductions();
    }
  } else {
    setDisableHealthInsurancePremium(false);
  }
  
}, [healthInsuranceupdate?.NumberOfInstallments,fieldValues]);
useEffect(()=>{
  if(deductionDetails){
    getHealthInsuranceDetails()
  };
},[deductionDetails])

const getHealthInsuranceDetails=()=>{
  const payload ={
    employeeID:personName,
    deductionType:deductionDetails
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:baseUrl + `/getEmployeeInstallments`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    setHealthInsuranceDetails(response?.data)
  
  })
    .catch((error) => {
      console.log(error,"Errorrrr")
      
    });
}

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
 <div>
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
        
           <MenuItem key={options?.id} value={options?.id}
           disabled={
            (options?.id === 'Salary Advance Request' &&
              (loanStatus?.salaryStatus === 'pending' || loanStatus?.salaryStatus === '')) ||
            (options?.id === 'Loan Request' &&
              (loanStatus?.loanStatus === 'pending' || loanStatus?.loanStatus === ''))||
              (options?.id === 'Salary Advance Request' && loanStatus?.salaryDeductionStatus === 'completed')||
              (options?.id === 'Loan Request' && loanStatus?.loanDeductionStatus === 'completed')
          }>
            {options?.name} 
            {((options?.id === 'Salary Advance Request' && loanStatus?.salaryStatus === 'pending')
    ? "(Request Not Approved)"
    : (options?.id === 'Salary Advance Request' && loanStatus?.salaryStatus === '')
    ? "(No Request)"
    : (options?.id === 'Loan Request' && loanStatus?.loanStatus === 'pending')
    ? "(Request Not Approved)"
    : (options?.id === 'Loan Request' && loanStatus?.loanStatus === '')
    ? "(No Request)"
    : (options?.id === 'Salary Advance Request' && loanStatus?.salaryDeductionStatus === 'completed')
    ?"(Installments Completed)"
    : (options?.id === 'Loan Request' && loanStatus?.loanDeductionStatus === 'completed')
    ?"(Installments Completed)":null)}
      
         </MenuItem>
       ))}
     </Select>
     </FormControl>
        <Grid container spacing={1} flexDirection="row" sx={{marginTop:1}}>
      
      {(fieldValue.Type=='Loan Request' || fieldValue?.Type=='Salary Advance Request')?null:
      <Grid item xs={12} md={6}>
        <TextField
          id="deduction amount"
          label="Deduction Amount"
          placeholder="Enter Deducting Amount"
          variant="outlined"
          fullWidth
          value={
            (fieldValue.Type === deductionDetails && disableHealthInsurancePremium)
              ? (healthInsuranceDetails?.deductionAmount || 0) // Convert to string if needed
              : fieldValue.amount
          }
          defaultValue={
            fieldValue.Type === deductionDetails && disableHealthInsurancePremium
              ? (healthInsuranceDetails?.deductionAmount !== undefined
                  ? healthInsuranceDetails.deductionAmount
                  : fieldValue.amount)
              : ''
          }
          disabled={fieldValue.Type === deductionDetails && disableHealthInsurancePremium}
          onChange={(e) =>
            handleTextFieldChange(
              index,
              'amount',
              e.target.value !== '' ? parseInt(e.target.value) : ''
            )
          }
        />
        </Grid>}
      
      {(fieldValue.Type === deductionDetails && disableHealthInsurancePremium) ?null:
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
        </Grid>}
  </Grid>
        {(fieldValue.Type === "Health Insurance Premium" || fieldValue.totalInstallments>0) && (!disableHealthInsurancePremium) && <TextField
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
