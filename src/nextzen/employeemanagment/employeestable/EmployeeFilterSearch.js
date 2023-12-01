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
import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade} from 'src/nextzen/global/roledropdowns/RoleDropDown';



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

  const [userdropDownOptions,setUserDropDownOptions]=useState({})
  const [userdropDownvalue,setUserDropDownValue]=useState({})
  const [open,setOpen]=useState(false);
  const [openDateRange,setOpendateRange]=useState(false);


  useEffect(() => {
    if(open){
    const fetchLocations = async () => {
     
      try {
        const locations = await ApiHitLocations();
        const roles= await ApiHitRoles()
        const manager=await ApiHitManager()

        const arr={
          locationsOptions:locations,
         
          rolesOptions:roles,
          managerOptions:manager


        }
        setUserDropDownOptions(arr);

      
       
        setLocations(locations);     
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }
  }, [open]);

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
    joiningDateFrom:"",
    joiningDateTo:"",
    offerDateFrom:"",
    offerDateTo:"",
    fofferDateFrom:"",
    fofferDateTo:""
  })

  function formDateDataStructure(){

    return new Promise((resolve) => {
     

      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         if(dates[item?.from]!==undefined){
                arr1[item.field]={
                from:(dates[item?.from]),
                  to:(dates[item?.to] || "")
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
      console.log(data,userdropDownvalue,'for filterss')
      data.fPDesignation=userdropDownvalue?.desginationValue?.designationID.toString() || "";

      data.fPdepartmentName=userdropDownvalue?.departmentValue?.departmentID.toString() || "";
      

      data.fPDesignationGrade=userdropDownvalue?.desginationGradeValue?.desginationGradeID.toString() || "";
      data.fWorkingLocation=userdropDownvalue?.locationValue?.locationID.toString() || "";

      console.log(data,userdropDownvalue,'for filterss')

      
      
      
      filterData(data);
      // call parent function and pass it
      handleClickClose()
      
      
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
            <Grid md={8} xs={12} item>

            <TextField placeholder='Search....' 
            fullWidth
             onChange={e=>{handleSearch(e)}}

            />
            </Grid>

            <Grid md={4} xs={12} item>
          <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
           
      <Grid item>
      <Button 
      
        variant="contained" 
      onClick={()=>{handlicClickOnboardform()}}
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{margin:'20px',color:'white',backgroundColor:'#3B82F6'}}>Add Employee</Button>


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
     
      <Dialog
      fullWidth
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}

      >
        
        <DialogTitle sx={{textAlign:"start",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>

        <DialogContent sx={{mt:0,paddingBottom:0}}>

          

          <Grid>

         

               <Grid>


            <Typography>Joining Date</Typography>
     

            <Grid container direction="row" spacing={2}>
      {/* From Date */}
      <Grid item xs={12} md={12} lg={6}>
        
            <DatePicker
              sx={{ width: '100%', paddingLeft: '3px' }}
              label="From Date"
              
              value={dates?.fjoiningDateFrom ? dayjs(dates?.fjoiningDateFrom).toDate() : null}
              
              onChange={(date) => {
                setDates((prev) => ({
                  ...prev,
                 
                  fjoiningDateFrom: date ? dayjs(date).format('YYYY-MM-DD') : null
                }));
              }}
            />
         
      </Grid>

      {/* To Date */}
      <Grid item xs={12} md={12} lg={6}>
        
            <DatePicker
              sx={{ width: '100%', paddingLeft: '3px' }}
              label="To Date"
             
              value={dates?.fjoiningDateTo ? dayjs(dates?.fjoiningDateTo).toDate() : null}
              defaultValue={dayjs(new Date())}
              onChange={(date) => {
                setDates((prev) => ({
                  ...prev,
                 
                  fjoiningDateTo: date ? dayjs(date).format('YYYY-MM-DD') : null
                }));
              }}
            />
          
      </Grid>
          </Grid>
            </Grid>


           <Grid marginTop={2}>
              
            <Typography>DOB</Typography>
     

            <Grid container direction="row" spacing={2}>
      {/* From Date */}
      <Grid item xs={12} md={12} lg={6}>
        
            <DatePicker
              sx={{ width: '100%', paddingLeft: '3px' }}
              label="From Date"
              
              value={dates?.fDOBDateFrom ? dayjs(dates?.fDOBDateFrom).toDate() : null}
              defaultValue={dayjs(new Date())}
              onChange={(date) => {
                setDates((prev) => ({
                  ...prev,
                
                  fDOBDateFrom: date ? dayjs(date).format('YYYY-MM-DD') : null
                }));
              }}
            />
         
      </Grid>

      {/* To Date */}
      <Grid item xs={12} md={12} lg={6}>
       
            <DatePicker
              sx={{ width: '100%', paddingLeft: '3px' }}
              label="To Date"
            
              value={dates?.fDOBDateTo ? dayjs(dates?.fDOBDateTo).toDate() : null}
              defaultValue={dayjs(new Date())}
              onChange={(date) => {
                setDates((prev) => ({
                  ...prev,
                 
                  fDOBDateTo: date ? dayjs(date).format('YYYY-MM-DD') : null
                }));
              }}
            />
        
      </Grid>
    </Grid>

             
             </Grid>
             <Grid marginTop={2}>
              
            <Typography>Offer Date</Typography>
     

            <Grid container direction="row">
      {/* From Date */}
      <Grid item xs={12} md={12} lg={6}>
       
            <DatePicker
              sx={{ width: '100%', paddingLeft: '3px' }}
              label="From Date"
             
              value={dates?.fofferDateFrom ? dayjs(dates?.fofferDateFrom).toDate() : null}
              defaultValue={dayjs(new Date())}
              onChange={(date) => {
                setDates((prev) => ({
                  ...prev,
                  
                  fofferDateFrom: date ? dayjs(date).format('YYYY-MM-DD') : null
                }));
              }}
            />
        
      </Grid>

      {/* To Date */}
      <Grid item xs={12} md={12} lg={6}>
        
            <DatePicker
              sx={{ width: '100%', paddingLeft: '3px' }}
              label="To Date"
            
              value={dates?.fofferDateTo ? dayjs(dates?.fofferDateTo).toDate() : null}
              defaultValue={dayjs(new Date())}
              onChange={(date) => {
                setDates((prev) => ({
                  ...prev,
                 
                  fofferDateTo: date ? dayjs(date).format('YYYY-MM-DD') : null
                }));
              }}
            />
         
      </Grid>
    </Grid>

             
             </Grid>
            


                 {/* drop down options */}
                <Grid>


              

                <Grid>
                  
                  <Grid marginTop="10px" xs={12} md={12} lg={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">State</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-fPState"
                  id="demo-multiple-fPState"
                  multiple
                  value={state}
                  onChange={(e)=>handleChangeDropDown(e,'fPState')}
                  input={<OutlinedInput label="State" />}
                  MenuProps={MenuProps}
                >
                  {stateOptions.map((name) => (
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
                    
                   <Grid marginTop="10px" xs={12} md={12} lg={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="employment_type">Employement Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-fPEmployementType"
                  id="demo-multiple-fPEmployementType"
                  multiple
                  value={dropdownEmployemtType}
                  onChange={(e)=>handleChangeDropDown(e,'fPEmployementType')}
                  input={<OutlinedInput label="Employemt Type" />}
                  MenuProps={MenuProps}
                >
                  {EmployementTypeOptions.map((name) => (
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

                   <Grid marginTop="10px" xs={12} md={12} lg={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">Marital Status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownmartial}
                  onChange={(e)=>handleChangeDropDown(e,'fMaritalStatus')}
                  input={<OutlinedInput label="Marital Status" />}
                  MenuProps={MenuProps}
                >
                  {MaritalOptions.map((name) => (
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

                   {/* Blood Group */}
                   <Grid marginTop="10px" xs={12} md={12} lg={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">Blood Group</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-fBloodGroup"
                  id="demo-multiple-fBloodGroup"
                  multiple
                  value={bloodgroup}
                  onChange={(e)=>handleChangeDropDown(e,'fBloodGroup')}
                  input={<OutlinedInput label="Blood Group" />}
                  MenuProps={MenuProps}
                >
                  {BloodGroupOptions.map((name) => (
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
                   {/* State */}
                   <Grid marginTop="10px" xs={12} md={12} lg={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="status">State</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-fPState"
                  id="demo-multiple-fPState"
                  multiple
                  value={bloodgroup}
                  onChange={(e)=>handleChangeDropDown(e,'fPState')}
                  input={<OutlinedInput label="State" />}
                  MenuProps={MenuProps}
                >
                  {stateOptions.map((name) => (
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


                  

                     <Grid  >
              
                  <Grid item xs={12} md={12} lg={6} marginTop="10px">
              
                <Autocomplete
                  disablePortal
                  id="locationsOptions"
                  options={userdropDownOptions?.locationsOptions || []}
                  value={userdropDownvalue?.locationValue}
                  getOptionLabel={(option) => option?.locationName}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...userdropDownvalue };
                    newArr.locationValue=newvalue;
                    newArr.departmentValue=undefined;
                    newArr.desginationValue=undefined
                    newArr.desginationGradeValue=undefined
                    
                   
                   
                    try{
                      const deptObj={
                        companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                        locationID:newvalue?.locationID
                      }
                      const department=await ApiHitDepartment(deptObj);
                      var optionsArr={...userdropDownOptions};
                      optionsArr.departmentOptions=department;
                      optionsArr.desginationGradeOptions=[];
                      optionsArr.desginationOptions=[];
                      console.log(optionsArr,'optionsArroptionsArr')
                      setUserDropDownOptions(optionsArr)

                    }
                    catch(error){
                      
                    }

                   
                    
                    setUserDropDownValue(newArr)
                  }
                  
                }

                 
                  
                  renderInput={(params) => <TextField {...params} label="Location"
                  style={{  width: '100%' }} />}
                />
                      </Grid>
                     </Grid>
                    
                <Grid item xs={12} md={12} lg={6}  marginTop="10px">
                {/* {console.log(typeof userdropDownOptions?.departmentOptions,userdropDownOptions,'ppppp')} */}
                  <Autocomplete
                    disablePortal
                    id="departmentName"
                    options={userdropDownOptions?.departmentOptions || []}

                    value={userdropDownvalue?.departmentValue}

                    getOptionLabel={(option) => option.departmentName}
                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.departmentValue=newvalue;
                      newArr.desginationValue=undefined;
                      newArr.desginationGradeValue=undefined
                      
                      console.log(newArr)
                     
                      try{
                        const desgObj={
                          companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                          departmentID:newvalue?.departmentID
                        }
                        const desgination=await ApiHitDesgniation(desgObj);
                        var optionsArr={...userdropDownOptions};
                        optionsArr.desginationOptions=desgination;
                        optionsArr.desginationGradeOptions=[];
                        
                       
                        setUserDropDownOptions(optionsArr)

                      }
                      catch(error){
                        
                      }

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="Department"
                    style={{  width: '100%' }} />}
                  />
                </Grid>
                     

                     <Grid container >
                <Grid item xs={12} md={12} lg={6}  marginTop="10px">
                 
                  <Autocomplete
                    disablePortal
                    id="Desgination"
                    options={userdropDownOptions?.desginationOptions  || []}
                    value={userdropDownvalue?.desginationValue}
                    getOptionLabel={(option) => option.designationName}
                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.desginationValue=newvalue;
                    
                      newArr.desginationGradeValue=undefined
                      
                      console.log(newArr)
                     
                      try{
                        const desgGradeObj={
                          companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                          desginationID:newvalue?.desginationID
                        }
                        const desginationGrade=await ApiHitDesgniationGrade(desgGradeObj);
                        var optionsArr={...userdropDownOptions};
                        optionsArr.desginationGradeOptions=desdesginationGradegination;
                        
                        
                       
                        setUserDropDownOptions(optionsArr)

                      }
                      catch(error){
                        
                      }

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="Desgination"
                    style={{  width: '100%' }} />}
                  />
                </Grid>
                      </Grid>

                      <Grid container >
                <Grid item xs={12} md={12} lg={6}  marginTop="10px">
                
                  <Autocomplete
                    disablePortal
                    id="DesginationGrade"
                    options={userdropDownOptions?.desginationGradeOptions  || []}
                    value={userdropDownvalue?.desginationGradeValue}
                    getOptionLabel={(option) => option.designationGradeName}

                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.desginationGradeValue=newvalue;
                    
                    
                      
                    

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="DesginationGrade"
                    style={{ width: '100%' }} />}
                  />
                </Grid>
              </Grid>

              <Grid container >
                <Grid item xs={12} md={12} lg={6} marginTop="10px">
                
                  <Autocomplete
                    disablePortal
                    id="Role"
                    options={userdropDownOptions?.rolesOptions  || []}
                    value={userdropDownvalue?.roleValue}
                    getOptionLabel={(option) => option?.roleName}

                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.roleValue=newvalue;
                    
                    
                      
                    

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="Role"
                    style={{ width: '100%' }} />}
                  />
                </Grid>
              </Grid>


              <Grid container >
                <Grid item xs={12} md={12} lg={6} marginTop="10px">
                
                  <Autocomplete
                    disablePortal
                    id="manager"
                    options={userdropDownOptions?.managerOptions  || []}
                    value={userdropDownvalue?.managerValue}
                    getOptionLabel={(option) => option?.managerName}

                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.managerValue=newvalue;
                    
                    
                      
                    

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="Manager"
                    style={{  width: '100%' }} />}
                  />
                </Grid>
              </Grid>
                </Grid>
               </Grid>

               


           </Grid>
         </DialogContent>
         <Grid container flexDirection="row" alignItems='flex-end' justifyContent="flex-end" spacing={2} padding='10px'>
         <Button onClick={()=>{
          setDates({
            joiningDateFrom:"",
            joiningDateTo:"",
            offerDateFrom:"",
            offerDateTo:"",
            fofferDateFrom:"",
            fofferDateTo:""
          });


          
         }}>Reset</Button>
         <Button 
         sx={{backgroundColor:'#3B82F6',marginLeft:'5px'}}
         onClick={()=>{handleApply()}}>Apply</Button>
         
         </Grid>
   
    </Dialog>
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