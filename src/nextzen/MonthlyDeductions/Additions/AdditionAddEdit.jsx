import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import ModalHeader from '../../global/modalheader/ModalHeader';
import Iconify from 'src/components/iconify/iconify';
import { Autocomplete, TextField,Chip,Dialog,DialogContent,DialogActions,Grid ,IconButton,Tooltip,InputLabelProps, Box,Button ,OutlinedInput,InputLabel,MenuItem,FormControl,Select,Stack, Card, CardContent, Typography} from '@mui/material';
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
export default function AdditionAddEdit({currentUser, EditData ,handleClose}) {
    const [employeeListData,setEmployesListData] = useState()
    const {user} = useContext(UserContext)
    const [fieldValues, setFieldValues] = useState([]);
    const [selectCount,setSelectCount] = useState(1)
    const [personName, setPersonName] = useState();
    const [itemAdded,setItemAdded] = useState(true); 
    const list=[
      {id:"Bonus",name:"Bonus"},
      {id:"benefits",name:"Benefits"},
      {id:"Meals",name:"Meal Allowance"},
      {id:"specialProjectAllowance",name:'Special Project Allowance'},
      {id:"commissions",name:"Commissions"},
      {id:"grativity",name:"Grativity"},
      {id:"otherEarnings",name:'Other Earnings'},
    ]
    useEffect(()=>{
        getEmployeesList()
    },[])
  
    
  
    // Initialize field values when selectCount changes
    useEffect(() => {
      setFieldValues((prevValues) => {
        const updatedValues = [...prevValues];
        if (updatedValues.length < selectCount) {
          for (let i = updatedValues.length; i < selectCount; i++) {
            updatedValues.push({
              AdditionsType: '',
              additionsAmount: 0,
              comments: '',
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
        updatedValues[index].AdditionsType = value;
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
    
          if (item.AdditionsType === prevValues[index].AdditionsType) {
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

const AddAdditions=()=>{
  const payload ={
    companyID:user?.companyID,
    employeeID:personName,
    Additions:fieldValues
  }
  const config = {
    method: 'POST',
    maxBodyLength:Infinity,
    url:baseUrl + `/AdditionsDetails`,
    data: payload
  
  }
  axios.request(config).then((response) => {
    console.log(response,"responseeee")
    handleClose()
    // enqueueSnackbar(response.data.message,{variant:'success'})
  
  })
    .catch((error) => {
      // handleClose()
      console.log(error,"Errorrrr")
      
    });
}

  return (
    <>
       
        <ModalHeader heading={EditData?.employeeId ? 'Edit Additions ' : 'Add Additions '}/>
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
       <div>
    {fieldValues.map((fieldValue, index) => (
      <React.Fragment key={index}>
        <Card sx={{marginBottom:1}}>
          <CardContent>
         <Grid container flexDirection="row" >
        <Grid item md={11}>
        <FormControl sx={{ width: "100%" }}>
       <InputLabel id="demo-multiple-checkbox-label">Additions</InputLabel>
     <Select
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      fullWidth
      onChange={(event) => handleAutocompleteChange(event, index)}
      MenuProps={MenuProps}
      input={<OutlinedInput label="Additions" />}
     >
       {list?.map((options) => (
        
           <MenuItem key={options?.id} value={options?.id}>
            {options?.name}
         </MenuItem>
       ))}
     </Select>
 
     </FormControl>
        <Grid container spacing={1} flexDirection="row" sx={{marginTop:1}}>
      
      <Grid item xs={12} md={6}>
        <TextField
          label="Addition Amount"
          placeholder="Enter Addition Amount"
          variant="outlined"
          fullWidth
          onChange={(e) =>
            handleTextFieldChange(
              index,
              'additionsAmount',
              e.target.value !== '' ? parseInt(e.target.value) : ''
            )
          }
        />
        </Grid>
      {console.log(index,"indexxx")}
      <Grid item xs={12} md={6}>
        <TextField
          label="Remarks"
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
      </Grid>
    {(index==selectCount-1) && <Grid item md={1} sx={{marginTop:4}}>
   
  <Box sx={{ pb: 1.5 }}>
    <Typography variant="subtitle2" noWrap>
   <Tooltip title="Add" placement="top">
      <IconButton onClick={handleAdd}>
        <Iconify icon="icons8:plus" sx={{color:'black'}}/>
      </IconButton>
    </Tooltip>
    </Typography>
  
  <Typography variant="subtitle2">
    {selectCount>1 && <Tooltip title="Remove" placement="top">
      <IconButton onClick={handleRemove}>
        <Iconify icon="icons8:minus" sx={{color:'black'}}/>
      </IconButton>
    </Tooltip>}
    </Typography>
    </Box>
     </Grid>}
  
        </Grid>
        </CardContent>
        </Card>
      
      </React.Fragment>
    ))}
   
  </div>

      {/* <div style={{display:"flex",float:'right',right:5,textAlign:'right',justifyContent:'right'}}>   
      
    <Tooltip title="Add" placement="top">
      <IconButton onClick={handleAdd}>
        <Iconify icon="icons8:plus" sx={{color:'black'}}/>
      </IconButton>
    </Tooltip>
  
    {selectCount>1 && <Tooltip title="Remove" placement="top">
      <IconButton onClick={handleRemove}>
        <Iconify icon="icons8:minus" sx={{color:'black'}}/>
      </IconButton>
    </Tooltip>}
  
        </div> */}
      </Box>
     
      <DialogActions>
              <Stack alignItems="flex-end" sx={{ display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
              <Button variant='outlined' onClick={handleClose} sx={{marginRight:1}}>Cancel</Button>
                <Button variant="contained" color='primary' onClick={AddAdditions}>
                  {EditData?.employeeId ? 'Edit Additions' : 'Add Additions '}
                </Button>
              
              </Stack>
             </DialogActions>
            </DialogContent>
     
    </>
  );
}
