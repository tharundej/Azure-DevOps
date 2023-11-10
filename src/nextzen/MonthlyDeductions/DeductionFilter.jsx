import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import {Card,TextField,InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,Dialog,DialogTitle,MenuItem,FormControl,Select,
   DialogActions,Typography,InputLabel} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Today } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import formatDateToYYYYMMDD from '../global/GetDateFormat';
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
export default function DeductionFilter({filterSearch,filterData}){
  const theme = useTheme();
  
  const [dropdown,setDropdown]=useState({
  })

  const [dropdowndeductiontype,setdropdowndeductiontype]=useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'requestDate',
        from:'deductedDateStart',
        to:'deductedDateEnd'
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
        field:'deductiontype',
        options:[]
      },
     
    ]
  )
  const [datesSavedArray,setDatesSavedArray]=useState(["deductedDateStart","deductedDateEnd","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    deductedDateStart:"",
    deductedDateEnd:"",
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
        resolve(arr1)
        
    })
    
  }
  
    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
    }
    const handleClickClose=()=>{
      setOpen(false)
    }
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      
       if(field==="deductiontype"){
        setdropdowndeductiontype(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
     
    };
    const handleApply = async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      
      const data1=await formWithDropdown(data);
    //   filterData(data);
      console.log(data,"filtereddata")
    // handleClickClose()
      
    }
      const handleSearch=(e)=>{
        filterSearch(e?.target?.value)
      }
  
      const handleCancel = async()=>{
        setdropdowndeductiontype([]);
        setDates({
          deductedDateStart:"",
          deductedDateEnd:"",
          PaidDateFrom:"",
          PaidDateTo:""
        })
        setOpen(false);
      }

      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
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
<DialogContent>
    Add Deduction
</DialogContent>
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
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}>Add Deduction</Button>
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
            <Typography>Deducted Date </Typography>
                <Grid>
            <Grid container flexDirection="row">
              <Grid item >
             <LocalizationProvider dateAdapter={AdapterDayjs} sx={{minWidth:"20pc"}}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.deductedDateStart?dayjs(dates.deductedDateStart):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          deductedDateStart: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.deductedDateEnd? dayjs(dates.deductedDateEnd):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          deductedDateEnd: newValue?formatDateToYYYYMMDD(newValue):"",
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
                <InputLabel fullWidth id="Status">Deduction Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdowndeductiontype}
                  onChange={(e)=>handleChangeDropDown(e,'deductiontype')}
                  input={<OutlinedInput label="Deduction Type" />}
                  MenuProps={MenuProps}
                >
                 
                 <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="loan">Loan</MenuItem>
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
DeductionFilter.propTypes={
  filterSearch: PropTypes.any,
  filterData:PropTypes.any
}
