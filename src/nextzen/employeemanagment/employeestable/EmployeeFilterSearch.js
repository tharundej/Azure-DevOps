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


import formatDateToYYYYMMDD from '../../global/GetDateFormat';
import { paths } from 'src/routes/paths';

// import CustomDateRangePicker from '../global/CustomDateRangePicker';

import { useRouter } from 'src/routes/hooks';


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

export default function EmployeeFilterSearch({filterSearch,filterData}){

  const router=useRouter();
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
  const MaritalOptions = [
    'Marriaed',
    'Un Marriaed'

    
  ];
  const BloodGroupOptions = [
    'B+',
    'B-',
    "A",
    "O"

    
  ];
  const EmployementTypeOptions = [
   "Permanent",
   "Contract"

    
  ];
 




const [departmentNameOptions,setDepartmentNameOptions]=useState([])
const [designationOptions,setDesignationOptions]=useState([])
const [designationGradeOptions,setDesignationGradeOptions]=useState([])
const [stateOptions,setOptions]=useState([])
  const [WorkingLocationOptions,setWorkingLocationOptions]=useState([])

  const [dropdown,setDropdown]=useState({

  })

  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);

      
  const [dropdownEmployemtType,setDropdownEmployemtType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])
  
  const [dropdownmartial,setDropdownmartial]=useState([])
  const [bloodgroup,setDropdownbloodgroup]=useState([])

  const [departmentName,setDropdownDepartmentName]=useState([])
  const [designation,setDropdownDesignation]=useState([])
  
  const [designationGrade,setDropdownDesignationGrade]=useState([])

  const [state,setDropdownState]=useState([])
  
  const [workingLocation,setDropdownWorkingLocation]=useState([])

  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'fjoiningDate',
        from:'fjoiningDateFrom',
        to:'fjoiningDateTo'
      },
      {
        field:'fDOB',
        from:'fDOBDateFrom',
        to:'fDOBDateTo'
      },
      {
        field:'fofferDate',
        from:'fofferDateFrom',
        to:'fofferDateTo'
      }
    ]
  )

  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
     
      {
        field:'fMaritalStatus',
        options:[]
      },
      {
        field:'fPState',
        options:[]
      },
      {
        field:'fPEmployementType',
        options:[]
      },
      {
        field:'fPdepartmentName',
        options:[]
      },
      {
        field:'fPDesignation',
        options:[]
      },
      {
        field:'fPDesignationGrade',
        options:[]
      },
      {
        field:'fWorkingLocation',
        options:[]
      }
    ]
  )


  // const [datesSavedArray,setDatesSavedArray]=useState(["joining_date_from","joining_date_to","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])

  const [dates,setDates]=useState({
    joiningDateFrom:undefined,
    joiningDateTo:undefined,
    offerDateFrom:undefined,
    offerDateTo:undefined,
    fofferDateFrom:undefined,
    fofferDateTo:undefined
  })

  function formDateDataStructure(){

    return new Promise((resolve) => {
     

      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         if(dates[item?.from]!==undefined){
                arr1[item.field]={
                from:formatDateToYYYYMMDD(dates[item?.from]),
              to:formatDateToYYYYMMDD(dates[item?.to])
              }
       
           }

           else{


            arr1[item.field]={
              from:"",
            to:""
            }
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

  function formWithDropdown(data){

    return new Promise((resolve) => {
     

      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(', ');
          data[item.field]=commaSeparatedString;
        }
        else{
          data[item.field]='';
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


    const handleChangeDropDown = (event,field) => { 
      const {
        target: { value },
      } = event;
      
      if(field==="fPEmployementType"){
        setDropdownEmployemtType(value)
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
      
      else if(field==="fMaritalStatus"){
        setDropdownmartial(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fBloodGroup"){
        setDropdownbloodgroup(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fPState"){
        setDropdownState(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fPdepartmentName"){
        setDropdownDepartmentName(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fPDesignation"){
        setDropdownDesignation(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fPDesignationGrade"){
        setDropdownDesignationGrade(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fWorkingLocation"){
        setDropdownWorkingLocation(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      
  

      
    
    };

    const handleApply=async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);
      //console.log(data,';;;')
      filterData(data);
      // call parent function and pass it
      
      
    }

    const handleSearch=(e)=>{
      filterSearch(e?.target?.value)
    }

    const handlicClickOnboardform=()=>{
      router.push(paths.dashboard.employee.onboardform)
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
          <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
           
      <Grid item>
      <Button  variant="contained" onClick={()=>{handlicClickOnboardform()}}
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px'}}>Add Employee</Button>


      </Grid>
      <Grid item>
        <Stack  >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>
           
      </Button>


      </Stack>
             </Grid>
      </Grid>
      </Grid>
         </Grid>
     
      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        
        <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>

        <DialogContent sx={{ mt: 0, paddingBottom: 0 }}>
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Typography>Request Date</Typography>

      <Grid container flexDirection="row" sx={{ gap: '16px' }}>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%' }}
                label="From Date"
                value={dates?.requestDateStart}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) => {
                  setDates((prev) => ({
                    ...prev,
                    requestDateStart: newValue,
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
                sx={{ width: '100%' }}
                label="To Date"
                value={dates?.requestDateEnd}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) => {
                  setDates((prev) => ({
                    ...prev,
                    requestDateEnd: newValue,
                  }));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={6}>
      <Typography>Paid Date</Typography>

      <Grid container flexDirection="row" sx={{ gap: '16px' }}>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%' }}
                label="From Date"
                value={dates?.PaidDateFrom}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) => {
                  setDates((prev) => ({
                    ...prev,
                    PaidDateFrom: newValue,
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
                sx={{ width: '100%' }}
                label="To Date"
                value={dates?.PaidDateTo}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) => {
                  setDates((prev) => ({
                    ...prev,
                    PaidDateTo: newValue,
                  }));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  <Grid container spacing={2}>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="status">Requested Amount</InputLabel>
        <Select
          labelId="demo-multiple-name-status_1"
          id="demo-multiple-status_1"
          multiple
          value={dropdownProjectName}
          onChange={(e) => handleChangeDropDown(e, 'requestAmount')}
          input={<OutlinedInput label="Requested Amount" />}
          MenuProps={MenuProps}
          sx={{ width: '100%' }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="status">Paid Amount</InputLabel>
        <Select
          labelId="demo-multiple-name-status_2"
          id="demo-multiple-status_2"
          multiple
          value={dropdownActivity}
          onChange={(e) => handleChangeDropDown(e, 'paidAmount')}
          input={<OutlinedInput label="Paid Amount" />}
          MenuProps={MenuProps}
          sx={{ width: '100%' }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
</DialogContent>

         <Button onClick={()=>{handleApply()}}>Apply</Button>
   
    </BootstrapDialog>
    </>
    )
    
}

EmployeeFilterSearch.propTypes={
  filterSearch: PropTypes.any,
  filterData:PropTypes.any
    
}

// SearchFilter.propTypes={
//     filterOptions: PropTypes.arrayOf(
//         PropTypes.shape({
//           fieldName: PropTypes.string,
//           options: PropTypes.arrayOf(PropTypes.string)
//         })
//       ),
// }