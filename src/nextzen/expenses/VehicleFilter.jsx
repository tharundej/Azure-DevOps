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
export default function VehicleFilter({filterSearch,filterData}){
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
          field:'expenseDate',
          fromDate:"expenseStartDate",
          toDate:'expenseEndDate'
        },
        {
          field:'invoiceDate',
          fromDate:'invoiceStartDate',
          toDate:'invoiceEndDate'
        },
     
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
    expenseStartDate:"",
    expenseEndDate:"",
  
    invoiceStartDate:"",
    invoiceEndDate:"",
 
  })
  function formDateDataStructure(){
    return new Promise((resolve) => {
     
      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          fromDate:dates[item?.fromDate],
          toDate:dates[item?.toDate]
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
      data.expenseType ='Vehicle',
    
      filterData(data);
      setOpen(false);
    }
    const handleCancel = async()=>{
      setDropdownStatus([]);
      setDropdownLeaveType([]);
      setDates({
        expenseStartDate:"",
        expenseEndDate:"",
      
        invoiceStartDate:"",
        invoiceEndDate:"",  
      })
      setOpen(false);
    }
    const resetHandle = async()=>{
        setDropdownStatus([]);
        setDropdownLeaveType([]);
        setDates({
          expenseStartDate:"",
          expenseEndDate:"",
        
          invoiceStartDate:"",
          invoiceEndDate:"",  
        })
        // setOpen(false);
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
        <Typography>Expense </Typography>
            <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
             
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.expenseStartDate ? dayjs(dates.expenseStartDate) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          expenseStartDate:newValue? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
               
                <Grid item md={6} xs={12}>
                {/* <Typography>Expense End Date</Typography> */}
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.expenseEndDate ? dayjs(dates.expenseEndDate) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          expenseEndDate: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
            </Grid>
        </Grid>
        <Grid container flexDirection="row" sx={{marginTop:2}}>
        <Typography>Invoice </Typography>  
        <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
             
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.invoiceStartDate ? dayjs(dates.invoiceStartDate) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          invoiceStartDate:newValue? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
               
                <Grid item md={6} xs={12}>
                {/* <Typography>Invoice End Date</Typography> */}
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.invoiceEndDate ? dayjs(dates.invoiceEndDate) : null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          invoiceEndDate: newValue ? formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
            </Grid>
        </Grid>
    
               </Grid>
           
         </DialogContent>
       <div style={{marginBottom:12,marginTop:4}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} variant="outlined" onClick={()=>{resetHandle()}}>Reset</Button></div>
    </Dialog>
    </>
    )
    
}
VehicleFilter.propTypes={
    filterSearch:PropTypes.any,
    filterData: PropTypes.any,
}