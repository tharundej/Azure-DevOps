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
import ShiftConfigurationForm from './ShiftConfigurationForm';
import { locationApi } from 'src/nextzen/global/configurationdropdowns/ConfigurationDropdown';

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

export default function ShiftConfigurationFilters({ filterData, filterOptions ,searchData}) {
  const theme = useTheme();

  const ShiftNames = [
    'general',
    'Morning',
    'Night',
    'Afternoon'
  ];
  const ShiftTerms = [
    'weekly',
    'Monthly',
  ]
  const [locationID, setLocationID] = useState([])
  useEffect(()=>{
    async function call() {
      const arr = await locationApi();
      console.log(arr, 'sairam');
      setLocationID(arr);
    }
    call();
  },[])
  const [dropdown, setDropdown] = useState({});

  const [dateError, setDataError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType, setDropdownEmployemtType] = useState([]);
  const [dropdownshift_name, setDropdownStatus] = useState([]);
  const [dropdownShiftNameGradeName, setDropdownShiftNameGradeName] = useState([]);
  const [dropdownShiftName, setdropdownShiftName] = useState([]);
  const [dropdownShiftTerm, setdropdownShiftTerm] = useState([]);
  const [dropdownLocation, setdropdownLocation] = useState([]);

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
      field: 'shiftName',
      options: [],
    },
    {
      field: 'shiftTerm',
      options: [],
    },
    {
      field: 'location',
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
  const arr= [];
      dropdown?.locationID?.forEach((item, index) => {
       
        arr.push(item?.locationID);
       
      });
      resolve(arr);
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
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (open) {
      async function call() {
        try {
          const Obj = {
            companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          };
          const locationID = await locationApi(Obj);
          var optionsArr = { ...options };

          optionsArr.locationID = locationID;
          // optionsArr.locationName=desgination;
          console.log(optionsArr, 'optionsArr');

          setOptions(optionsArr);
        } catch (error) {}
      }
      call();
    }
  }, [open]);
  const handleChangeDropDown = (event, field) => {
    const {
      target: { value },
    } = event;

    if (field === 'designation_grade_name') {
      setDropdownShiftNameGradeName(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'locationID') {
      setdropdownLocation(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'shiftName') {
      setdropdownShiftName(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'shiftTerm') {
      setdropdownShiftTerm(value);
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
    setDatesData([]);

    const data =await formWithDropdown();
    const comma = data.join(',');
    const obj = {
      locationFilter:comma,
    }
    filterData(obj);
    console.log(obj, 'sairam2222');

    //   filterData(data);
    handleClickClose();
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        direction="row"
        style={{ marginBottom: '0.1rem' }}
      >
        <Grid item  md={8} xs={8}>
        <TextField
            placeholder="Search...."
             fullWidth
             onChange={(e) => handleSearch(e.target.value)}
          />
          
        </Grid>
        <Grid item  md={2} xs={2}>
       <ShiftConfigurationForm/>
        </Grid>
        <Grid item  md={2} xs={2}>
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
        <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0, paddingTop: 2 }}>
          Filters
          <Button onClick={() => setOpen(false)} sx={{ float: 'right' }}>
            <Iconify icon="iconamoon:close-thin" />
          </Button>
        </DialogTitle>

        <DialogContent  sx={{minWidth:"300px"}}>
         
            <Grid   container
            spacing={1}
            sx={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',
            }}
            item>
              {/* <Grid item xs={6} marginTop="10px">
                <FormControl fullWidth>
                  <InputLabel id="shiftTerm">Shift Term</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-multiple-name-shift_name_1"
                    id="demo-multiple-shift_name_1"
                    multiple
                    value={dropdownShiftTerm}
                    onChange={(e) => handleChangeDropDown(e, 'shiftTerm')}
                    input={<OutlinedInput label="Shift Term"/>}
                    MenuProps={MenuProps}
                    // sx={{minWidth:'300px'}}
                  >
                    {ShiftTerms.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              {/* <Grid item xs={6} marginTop="10px" >
                  <FormControl fullWidth>
                    <InputLabel id="shiftName">Shift Name</InputLabel>
                    <Select
                    fullWidth
                      labelId="demo-multiple-name-shift_name_1"
                      id="demo-multiple-shift_name_1"
                      multiple
                      value={dropdownShiftName}
                      onChange={(e) => handleChangeDropDown(e, 'shiftName')}
                      input={<OutlinedInput label="Shift Name" />}
                      MenuProps={MenuProps}
                    //   sx={{minWidth:'300px'}}
                    >
                      {ShiftNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
               
                <Grid item xs={6} marginTop="10px" >
                  <FormControl fullWidth>
                    <InputLabel id="locationID">Location</InputLabel>
                    <Select
                    fullWidth     
                      labelId="demo-multiple-name-shift_name_1"
                      id="demo-multiple-shift_name_1"
                      multiple
                      value={dropdownLocation}
                   
                      onChange={(e) => handleChangeDropDown(e, 'locationID')}
                      input={<OutlinedInput label="Location" />}
                      MenuProps={MenuProps}
                    //   sx={{minWidth:'300px'}}
                    >
                      {locationID.map((name) => (
                        <MenuItem
                          key={name}
                          
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name?.locationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>

           
            
             
          
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Button
          onClick={() => {
            handleApply();
          }}
          style={{ width: '80px', marginBottom:'1rem',backgroundColor: '#3B82F6' ,color:'white',marginRight:"10px"}}
        >
          Apply
        </Button>
        </div>
      </BootstrapDialog>
    </>
  );
}

// ShiftConfigurationFilters.propTypes={
//     handleFilters: PropTypes.any,
// }
ShiftConfigurationFilters.propTypes = {
  filterData: PropTypes.func,
  searchData:PropTypes.any,
};

ShiftConfigurationFilters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
