import PropTypes from 'prop-types';
import React,{ useEffect, useState,useCallback } from 'react';
import { styled } from '@mui/system';

import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';

import {Card,TextField,InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';


import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import formatDateToYYYYMMDD from '../global/GetDateFormat';

import CustomDateRangePicker from '../global/CustomDateRangePicker';
// import { ButtonGroup } from 'rsuite';




const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      overflow:"hidden"
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
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

  
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ClaimSearchFilter({filterData,searchData,dialogConfig,filterOptions,addButton,buttonFunction,dialogPayload}){

  // dialogConfig,filterOptions,addButton,buttonFunction
  const { title, fields } = dialogConfig;

  const theme = useTheme();
  

  
 
  

  
  

    const [open,setOpen]=useState(false);
    const [openButton,setOpenButton]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
    }
    const handleClickClose=()=>{
      setOpen(false)
    }

    const handleClickOpenButton=()=>{
      setOpenButton(true);
    }
    const handleClickCloseButton=()=>{
      setOpenButton(false)
    }


   

    
const [search, setSearch]=useState("");

    const handleSearch = (searchTerm) => {
      setSearch(searchTerm)
        searchData(search)
        console.log(searchTerm,"search ........")
        };
    // dynamic dialog checking 
    //  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  const  externalFilter = {
    
      claimStartDate:"",
      claimEndDate:"",

 
    
      expensestartdate:"",
      expenseenddate:"",

   
   
      status:"",
      paymentstatus:""
    
    
  }
  const [selectedDate, setSelectedDate] = useState(externalFilter);
  
  const handleDateChange = ( field, date) => {
    // const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    setSelectedDate(prevDates => ({
      ...prevDates,
     
       
        [field]: date,
     
    }));

    
   
  };
  
  console.log(selectedDate,"SelectedDate1234------>")


  // const [selectedValue, setSelectedValue] = useState(externalFilter);

const handleSelectChange = (field, value) => {
  // setSelectedValue(prevValues => ({
  //   ...prevValues,
  //   [fieldName]: value,
  // }));
  // console.log(value,"value......")

  setSelectedDate(prevFilter => ({
    ...prevFilter,
    [field]: value,}))

  // if (fieldName === 'status') {
  //   setSelectedDate(prevFilter => ({
  //     ...prevFilter,
  //     status: value,
  //   }));
  // }
};

// const handleMultiSelectChange = (fieldName, newValue) => {
//   setSelectedValue(prevValues => ({
//     ...prevValues,
//     [fieldName]: newValue,
//   }));
// };
// const handleFieldChange = (type, category, field, value) => {
//   if (type === 'datePicker') {
//     const formattedDate = `${String(value.getDate()).padStart(2, '0')}/${String(value.getMonth() + 1).padStart(2, '0')}/${value.getFullYear()}`;
//     setSelectedDate(prevDates => ({
//       ...prevDates,
//       [category]: {
//         ...prevDates[category],
//         [field]: formattedDate,
//       },
//     }));
//   } else if (type === 'Select') {
//     setSelectedValue(prevValues => ({
//       ...prevValues,
//       [field]: value,
//     }));
//   } else if (type === 'multiSelect') {
//     setSelectedValue(prevValues => ({
//       ...prevValues,
//       [field]: value,
//     }));
//   }
// };



// trial 2 method
const [selectedFields, setSelectedFields] = useState(dialogPayload);

const handleFieldChange = (field, value) => {
  setSelectedFields(prevFields => ({
    ...prevFields,
    [field]: value
  }));
  filterData(selectedFields)
};

// const fields = [
//   { type: 'datePicker', label: 'Claim Start Date', name: 'claimStartDate' },
//   { type: 'datePicker', label: 'Claim End Date', name: 'claimEndDate' },
//   { type: 'datePicker', label: 'Expense Start Date', name: 'expenseStartDate' },
//   { type: 'datePicker', label: 'Expense End Date', name: 'expenseEndDate' },
//   { type: 'Select', label: 'Status', name: 'status', options: ['Option 1', 'Option 2', 'Option 3'] },
//   { type: 'Select', label: 'Payment Status', name: 'paymentStatus', options: ['Option A', 'Option B', 'Option C'] },
// ];
console.log(selectedFields,"selectedFields 2nd method")
    return (
        <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            onChange={(e) => handleSearch(e.target.value)}

            />
            </Grid>
            <Grid md={2} xs={2} sx={{alignSelf:"center",textAlign:"center"}}>
              {addButton && <Button variant='contained'  onClick={buttonFunction}>{addButton}</Button>}
              

            </Grid>

            <Grid md={2} xs={2} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>
           Filters
      </Button>

      </Stack>
      </Grid>
         </Grid>
     

    <Dialog open={openButton} onClose={handleClickCloseButton}>
      {/* <DialogTitle>{title}</DialogTitle> */}
      <DialogContent>
       
        <Button>apply</Button>
      </DialogContent>
    </Dialog>




     <Dialog open={open} onClose={onClose}  maxWidth="900px" >
      {/* <DialogTitle>{title}</DialogTitle> */}
      <DialogContent>
      
        {/* {fields.map((field, index) => {
          if (field.type === 'datePicker') {
            return (
              <Grid xs={6} margin={3}>
              <div key={index}>
                <DatePicker
                  label={field.label}
              value={selectedFields[field.name]}
              onChange={(date) => handleFieldChange(field.name, date)}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
              </Grid>
            );
          }
          // if (field.type === 'Select') {
          //   return <>
          //   <FormControl fullWidth>
          //    <Select  fullWidth key={index} label={field.label} options={field.options} />
          //    </FormControl>
          //   </>
          // }
          if (field.type === 'Select') {
            return (
              <FormControl fullWidth key={index}>
                 <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  // placeholder="sure"
                  // value={selectedDate[field.name] || ''}
                  // onChange={(e) => handleDateChange( field.name, e.target.value)}
                  value={selectedDate[field.name] || ''}
               
                  onChange={(e) => handleSelectChange(field.name, e.target.value)}
                  variant="outlined"
                >
                  {field.options.map((option) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          // if (field.type === 'multiSelect') {
          //   return (
          //     <Grid xs={6} margin={3}>
          //       <Autocomplete
          //         multiple
          //         id={field.name}
          //         options={field.options}
          //         value={selectedValue[field.name] || []}
          //         onChange={(event, newValue) => handleMultiSelectChange(field.name, newValue)}
          //         isOptionEqualToValue={(option, value) => option === value}
          //         renderInput={(params) => <TextField {...params} variant="outlined" label={field.label} />}
          //       />
          //     </Grid>
          //   );
          // }
          return null;
        })} */}


      {fields.map((field, index) => (
        <Grid key={index} xs={6} margin={3}>
          {field.type === 'datePicker' && (
            <DatePicker
              label={field.label}
              value={selectedFields[field.name]}
              onChange={(date) => handleFieldChange(field.name, date)}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          )}
          {field.type === 'Select' && (
            <FormControl fullWidth>
              <InputLabel>{field.label}</InputLabel>
              <Select
                label={field.label}
                value={selectedFields[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                variant="outlined"
              >
                {field.options.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
      ))}
    
      
      </DialogContent>
    </Dialog>
    </>
    )
    
}

ClaimSearchFilter.propTypes={
    dialogConfig: PropTypes.any,
}

// ClaimSearchFilter.propTypes={
//   searchFilterComponent: PropTypes.any,
// }

ClaimSearchFilter.propTypes={
   searchData: PropTypes.any,
}
ClaimSearchFilter.propTypes={
    filterData: PropTypes.func,
}

ClaimSearchFilter.propTypes={
  buttonFunction: PropTypes.func,
}
ClaimSearchFilter.propTypes={
  addButton: PropTypes.any,
}
ClaimSearchFilter.propTypes={
  dialogPayload: PropTypes.any,
}

ClaimSearchFilter.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}