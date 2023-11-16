import { baseUrl } from "src/nextzen/global/BaseUrl";
import formatDateToYYYYMMDD from "src/nextzen/global/GetDateFormat";
import { useState,useEffect } from "react";
import {Card,OutlinedInput,FormControl,Select,MenuItem,InputLabel,Stack,Button,Dialog,Container,CardContent,Typography,DialogTitle,Grid,Tab,Tabs,IconButton,DialogContent} from '@mui/material';
import { LoadingScreen } from "src/components/loading-screen";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Iconify from "src/components/iconify";
import dayjs from 'dayjs';
import axios from 'axios';
export default function History(){
    const [historyData,setHistoryData] = useState();
    const [leaveType,SetLeaveType]= useState();
    const [loading,setLoading] = useState(false);
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
      const getLeaveType = () => {
        const payload = {
            // companyId: "C1"
            companyId:localStorage.getItem('companyID')
        }
       
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: baseUrl + `/getLeaveType`,
          // url: `https://qx41jxft-3001.inc1.devtunnels.ms/erp/getLeaveType`,
          data:  payload
        };
      
        axios.request(config).then((response) => {
          SetLeaveType(response?.data?.list)
        })
      
          .catch((error) => {
            console.log(error);
          });
      }
    const [open,setOpen]=useState(false);
    const [dropdownstatus,setDropdownStatus]=useState("")
    const [dropdownLeaveType,setDropdownLeaveType]=useState("")
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
    const handleApply = async()=>{
     setOpen(false)
     LeaveHistory()
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
      setOpen(false);
    }
    
    const LeaveHistory = () => {
        setLoading(true);
        const payload = {
          "employeeId": localStorage?.getItem('employeeID'),
          "search": "",
          "Page": 1,
          "Count": 7,
       "externalFilters":{
        "status":(dropdownstatus)?dropdownstatus:"",
        "leaveTypeName":(dropdownLeaveType)?dropdownLeaveType:"",
           "applyDate":{
               "from":(dates?.applyDatefrom)?dates?.applyDatefrom:"",
               "to":(dates?.applyDateto)?dates?.applyDateto:""
           },
    
           "fromDate":{
               "from":(dates?.fromDatefrom)?dates?.fromDatefrom:"",
               "to":(dates?.fromDateto)?dates?.fromDateto:"",
           },
           "toDate":{
                "from":(dates?.toDatefrom)?dates?.toDatefrom:"",
               "to":(dates?.toDateto)?dates?.toDateto:""
           }
          }
        }
         
        const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: baseUrl+ `/getLeaveHistory`,
        // url:`https://g3nshv81-3001.inc1.devtunnels.ms/erp/getLeaveHistory`,
        data:  payload
        }
      axios.request(config).then((response) => {
        setHistoryData(response.data)
        setLoading(false);
      })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      }

      useEffect(()=>{
        LeaveHistory();
      },[])
      const [expanded, setExpanded] = useState(Array(historyData?.list?.length).fill(false));
      const handleExpanded=(index)=>{
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
      }
return (    
    <>
    <Stack sx={{display:'flex',alignItems:'flex-end'}} >
         <Button onClick={handleClickOpen} sx={{width:"80px"}}>
        <Iconify icon="mi:filter"/>
   </Button>
   </Stack>
   
  {loading ? 
  <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
  :(historyData?.data != null ? (
               historyData?.data.map((itm,index) => (
                   <Card sx={{margin:"10px"}}>
                     <CardContent >
                       
            { (!expanded[index])?  <>
            <Typography>
             <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.leaveTypeName}  
             <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
          
           </Typography>
             <Typography><span style={{fontWeight:600}}>Leave Status :  </span>  {itm?.status}
             
             </Typography>
               </>
              :<>
               <Typography >
                         <span style={{fontWeight:700}}>Applied Leave : </span> {itm?.leaveTypeName} <br/>

                         <span >From : {itm?.fromDate} To : {itm?.toDate}</span>
                         <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-up-2-thin"/></IconButton>
            
               </Typography>
                       {/* <Typography><span>No of leave day(s) : </span> {itm?.no_of_days}
                       
                        </Typography> */}
                       <Typography><span style={{fontWeight:600}}>Day Span : </span> {itm?.leaveDays} Days</Typography>
                       <Typography><span>Apply Date : </span> {itm?.applyDate}</Typography>
                       <Typography><span style={{fontWeight:600}}>Leave Reason : </span> {itm?.comments}</Typography>
                       <Typography><span style={{fontWeight:600}}>Leave Status : </span> {itm?.status}</Typography>
                       </>}
                     </CardContent>
                   </Card>
                 )
               )
  ) :
  
  (<div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
  No Leaves 
</div>)
  )}

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
         <Typography>Apply Date</Typography>
         <Grid container flexDirection="row">
         <Grid item>
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
             <Grid item>
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
             <Grid sx={{marginTop:2}}>
         <Typography>Start Date</Typography>
         <Grid container flexDirection="row">
         <Grid item>
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
             <Grid item>
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
             <Grid sx={{marginTop:2}}>
         <Typography>End Date</Typography>
         <Grid container flexDirection="row">
         <Grid item>
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
             <Grid item>
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
             <Grid>
               <Grid marginTop="10px" xs={12} md={6}>
             <FormControl fullWidth >
             <InputLabel fullWidth id="status">status</InputLabel>
             <Select
             fullWidth
               labelId="demo-multiple-name-status_1"
               id="demo-multiple-status_1"
               value={dropdownstatus}
               onChange={(e)=>setDropdownStatus(e.target.value)}
               input={<OutlinedInput label="Status" />}
               MenuProps={MenuProps}
             >
              
                 <MenuItem value="pending">Pending</MenuItem>
                 <MenuItem value="approved">Approved</MenuItem>
                 <MenuItem value="rejected">Rejected</MenuItem>
               
             </Select>
           </FormControl>
                </Grid>
                <Grid marginTop="10px" xs={12} md={6}>
             <FormControl fullWidth >
             <InputLabel fullWidth id="LeaveTypeName">Leave Type</InputLabel>
             <Select
             fullWidth
               labelId="demo-multiple-name-status_2"
               id="demo-multiple-status_2"
               value={dropdownLeaveType}
               onChange={(e)=>setDropdownLeaveType(e.target.value)}
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
      <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
      <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div>

 </Dialog>
   </>
)
   
}