import {Card,OutlinedInput,TextField,FormControl,Select,MenuItem,InputLabel,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Grid,IconButton,DialogContent} from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { useState,useEffect, useContext } from "react";
import UserContext from 'src/nextzen/context/user/UserConext';
import Iconify from 'src/components/iconify/iconify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
export default function LeaveHistoryFilter({filterSearch,filterData}){
    
  const {user} = useContext(UserContext)
  const [dropdown,setDropdown]=useState({})
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
    const [leaveType,SetLeaveType]= useState();
    const [open,setOpen]=useState(false);
    const [dropdownstatus,setDropdownStatus]=useState([])
    const [dropdownLeaveType,setDropdownLeaveType]=useState([])
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
        field:'leaveTypeName',
        options:[]
      }
    ]
  )

  const handleChangeDropDown = (event,field) => {
    const {
      target: { value },
    } = event;
    
    if(field==="leaveTypeName"){
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

    const [dates,setDates]=useState({
      applyDatefrom:"",
      applyDateto:"",
      fromDatefrom:"",
      fromDateto:"",
      toDatefrom:"",
      toDateto:""
    })
    const handleClickOpen=()=>{
      getLeaveType()
      setOpen(true);
     
    }
    const handleClickClose=()=>{
      setOpen(false)
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
          setDates(arr1);
          resolve(arr1)   
      })
      
    }
    function formWithDropdown(data){
      return new Promise((resolve) => {
       
        const arr1={};
         dropdownFiledArray.forEach((item,index)=>{  
           
          if(dropdown[item.field]?.length>0){
            const arrayOfStrings = dropdown[item.field];
            console.log(arrayOfStrings,"arrayOfStringss")
            const commaSeparatedString = arrayOfStrings.join(',');
            data[item.field]=commaSeparatedString;
          }
          
           
          })
          // setDatesData(arr1);
          resolve(arr1)
          
      })
      
    }
    const handleApply = async()=>{
      setDates([]);
      const data = await formDateDataStructure();
      
      const data1=await formWithDropdown(data);
      filterData(data);
      console.log(data,"filetredataaa")
      setOpen(false);
    }
    
    const handleCancel = async()=>{
      setDropdownStatus("")
      setDropdownLeaveType("")
      setDates({
        applyDatefrom: "",
        applyDateto: "",
        fromDatefrom:"",
        fromDateto:"",
        toDatefrom:"",
        toDateto:""
      });
    }
    
   
      const getLeaveType = () => {
        const payload = {
            companyId:(user?.companyID)?user?.companyID:''
        }
       
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: baseUrl + `/getLeaveType`,
          data:  payload
        };
      
        axios.request(config).then((response) => {
          SetLeaveType(response?.data?.list)
        })
      
          .catch((error) => {
            console.log(error);
          });
      }

    return (    
        <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>
            <TextField placeholder='Search....' 
            fullWidth
            onChange={e=>{handleSearch(e)}}
            />
            </Grid>
            <Grid md={4} xs={4} item>
        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>Filter
      </Button>
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
         {/* <Button onClick={()=>setOpen(false)} sx={{float:"right"}}>
          <Iconify icon="iconamoon:close-thin"/>
          </Button> */}
          <CancelOutlinedIcon sx={{cursor:"pointer",float:'right'}} onClick={handleClickClose} />
         </DialogTitle>
         <DialogContent sx={{mt:0,paddingBottom:0}}>
         <Grid container sx={{marginTop:2}}>
        <Grid container flexDirection="row">
             <Typography>Apply Date</Typography>
             <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <DemoContainer components={['DatePicker']}>
                     <DatePicker
                       sx={{ width: '100%', paddingLeft: '3px' }}
                       label="From"
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
                       label="To"
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
                       label="From"
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
                       label="To"
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
                       label="From"
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
                       label="To"
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
                   value={dropdownstatus}
                   multiple
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
                   <Grid item marginTop="10px" xs={12} md={6}>
                 <FormControl fullWidth >
                 <InputLabel fullWidth id="LeaveTypeName">Leave Type</InputLabel>
                 <Select
                 fullWidth
                   labelId="demo-multiple-name-status_2"
                   id="demo-multiple-status_2"
                   multiple
                   value={dropdownLeaveType}
                   onChange={(e)=>handleChangeDropDown(e,'leaveTypeName')}
                   input={<OutlinedInput label="Leave Type" />}
                   MenuProps={MenuProps}
                 >
                     {leaveType?.map((status) => (
                 <MenuItem value={status.leaveTypeName} key={status.leaveTypeID}>
                   {status.leaveTypeName}
                 </MenuItem>
               ))}
                 </Select>
               </FormControl>
               </Grid>
                </Grid>
               </Grid>
            
          </DialogContent>
          <div style={{marginBottom:16,marginTop:5}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
          <Button sx={{float:'right',right:15}} variant="outlined" onClick={()=>{handleCancel()}}>Reset</Button></div>
    
       </Dialog>
     </>
     )
}