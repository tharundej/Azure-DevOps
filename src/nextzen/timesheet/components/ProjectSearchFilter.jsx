import react from 'react';
import * as Yup from 'yup';
import { useState,useEffect,useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog,Grid,Button,TextField,useMediaQuery,Chip,Stack,Card,DialogTitle,Typography,DialogContent,FormControl,InputLabel,MenuItem,Select,OutlinedInput, Autocomplete } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import FormProvider,{RHFAutocomplete,RHFSelect,RHFTextField} from '../../../../src/components/hook-form'
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import instance from 'src/api/BaseURL';
import { LoadingButton } from '@mui/lab';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import {useSnackbar} from '../../../components/snackbar';
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
const ProjectSearchFilter = ({filterSearch,filterData}) =>{
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showProject,setShowProject]=useState(false);
    const [showAssignEmployee,setShowAssignEmployee]=useState(false);
    const [showFilter,setShowFilter]=useState(false);
    const [datesData,setDatesData]=useState([])
    const [dropdown,setDropdown]=useState({})
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
      const handleApply = async()=>{
        setDatesData([]);
        const data = await formDateDataStructure();
        
        const data1=await formWithDropdown(data);
        filterData(data);
        setShowFilter(false);
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
        },1000)

const [reportingManager,setReportingManagerData]= useState([])
const [projectManager,setProjectManagers] = useState([])
const [selectedLocationID, setSelectedLocationID] = useState(null); 
const [employesListData,setEmployesListData]= useState([])
const [projectsList,setProjectsList] = useState([])
const [locationList,setLocationList] = useState([])
const [hasFetchedData, setHasFetchedData] = useState(false);
const [projectId,setProjectID]= useState()


const [datesUsed, setDatesUsed] = useState({
    startDate: '',
    endDate: '',
    actualStartDate:'',
    actualEndDate:''
  });
  const NewUserSchema = Yup.object().shape({
    projectName: Yup.string(),
    startDate: Yup.string(),
    endDate: Yup.string(),
    actualStartDate:Yup.string(),
    actualEndDate:Yup.string(),
    projectDescription:Yup.string(),
    status: Yup.string(),
   
   
  });
  const defaultValues = useMemo(
    () => ({
        projectName:'',
        startDate:'',
        endDate: '',
        status:'',
        actualStartDate:'',
        actualEndDate:'',
        projectDescription:''
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const {
    reset, 
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

const handleLocationSelection = (selectedOption) => {
  if (selectedOption) {
    setSelectedLocationID(selectedOption.locationID); 
  }
};
const projectManagersData= {
  companyId:'COMP1',
  locationId:'',
  roleId:6
};

const reportingManagersData={
  companyId:'COMP1',
  locationId:'',
  roleId:7
}
const getReportingManagers = async (requestData) => {
  try {
    const response = await axios.post('https://kz7mdxrb-3001.inc1.devtunnels.ms/erp/reportingManagers', requestData);
    return response.data.list;
  } catch (error) {
    throw error;
  }
}
const fetchReportingManagers = async () => {
  try {
    reportingManagersData.locationId = parseInt(selectedLocationID) || null;
    const reportingManagersData1 = await getReportingManagers(reportingManagersData);
    setReportingManagerData(reportingManagersData1)
    projectManagersData.locationId = parseInt(selectedLocationID) || null;
    const reportingManagersData2 = await getReportingManagers(projectManagersData);
    setProjectManagers(reportingManagersData2)
  } 
  catch (error) {
    console.error(error);
  }
};

const getLocation=()=>{
    const data={
      "companyID":"COMP1"
    }
     const config={
      method:'POST',
      maxBodyLength:Infinity,
      url:baseUrl + '/locationOnboardingDepartment',
      data:data
     }
     axios.request(config).then((response)=>{
      setLocationList(response?.data?.data)
     })
     .catch((error)=>{
      console.log(error)
     })
}

const getEmployeesList =()=>{
  const data ={
    "projectManager":"INFO22"
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    // url:'https://g3nshv81-3001.inc1.devtunnels.ms/erp/getEmployeesForProjectManager',
    url:baseUrl + '/getEmployeesForProjectManager',
    data:data
   }
   axios.request(config).then((response)=>{
    console.log(response,"responseee")
    setEmployesListData(response?.data?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}

const getProjectsList =()=>{
  const data ={
    "projectManager":"INFO22",
    "companyID":"COMP1",
    "locationID":30
}
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    // url:'https://g3nshv81-3001.inc1.devtunnels.ms/erp/getProjectsForProjectManager',
  url:baseUrl + '/getProjectsForProjectManager',
    data:data
   }
   axios.request(config).then((response)=>{
    console.log(response,"responseee")
    setProjectsList(response?.data?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}
const onSubmit = handleSubmit(async (data) => {
    try {
   
      data.endDate = datesUsed?.endDate;
      data.startDate = datesUsed?.startDate;
      data.actualStartDate=datesUsed?.actualStartDate;
      data.actualEndDate=datesUsed?.actualEndDate;
      data.projectManager=data?.projectManager?.employeeId;
      data.reportingManager= data?.reportingManager?.employeeId;
      data.locationId = selectedLocationID,
      data.companyId = "COMP1";
      const response = await axios.post('https://kz7mdxrb-3001.inc1.devtunnels.ms/erp/addProject', data).then(
        (successData) => {
          enqueueSnackbar(successData.data.message,{variant:'success'})
          handleClose()
          reset()
        },
        (error) => {
          enqueueSnackbar(error.data.message,{variant:'error'})
            reset()
          console.log('erro', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
});

const handleClose=()=>{
    setShowProject(false);
    setShowFilter(false);
    setShowAssignEmployee(false);
    // setProjectID();
    // setSelectedIds();
    setSelectedLocationID();
}
  
if (selectedLocationID !== null && !hasFetchedData) {
  fetchReportingManagers();
  setHasFetchedData(true); // Update the state to mark that data has been fetched
}

// const roleID = localStorage?.getItem('roleID')
const roleID = 5;
const [selectedIds, setSelectedIds] = useState([]);
const handleProject=(event)=>{
  console.log(event,"event")
    setProjectID(event.target.value)
}

const handleCancel = async()=>{
  setDropdownProjectManager([])
  setDropdownStatus([])
  setDropdownReportingManager([])
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

console.log(selectedIds,"selectedIDSSS")
useEffect(() => {
  if(showProject){
    getLocation()
  }
  if(showAssignEmployee){
    getProjectsList()
    getEmployeesList()
  }
}, [showProject, showAssignEmployee])

const AssignEmployees =()=>{   
  const data ={
    "projectID": projectId?.projectID,
    "employeeIDs": selectedIds,
    "projectName": projectId?.projectName
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl+'/assignEmpsToProjects',
    data:data
   }
   axios.request(config).then((response)=>{
    enqueueSnackbar(response?.data?.message,{variant:'success'})
   })
   .catch((error)=>{
    console.log(error)
    enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
  
   })
}



  return (
        <> 
{
    showFilter && (
        <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showFilter}
        PaperProps={{
          sx:{maxWidth:500,overflow:'auto'}
        }}
      >
        
        <DialogTitle sx={{paddingBottom:0,paddingTop:2}}>Filters
        {/* <Button onClick={()=>setShowFilter(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button> */}
        <CancelOutlinedIcon sx={{cursor:"pointer",float:'right'}} onClick={()=>setShowFilter(false)} />
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0,marginTop:2}}>
          
          <Grid container>
      <Grid container flexDirection="row">
            <Typography>Project Start Date</Typography>
            <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
       <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
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
                <Grid  md={6} xs={12}>
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
       </Grid>
       <Grid container flexDirection="row" sx={{marginTop:2}}>
       <Typography>Actual Start Date</Typography>
             <Grid container flexDirection="row">
             <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
       </Grid>
       <Grid container flexDirection="row" sx={{marginTop:2}}>
       <Typography>Actual End Date</Typography>
       <Grid container flexDirection="row">
              <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
       </Grid>
       <Grid container flexDirection="row" spacing={1}>
                  <Grid item marginTop="10px" xs={12} md={6}>
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
     
                  <Grid item marginTop="10px" xs={12} md={6}>
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
                <Grid container>
                  <Grid marginTop="10px" xs={12} md={12}>
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
                 <MenuItem value="notStarted">Status Started</MenuItem>
                 <MenuItem value="inProgress">InProgress</MenuItem>
                 <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16,marginTop:5}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} onClick={()=>{handleCancel()}} variant="outlined">Reset</Button></div>
    </Dialog>
    )
}
<Grid container alignItems="center" justifyContent="space-between" paddingBottom="10px">
  <Grid item xs={12} md={8}>
    <TextField
      placeholder="Search...."
      fullWidth
      onChange={(e) => {
        handleSearch(e);
      }}
    />
  </Grid>
  <Grid item xs={12} md={4} container justifyContent={isMobile ? "flex-start" : "flex-end"}>
    {(roleID==2)?<Button
      variant="contained"
      color="primary"
      className="button"
      onClick={()=>setShowProject(true)}
      sx={{ marginLeft: isMobile ? 1 : 0,marginTop:isMobile ? 1 : 0 }}
    >
      Add project
    </Button>:(roleID==5)?
    <Button   
    variant="contained"
    color="primary"
    className="button"
    onClick={()=>setShowAssignEmployee(true)}
    sx={{ marginLeft: isMobile ? 1 : 0,marginTop:isMobile ? 1 : 0.5 }}>
    Assign Employees
    </Button>:null}
    <Button onClick={()=>setShowFilter(true)}  sx={{ width:'80px',marginLeft:2,marginTop:1}}>
      <Iconify icon="mi:filter" /> Filters
    </Button>
  </Grid>
</Grid>

{
    showProject && (
     <Dialog
     onClose={handleClose}
     aria-labelledby="customized-dialog-title"
     open={showProject}
     PaperProps={{
        sx: { maxWidth: 770 , overflow:'auto'},
      }}
      >
      
          <FormProvider methods={methods} onSubmit={onSubmit}>
          <ModalHeader heading="Add Project"/>
          <Grid container spacing={2} sx={{marginTop:1}}>
            <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
               <Grid item md={6} xs={12}>
                  <RHFTextField name="projectName" label="Project Name" fullWidth/>
                </Grid>
                 <Grid item md={6} xs={12}>
                 <RHFAutocomplete
            name="locationId"
            label="Location"
            options={locationList}
            getOptionLabel={(option) => option.locationName}
            isOptionEqualtoValue={(option) => option.locationId}
            onChange={(event, selectedOption) => handleLocationSelection(selectedOption)}
            />  
                 </Grid>
              </Grid>
            
  <Grid container spacing={2} sx={{marginTop:1}}>
     <Grid item md={6} xs={12}>
     <RHFAutocomplete
            name="projectManager"
            label="Project Manager"
            options={projectManager}
            getOptionLabel={(option) => option.firstName}
            isOptionEqualtoValue={(option) => option.employeeId}
            />    
     </Grid>
     <Grid item md={6} xs={12}>
     <RHFAutocomplete
            name="reportingManager"
            label="Reporting Manager"
            options={reportingManager}
            getOptionLabel={(option) => option.firstName}
            isOptionEqualtoValue={(option) => option.employeeId}
            />
     </Grid>
  </Grid>
  <Grid container sx={{mt:1}}>
              <Grid md={12} xs={12} item>
                      <RHFTextField name="projectDescription" label="Project Description"/>
                  </Grid>
              </Grid>
  <Grid container spacing={2} >
  <Grid item md={6} xs={12}>
      
  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="Start date"
                        value={datesUsed?.startDate?dayjs(datesUsed?.startDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            startDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
                        label="End date"
                        value={datesUsed?.endDate?dayjs(datesUsed?.endDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            endDate: newValue?formatDateToYYYYMMDD(newValue):"",
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                             </Grid>
  </Grid>
  
  <Grid container spacing={2}>
  <Grid item md={6} xs={12}>
      
  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="Actual Start date"
                        value={datesUsed?.actualStartDate?dayjs(datesUsed?.actualStartDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            actualStartDate: newValue?formatDateToYYYYMMDD(newValue):"",
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
                        label="Actual End date"
                        value={datesUsed?.actualEndDate?dayjs(datesUsed?.actualEndDate):null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDatesUsed((prev) => ({
                            ...prev,
                            actualEndDate: newValue?formatDateToYYYYMMDD(newValue):"",
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                             </Grid>
  </Grid>
  
                <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                
                  <Button variant="outlined" onClick={handleClose} sx={{marginRight:1}}>Cancel</Button>
                  <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                  save Project
                  </LoadingButton>
                </Stack>
               </Card>
            </Grid>
          </Grid>
        </FormProvider>
     </Dialog>
    )
}


{
  showAssignEmployee && (
    <Dialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
     open={showAssignEmployee}
     PaperProps={{
        sx: { width: 770, overflow:'auto'},
      }}
      >
          <ModalHeader heading="Assign Employees"/>
        <Grid sx={{p:2,overflow: 'hidden'}}>
          {/* <Typography variant='subtitle2'>{projectId?'Project':'Select Project'}</Typography> */}
          <FormControl fullWidth sx={{marginBottom:2}}>
  <InputLabel>Project</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={projectId}
    label='Project'
    onChange={handleProject}
  >
     {projectsList.map((option) => (
            <MenuItem value={option}>
              {option.projectName}
            </MenuItem>
          ))}
  </Select>
 
  <Autocomplete
  sx={{ marginTop: 2 }}
  fullWidth
  multiple
  limitTags={2}
  id="multiple-limit-tags"
  options={employesListData && employesListData?.length ? employesListData : []}
  renderTags={(value, getTagProps) =>
    value.map((option, index) => (
      <Chip
        label={option.employeeName}
        {...getTagProps({ index })}
        style={{ backgroundColor: 'white', color: 'black' }}
      />
    ))
  }
  getOptionLabel={(option) => `${option?.employeeName}    (${option.employeeID})`}
  getOptionSelected={(option, value) => option.employeeID === value.employeeID}
  onChange={(event, newValue) => {
    setSelectedIds(newValue.map((option) => option.employeeID));
  }}
  value={employesListData?.filter((option) => selectedIds?.includes(option.employeeID))}
  renderInput={(params) => (
    <TextField {...params} label="Employees" placeholder="Employees" sx={{ maxHeight: 500 }} />
  )}
/>


</FormControl>

<Button sx={{float:'right'}} variant="contained" color="primary" onClick={AssignEmployees}>Assign</Button>
<Button sx={{float:'right',right:10}} variant="outlined" onClick={handleClose}>Cancel</Button>
      
        </Grid>
    </Dialog>
  )
}



        </>
    )
}
export default ProjectSearchFilter;