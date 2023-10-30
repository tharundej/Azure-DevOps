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

export default function ClaimSearchFilter({filterData,searchData,}){

  // dialogConfig,filterOptions,addButton,buttonFunction
  // const { title, fields } = dialogConfig;

  const theme = useTheme();
  const names = [
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

  const [dropdown,setDropdown]=useState({

  })

  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType,setDropdownEmployemtType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])

  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'joining_date',
        from:'joining_date_from',
        to:'joining_date_to'
      },
      {
        field:'offer_date',
        from:'offer_date_from',
        to:'offer_date_to'
      }
    ]
  )

  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'status',
        options:[]
      },
      {
        field:'employment_type',
        options:[]
      }
    ]
  )


  const [datesSavedArray,setDatesSavedArray]=useState(["joining_date_from","joining_date_to","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])

  const [dates,setDates]=useState({
    joining_date_from:null,
    joining_date_to:null,
    offer_date_from:null,
    offer_date_to:null
  })

  function formDateDataStructure(){

    return new Promise((resolve) => {
     

      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          from:dates[item?.from],
          to:dates[item?.to]
        }

        //  const obj={
        //    filed_name:item?.field,
        //    from:dates[item?.from],
        //    to:dates[item?.to]
        //  }
        
         
        //  arr1.push(obj);
       
         
        })
        setDatesData(arr1);
        resolve(arr1)
        
    })
    

  }

  function formWithDropdown(data){

    return new Promise((resolve) => {
     

      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(', ');
          data[item.field]=commaSeparatedString;
        }
        

        //  const obj={
        //    filed_name:item?.field,
        //    from:dates[item?.from],
        //    to:dates[item?.to]
        //  }
        
         
        //  arr1.push(obj);
       
         
        })
        // setDatesData(arr1);
        resolve(arr1)
        
    })
    

  }
  

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


    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      if(field==="employment_type"){
        setDropdownEmployemtType(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="status"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
    

        // On autofill we get a stringified value.
        
      
        console.log(value);
     // console.log( typeof value === 'string' ? value.split(',') : value,)
    };

    const handleApply = async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);
      filterData(data);
      console.log(data,';;;')

    //   filterData(data);
      
    }

    const handleSearch = (searchTerm) => {
        searchData(searchTerm)
        };
    // dynamic dialog checking 
    //  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  const  externalFilter = {
    claim:{
      claimStartDate:"",
      claimEndDate:"",

    },
    expense:{
      expensestartdate:"",
      expenseenddate:"",

    },
  }
  const [selectedDate, setSelectedDate] = useState(externalFilter);
  
  const handleDateChange = (category, field, date) => {
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    setSelectedDate(prevDates => ({
      ...prevDates,
      [category]: {
        ...prevDates[category],
        [field]: formattedDate,
      },
    }));
  
    console.log(selectedDate,"SelectedDate------>")
  };
  // const handleDateChange = (fieldName, date) => {
  //   setSelectedDate(prevDates => ({
  //     ...prevDates,
  //     [fieldName]: date,
  //   }));
  //      console.log(selectedDate,"SelectedDate------>")
  // };
  console.log(selectedDate,"SelectedDate1234------>")


  const [selectedValue, setSelectedValue] = useState({});

const handleSelectChange = (fieldName, value) => {
  setSelectedValue(prevValues => ({
    ...prevValues,
    [fieldName]: value,
  }));
};

const handleMultiSelectChange = (fieldName, newValue) => {
  setSelectedValue(prevValues => ({
    ...prevValues,
    [fieldName]: newValue,
  }));
};
  
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
              {/* {addButton && <Button variant='contained'  onClick={buttonFunction}>{addButton}</Button>} */}
              

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
     

    {/* <Dialog open={openButton} onClose={handleClickCloseButton}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
       
        <Button>apply</Button>
      </DialogContent>
    </Dialog> */}




     {/* <Dialog open={open} onClose={onClose}  maxWidth="900px" >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
      
        {fields.map((field, index) => {
          if (field.type === 'datePicker') {
            return (
              <Grid xs={6} margin={3}>
              <div key={index}>
                <DatePicker
                  label={field.label}
                  value={field.value}
                  onChange={(date) => handleDateChange(field.category,field.name, date)}
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
                  placeholder="sure"
                  value={selectedValue[field.name] || ''}
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

          if (field.type === 'multiSelect') {
            return (
              <Grid xs={6} margin={3}>
                <Autocomplete
                  multiple
                  id={field.name}
                  options={field.options}
                  value={selectedValue[field.name] || []}
                  onChange={(event, newValue) => handleMultiSelectChange(field.name, newValue)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => <TextField {...params} variant="outlined" label={field.label} />}
                />
              </Grid>
            );
          }
          return null;
        })}
      
      </DialogContent>
    </Dialog> */}
    </>
    )
    
}

// ClaimSearchFilter.propTypes={
//     dialogConfig: PropTypes.any,
// }

// ClaimSearchFilter.propTypes={
//   searchFilterComponent: PropTypes.any,
// }

ClaimSearchFilter.propTypes={
   searchData: PropTypes.any,
}
ClaimSearchFilter.propTypes={
    filterData: PropTypes.func,
}

// ClaimSearchFilter.propTypes={
//   buttonFunction: PropTypes.func,
// }
// ClaimSearchFilter.propTypes={
//   addButton: PropTypes.any,
// }

// ClaimSearchFilter.propTypes={
//     filterOptions: PropTypes.arrayOf(
//         PropTypes.shape({
//           fieldName: PropTypes.string,
//           options: PropTypes.arrayOf(PropTypes.string)
//         })
//       ),
// }