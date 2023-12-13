import React, { useState, useMemo, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';


import LoadingButton from '@mui/lab/LoadingButton';
import ModalHeader from '../../global/modalheader/ModalHeader';


import { Autocomplete, TextField,DialogContent,DialogActions,Grid , Box,Button } from '@mui/material';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
    RHFAutocomplete,
  } from 'src/components/hook-form';
  

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

export default function MultipleSelectCheckmarks({currentUser, EditData ,handleClose}) {

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
    
  const [personName, setPersonName] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes('Select All')) {
      // If "Select All" is selected, toggle between selecting all and deselecting all
      setPersonName((prev) => (prev.length === names.length - 1 ? [] : names.slice(1)));
      setSelectAll((prev) => !prev);
    } else {
      // Handle other options
      setPersonName(value);
      setSelectAll(false);
    }
  };


  // for on select of option textfield will display
  const list=[{id:1,name:"Bonus"},{id:2,name:"Bonus2"},{id:3,name:"Bonus3"},{id:4,name:"Bonus4"}]
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
  // Filter out options that have already been selected
  const availableOptions = list.filter((option) => !selectedOptions.includes(option));
  

  return (
    <>
        <FormProvider  methods={methods} onSubmit={(event) => onSubmitEdit2(timesheetData, event)}>
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
      
        
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          fullWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectAll || personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      
        
      {/* </Stack> */}

      </FormControl>
     
     
      {/* <Stack spacing={2} marginTop={2}> */}
      <Autocomplete
        multiple
        id="tags-outlined"
        options={availableOptions}
        value={selectedOptions}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Select Bonuses" variant="outlined" />
        )}
      />
      <Grid container  spacing={1} mt={1}>
        {selectedOptions.map((option) => (
          <React.Fragment key={option.id}>
             
            <Grid item style={{ width: '50%' }}>
            <TextField
              label={`${option.name} Amount`}
              variant="outlined"
              fullWidth
              onChange={(e) => handleTextFieldChange(option.name, 'amount', e.target.value)}
            />
            </Grid>
            <Grid item style={{ width: '50%' }}>
            <TextField
            
              label={`${option.name} Reason`}
              variant="outlined"
              fullWidth
              onChange={(e) => handleTextFieldChange(option.name, 'reason', e.target.value)}
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
