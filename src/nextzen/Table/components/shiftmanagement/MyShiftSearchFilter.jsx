import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback, useContext } from 'react';
import axios from 'axios';
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
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import UserContext from 'src/nextzen/context/user/UserConext';
import instance from 'src/api/BaseURL';
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
export default function MyShiftSearchFilter({filterSearch,filterData}){
  const theme = useTheme();
  const {user}= useContext(UserContext)
  const [leaveType,SetLeaveType]= useState();

 
  const [dropdown,setDropdown]=useState({
// 
  })
  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);
  const [dropdownLeaveType,setDropdownLeaveType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
      [
        // {
        //   field:'requestDate',
        //   from:'applyDatefrom',
        //   to:'applyDateto'
        // },
        {
          field:'startDate',
          from:'fromDatefrom',
          to:'fromDateto'
        },
        {
          field:'endDate',
          from:'toDatefrom',
          to:'toDateto'
        }
      ]
    )
  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'shift_name',
        options:[]
      },
      {
        field:'shift_term',
        options:[]
      }
    ]
  )
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    applyDatefrom:"",
    applyDateto:"",
    fromDatefrom:"",
    fromDateto:"",
    toDatefrom:"",
    toDateto:"",
    shift_name: "",         // Add default value for "shift_name"
    shift_term: "",  // Add default value for "shift_term"
  })
  const [ShiftGroupName, setShiftGroupName]= useState([])
  const [ShiftName, setShiftName]= useState([])
  const[FilterShiftGroupName,setFilterShiftGroupName]=useState([])
  const[FilterShiftName,setFilterShiftName]=useState([])

  const getShiftName = async (newvalue) => {
    try {
      const data = {
        companyId: (user?.companyID)?user?.companyID : '',
        locationId: (user?.locationID)?user?.locationID : '',
      };
      const response = await instance.post('/getShiftConfig', data);
      setShiftName(response.data.data);
      console.log(
        '🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:',
        response.data.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
  const getShiftGroupName = async ()=>{
    try{
    const data = {
      
      companyId : (user?.companyID)? user?.companyID : '',
      locationId : (user?.locationID)?user?.locationID : '',
      supervisorId : (user?.employeeID)?user?.employeeID : '',
  
    }
    const response = await instance.post('/getShiftGroupName',data);
    setShiftGroupName (response.data.data);
    console.log("🚀 ~ file: ShiftRoasterFilter.jsx:126 ~ getShiftGroupName ~ response.data.data:", response.data.data)
  
    }
    catch (error){
      console.error('Error', error);
      throw error;
  
    }
  }


  const handleChangeSingleDropDown =(event,newvalue,field)=>{
    if(field==="shiftGroupName"){
      setFilterShiftGroupName(newvalue)
      const obj=dropdown;
      obj[field]=newvalue.shiftGroupName;
      setDropdown(obj);
    }
   else if(field==="shiftName"){
      setFilterShiftName(newvalue)
      const obj=dropdown;
      obj[field]=newvalue.shiftGroupName;
      setDropdown(obj);
    }
  }

  function formDateDataStructure(){
    return new Promise((resolve) => {
     

      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          from:dates[item?.from],
          to:dates[item?.to]
        }
         
        })
        setDatesData(arr1);
        resolve(arr1)
        
    })
    
  }
  function formWithDropdown(data){
    return new Promise((resolve) => {
     
      const arr1 = {
        shift_name: "",
        shift_term: "",
      };
  
       dropdownFiledArray.forEach((item,index)=>{  
        console.log(dropdown[item.field]?.length,"length value ")
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
         
        })
        arr1.shift_name = data.shift_name;
        arr1.shift_term = data.shift_term;
        resolve(arr1)
        
    })
    
  }
  
    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
      // getLeaveType();
      getShiftGroupName()
      getShiftName()
      
    }
    const handleClickClose=()=>{
      setOpen(false)
    }
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      if(field==="shift_term"){
        setDropdownLeaveType(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="shift_name"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
    };
    const handleApply = async()=>{
      setDatesData([]);
      
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);
      data.shift_name = FilterShiftName?.shiftName;
      data.shift_group = FilterShiftGroupName?.shiftGroupName;

      filterData(data);
      setOpen(false);
    }

    const handleCancel = async()=>{
    setFilterShiftGroupName([])
    setFilterShiftName([])
      setDates({
    applyDatefrom:"",
    applyDateto:"",
 
      })
      setOpen(false);
    }

    const debounce = (func, delay) => {
      let debounceTimer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    };
    const handleSearch=debounce((e)=>{
      filterSearch(e?.target?.value)
    },500)
    
  
    return (
        <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>
            <TextField placeholder='Search....' 
            fullWidth
            onChange={e=>{handleSearch(e)}}
            size="small"
            />
            </Grid>
            <Grid md={4} xs={4} item>
        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>Filters
      </Button>
      </Stack>
      </Grid>
         </Grid>
     
         <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        
        <Grid container flex flexDirection={"row"}>
      <Grid item  xs={10}>
      <DialogTitle>Filters</DialogTitle>
      </Grid>
      <Grid fullWidth item sx={{alignSelf:"center"}} xs={2}> 
      <CancelOutlinedIcon sx={{cursor:"pointer"}} onClick={handleClickClose} />
      </Grid>
      </Grid>
        <DialogContent sx={{mt:0,paddingBottom:0}}>
          
          <Grid>
   

      <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                  <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftGroupName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FilterShiftGroupName || ""}
                  getOptionLabel={(option) => option.shiftGroupName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeSingleDropDown(e,newvalue,'shiftGroupName')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select Shift Group Name" />}
                />
                   </Grid>
                   <Grid marginTop="10px" marginBottom="15px" xs={12} md={6}>
                   <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FilterShiftName || ""}
                  getOptionLabel={(option) => option.shiftName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeSingleDropDown(e,newvalue,'shiftName')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select To Shift Group Name" />}
                />
                   </Grid>
                </Grid>
               </Grid>
   

      <Grid container justifyContent="flex-end"  marginBottom={3} spacing={1} >
      {/* <Badge badgeContent={badgeContent} color="error"> */}
      <Button sx={{margin:"2px"}} variant="outlined" onClick={handleCancel}>
            Reset
          </Button>
      <Button variant='outlined' sx={{margin:"2px",backgroundColor:'#3B82F6'}}  onClick={handleApply}>apply</Button>
      {/* </Badge> */}

      </Grid >
         </DialogContent>

    </Dialog>
    </>
    )
    
}
MyShiftSearchFilter.propTypes={
  filterSearch: PropTypes.any,
    filterData: PropTypes.any,
}