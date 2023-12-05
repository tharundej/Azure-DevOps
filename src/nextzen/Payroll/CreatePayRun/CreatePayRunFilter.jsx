import PropTypes, { element } from 'prop-types';

import React, { useEffect, useState, useCallback } from 'react';

import { styled } from '@mui/system';

import FormProvider, { RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
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

import axios from 'axios';

import { baseUrl } from 'src/nextzen/global/BaseUrl';
import AddTaxSectionConfig from 'src/nextzen/configaration/taxSectionConfiguration/AddTaxSectionConfig';

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

export default function CreatePayRunFilter({ filterData, filterOptions, filterSearch, searchData }) {
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
  const empId = localStorage.getItem('employeeID');
  //   const cmpId= localStorage.getItem('companyID')
  const cmpId = 'COMP1';
  const token = localStorage.getItem('accessToken');
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

  const handleApply = async () => {
    console.log(formData, 'form dat  in apply');
    setDatesData([]);
    // const data = await formWithDropdown();
    const obj = {
      departmentID: JSON.stringify(formData?.Department?.departmentID) || '',
      designationID: JSON.stringify(formData?.Designation?.designationID) || '',
      designationGradeID: JSON.stringify(formData?.DesignationGrade?.designationGradeID) || '',
    };
    filterData(obj);
    console.log(obj, 'FilterData');

    // filterData(data);
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
        Authorization: token,
        'Content-Type': 'text/plain',
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
        Authorization: token,
        'Content-Type': 'text/plain',
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
        Authorization: token,
        'Content-Type': 'text/plain',
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
    console.log('calling in filter folder');
    const fetchData = async () => {
      getDesignationGrade();
      getDepartment();
    };
    fetchData();
  }, []);
  const handleCancel = () => {
    setFormData({});
  };

  console.log(formData, 'inreset');
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        direction="row"
        xs={12}
        md={12}
        lg={12}
        style={{ marginBottom: '0.5rem' }}
      >
        <Grid item md={10} xs={10}>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={4} msd={4}>
         <AddTaxSectionConfig />
        </Grid>
        <Grid item md={2} xs={2}>
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

        <DialogContent sx={{ minWidth: '300px' }}>
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
              <Autocomplete
                disablePortal
                name="Department"
                id="combo-box-demo"
                options={departmentType?.map((department) => ({
                  label: department.departmentName,
                  value: department.departmentName,
                  ...department,
                }))}
                value={formData?.Department || null}
                onChange={(event, newValue, selectedOption) =>
                  handleDesignationChange('Department', newValue, selectedOption)
                }
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Department" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                name="Designation"
                id="combo-box-demo"
                options={designationType?.map((employeepayType) => ({
                  label: employeepayType.designationName,
                  value: employeepayType.designationName,
                  ...employeepayType,
                }))}
                value={formData?.Designation || null}
                onChange={(event, newValue, selectedOption) =>
                  handleDesignationGradeChange('Designation', newValue, selectedOption)
                }
                renderInput={(params) => <TextField {...params} label="Designation " />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                name="DesignationGrade"
                id="combo-box-demo"
                options={designationGradeType?.map((employeepayType) => ({
                  label: employeepayType.designationGradeName,
                  value: employeepayType.designationGradeID,
                  ...employeepayType,
                }))}
                value={formData?.DesignationGrade || null}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue, selectedOption) =>
                  handleDesignationGrade('DesignationGrade', newValue, selectedOption)
                }
                renderInput={(params) => <TextField {...params} label="Designation Grade " />}
              />
            </Grid>
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
            onClick={() => {
              handleCancel();
            }}
          >
            Reset
          </Button>
        </div>
      </BootstrapDialog>
    </>
  );
}

CreatePayRunFilter.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
};

CreatePayRunFilter.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
