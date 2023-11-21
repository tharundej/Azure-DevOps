import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback } from 'react';
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
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ShiftSwapForm from './ShiftSwapForm';
import CreateSwapRequest from './CreateSwapRequest';
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
  const [leaveType,SetLeaveType]= useState();
  const getLeaveType = () => {
    const payload = {
        // companyId: "C1"
        companyId:localStorage.getItem('companyID')
    }
   
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: baseUrl + `/getLeaveType`,
      // url:`https://qx41jxft-3001.inc1.devtunnels.ms/erp/getLeaveType`,
      data:  payload
    };
  
    axios.request(config).then((response) => {
      SetLeaveType(response?.data?.list)
    })
  
      .catch((error) => {
        console.log(error);
      });
  }
 
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
          field:'swap_date',
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

      filterData(data);
      setOpen(false);
    }

    const handleCancel = async()=>{
      setDropdownStatus([]);
      setDropdownLeaveType([]);
      setDates({
    applyDatefrom:"",
    applyDateto:"",
    fromDatefrom:"",
    fromDateto:"",
    toDatefrom:"",
    toDateto:"",
    status: "",        
    leave_type_name: "",  
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
      },1000)
    
  

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

            />
            </Grid>
 
            <Grid md={6} xs={6} item>
               
                <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
               <Grid item>  
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}>Shift Swap</Button>
               </Grid>
               <Grid item  sx={{marginLeft:'4px'}}>  
               <Button variant='contained' color='primary' className="button" onClick={handleRequestForm}>Request Swap</Button>
               </Grid>
               <Grid sx={{marginLeft:'4px'}}>
               <Button onClick={handleClickOpen} sx={{width:"80px"}}>
               <Iconify icon="mi:filter"/>
               </Button>
      </Grid>
 
                </Grid>
 
 
      </Grid>
         </Grid>
     
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        
        <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0}}>
          
          <Grid>
                <Grid>
            <Typography>Swap Date</Typography>
     
            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
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
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
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
             {/* <Grid sx={{marginTop:2}}>

             <Typography>Start Date</Typography>
     
     <Grid container flexDirection="row">
       <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
               sx={{ width: '100%', paddingLeft: '3px' }}
               label="From Date"
               value={dates?.fromDatefrom ? dayjs(dates.fromDatefrom) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   fromDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
                 }));
               }}
             />
           </DemoContainer>
         </LocalizationProvider>
         </Grid>
         <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
               sx={{ width: '100%', paddingLeft: '3px' }}
               label="To Date"
               value={dates?.fromDateto ? dayjs(dates.fromDateto) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   fromDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                 }));
               }}
             />
           </DemoContainer>
         </LocalizationProvider>
         </Grid>
         </Grid>
         </Grid>
      <Grid sx={{marginTop:2}}>

      <Typography>End Date</Typography>
     
     <Grid container flexDirection="row">
       <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
               sx={{ width: '100%', paddingLeft: '3px' }}
               label="From Date"
               value={dates?.toDatefrom ? dayjs(dates.toDatefrom) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   toDatefrom:newValue? formatDateToYYYYMMDD(newValue):"",
                 }));
               }}
             />
           </DemoContainer>
         </LocalizationProvider>
         </Grid>
         <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
               sx={{ width: '100%', paddingLeft: '3px' }}
               label="To Date"
               value={dates?.toDateto ? dayjs(dates.toDateto) : null}
               defaultValue={dayjs(new Date())}
               onChange={(newValue) => {
                 setDates((prev) => ({
                   ...prev,
                   toDateto: newValue ? formatDateToYYYYMMDD(newValue):"",
                 }));
               }}
             />
           </DemoContainer>
         </LocalizationProvider>
         </Grid>
         </Grid>
         </Grid> */}
      <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">Status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'status')}
                  input={<OutlinedInput label="Status" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  
                </Select>
              </FormControl>
                   </Grid>
                   {/* <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="leave_type_name">Leave Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_2"
                  id="demo-multiple-status_2"
                  multiple
                  value={dropdownLeaveType}
                  onChange={(e)=>handleChangeDropDown(e,'leave_type_name')}
                  input={<OutlinedInput label="Leave Type" />}
                  MenuProps={MenuProps}
                >
                 
 {leaveType?.map((status) => {
  return (
                <MenuItem value={status.leaveTypeName} key={status.leaveTypeID}>
                  {status.leaveTypeName}
                </MenuItem>
  )
  })}

                </Select>
              </FormControl>
                   </Grid> */}
                </Grid>
               </Grid>
           
         </DialogContent>
       <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div>
    </Dialog>
    </>
    )
    
}
SwapSearchFilter.propTypes={
    filterSearch:PropTypes.any,
    filterData: PropTypes.any,
}