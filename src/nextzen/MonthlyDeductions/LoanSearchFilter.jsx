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
import formatDateToYYYYMMDD from '../global/GetDateFormat';
import CustomDateRangePicker from '../global/CustomDateRangePicker';
import ApplyLoan from './ApplyLoan';
import { baseUrl } from '../global/BaseUrl';
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
  
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function LoanSearchFilter({filterSearch,filterData}){
  const theme = useTheme();
  
  const [dropdown,setDropdown]=useState({
  })

  const [dropdownstatus,setDropdownStatus]=useState([])
  const [dropdownpaymentstatus,setDropdownPaymentStatus]=useState([])
  const [dropdownapprover,setdropdownApprover] = useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'requestDate',
        from:'requestDateStart',
        to:'requestDateEnd'
      },
      {
        field:'paidDate',
        from:'PaidDateFrom',
        to:'PaidDateTo'
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
        field:'paymentStatus',
        options:[]
      },
      {
        field:'approverName',
        options:[]
      }
    ]
  )
  const [datesSavedArray,setDatesSavedArray]=useState(["requestDateStart","requestDateEnd","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    requestDateStart:"",
    requestDateEnd:"",
    PaidDateFrom:"",
    PaidDateTo:"",
 
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
     
      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
        
         
        })
        // setDatesData(arr1);
        resolve(arr1)
        
    })
    
  }
  
    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      ApproversList()
      setOpen(true);
    }
    const handleClickClose=()=>{
      setOpen(false)
    }
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      
       if(field==="status"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="paymentStatus"){
        setDropdownPaymentStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if (field==="approverName")
      {
        setdropdownApprover(value);
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
    handleClickClose()
      
    }
    const [showForm, setShowForm] = useState  (false);
    const [approversList,setApproversList]=useState();
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
     
      } 
      
      const handleSearch=(e)=>{
        filterSearch(e?.target?.value)
      }
  
      const handleCancel = async()=>{
        setDropdownStatus([]);
        setDropdownPaymentStatus([]);
        setdropdownApprover([]);
        setDates({
          requestDateStart:"",
          requestDateEnd:"",
          PaidDateFrom:"",
          PaidDateTo:"",
          approverName:""
        })
        setOpen(false);
      }

      const ApproversList = () => {
        const payload = {
          // companyID: "COMP1"
          companyID:localStorage?.getItem('companyID')
        }
       
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: baseUrl + `/approverDetails`,
          data:  payload
        };
      
        axios.request(config).then((response) => {
          setApproversList(response?.data)
        })
      
          .catch((error) => {
            console.log(error);
          });
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
 <ApplyLoan currentUser={{}} handleClose={handleClose} />
      </Dialog>
    )}
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>
            <TextField placeholder='Search....' 
            fullWidth
            onChange={e=>{handleSearch(e)}} 
            />
            </Grid>
            <Grid md={4} xs={4} item>
                
                <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
               <Grid item>  
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}>Apply Loan</Button>
               </Grid>
               <Grid>
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
            <Typography> Request Date </Typography>
                <Grid>
            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.requestDateStart?dayjs(dates.requestDateStart):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          requestDateStart: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.requestDateEnd? dayjs(dates.requestDateEnd):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          requestDateEnd: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                </Grid>
                </Grid>
                <Grid sx={{marginTop:2}}>
            <Typography> Paid Date </Typography>
     
            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.PaidDateFrom?dates.PaidDateFrom:null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          PaidDateFrom: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.PaidDateTo?dates.PaidDateTo:null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          PaidDateTo: newValue?formatDateToYYYYMMDD(newValue):"",
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
                <InputLabel fullWidth id="approverName">Approver Name</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownapprover}
                  onChange={(e)=>handleChangeDropDown(e,'approverName')}
                  input={<OutlinedInput label="Approver Name" />}
                  MenuProps={MenuProps}
                >
            {approversList?.data?.map((item) => {
  return (
                <MenuItem value={item?.approver}>
                  {item.approver}
                </MenuItem>
  )
  })}
                </Select>
              </FormControl>
                   </Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="Status">status</InputLabel>
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
                </Grid>
                <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="Status">Payment Status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownpaymentstatus}
                  onChange={(e)=>handleChangeDropDown(e,'paymentStatus')}
                  input={<OutlinedInput label="Payment Status" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="debited">Debited</MenuItem>
                    <MenuItem value="credited">Credited</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16,marginTop:3}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div>
   
    </Dialog>
    </>
    )
    
}
LoanSearchFilter.propTypes={
  filterSearch: PropTypes.any,
  filterData:PropTypes.any
}