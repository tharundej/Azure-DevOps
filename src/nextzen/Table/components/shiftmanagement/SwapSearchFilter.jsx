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
import ShiftSwapForm from './ShiftSwapForm';
import CreateSwapRequest from './CreateSwapRequest';
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';
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
export default function SwapSearchFilter({filterSearch,filterData}){
  const theme = useTheme();
  const {user} = useContext(UserContext)
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
        {
          field:'start_date',
          from:'applyDatefrom',
          to:'applyDateto'
        },
        // {
        //   field:'startDate',
        //   from:'fromDatefrom',
        //   to:'fromDateto'
        // },
        // {
        //   field:'endDate',
        //   from:'toDatefrom',
        //   to:'toDateto'
        // }
      ]
    )
  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'status',
        options:[]
      },
      {
        field:'leave_type_name',
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
    status: "",         // Add default value for "status"
    leave_type_name: "",  // Add default value for "leave_type_name"
  })
  const [ShiftGroupName, setShiftGroupName]= useState([])
  const [ShiftName, setShiftName]= useState([])
  const[FromShiftGroup,setFromShiftGroup]=useState([])
  const[ToShiftGroup,setToShiftGroup]=useState([])
  const[FromShiftName,setFromShiftName]=useState([])
  const[ToShiftName,setToShiftName]=useState([])

  const handleChangeSingleDropDown =(event,newvalue,field)=>{
    if(field==="from_shift_group"){
      setFromShiftGroup(newvalue)
      const obj=dropdown;
      obj[field]=newvalue.shiftGroupName;
      setDropdown(obj);
    }
   else if(field==="to_shift_group"){
      setToShiftGroup(newvalue)
      const obj=dropdown;
      obj[field]=newvalue.shiftGroupName;
      setDropdown(obj);
    }
   else if(field==="from_shift_name"){
      setFromShiftName(newvalue)
      const obj=dropdown;
      obj[field]=newvalue.shiftGroupName;
      setDropdown(obj);
    }
   else if(field==="to_shift_name"){
      setToShiftName(newvalue)
      const obj=dropdown;
      obj[field]=newvalue.shiftGroupName;
      setDropdown(obj);
    }
  }
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
        status: "",
        leave_type_name: "",
      };
  
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
         
        })
        arr1.status = data.status;
        arr1.leave_type_name = data.leave_type_name;
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
      
      // if(field==="leave_type_name"){
      //   setDropdownLeaveType(value)
      //   const obj=dropdown;
      //   obj[field]=value;
      //   setDropdown(obj);
      // }
       if(field==="status"){
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
      data.from_shift_group = FromShiftGroup?.shiftGroupName;
      data.to_shift_group = ToShiftGroup?.shiftGroupName;
      data.from_shift_name = FromShiftName?.shiftName;
      data.to_shift_name = ToShiftName?.shiftName;

      filterData(data);
      setOpen(false);
    }

    const handleCancel = async()=>{
      setDropdownStatus([]);
      setFromShiftGroup([]);
      setFromShiftName([])
      setToShiftGroup([])
      setToShiftName([])
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
    
  

      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const [showRequesForm, setShowRequestForm] = useState  (false);
      const handleRequestClose = () => setShowRequestForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
      const handleRequestForm =()=>{
        setShowRequestForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    return (
        <>
                      {showForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <ShiftSwapForm currentUser={{}} handleClose={handleClose} />
      </Dialog>
    )}
              {showRequesForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showRequesForm}
 onClose={handleRequestClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <CreateSwapRequest currentUser={{}} handleClose={handleRequestClose} />
      </Dialog>
    )}
 <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={6} xs={6} item>
 
            <TextField placeholder='Search....'
            fullWidth
            onChange={e=>{handleSearch(e)}}
            size="small"

            />
            </Grid>
 
            <Grid md={6} xs={6} item>
               
                <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
               <Grid item>  
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}>Shift Swap</Button>
               </Grid>
               {/* <Grid item  sx={{marginLeft:'4px'}}>  
               <Button variant='contained' color='primary' className="button" onClick={handleRequestForm}>Request Swap</Button>
               </Grid> */}
               <Grid sx={{marginLeft:'4px'}}>
               <Button onClick={handleClickOpen} sx={{width:"80px"}}>
               <Iconify icon="mi:filter"/>Filters
               </Button>
      </Grid>
 
                </Grid>
 
 
      </Grid>
         </Grid>
     
      <Dialog
        onClose={handleClickClose}
       
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
            <Typography>Swap Date</Typography>
     
            <Grid container flexDirection="row" flexWrap="nowrap" ms={12} lg={12} xs={12}>
              <Grid ms={8} lg={8} xs={8} item>
               

             <LocalizationProvider     dateAdapter={AdapterDayjs}>
                  <DemoContainer     components={['DatePicker']}>
                    <DatePicker
                    className="datepiker-ui"
                      sx={{ width: '100%'  ,paddingLeft: '3px'}}
                      label="From Date"
                      value={dates?.applyDatefrom ? dayjs(dates.applyDatefrom) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          applyDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                </Grid>
                <Grid ms={8} lg={8} xs={8} item>
                 

             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer    components={['DatePicker']}>
                    <DatePicker
                    className="datepiker-ui"
                      sx={{ width: '100%',paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.applyDateto ? dayjs(dates.applyDateto) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          applyDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                  
                </Grid>
                </Grid>
                </Grid>

                {/* <Grid>
                  <Grid marginTop="10px"marginBottom="10px" xs={12} md={6}>
                  <FormControl fullWidth >
                    <InputLabel fullWidth id="status">Status</InputLabel>
                    <Select
                    fullWidth
                    labelId='status'
                    id='demo'
                    multiple
                    value={dropdownstatus || []}
                    onChange={(e)=>handleChangeDropDown(e,'status')}
                    inputProps={<OutlinedInput label="Status"/>}
                    MenuProps={MenuProps}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>

                    </Select>
                  </FormControl>
                   </Grid>
               
                </Grid> */}
                <Grid marginTop="10px">
         <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftGroupName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FromShiftGroup || ""}
                  getOptionLabel={(option) => option.shiftGroupName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeSingleDropDown(e,newvalue,'from_shift_group')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select From Shift Group Name" />}
                />
                </Grid>
                <Grid marginTop='10px'>
         <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftGroupName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={ToShiftGroup || ""}
                  getOptionLabel={(option) => option.shiftGroupName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeSingleDropDown(e,newvalue,'to_shift_group')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select To Shift Group Name" />}
                />
                </Grid>
                <Grid marginTop='10px'>
         <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FromShiftName || ""}
                  getOptionLabel={(option) => option.shiftName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeSingleDropDown(e,newvalue,'from_shift_name')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select From Shift Name" />}
                />
                </Grid>
                <Grid marginTop='10px' marginBottom="15px">
         <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={ToShiftName || ""}
                  getOptionLabel={(option) => option.shiftName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeSingleDropDown(e,newvalue,'to_shift_name')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select To ShiftName" />}
                />
                </Grid>
               </Grid>
               <Grid container justifyContent="flex-end"  marginBottom={3} spacing={1} >
      <Button sx={{margin:"2px"}} variant="outlined" onClick={handleCancel}>
            Reset
          </Button>
      <Button variant='outlined' sx={{margin:"2px"}} onClick={handleApply}>apply</Button>
      {/* </Badge> */}

      </Grid >  
         </DialogContent>
       {/* <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div> */}
    </Dialog>
    </>
    )
    
}
SwapSearchFilter.propTypes={
    filterSearch:PropTypes.any,
    filterData: PropTypes.any,
}