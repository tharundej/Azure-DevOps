import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback } from 'react';
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
import AddTimeProject from './AddTimeProject';
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
  
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function ProjectSearchFilter({filterData,filterSearch}){
  const theme = useTheme();
 
  const [dropdown,setDropdown]=useState({
  })
  const [showForm, setShowForm] = useState  (false);
  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [dropdownstatus,setDropdownStatus]=useState([])
  const [dropdownProjectmanager,setDropdownProjectManager]= useState([])
  const [dropdownReportingmanager,setDropdownReportingManager]= useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'ProjectStartDate',
        from:'startDatefrom',
        to:'startDateto'
      },
      {
        field:'ProjectEndDate',
        from:'endDatefrom',
        to:'endDateto'
      },
      {
        field:'actualStartDate',
        from:'actualStartfrom',
        to:'actualStartto'
      },
      {
        field:'actualEndDate',
        from:'actualEndfrom',
        to:'actualEndto'
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
        field:'reportingManager',
        options:[]
      },
      {
        field:'projectManager',
        options:[]
      }
    ]
  )
 
  const handleClose = () => setShowForm(false);
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
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    startDatefrom:null,
    startDateto:null,
    endDatefrom:null,
    endDateto:null,
    actualStartfrom:null,
    actualStartto:null,
    actualEndfrom:null,
    actualEndto:null
 
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
          const commaSeparatedString = arrayOfStrings.join(', ');
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
      else if(field==="projectManager"){
        setDropdownProjectManager(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="reportingManager"){
        setDropdownReportingManager(value)
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
    
    const handleTimeForm =()=>{
      setShowForm(true)
    } 
    const handleCancel = async()=>{
      setDropdownStatus([]);
      setDropdownReportingManager([]);
      setDropdownProjectManager([]);
      setDates({
    startDatefrom:"",
    startDateto:"",
    endDatefrom:"",
    endDateto:"",
    actualStartfrom:"",
    actualStartto:"",
    actualEndfrom:"",
    actualEndto:""
      })
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
 <AddTimeProject currentUser={{}}handleClose={handleClose} />
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
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}>Add Project</Button>
               </Grid>
               <Grid sx={{marginLeft:'4px'}}>
               <Button  onClick={handleClickOpen} sx={{width:"80px"}}>
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
            <Typography>Project Start Date</Typography>
            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.startDatefrom?dayjs(dates?.startDatefrom):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          startDatefrom: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.startDateto?dayjs(dates?.startDateto):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          startDateto: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
            </Grid>
       </Grid>
       <Grid container flexDirection="row" sx={{marginTop:2}}>
       <Typography>Project End Date</Typography>
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.endDatefrom?dayjs(dates?.endDatefrom):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          endDatefrom: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.endDateto?dayjs(dates?.endDateto):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          endDateto: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
       </Grid>
       <Grid container flexDirection="row" sx={{marginTop:2}}>
       <Typography>Actual Start Date</Typography>
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.actualStartfrom?dayjs(dates?.actualStartfrom):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          actualStartfrom: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.actualStartto?dayjs(dates?.actualStartto):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          actualStartto: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
       </Grid>
       <Grid container flexDirection="row" sx={{marginTop:2}}>
       <Typography>Actual End Date</Typography>
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.actualEndfrom?dayjs(dates?.actualEndfrom):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          actualEndfrom: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.actualEndto?dayjs(dates?.actualEndto):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          actualEndto: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
       </Grid>
       <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">Reporting Manager</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  value={dropdownReportingmanager}
                  multiple
                  onChange={(e)=>handleChangeDropDown(e,'reportingManager')}
                  input={<OutlinedInput label="Reporting Manager" />}
                  MenuProps={MenuProps}
                >
                 <MenuItem value="notStarted">Not Started</MenuItem>
                 <MenuItem value="inProgress">InProgress</MenuItem>
                 <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
      </Grid>
      <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">Project Manager</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownProjectmanager}
                  onChange={(e)=>handleChangeDropDown(e,'projectManager')}
                  input={<OutlinedInput label="Project Manager" />}
                  MenuProps={MenuProps}
                >
                 <MenuItem value="notStarted">Not Started</MenuItem>
                 <MenuItem value="inProgress">InProgress</MenuItem>
                 <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
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
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'status')}
                  input={<OutlinedInput label="status" />}
                  MenuProps={MenuProps}
                >
                 <MenuItem value="notStarted">Not Started</MenuItem>
                 <MenuItem value="inProgress">InProgress</MenuItem>
                 <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Reset</Button></div>
    </Dialog>
    </>
    )
    
}
ProjectSearchFilter.propTypes={
    filterData: PropTypes.func,
}
ProjectSearchFilter.propTypes={
  filterSearch: PropTypes.any,
}