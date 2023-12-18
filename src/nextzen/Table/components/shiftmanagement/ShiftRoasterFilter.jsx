import PropTypes, { element } from 'prop-types';

import React,{ useEffect, useState,useCallback,  } from 'react';
import { useContext } from 'react';

import { styled } from '@mui/system';

import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';

import {Card,TextField,InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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
import './ShiftFilter.css'

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';

import CustomDateRangePicker from 'src/nextzen/global/CustomDateRangePicker';
import AddEmployeShift from './AddeployeShift';
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

  
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ShiftRoasterFilter({filterData,filterOptions,filterSearch,getTableData}){
  const {user} = useContext(UserContext)
    const theme = useTheme();
    const names = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ];
  
    const [dropdown,setDropdown]=useState({
  
    })
    const [ShiftName,setShiftName]= useState([])
    const [ShiftGroupName,setShiftGroupName]= useState([])
    const[FilterShiftName,setFilterShiftName]=useState([])
    const[FilterShiftGroupName,setFilterShiftGroupName]=useState([])
useEffect(() => {
  getShiftName()
  getShiftGroupName()
}, [])

  
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
    const [search, setSearch]=useState("");
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
    const [dateError,setDataError]=useState("")
    const [filters,setFilters]=useState(defaultFilters)
    const [personName, setPersonName] = React.useState([]);
  
    const [dropdownEmployemtType,setDropdownEmployemtType]=useState([])
    const [dropdownshift_name,setDropdownStatus]=useState([])
    const [dropdownProjectName,setDropdownProjectName]=useState([])
    const [dropdownActivity,setdropdownActivity]=useState([])
    const [dropdownEmployeename,setdropdownEmployeename]=useState([])
  
    const [datesFiledArray,setDatesFiledArray]=useState(
      [
        {
          field:'date_activity',
          from:'from_date',
          to:'to_date'
        },
      
      ]
    )
  
    const [dropdownFiledArray,setDropdownFiledArray]=useState(
      [
        {
          field:'shiftName',
          options:[]
        },
        {
          field:'shiftGroupName',
          options:[]
        },

      ]
    )
  
     


    const [showForm, setShowForm] = useState  (false);
    const handleClose = () => setShowForm(false);
    const handleTimeForm =()=>{
      setShowForm(true)
      console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
    }

    const [datesSavedArray,setDatesSavedArray]=useState(["from_date","to_date","offer_date_from","offer_date_to"])
    const [datesData,setDatesData]=useState([])
  
    const [dates,setDates]=useState({
      from_date:null,
      to_date:null,
   
    })
  
    function formDateDataStructure(){
  
      return new Promise((resolve) => {
       
  
        const arr1={};
         datesFiledArray.forEach((item,index)=>{  
           
          arr1[item.field]={
            from:formatDateToYYYYMMDD(dates[item?.from]),
            to:formatDateToYYYYMMDD(dates[item?.to])
          }
          //  const obj={
          //    filed_name:item?.field,
          //    from:dates[item?.from],
          //    to:dates[item?.to]
          //  }  
          //  arr1.push(obj);
          })
          setDatesData(arr1);
          resolve(arr1)   
      })
      
  
    }
  
    function formWithDropdown(){
  
      return new Promise((resolve) => {
       
  
        const arr1={}
         dropdownFiledArray.forEach((item,index)=>{  
           
          if(dropdown[item.field]?.length>0){
            const arrayOfStrings = dropdown[item.field];
            console.log(arrayOfStrings,'arrayofstrings')
           // const commaSeparatedString = arrayOfStrings.join(', ');
            arr1[item.field]=arrayOfStrings;
          }
          
  
          //  const obj={
          //    filed_name:item?.field,
          //    from:dates[item?.from],
          //    to:dates[item?.to]
          //  }
          
           
          //  arr1.push(obj);
         
           
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
  
  
      const handleChangeDropDown = (event,newvalue,field) => {
        
        const {
          target: { value },
        } = event;
        
        if(field==="shiftName"){
          setFilterShiftName(newvalue)
          const obj=dropdown;
          obj[field]=newvalue?.shiftName;
          setDropdown(obj);
          console.log(newvalue?.shiftConfigurationId,'newvalue?.employeeShiftGroupId');

        }
        else if(field==="shiftGroupName"){
          setFilterShiftGroupName(newvalue)
          const obj=dropdown;
          obj[field]=newvalue?.shiftGroupName;
          setDropdown(obj);
        }

      
  
          // On autofill we get a stringified value.
          
        
          console.log(value);
       // console.log( typeof value === 'string' ? value.split(',') : value,)
      };
      const handleCancel = async()=>{
        setFilterShiftGroupName([])
        setFilterShiftName([])
        // setDropdownLeaveType([]);
      //   setDates({
      // applyDatefrom:"",
      // applyDateto:"",
      // fromDatefrom:"",
      // fromDateto:"",
      // toDatefrom:"",
      // toDateto:"",
      // shift_name: "",        
      // shift_term: "",  
      //   })
        setOpen(false);
      }
      const handleApply = async()=>{
        setDatesData([]);
       
        const data1=await formWithDropdown();
        filterData(data1);
        console.log(data1,';;;')
    
      //   filterData(data);
      handleClickClose()
        
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
 <AddEmployeShift currentUser={{}} handleClose={handleClose}  getTableData={getTableData}/>
      </Dialog>
    )}
 <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>
 
            <TextField placeholder='Search....'
            fullWidth
            onChange={e=>{handleSearch(e)}}
            size="small"
            />
            </Grid>
 
            <Grid md={4} xs={4} item>
               
                <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
               <Grid item>  
               <Button variant='contained' color='primary' className="button" onClick={handleTimeForm}  startIcon={<Iconify icon="mingcute:add-line" />}>Add Employee To Shift</Button>
               </Grid>
               <Grid sx={{marginLeft:'4px'}}>
               <Button onClick={handleClickOpen} sx={{width:"80px"}}>
               <Iconify icon="mi:filter"/>Filters
               </Button>
      </Grid>
 
                </Grid>
 
 
      </Grid>
         </Grid>
     
         <Dialog open={open} onClose={handleClickClose}  >
      <Grid container flex flexDirection={"row"}>
      <Grid item  xs={10}>
      <DialogTitle>Filters</DialogTitle>
      </Grid>
      <Grid fullWidth item sx={{alignSelf:"center"}} xs={2}> 
      <CancelOutlinedIcon sx={{cursor:"pointer"}} onClick={handleClickClose} />
      </Grid>
      </Grid>
        
        {/* <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}> Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle> */}
        <DialogContent sx={{padding:"0px"}} >


          



        <Grid  item xs={6} md={4} margin={3}>
          <Grid sx={{margin:"8px"}} >
          <Autocomplete
                  disablePortal
                  id="combo-box-dem33"
                  options={ShiftName || []}
                  // defaultValue={(foundShift?.length !== 0)? foundShift?.shiftConfigurationId : null }
                  value={FilterShiftName || ""}
                  getOptionLabel={(option) => option.shiftName || ""}
                  // onChange={(e, newvalue) => {
                  // setFilterShiftName(newvalue)
                  //   // getDesignation(newvalue)
                  // }}
                  onChange={(e,newvalue)=>handleChangeDropDown(e,newvalue,'shiftName')}

                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select Shift  Name" />}
                />
          </Grid>
          <Grid  sx={{margin:"8px"}}>
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
                  onChange={(e,newvalue)=>handleChangeDropDown(e,newvalue,'shiftGroupName')}
                  sx={{
                    width: { xs: '100%', sm: '70%', md: '100%', lg: '100%' },
                  }}
                  renderInput={(params) => <TextField {...params} label="Select Shift Group Name" />}
                />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end"  marginBottom={3} spacing={1} >
      {/* <Badge badgeContent={badgeContent} color="error"> */}
      <Button sx={{margin:"2px"}} variant="outlined" onClick={handleCancel}>
            Reset
          </Button>
      <Button variant='outlined' sx={{margin:"2px" , marginRight:"10px"}} onClick={handleApply}>apply</Button>
      {/* </Badge> */}

      </Grid >
         </DialogContent>
         {/* <div style={{marginBottom:16}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}}>Reset</Button></div> */}

    </Dialog>
    </>
    )
    
}

// ShiftRoasterFilter.propTypes={
//     handleFilters: PropTypes.any,
// }
ShiftRoasterFilter.propTypes={
    filterData: PropTypes.func,
    
}
ShiftRoasterFilter.propTypes={
  filterSearch: PropTypes.any,
}

ShiftRoasterFilter.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}