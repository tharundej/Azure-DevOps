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

import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from 'src/nextzen/global/CustomDateRangePicker';

import LeavePeriodForm from './LeavePeriodForm';
import { ApiHitleavePeriodType } from 'src/nextzen/global/roledropdowns/RoleDropDown';

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

export default function LeavePeriodFilters({
  filterData,
  filterOptions,
  filterSearch,
  searchData,
}) {
  const theme = useTheme();
  const [optionsValue, setOptionsValue] = useState({});
  // const leavePeriodTypes = [
  //   'Financial Year',
  //   'Year'
  // ];

  const designationName = ['executive'];

  const designationGradeName = ['senior', 'junior'];

  const [dropdown, setDropdown] = useState({});

  const [dateError, setDataError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType, setDropdownEmployemtType] = useState([]);
  const [dropdownshift_name, setDropdownStatus] = useState([]);
  const [dropdownDesignationGradeName, setDropdownDesignationGradeName] = useState([]);
  const [dropdownDesignation, setdropdownDesignation] = useState([]);
  const [dropdownleavePeriodType, setdropdownleavePeriodType] = useState([]);

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
      field: 'designation_name',
      options: [],
    },
    {
      field: 'leavePeriodType',
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
      dropdownFiledArray.forEach((item, index) => {
        if (dropdown[item.field]?.length > 0) {
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          arr1[item.field] = commaSeparatedString;
        }

        //  const obj={
        //    filed_name:item?.field,
        //    from:dates[item?.from],
        //    to:dates[item?.to]
        //  }

        //  arr1.push(obj);
      });
      // setDatesData(arr1);
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
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (open) {
      async function call() {
        try {
          const Obj = {
            companyID: 'COMP1',
          };
          const leaveperiod = await ApiHitleavePeriodType(Obj);
          var optionsArr = { ...options };

          optionsArr.leavePeriodType = leaveperiod;
          // optionsArr.leavePeriodType=desgination;
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
      setDropdownDesignationGradeName(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'shift_name') {
      setDropdownStatus(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'designation_name') {
      setdropdownDesignation(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'leavePeriodType') {
      setdropdownleavePeriodType(value);
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
    const data = await formWithDropdown();
    filterData(data);
    console.log(data, ';;;');

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
        justifyContent="flex-end"
        direction="row"
        style={{ marginBottom: '0.1rem' }}
        lg={12}
        md={12}
        xs={12}
      >
        <Grid item lg={8} md={6} xs={4}>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={2}>
          <LeavePeriodForm />
        </Grid>
        <Grid item lg={2} md={2} xs={2}>
          <Grid>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button onClick={handleClickOpen} sx={{ width: '80px' }}>
                <Iconify icon="mi:filter" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        //  className="custom-dialog-width"
      >
        <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0, paddingTop: 2 }}>
          Filters
          <Button onClick={() => setOpen(false)} sx={{ float: 'right' }}>
            <Iconify icon="iconamoon:close-thin" />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ minWidth: '300px'}}>
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
          >
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  options={options?.leavePeriodType || []}
                  value={optionsValue?.leavePeriodType}
                  getOptionLabel={(option) => option?.leavePeriodType}
                  onChange={async (e, newvalue) => {
                    var newArr = { ...optionsValue };
                    newArr.leavePeriodType = newvalue;
                    console.log(newArr, 'newArr');
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Leave Period Type" style={{ width: '100%' }} />
                  )}
                />
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
      </Dialog>
    </>
  );
}

// LeavePeriodFilters.propTypes={
//     handleFilters: PropTypes.any,
// }
LeavePeriodFilters.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
};

LeavePeriodFilters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
