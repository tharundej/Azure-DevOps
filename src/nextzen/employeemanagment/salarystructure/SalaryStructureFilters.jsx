import PropTypes, { element } from 'prop-types';

import React, { useEffect, useState, useCallback } from 'react';

import { styled } from '@mui/system';

import FormProvider, { RHFSelect, RHFAutocomplete } from '../../../components/hook-form';

import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';


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
import SalaryStructureForm from './SalaryStructureForm';

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

export default function SalaryStructureFilters({ filterData, filterOptions ,filterSearch,searchData,cellData,openModal,type,onHandleOpen,handleClose}) {
  const theme = useTheme();
  const departmentName = [
    'HR',
  ];
  const designationName = [
    'executive'
  ]

  const designationGradeName = [
    'senior',
    'junior'
  ]

  const [dropdown, setDropdown] = useState({});

  const [dateError, setDataError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [personName, setPersonName] = React.useState([]);

  const [dropdownEmployemtType, setDropdownEmployemtType] = useState([]);
  const [dropdownshift_name, setDropdownStatus] = useState([]);
  const [dropdownDesignationGradeName, setDropdownDesignationGradeName] = useState([]);
  const [dropdownDesignation, setdropdownDesignation] = useState([]);
  const [dropdownDepartmentname, setdropdownDepartmentname] = useState([]);

  const [datesFiledArray, setDatesFiledArray] = useState([
    {
      field: 'date_activity',
      from: 'from_date',
      to: 'to_date',
    },
  ]);

  const [dropdownFiledArray, setDropdownFiledArray] = useState([
    {
      field: 'departmentName',
      options: [],
    },
    {
      field: 'designationName',
      options: [],
    },
    {
      field: 'designationGradeName',
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
          const commaSeparatedString = arrayOfStrings.join(', ');
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
  const [options,setOptions]=useState({})
  const [optionsValue,setOptionsValue]=useState({})
  useEffect(()=>{
    const fetchDepartment=async()=>{
      if(open){
        try{
        
          const obj={
            departmentOptions:await ApiHitDepartmentWithoutLocation(),
          }
          setOptions(obj)
          console.log(obj,'objjjjjj')
        }
        catch(error){
  
        }
       
      }
    }
    

    fetchDepartment();
    
  },[open])
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
    } else if (field === 'designation_name') {
      setdropdownDesignation(value);
      const obj = dropdown;
      obj[field] = value;
      setDropdown(obj);
    } else if (field === 'department_name') {
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
    const obj={
      departmentID:(optionsValue?.departmentValue?.departmentID).toString() || "",
      designationGradeID:(optionsValue?.desginationGradeValue?.designationGradeID)?.toString()|| "",
      designationID:(optionsValue?.desginationValue?.designationID)?.toString()|| ""
    }
    // const data = await formWithDropdown();
    console.log(toString(optionsValue?.departmentValue?.departmentID),'filterss')
    filterData(obj);
    // console.log(optionsValue, 'optionsValue');

    //   filterData(data);
    handleClickClose();
  };
  const [search, setSearch]=useState("");

    const handleSearch = (e) => {
      setSearch(e?.target?.value)
        searchData(e?.target?.value)
        // console.log(searchTerm,"search ........")
        };
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
        <Grid item>
        <TextField
            placeholder="Search...."
             fullWidth
             onChange={handleSearch}
          />
          
        </Grid>
        <Grid item>
        <Button 
        onClick={onHandleOpen} 
         variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add SalaryStructure</Button>
       {/* <SalaryStructureForm currentUserData={cellData} openModal={openModal}  type={type}/> */}
       </Grid>
        <Grid item>
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
        // className="custom-dialog-width"
      >
        <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0, paddingTop: 2 }}>
          Filters
          <Button onClick={() => setOpen(false)} sx={{ float: 'right' }}>
            <Iconify icon="iconamoon:close-thin" />
          </Button>
        </DialogTitle>

        <DialogContent  sx={{minWidth:"300px"}}
        //   style={{
        //     paddingTop: '20px',
        //     paddingRight: '17px',
        //     paddingBottom: '44px',
        //     paddingLeft: '44px',
        //   }}
        >
          {/* <Grid  spacing={2}  sx={{flexDirection:'row',display:'flex'}}> */}
            {/* <Typography style={{marginBottom:"0.8rem"}}> Date Activity</Typography> */}
           
            <Grid container spacing={1}   sx={{flexDirection:'row',display:'flex',marginTop:'1rem'}} item>

            </Grid>


                  <Grid container >
              
              <Grid item xs={12} md={6}>
              
                <Autocomplete
                  disablePortal
                  id="departmentOptions"
                  options={options?.departmentOptions || []}
                  value={optionsValue?.departmentValue}
                  getOptionLabel={(option) => option?.departmentName}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...optionsValue };
                      newArr.departmentValue=newvalue
                    newArr.desginationValue=undefined;
                    newArr.desginationGradeValue=undefined;

                    
                    console.log(newArr,'newArr')
                   
                    try{
                      const deptObj={
                        companyID:'COMP1',
                        departmentID:newvalue?.departmentID
                      }
                      const desgination=await ApiHitDesgniation(deptObj);
                      var optionsArr={...options};
                     
                      optionsArr.desginationGradeOptions=[];
                      optionsArr.desginationOptions=desgination;
                     
                      setOptions(optionsArr)

                    }
                    catch(error){
                      
                    }

                   
                    
                    setOptionsValue(newArr)
                   }
                  
                }

                 
                  
                  renderInput={(params) => <TextField {...params} label="Department"
                  style={{ paddingLeft: '16px', width: '100%' }} />}
                />
              </Grid>
                  </Grid>

                  <Grid container >
                    <Grid item xs={12} md={6}>
                    
                      <Autocomplete
                        disablePortal
                        id="Desgination"
                        options={options?.desginationOptions  || []}
                        value={optionsValue?.desginationValue}
                        getOptionLabel={(option) => option.designationName}
                        onChange={async(e, newvalue) => {
                        
                          var newArr = { ...optionsValue };
                          newArr.desginationValue=newvalue;
                        
                          newArr.desginationGradeValue=undefined
                          
                          console.log(newArr)
                        
                          try{
                            const desgGradeObj={
                              companyID:'COMP1',
                              designationID:newvalue?.designationID
                            }
                            const desginationGrade=await ApiHitDesgniationGrade(desgGradeObj);
                            var optionsArr={...options};
                            optionsArr.desginationGradeOptions=desginationGrade;
                            
                            
                          
                            setOptions(optionsArr)

                          }
                          catch(error){
                            
                          }

                        
                          
                          setOptionsValue(newArr)
                        }}
                        renderInput={(params) => <TextField {...params} label="Desgination"
                        style={{ paddingLeft: '16px', width: '100%' }} />}
                      />
                    </Grid>
                      </Grid>

                  <Grid container >
                    <Grid item xs={12} md={6}>
                    
                      <Autocomplete
                        disablePortal
                        id="DesginationGrade"
                        options={options?.desginationGradeOptions  || []}
                        value={optionsValue?.desginationGradeValue}
                        getOptionLabel={(option) => option.designationGradeName}

                        onChange={async(e, newvalue) => {
                        
                          var newArr = { ...optionsValue };
                          newArr.desginationGradeValue=newvalue;
                        
                        
                          
                        

                        console.log(newArr,'newArr')
                          
                          setOptionsValue(newArr)
                        }}
                        renderInput={(params) => <TextField {...params} label="Desgination Grade"
                        style={{ paddingLeft: '16px', width: '100%' }} />}
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
          style={{ width: '80px', marginBottom:'1rem',backgroundColor:'black',color:'white'}}
        >
          Apply
        </Button>
        </div>
      </Dialog>
    </>
  );
}

// SalaryStructureFilters.propTypes={
//     handleFilters: PropTypes.any,
// }
SalaryStructureFilters.propTypes = {
  filterData: PropTypes.func,
  searchData: PropTypes.any,
  type:PropTypes.string,
  onHandleOpen:PropTypes.func,
  handleClose:PropTypes.func
};

SalaryStructureFilters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
