import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback, useContext } from 'react';
import axios from 'axios';
import { minWidth, styled } from '@mui/system';
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
import  "./filtershift.css"
import UserContext from 'src/nextzen/context/user/UserConext';
import instance from 'src/api/BaseURL';
import CreateSwapRequest from './CreateSwapRequest';
const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
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
export default function SwapRequestSearchFilter({filterSearch,filterData,getTableData}){
  const theme = useTheme();
  const {user} = useContext(UserContext)
  const [leaveType,SetLeaveType]= useState();
  const [ShiftGroupName, setShiftGroupName]= useState([])
  const [ShiftName, setShiftName]= useState([])
  const[FilterShiftGroupName,setFilterShiftGroupName]=useState([])
  const[FilterShiftName,setFilterShiftName]=useState([])
  const[EmployeList,setEmployeList]=useState([])
  const[FilterEmploye,setFilterEmploye]=useState([])
  const [showRequesForm, setShowRequestForm] = useState  (false);
  
  const handleRequestClose = () => setShowRequestForm(false);


 
  const [dropdown,setDropdown]=useState({
// 
  })
  console.log("🚀 ~ file: SwapRequestSearchFilter.jsx:72 ~ SwapRequestSearchFilter ~ dropdown:", dropdown)
  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);
  const [dropdownLeaveType,setDropdownLeaveType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
      [
        {
          field:'requestDate',
          from:'applyDatefrom',
          to:'applyDateto'
        },
        {
          field:'startDate',
          from:'fromDatefrom',
          to:'fromDateto'
        },
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
        field:'employeeName',
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
    fromShiftGroup: "",  // Add default value for "fromShiftGroup"
  })

  const handleForm = ()=>{
    setShowRequestForm(true)
  }
  const getEmployeName = async (newvalue) => {
    try {
      const data = {
        companyId: (user?.companyID)?user?.companyID : '',
        supervisorId: (user?.employeeID)?user?.employeeID : '',
      };
      const response = await instance.post('/getEmployee', data);
      setEmployeList(response.data.data);
      console.log(
        '🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:',
        response.data.data
      );
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };
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
        employeeName: "",

        // leave_type_name: "",
      };
  
       dropdownFiledArray.forEach((item,index)=>{ 

         console.log(dropdown[item.field],"length finder")
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
          console.log("🚀 ~ file: SwapRequestSearchFilter.jsx:211 ~ dropdownFiledArray.forEach ~ data:", data)
        }
      
         
        })
        arr1.status = data.status;
        arr1.employeeName = data.employeeName;
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
      getEmployeName()
    }
    const handleClickClose=()=>{
      setOpen(false)
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
    const handleEmploye = (e,newvalue,field)=>{
      if(field==="employeeName" && Array.isArray(newvalue) && newvalue.length > 0){
        const employeeIds = newvalue.map(employee => employee.employeeId);
        setFilterEmploye(newvalue)
        const obj=dropdown;
        obj[field]=employeeIds;
        setDropdown(obj);
      }
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

    };
    const handleApply = async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);

      data.fromShiftGroup= FilterShiftGroupName?.shiftGroupName;
      data.toShiftGroup= FilterShiftName?.shiftGroupName;

      filterData(data);
      setOpen(false);
    }

    const handleCancel = async()=>{
      setDropdownStatus([]);
      setFilterShiftGroupName([]);
      setFilterShiftName([])
      setFilterEmploye([])
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
 <CreateSwapRequest currentUser={{}} handleClose={handleRequestClose} getTableData={getTableData} />
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
               {/* <Grid item>  
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}>Shift Swap</Button>
               </Grid> */}
               <Grid item  sx={{marginLeft:'4px'}}>  
               <Button variant='contained' color='primary' className="button" onClick={handleForm} startIcon={<Iconify icon="mingcute:add-line" />}>Request Swap</Button>
               </Grid>
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
            <Typography>Request Date</Typography>
     
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
             <Grid sx={{marginTop:2}}>

             <Typography>Start Date</Typography>
     
     <Grid container flexDirection="row" flexWrap="nowrap">
       <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
             className="datepiker-ui"
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
             className="datepiker-ui"
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
      {/* <Grid sx={{marginTop:2}}>

      <Typography>End Date</Typography>
     
     <Grid container flexDirection="row" flexWrap="nowrap">
       <Grid item>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DemoContainer components={['DatePicker']}>
             <DatePicker
             className="datepiker-ui"
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
             className="datepiker-ui"
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
               
                </Grid>
                <Grid>
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
                  renderInput={(params) => <TextField {...params} label="Select From Shift Group Name" />}
                />
                </Grid>
                <Grid marginTop='10px'>
         <Autocomplete
                  disablePortal
                  id="combo-box-demff33"
                  options={ShiftGroupName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FilterShiftName || ""}
                  getOptionLabel={(option) => option.shiftGroupName || ""}
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
                <Grid marginTop='10px' marginBottom="15px">
         <Autocomplete
                     multiple
                  disablePortal
                  id="combo-box-demff33"
                  options={EmployeList || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FilterEmploye || ""}
                  getOptionLabel={(option) => option.employeeName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftGroupName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleEmploye(e,newvalue,'employeeName')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select Employee" />}
                />
                </Grid>
               </Grid>
               <Grid container justifyContent="flex-end"  marginBottom={3} spacing={1} >
      {/* <Badge badgeContent={badgeContent} color="error"> */}
      <Button sx={{margin:"2px"}} variant="outlined" onClick={handleCancel}>
            Reset
          </Button>
      <Button variant='contained'  sx={{margin:"2px",backgroundColor:'#3B82F6'}} onClick={handleApply}>apply</Button>
      {/* </Badge> */}

      </Grid >
         </DialogContent>
       {/* <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Cancel</Button></div> */}
    </Dialog>
    </>
    )
    
}
SwapRequestSearchFilter.propTypes={
    filterSearch:PropTypes.any,
    filterData: PropTypes.any,
}