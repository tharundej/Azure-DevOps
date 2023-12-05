import PropTypes, { element } from 'prop-types';

import React, { useEffect, useState, useCallback } from 'react';

import { styled } from '@mui/system';

import FormProvider, { RHFSelect, RHFAutocomplete } from 'src/components/hook-form';

import {
  Card,
  TextField,
  InputAdornment,
  Autocomplete,
  Grid,
  Button,
  Drawer,
  IconButton,
  Stack,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

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
// import './ShiftFilter.css'

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from 'src/nextzen/global/CustomDateRangePicker';
import PayScheduleform from './PayScheduleform';
import { payScheduleType } from 'src/nextzen/global/configurationdropdowns/ConfigurationDropdown';

const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: 'hidden',
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

export default function PayScheduleFilters({ filterData, filterOptions,searchData  }) {
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
  
  const employmentTypes=[
    'Permanent',
    'contract'
  ];
  // const payscheduleTypes=[
  //   '52-Once a week',
  //   '26-Once in a two weeks',
  // ];  
  const [payscheduleTypes, setPayscheduleTypes] = useState([])
  useEffect(() => {
    async function call() {
      const arr = await payScheduleType();
      console.log(arr, 'sairam');
      setPayscheduleTypes(arr);
    }
    call();
  }, []);
  const [dropdown, setDropdown] = useState({});

  const [dateError, setDataError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType, setDropdownEmployemtType] = useState([]);
  const [dropdownshift_name, setDropdownStatus] = useState([]);
  const [dropdownDesignationGradeName, setDropdownDesignationGradeName] = useState([]);
  const [dropdownpayscheduleType, setdropdownpayscheduleType] = useState([]);
  const [dropdownemploymentType, setdropdownemploymentType] = useState([]);

  const [datesFiledArray, setDatesFiledArray] = useState([
    {
      field: 'date_activity',
      from: 'from_date',
      to: 'to_date',
    },
  ]);

  const [dropdownFiledArray, setDropdownFiledArray] = useState([
    {
      field: 'designation_grade_name',
      options: [],
    },
    {
      field: 'payscheduleType',
      options: [],
    },
    {
      field: 'employmentType',
      options: [],
    },
  ]);

  const [datesSavedArray, setDatesSavedArray] = useState([
    'from_date',
    'to_date',
    'offer_date_from',
    'offer_date_to',
  ]);
  const [datesData, setDatesData] = useState([]);

  const [dates, setDates] = useState({
    from_date: null,
    to_date: null,
  });

  function formDateDataStructure() {
    return new Promise((resolve) => {
      const arr1 = {};
      datesFiledArray.forEach((item, index) => {
        arr1[item.field] = {
          from: formatDateToYYYYMMDD(dates[item?.from]),
          to: formatDateToYYYYMMDD(dates[item?.to]),
        };
        //  const obj={
        //    filed_name:item?.field,
        //    from:dates[item?.from],
        //    to:dates[item?.to]
        //  }
        //  arr1.push(obj);
      });
      setDatesData(arr1);
      resolve(arr1);
    });
  }

  function formWithDropdown() {
    return new Promise((resolve) => {
      const arr1 = {};
      console.log(dropdown?.payScheduleType,'ppoooo')
      // arr1.payScheduleType=dropdown?.payScheduleType?.join(',') || "";
      // arr1.employmentType=dropdown?.employmentType?.join(',') || "";
      

      dropdown?.payScheduleType?.forEach((item, index) => {
        arr1.push(item?.payScheduleType);
      });
      resolve(arr1);
    });
  }

  const [open, setOpen] = useState(false);
  const [openDateRange, setOpendateRange] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleChangeDropDown = (event, field) => {
    console.log('1',event?.target?.value)
    const {
      target: { value },
    } = event;

    if (field === 'designation_grade_name') {
      setDropdownDesignationGradeName(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'shift_name') {
      setDropdownStatus(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'payScheduletype') {
      console.log(value,'ppppp')
      setdropdownpayscheduleType(value);
      const obj = {...dropdown};
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'employmentType') {
      setdropdownemploymentType(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    }

    // On autofill we get a stringified value.

    console.log(value);
    // console.log( typeof value === 'string' ? value.split(',') : value,)
  };
  const handleSearch = (searchTerm) => {
     
    searchData(searchTerm)
    console.log(searchTerm,"search ........")
    };
    const handleApply = async () => {
 
      const data = await formWithDropdown();
  
    const comma = data.join(',');
      const obj = {
        payScheduleType: comma,
      };
     
      filterData(obj);
      
      console.log(obj, 'ram');
      handleClickClose();
    };
    const [options, setOptions] = useState({});
    useEffect(() => {
      if (open) {
        async function call() {
          try {
            const Obj = {
              companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
            };
            const payScheduleTypees = await payScheduleType(Obj);
            var optionsArr = { ...options };
  
            optionsArr.payScheduleType = payScheduleTypees;
            // optionsArr.payScheduleTypeType=desgination;
            console.log(optionsArr, 'optionsArr');
  
            setOptions(optionsArr);
          } catch (error) {}
        }
        call();
      }
    }, [open]);
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        direction="row"
        style={{ marginBottom: '1rem' }}
      >
        <Grid item md={8} xs={8}>
        <TextField
            placeholder="Search...."
             fullWidth
             onChange={(e) => handleSearch(e.target.value)}
          />
          
        </Grid>
        <Grid item md={2} xs={2}>
        <PayScheduleform/>
        </Grid>
        <Grid item md={2} xs={2} >
        <Grid>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
           
              <Button onClick={handleClickOpen} sx={{ width: '80px' }}>
                <Iconify icon="mi:filter" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // className="custom-dialog-width"
      >
       <DialogTitle sx={{ paddingBottom: 0, paddingTop: 2 }}>
          Filters
          {/* <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button> */}
          <CancelOutlinedIcon
            sx={{ cursor: 'pointer', float: 'right' }}
            onClick={() => setOpen(false)}
          />
        </DialogTitle>

        <DialogContent  sx={{minWidth:"300px"}}>
         
            <Grid container spacing={1}   sx={{flexDirection:'row',display:'flex',marginTop:'1rem'}} item>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="employmentType">Employee Type</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-multiple-name-shift_name_1"
                    id="demo-multiple-shift_name_1"
                    multiple
                    value={dropdownemploymentType}
                    onChange={(e) => handleChangeDropDown(e, 'employmentType')}
                    input={<OutlinedInput label="Employee Type" />}
                    MenuProps={MenuProps}
                    // sx={{minWidth:'300px'}}
                  >
                    {employmentTypes.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} >
                  <FormControl fullWidth>
                    <InputLabel id="payScheduletype">Pay Schedule Type</InputLabel>
                    <Select
                    fullWidth
                      labelId="demo-multiple-name-shift_name_1"
                      id="demo-multiple-shift_name_1"
                      multiple
                      value={dropdownpayscheduleType}
                      onChange={(e) => handleChangeDropDown(e, 'payScheduletype')}
                      input={<OutlinedInput label="Pay Schedule Type" />}
                      MenuProps={MenuProps}
                    //   sx={{minWidth:'300px'}}
                    >
                      {payscheduleTypes.map((name,index) => (
                        <MenuItem
                          key={index}
                          value={name?.payScheduletype}
                          style={getStyles(name, personName, theme)}
                        >
                          {name?.payScheduletype}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid  item xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel id="designation_grade_name">Pay Pchedule Type</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-multiple-name-shift_name_1"
                    id="demo-multiple-shift_name_1"
                    multiple
                    value={dropdownDesignationGradeName}
                    onChange={(e) => handleChangeDropDown(e, 'designation_grade_name')}
                    input={<OutlinedInput label="Pay Pchedule Type" />}
                    MenuProps={MenuProps}
                    // sx={{minWidth:'300px'}}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
                   </Grid> */}
            </Grid>

           
            
             
          
        </DialogContent>
        
        <div style={{ marginBottom: 12, marginTop: 4 }}>
          {' '}
          <Button
            variant="contained"
            color="primary"
            sx={{ float: 'right', marginRight: 2 }}
            onClick={() => {
              handleApply();
            }}
          >
            Apply
          </Button>
          <Button
            sx={{ float: 'right', right: 15 }}
            variant="outlined"
            onClick={() => 
              handleClickClose()
            }
          >
            Close
          </Button>
        </div>
      </BootstrapDialog>
    </>
  );
}

// PayScheduleFilters.propTypes={
//     handleFilters: PropTypes.any,
// }
PayScheduleFilters.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
};

PayScheduleFilters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
