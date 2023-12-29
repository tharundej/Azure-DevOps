import PropTypes, { element } from 'prop-types';

import React, { useEffect, useState, useCallback } from 'react';

import { styled } from '@mui/system';

import FormProvider, { RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import Badge from '@mui/material/Badge';
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

import { formatDateToYYYYMMDD, formatDate } from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from 'src/nextzen/global/CustomDateRangePicker';
import HolidaysForm from './HolidaysForm';
import {
  holidayTypeName,
  locationNameApi,
} from 'src/nextzen/global/configurationdropdowns/ConfigurationDropdown';

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

export default function HolidaysFilters({
  filterData,
  filterOptions,
  filterSearch,
  searchData,
  getTableData,
}) {
  const theme = useTheme();
  // const holidayNames = [
  //   'Diwali',
  //   'Gandhi Jayanthi'
  // ];
  const [holidayTypesNames, setHolidayTypesNames] = useState([]);
  const [locationName, setLocationName] = useState([]);
  useEffect(() => {
    async function call() {
      const arr = await holidayTypeName();
      console.log(arr, 'sairam');
      setHolidayTypesNames(arr);
    }
    call();
    async function call2() {
      const arr = await locationNameApi();
      console.log(arr, 'sairam');
      setLocationName(arr);
    }
    call2();
  }, []);
  // const locationName = [
  //   'infobell'
  // ]

  // const designationGradeName = [
  //   'senior',
  //   'junior'
  // ]

  const [dropdown, setDropdown] = useState({});

  const [dateError, setDataError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [personName, setPersonName] = React.useState([]);
  const [badgeContent, setBadgeContent] = useState(false);
  const [dropdownEmployemtType, setDropdownEmployemtType] = useState([]);
  const [dropdownshift_name, setDropdownStatus] = useState([]);
  const [dropdownDesignationGradeName, setDropdownDesignationGradeName] = useState([]);
  const [dropdownLocation, setdropdownLocation] = useState([]);
  const [dropdownHolidayname, setdropdownDepartmentname] = useState([]);

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
      field: 'location',
      options: [],
    },
    {
      field: 'holidayName',
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
      const arr1 = [];

      dropdown?.holidayName?.forEach((item, index) => {
        arr1.push(item?.holidayName);
      });
      resolve(arr1);
    });
  }
  function formWithDropdown2() {
    return new Promise((resolve1) => {
      const arr2 = [];
      dropdown?.locationName?.forEach((item, index) => {
        arr2.push(item?.locationName);
      });
      resolve1(arr2);
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
          const holidayNames = await holidayTypeName(Obj);
          var optionsArr = { ...options };

          optionsArr.holidayNames = holidayNames;
          // optionsArr.holidayNames=desgination;
          console.log(optionsArr, 'optionsArr');

          setOptions(optionsArr);
        } catch (error) {}
      }
      async function call2() {
        try {
          const Obj = {
            companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          };
          const locationName = await locationNameApi(Obj);
          var optionsArr = { ...options };

          optionsArr.locationName = locationName;
          // optionsArr.locationName=desgination;
          console.log(optionsArr, 'optionsArr');

          setOptions(optionsArr);
        } catch (error) {}
      }

      call();
      call2();
    }
  }, [open]);
  const handleChangeDropDown = (event, field) => {
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
    } else if (field === 'locationName') {
      setdropdownLocation(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'holidayName') {
      setdropdownDepartmentname(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    }

    // On autofill we get a stringified value.

    console.log(value);
    // console.log( typeof value === 'string' ? value.split(',') : value,)
  };

  const handleApply = async () => {
    setDatesData([]);
    setBadgeContent(true);
    const data = await formWithDropdown();
    const comma = data.join(',');
    const obj = {
      holidayName: comma,
    };
    // filterData(obj);
    console.log(obj, 'sairam');

    const data1 = await formWithDropdown2();
    const comma1 = data1.join(',');
    const obj1 = {
      locationName: comma1,
      holidayName: comma,
    };
    filterData(obj1);
    console.log(obj1, 'sairam2222');
    //   filterData(data);
    handleClickClose();
  };
  const handleSearch = (searchTerm) => {
    searchData(searchTerm);
    console.log(searchTerm, 'search ........');
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        direction="row"
        style={{ marginBottom: '0.1rem' }}
        lg={12}
        md={12}
        xs={12}
      >
        <Grid item lg={8} md={8} xs={12} sm={8}>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={8} sm={2}>
          <HolidaysForm getTableData={getTableData} />
        </Grid>
        <Grid item lg={2} md={2} xs={4} sm={2}>
          {badgeContent === true ? (
            <Badge
              badgeContent={''}
              color="success"
              variant="dot"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Button onClick={handleClickOpen} style={{ width: '80px' }}>
                <Iconify icon="mi:filter" />
                Filters
              </Button>
            </Badge>
          ) : (
            <Button onClick={handleClickOpen} style={{ width: '80px' }}>
              <Iconify icon="mi:filter" />
              Filters
            </Button>
          )}
          {/* <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button onClick={handleClickOpen} sx={{ width: '80px' }}>
                <Iconify icon="mi:filter" />
              </Button>
            </Stack> */}
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

        <DialogContent
          sx={{ minWidth: '300px' }}
          //   style={{
          //     paddingTop: '20px',
          //     paddingRight: '17px',
          //     paddingBottom: '44px',
          //     paddingLeft: '44px',
          //   }}
        >
          {/* <Grid  spacing={2}  sx={{flexDirection:'row',display:'flex'}}> */}
          {/* <Typography style={{marginBottom:"0.8rem"}}> Date Activity</Typography> */}

          <Grid
            container
            spacing={1}
            sx={{ flexDirection: 'row', display: 'flex', marginTop: '1rem' }}
            item
          >
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="holidayName">Holiday Name</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-shift_name_1"
                  id="demo-multiple-shift_name_1"
                  multiple
                  value={dropdownHolidayname}
                  onChange={(e) => handleChangeDropDown(e, 'holidayName')}
                  input={<OutlinedInput label="Holiday Name" />}
                  MenuProps={MenuProps}
                  // sx={{minWidth:'300px'}}
                >
                  {holidayTypesNames.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name?.holidayName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="locationName">Location</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-shift_name_1"
                  id="demo-multiple-shift_name_1"
                  multiple
                  value={dropdownLocation}
                  onChange={(e) => handleChangeDropDown(e, 'locationName')}
                  input={<OutlinedInput label="Location" />}
                  MenuProps={MenuProps}
                  //   sx={{minWidth:'300px'}}
                >
                  {locationName.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name?.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <FormControl fullWidth >
                <InputLabel id="designation_grade_name">Designation Grade Name</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-multiple-name-shift_name_1"
                    id="demo-multiple-shift_name_1"
                    multiple
                    value={dropdownDesignationGradeName}
                    onChange={(e) => handleChangeDropDown(e, 'designation_grade_name')}
                    input={<OutlinedInput label="Designation Grade Name" />}
                    MenuProps={MenuProps}
                    // sx={{minWidth:'300px'}}
                  >
                    {designationGradeName.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl> */}
            </Grid>
          </Grid>
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              handleApply();
            }}
            // variant="outlined"
            style={{
              width: '80px',
              marginBottom: '1rem',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            Apply
          </Button>
        </div>
      </BootstrapDialog>
    </>
  );
}

// HolidaysFilters.propTypes={
//     handleFilters: PropTypes.any,
// }
HolidaysFilters.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
};

HolidaysFilters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
