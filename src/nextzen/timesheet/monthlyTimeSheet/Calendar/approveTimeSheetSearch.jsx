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

// import CustomDateRangePicker from '../global/CustomDateRangePicker';
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

export default function ApproveTimeSheetSearch({filterData,filterSearch,dialogPayload}){


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
 
        filterSearch(searchTerm)
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
const [date , setDate]=useState(
  {
    startDate:"",
    endDate:""
  }
)

const handleDateChange = (selectedDate) => {
  if (selectedDate) {
    // Parse the date string into a Date object
    const parsedDate = new Date(selectedDate);

    // Get month and year from the parsed date
    const selectedMonth = parsedDate.getMonth() + 1; // Month is zero-based, so add 1
    const selectedYear = parsedDate.getFullYear();

    // Calculate the start and end dates for the selected month
    const monthStartDate = `${selectedYear}-${selectedMonth}-01`;
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate(); // Get the last day of the selected month
    const monthEndDate = `${selectedYear}-${selectedMonth}-${lastDay}`;
    

    console.log(monthEndDate,'Month Start Date:', monthStartDate);
    setDate(prevDate => ({
      startDate: monthStartDate,
      endDate: monthEndDate
    }));
    filterData({
      startDate: monthStartDate,
      endDate: monthEndDate
    });
    
    // console.log('Month End Date:', );
  }
};
    return (
        <>
          <Grid container alignItems="center" spacing={1} marginBottom={1} >
            <Grid sm={6} xs={6} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            onChange={(e) => handleSearch(e.target.value)}
            // size="small"

            />
            </Grid>
           

            <Grid sm={6} xs={6} item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          size="small"
          label={'Month Year'}
          placeholder="May 2023"
          views={['month', 'year']}
          onChange={(e) => handleDateChange(e)}
          sx={{
            '& input': {
              fontSize: '0.8rem', // Adjust the font size as needed
            },
          }}
        />
      </LocalizationProvider>
    </Grid>
         </Grid>
     

    
    </>
    )
    
}

ApproveTimeSheetSearch.propTypes={
    dialogConfig: PropTypes.any,
}

// ApproveTimeSheetSearch.propTypes={
//   searchFilterComponent: PropTypes.any,
// }

ApproveTimeSheetSearch.propTypes={
   filterSearch: PropTypes.any,
}
ApproveTimeSheetSearch.propTypes={
    filterData: PropTypes.func,
}

ApproveTimeSheetSearch.propTypes={
  buttonFunction: PropTypes.func,
}
ApproveTimeSheetSearch.propTypes={
  addButton: PropTypes.any,
}
ApproveTimeSheetSearch.propTypes={
  dialogPayload: PropTypes.any,
}

ApproveTimeSheetSearch.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}