import react, { useContext } from 'react';
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
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
// import FormProvider,{RHFAutocomplete,RHFSelect,RHFTextField} from '../../../src/components/hook-form';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import instance from 'src/api/BaseURL';
import { LoadingButton } from '@mui/lab';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import {useSnackbar} from '../../../../components/snackbar';
// import AddProject from './AddProject';
import AddProjectTimeSheet from './AddProjectTimeSheet';
import UserContext from 'src/nextzen/context/user/UserConext';
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
const ProjectSearchTimeSheet = ({filterSearch,filterData,getTableData}) =>{
    const theme = useTheme();
    const {user} = useContext(UserContext)
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
        field:'startDate',
        from:'startDatefrom',
        to:'startDateto'
      },
      {
        field:'endDate',
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

const [employesListData,setEmployesListData]= useState([])
const [projectsList,setProjectsList] = useState([])
const [projectId,setProjectID]= useState()


const getEmployeesList =()=>{
  const data ={
    "companyID":user?.companyID
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
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
   
    "companyID":user?.companyID
}
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + '/getProjectsForProjectManager',
    data:data
   }
   axios.request(config).then((response)=>{
    setProjectsList(response?.data?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}

const handleClose=()=>{
    setShowProject(false);
    setShowFilter(false);
    setShowAssignEmployee(false);
}
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
useEffect(() => {
  
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
    getTableData()
    handleClose()
   })
   .catch((error)=>{
    console.log(error)
    enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    handleClose()
   })
}

const roleid  = user?.roleID
const [projectPermission,setProjectPermission]= useState(false);
const [assignPermission,setAssignPermission] = useState(false)
useEffect(()=>{
  const permission = user?.rolePermissions.timeSheetManagement
  if (
    permission &&
    permission.hasOwnProperty('mainHeading') &&
    permission.mainHeading &&
    permission['addProject']
  )
  {
    setProjectPermission(true)
  }
  if (
    permission &&
    permission.hasOwnProperty('mainHeading') &&
    permission.mainHeading &&
    permission['assignEmployees']
  )
  {
    setAssignPermission(true)
  }

},[user])

const handleSnackBar=()=>{
  enqueueSnackbar(`No Employees Assigned for ${user?.employeeID}`, { variant: 'warning', autoHideDuration: 5000,anchorOrigin:{vertical:'top',horizontal:'right'} })
  setShowAssignEmployee(false)
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
       {/* <Grid container flexDirection="row" spacing={1}>
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
      </Grid> */}
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
                 <MenuItem value="upcoming" key="upcoming">Upcoming</MenuItem>
                 <MenuItem value="ongoing" key="ongoing">Ongoing</MenuItem>
                 <MenuItem value="completed" key="completed">Completed</MenuItem>
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
  <Grid item xs={12} md={6}>
    <TextField
      placeholder="Search...."
      fullWidth
      onChange={(e) => {
        handleSearch(e);
      }}
      size="small"
    />
  </Grid>
  <Grid item xs={12} md={6} container justifyContent={isMobile ? "flex-start" : "flex-end"}>
   
   
    <Button
      variant="contained"
      size="small"
      color="primary"
      className="button"
      onClick={()=>setShowProject(true)}
      sx={{ marginRight:2,marginTop:1 }}
    >
      Add project
    </Button>
    
 
    <Button onClick={()=>setShowFilter(true)} size="small" sx={{ width:'80px',marginLeft:2,marginTop:1}}>
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
      <AddProjectTimeSheet handleClose={handleClose} title="Add Project" getTableData={getTableData}/>
     </Dialog>
    )
}






        </>
    )
}
export default ProjectSearchTimeSheet;