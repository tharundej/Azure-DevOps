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


  // for on select of option textfield will display
  const list=[{id:1,name:"Health Insurance Premium"},{id:2,name:"Loan Request"},{id:3,name:"Absence Deductions"},{id:4,name:'Union Dues'},{id:5,name:"Garnishments"},{id:6,name:'Salary Advance'},{id:7,name:"Other Deductions"}]
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [bonusDetails, setBonusDetails] = React.useState({});

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOptions([...new Set(newValue || [])]);
  };

  const handleTextFieldChange = (bonusName, field, value) => {
    setBonusDetails((prevDetails) => ({
      ...prevDetails,
      [bonusName]: {
        ...prevDetails[bonusName],
        [field]: value
      }
    }));
  };
console.log(bonusDetails,"bonusDetails")
  
  const availableOptions = list.filter((option) => !selectedOptions.includes(option));
  
console.log(personName,"personname")
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
      <Autocomplete
        multiple
        id="tags-outlined"
        options={availableOptions}
        value={selectedOptions}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Deductions" variant="outlined" />
        )}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            ))
          }
      />
      <Grid container  spacing={1} mt={1}>
        {selectedOptions.map((option) => (
          <React.Fragment key={option.id}>
             
            <Grid item style={{ width: '50%' }}>
            <TextField
            
            label={`${option.name} Reason`}
            variant="outlined"
            fullWidth
            onChange={(e) => handleTextFieldChange(option.name, 'reason', e.target.value)}
          />
           
            </Grid>
            <Grid item style={{ width: '50%' }}>
            <TextField
              label={`${option.name} Amount`}
              variant="outlined"
              fullWidth
              onChange={(e) => handleTextFieldChange(option.name, 'amount', e.target.value)}
            />
            </Grid>
          

          </React.Fragment>
        ))}
          </Grid>
      
      </Box>
     
      <DialogActions>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                  {/* {!currentUser ? 'Update Timesheet' : 'Add  TimeSheet'} */}
                  {EditData?.employeeId ? 'Edit Additions' : 'Add Additions '}
                </LoadingButton>
                <Button  onClick={handleClose}>Cancel</Button>
              </Stack>
             </DialogActions>
            </DialogContent>
      </FormProvider>
    </>
  );
}
