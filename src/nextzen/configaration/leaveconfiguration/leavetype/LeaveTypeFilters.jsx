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

import LeaveTypeForm from './LeaveTypeForm';
import { leaveTypeName } from 'src/nextzen/global/configurationdropdowns/ConfigurationDropdown';
import { leavePeriodType } from '../../../global/configurationdropdowns/ConfigurationDropdown';

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

export default function LeaveTypeFilters({
  filterData,
  filterOptions,
  filterSearch,
  searchData,
  getTableData,
}) {
  const theme = useTheme();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leavePeriodTypes, setLeavePeriodTypes] = useState([]);
  const [badgeContent, setBadgeContent] = useState(false);
  useEffect(() => {
    async function call() {
      const arr = await leaveTypeName();
      console.log(arr, 'sairam');
      setLeaveTypes(arr);
    }
    // async function call2(){
    //   const arr=await leavePeriodType();
    //   console.log(arr,'sairam')
    //   setLeavePeriodTypes(arr);
    // }
    call();
    // call2();
  }, []);
  const termTypes = ['Annual', 'Month'];
  const leaveNames = ['Diwali'];

  const designationGradeName = ['senior', 'junior'];

  const [dropdown, setDropdown] = useState({});
  const [dropdown1, setDropdown1] = useState({});
  const [dateError, setDataError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType, setDropdownEmployemtType] = useState([]);
  const [dropdownshift_name, setDropdownStatus] = useState([]);
  const [dropdownDesignationGradeName, setDropdownDesignationGradeName] = useState([]);
  const [dropdownleaveName, setdropdownleaveName] = useState([]);
  const [dropdownleavePeriodType, setDropdownleavePeriodType] = useState([]);

  const [datesFiledArray, setDatesFiledArray] = useState([
    {
      field: 'date_activity',
      from: 'from_date',
      to: 'to_date',
    },
  ]);

  // const [dropdownFiledArray, setDropdownFiledArray] = useState([
  //   {
  //     field: 'leaveTypeName',
  //     options: [],
  //   },
  //   {
  //     field: 'leavePeriodType',
  //     options1: [],
  //   },
  // ]);

  // const [datesSavedArray, setDatesSavedArray] = useState([
  //   'from_date',
  //   'to_date',
  //   'offer_date_from',
  //   'offer_date_to',
  // ]);
  // const [datesData, setDatesData] = useState([]);

  const [dates, setDates] = useState({
    from_date: null,
    to_date: null,
  });

  // function formDateDataStructure() {
  //   return new Promise((resolve) => {
  //     const arr1 = {};
  //     datesFiledArray.forEach((item, index) => {
  //       arr1[item.field] = {
  //         from: formatDateToYYYYMMDD(dates[item?.from]),
  //         to: formatDateToYYYYMMDD(dates[item?.to]),
  //       };
  //       //  const obj={
  //       //    filed_name:item?.field,
  //       //    from:dates[item?.from],
  //       //    to:dates[item?.to]
  //       //  }
  //       //  arr1.push(obj);
  //     });
  //     setDatesData(arr1);
  //     resolve(arr1);
  //   });
  // }

  function formWithDropdown() {
    return new Promise((resolve) => {
      const arr1 = [];
      dropdown?.leaveTypeName?.forEach((item, index) => {
        arr1.push(item?.leaveTypeName);
      });
      // const arr2 = [];
      // dropdown1?.leavePeriodType?.forEach((item, index) => {
      //   arr2.push(item?.leavePeriodType);
      // });
      // setDatesData(arr1);
      resolve(arr1);
      // resolve(arr2);
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
    } else if (field === 'leaveTypeName') {
      setdropdownleaveName(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'leavePeriodType') {
      setDropdownleavePeriodType(value);
      const obj1 = dropdown1;
      obj1[field] = value;
      setDropdown1(obj1);
    }

    // On autofill we get a stringified value.

    console.log(value);
    // console.log( typeof value === 'string' ? value.split(',') : value,)
  };

  const handleApply = async () => {
    // setDatesData([]);
    setBadgeContent(true);
    const data = await formWithDropdown();

    const comma = data.join(',');
    const obj = {
      leaveTypeName: comma,
    };
    // const obj1={
    //   leavePeriodType: comma,
    // };
    filterData(obj);
    // filterData(obj1);
    console.log(obj, 'ram');
    // console.log(obj1,'obj2');
    //   filterData(data);
    handleClickClose();
  };
  const [options, setOptions] = useState({});
  const [options1, setOptions1] = useState({});
  useEffect(() => {
    if (open) {
      async function call() {
        try {
          const Obj = {
            companyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          };
          const leaveperiod = await leaveTypeName(Obj);
          var optionsArr = { ...options };

          optionsArr.leaveTypeName = leaveperiod;
          // optionsArr.leavePeriodType=desgination;
          console.log(optionsArr, 'optionsArr');

          setOptions(optionsArr);
        } catch (error) {}
      }
      // async function call2() {
      //   try {
      //     const Obj = {
      //       companyID: 'COMP1',
      //     };
      //     const leaveperiod = await leavePeriodType(Obj);
      //     var optionsArr = { ...options1 };

      //     optionsArr.leavePeriodType = leaveperiod;
      //     // optionsArr.leavePeriodType=desgination;
      //     console.log(optionsArr, 'optionsArr2');

      //     setOptions1(optionsArr);
      //   } catch (error) {}
      // }
      // call2();
      call();
    }
  }, [open]);
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
          <LeaveTypeForm getTableData={getTableData} />
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
        </Grid>
      </Grid>

      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        // maxWidth="sm"
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
          sx={{ minWidth: '200px' }}
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
            sx={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',
            }}
            item
          >
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="leaveTypeName">Leave Name</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-shift_name_1"
                  id="demo-multiple-shift_name_1"
                  multiple
                  value={dropdownleaveName}
                  onChange={(e) => handleChangeDropDown(e, 'leaveTypeName')}
                  input={<OutlinedInput label="Leave Name" />}
                  MenuProps={MenuProps}
                  //   sx={{minWidth:'300px'}}
                >
                  {leaveTypes?.length > 0 ? (
                    leaveTypes.map((name, index) => (
                      <MenuItem key={index} value={name} style={getStyles(name, personName, theme)}>
                        {name?.leaveTypeName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" style={getStyles(name, personName, theme)}>
                      No leave types available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
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

LeaveTypeFilters.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
};

LeaveTypeFilters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
