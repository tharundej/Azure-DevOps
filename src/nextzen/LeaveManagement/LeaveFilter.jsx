import PropTypes, { element } from 'prop-types';
import React,{ useState, useContext } from 'react';
import { maxWidth, styled } from '@mui/system';
import {TextField,Grid,Button,MenuItem,Stack,Badge,DialogContent,Dialog,DialogTitle,Typography} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import UserContext from '../context/user/UserConext';
import { getLeaveTypeAPI } from 'src/api/HRMS/LeaveManagement';
const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};
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
export default function LeaveFilter({filterSearch,filterData}){
  const theme = useTheme();
  const {user} = useContext(UserContext)
  const [badgeContent, setBadgeContent] = useState(false);
  const [leaveType,SetLeaveType]= useState();
  
  const getLeaveType = async() => {
    try{
    const LeaveTypepayload = {
        companyId:user?.companyID
    }
     const leaveTypeResponse = await getLeaveTypeAPI(LeaveTypepayload)
     SetLeaveType(leaveTypeResponse?.data?.list)
    }
   catch(error){
        console.log(error);
  };
  }
 
  const [dropdown,setDropdown]=useState({})
  const [dropdownLeaveType,setDropdownLeaveType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
      [
        {
          field:'applyDate',
          from:'applyDatefrom',
          to:'applyDateto'
        },
        {
          field:'fromDate',
          from:'fromDatefrom',
          to:'fromDateto'
        },
        {
          field:'toDate',
          from:'toDatefrom',
          to:'toDateto'
        }
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
        console.log(arr1.length,"arrr",arr1)
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
      getLeaveType();
    }
    const handleClickClose=()=>{
      setOpen(false)
    }
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      if(field==="leave_type_name"){
        setDropdownLeaveType(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="status"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
    };
    const handleApply = async()=>{
      setDatesData([]);
      setBadgeContent(true);
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
        {badgeContent ===  true?(
               <Badge badgeContent={""} color="success" variant="dot" 
               
               anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              
              >
                        <Button onClick={handleClickOpen} style={{width:"80px"}}   >
                       <Iconify icon="mi:filter"/>
                       Filters
                  </Button>
                  </Badge >
          ):( <Button onClick={handleClickOpen} style={{width:"80px"}}  >
          <Iconify icon="mi:filter"/>
          Filters
     </Button>)}
      </Stack>
      </Grid>
         </Grid>
     
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx:{maxWidth:500}
        }}
      >
        
        <DialogTitle sx={{paddingBottom:0,paddingTop:2}}>Filters
        <CancelOutlinedIcon sx={{cursor:"pointer",float:'right'}} onClick={handleCancel} />
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0,marginTop:2}}>
          
          <Grid container>
        <Grid container flexDirection="row">
            <Typography>Apply Date</Typography>
            <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
        <Grid container flexDirection="row" sx={{marginTop:2}}>
             <Typography>Start Date</Typography>
            <Grid container flexDirection="row">
             <Grid item md={6} xs={12}>
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
             <Grid item md={6} xs={12}>
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
      <Grid container flexDirection="row" sx={{marginTop:2}}>
      <Typography>End Date</Typography>
     
     <Grid container flexDirection="row">
       <Grid item md={6} xs={12}>
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
         <Grid item md={6} xs={12}>
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
         </Grid>
      <Grid container flexDirection="row" spacing={1}>
                  <Grid item marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'status')}
                  input={<OutlinedInput label="status" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  
                </Select>
              </FormControl>
                   </Grid>
                   <Grid item marginTop="10px" xs={12} md={6}>
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
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
       <div style={{marginBottom:12,marginTop:4}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} variant="outlined" onClick={()=>{handleCancel()}}>Reset</Button></div>
    </Dialog>
    </>
    )
    
}
LeaveFilter.propTypes={
    filterSearch:PropTypes.any,
    filterData: PropTypes.any,
}