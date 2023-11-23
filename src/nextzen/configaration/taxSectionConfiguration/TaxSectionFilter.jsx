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


import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from 'src/nextzen/global/CustomDateRangePicker';

import axios from 'axios';

import { baseUrl } from 'src/nextzen/global/BaseUrl';
import AddTaxSectionConfig from './AddTaxSectionConfig';

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

export default function TaxSectionFilter({
  filterData,
  filterOptions,
  filterSearch,
  searchData,
}) {
  const theme = useTheme();
  const leavePeriodTypes = ['Financial Year', 'Year'];
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
  const empId = localStorage.getItem('employeeID')
  const cmpId= localStorage.getItem('companyID')
  const token = localStorage.getItem('accessToken')
  const [formData, setFormData] = useState({});
  const [designationGradeType, setDesignationGradeType] = useState([]);
  const [designationType, setDesignationType] = useState([]);
  const [departmentType, setDepartmentType] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDateRange, setOpendateRange] = useState(false);
  const [departmentLength, setDepartmentLength] = useState();
  const [designationtLength, setDesignationLength] = useState();
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
    console.log(formData, 'form dat  in apply');
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

  const getDepartment = async () => {
    const payload = {
      companyID: cmpId,
      //  "locationID": 30
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/onboardingDepartment',
      // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDepartment',
      headers: {
        Authorization:
       token , 'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setDepartmentType(rowsData);
          setDepartmentLength(response?.data?.data.length);
          console.log(JSON.stringify(response?.data?.data), 'result');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  console.log(departmentLength, 'departmentlenght');

  const getDesignation = async (id) => {
    console.log(id, 'id id id ');
    const payload = {
      companyID: cmpId,
      departmentID: id ? id : formData?.Department?.departmentID,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/onboardingDesignation',
      // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDesignation',
      headers: {
        Authorization:
       token, 'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setDesignationLength(rowsData.length);
          setDesignationType(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'resultdesignation');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
  console.log(designationtLength, 'designation length ');
  const getDesignationGrade = async (id) => {
    console.log(id, 'id id id ');
    const payload = {
      companyID: cmpId,
      designationID: id ? id : formData?.Designation?.designationID,
      // "designationID":85
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/onboardingDesignationGrade',
      // url : 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/onboardingDesignation',
      headers: {
        Authorization:
       token,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setDesignationGradeType(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'result grade');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
  const handleDesignationChange = (name, selectedValue, selectedOption) => {
    const id = selectedValue?.departmentID;
    if (name === 'Department') {
      console.log('calling me ', selectedValue?.departmentID);
      getDesignation(id);
    }
    console.log(name, selectedValue, selectedOption, 'name, selectedValue, selectedOption');
    setFormData({
      ...formData,
      [name]: selectedValue,
      departmentID: selectedOption?.departmentID,
      departmentName: selectedOption?.departmentName,
    });
  };
  const handleDesignationGradeChange = (name, selectedValue, selectedOption) => {
    const id = selectedValue?.designationID;
    setFormData({
      ...formData,
      [name]: selectedValue,
      designationID: selectedOption?.designationID,
      designationName: selectedOption?.designationName,
    });
    getDesignationGrade(id);
  };
  const handleDesignationGrade = (name, selectedValue, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedValue,
      designationGradeID: selectedOption?.designationGradeID,
      departmentName: selectedOption?.designationGradeName,
    });
  };

  console.log(formData, 'data in the form ');
  useEffect(() => {
    console.log("calling in filter folder")
    const fetchData = async () => {
      getDesignationGrade();
      getDepartment();
    };
    fetchData();
  }, []);
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        direction="row"
        xs={12} md={12} lg={12}

        style={{ marginBottom: '0.1rem' }}
      >
        <Grid item md={3} xs={3}>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>
        <Grid item  md={8} xs={8} direction="row" >
     <AddTaxSectionConfig />
       </Grid>
    
        <Grid item md={1} xs={1}>
          <Grid>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button onClick={handleClickOpen} sx={{ width: '80px' }}>
                <Iconify icon="mi:filter" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

{/*       
      <Grid item  container spacing={0} alignItems="flex-end" 
      // justifyContent="space-around"
      >
   
        <Grid item xs={3}>
          <AddDepartmentConfig />
        </Grid>
    
        <Grid item xs={4}>
          <AddDesignationConfig />
        </Grid>

        <Grid item xs={3}>
          <AddDesignationGradeConfig />

        </Grid>
      </Grid> */}
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
              {/* <FormControl fullWidth>
                  <InputLabel id="leavePeriodType">Leave Period Type</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-multiple-name-shift_name_1"
                    id="demo-multiple-shift_name_1"
                    multiple
                    value={dropdownleavePeriodType}
                    onChange={(e) => handleChangeDropDown(e, 'leavePeriodType')}
                    input={<OutlinedInput label="Leave Period Type" />}
                    MenuProps={MenuProps}
                    // sx={{minWidth:'300px'}}
                  >
                    {leavePeriodTypes.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

              <Autocomplete
                disablePortal
                name="Department"
                id="combo-box-demo"
                options={departmentType?.map((department) => ({
                  label: department.departmentName,
                  value: department.departmentName,
                  ...department,
                }))}
                value={formData.Department}
                onChange={(event, newValue, selectedOption) =>
                  handleDesignationChange('Department', newValue, selectedOption)
                }
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Department" />}
              />

            

            
            </Grid>
            <Grid item xs={6} >
            <Autocomplete
                disablePortal
                name="Designation"
                id="combo-box-demo"
                options={designationType?.map((employeepayType) => ({
                  label: employeepayType.designationName,
                  value: employeepayType.designationName,
                  ...employeepayType,
                }))}
                value={formData.Designation}
                onChange={(event, newValue, selectedOption) =>
                  handleDesignationGradeChange('Designation', newValue, selectedOption)
                }
                renderInput={(params) => <TextField {...params} label="Designation " />}
              />
                </Grid>
            <Grid  item xs={12} md={6}>
            <Autocomplete
                disablePortal
                name="DesignationGrade"
                id="combo-box-demo"
                options={designationGradeType?.map((employeepayType) => ({
                  label: employeepayType.designationGradeName,
                  value: employeepayType.designationGradeID,
                  ...employeepayType,
                }))}
                value={formData.DesignationGrade}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue, selectedOption) =>
                  handleDesignationGrade('DesignationGrade', newValue, selectedOption)
                }
                renderInput={(params) => <TextField {...params} label="Designation Grade " />}
              />
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
              color:'white',backgroundColor:'#3B82F6'
            }}
          >
            Apply
          </Button>
        </div>
      </BootstrapDialog>
    </>
  );
}

// TaxSectionFilter.propTypes={
//     handleFilters: PropTypes.any,
// }
TaxSectionFilter.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
};

TaxSectionFilter.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
