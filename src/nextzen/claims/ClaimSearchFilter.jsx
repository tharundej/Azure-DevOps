import PropTypes from 'prop-types';
import React,{ useEffect, useState,useCallback } from 'react';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';
import Badge from '@mui/material/Badge';
import {Card,TextField,CardContent,  InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';
import { keyframes } from '@emotion/react';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';

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
  

 
 
  
  const CustomBadge = styled(Badge)({
    '.MuiBadge-dot': {
      width: '20px', // Adjust the width as needed
      height: '20px', // Adjust the height as needed
    },
  });
  
  
  

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


   

    
;  const [badgeContent, setBadgeContent] = useState(false);

    const handleSearch = (searchTerm) => {
 
        searchData(searchTerm)
        console.log(searchTerm,"search ........")
        };
    // dynamic dialog checking 
    //  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
const cancel = ()=>{
  setOpen(false);
}
  
const [selectedFields, setSelectedFields] = useState(dialogPayload);

const handleFieldChange = (fieldtype,field, value) => {
  console.log(fieldtype,"field", field,"field.....")
  let formattedValue = value; 

 
  if (fieldtype === 'datePicker') {
    try {
      console.log(value)
      console.log("+++++++++++++")
      const formattedDate = format(new Date(value), 'yyyy-MM-dd');
      console.log(formattedDate)
      formattedValue = formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      
    }
  }



  setSelectedFields(prevFields => ({
    ...prevFields,
    [field]: formattedValue
  }));

};

// reset 
const handleReset = () => {
  // Handle reset logic here
  setSelectedFields({});
  
  filterData(dialogPayload)
  // setIsBlinking(false)
  setBadgeContent(false)
  onClose();
};
const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// animation after filter selected
const [isBlinking, setIsBlinking] = useState(false);



const handleApply=()=>{
 
    filterData(selectedFields)
    setBadgeContent(true)
    // setBadgeContent((prevContent) => prevContent + 1);
    // setIsBlinking(true);
    onClose();
    // setSelectedFields(dialogPayload);
    

}

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
            <Grid sm={8} xs={12} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            onChange={(e) => handleSearch(e.target.value)}
            size="small"

            />
            </Grid>
            <Grid sm={2} xs={4} sx={{alignSelf:"center",textAlign:"center"}}>
              {addButton && <Button variant='contained' color='primary' sx={{borderRadius:"4px"}} onClick={buttonFunction}>{addButton}</Button>}
              

            </Grid>

            <Grid sm={2} xs={4} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
          {badgeContent ===  true?(
               <Badge badgeContent={""} color="error" variant="dot" anchorOrigin={{
                vertical: 'up',
                horizontal: 'left',
              }} >
                        <Button onClick={handleClickOpen} style={{width:"80px"}}   sx={{  animation: isBlinking? `${blinkAnimation} 2s infinite` : '' } }>
                       <Iconify icon="mi:filter"/>
                       Filters
                  </Button>
                  </Badge >
          ):( <Button onClick={handleClickOpen} style={{width:"80px"}}   sx={{  animation: isBlinking? `${blinkAnimation} 2s infinite` : '' } }>
          <Iconify icon="mi:filter"/>
          Filters
     </Button>)}
        {/* <Badge badgeContent={""} color="error"  anchorOrigin={{
    vertical: 'up',
    horizontal: 'left',
  }} >
            <Button onClick={handleClickOpen} style={{width:"80px"}}   sx={{  animation: isBlinking? `${blinkAnimation} 2s infinite` : '' } }>
           <Iconify icon="mi:filter"/>
           Filters
      </Button>
      </Badge > */}

      </Stack>
      </Grid>
         </Grid>
     

    <Dialog open={openButton} onClose={handleClickCloseButton}>
      {/* <DialogTitle>{title}</DialogTitle> */}
      <DialogContent>
       
        <Button>apply</Button>
      </DialogContent>
    </Dialog>




     <Dialog open={open} onClose={onClose}  maxWidth="1200px" >
      <Grid container flex flexDirection={"row"}>
      <Grid item  xs={10}>
      <DialogTitle>{title}</DialogTitle>
      </Grid>
      <Grid fullWidth item sx={{alignSelf:"center"}} xs={2}> 
      <CancelOutlinedIcon sx={{cursor:"pointer"}} onClick={onClose} />
      </Grid>
      </Grid>

   
      <DialogContent  >
      
      {/* <Grid container item spacing={3} xs={6} flex flexDirection={"row"}> */}
      {fields.map((field, index) => (
        <Grid key={index} item xs={6} md={4} margin={3}>
          {field.type === 'datePicker' && (
            <DatePicker
              label={field.label}
              value={selectedFields[field.name] ? new Date(selectedFields[field.name]): null}
              onChange={(date) => handleFieldChange(field.type,field.name, date)}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          )}
          {field.type === 'Select' && (
            <FormControl fullWidth>
              <InputLabel>{field.label}</InputLabel>
              <Select
                label={field.label}
                value={selectedFields[field.name] || ""}
                onChange={(e) => handleFieldChange(field.type,field.name, e.target.value)}
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
     {/* </Grid> */}
     
      <Grid container justifyContent="flex-end"  marginBottom={3} spacing={1} >
      {/* <Badge badgeContent={badgeContent} color="error"> */}
      <Button sx={{margin:"2px"}} variant="outlined" onClick={handleReset}>
            Reset
          </Button>
      <Button variant='outlined' sx={{margin:"2px"}} onClick={handleApply}>apply</Button>
      {/* </Badge> */}

      </Grid >
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