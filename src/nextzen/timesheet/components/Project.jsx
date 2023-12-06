import React from 'react'
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { useState , useEffect} from 'react';
import { Card,Grid,Typography ,Chip,Dialog,CardHeader,Box,TextField,Avatar,Stack,Button,IconButton, DialogContent,Autocomplete, FormControl} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useContext } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import UserContext from 'src/nextzen/context/user/UserConext';
import {useSnackbar} from 'src/components/snackbar';
import AddProject from './AddProject';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
const Project = () => {

  const {user} = useContext(UserContext)
  const {enqueueSnackbar} = useSnackbar()
  const [count,setCount] = useState(0)
  const TABLE_HEAD = [

    { id: "projectID", label: "Project Id", minWidth: '6pc', type: "text" },
    { id: "projectManagerName", label: "Project Manager", minWidth: '9pc', type: "text" },
    { id: "reportingManagerName", label: "Reporting Manager", minWidth: '10pc', type: "text" },
    { id: "projectName", label: "Project Name", minWidth: '8pc', type: "text" },
    { id: "locationName", label: "Location", minWidth: '8pc', type: "text" },
    { id: "startDate", label: "Start Date", minWidth: '7pc', type: "text" },
    { id: "endDate", label: "End Date", minWidth: '7pc', type: "text" },
    { id: "actualStartDate", label: "Actual Start Date", minWidth: '10pc', type: "text" },
    { id: "actualEndDate", label: "Actual End Date", minWidth: '9pc', type: "text" },
    { id: "status", label: "Status", minWidth: 75, type: "text" },

  ];

  const defaultPayload={
      "page": 0,
      "count": 5,
      "search": "",
      "companyId":(user?.companyID)?user?.companyID:'',
      "roleId": (user?.roleID)?user?.roleID:'',
      "employeeId": (user?.roleID==1)?'':user?.employeeID,
      "externalFilters": {
          "startDate": {
              "fromDate": "",
              "toDate": ""
          },
          "endDate": {
              "fromDate": "",
              "toDate": ""
          },
          "createdDate": {
              "fromDate": "",
              "toDate": ""
          },
          "status": ""
      },
      "sort": {
          "orderBy": "",
          "key": 0
      }
}

const actualActions = [
    

  { name: "View", icon: "material-symbols-light:grid-view", id: "2", type: "serviceCall"},
  { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall"},
  { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "3", type: "serviceCall", endpoint: '/deleteproject'},

];
const defaultActions=[
  { name: "View", icon: "material-symbols-light:grid-view", id: "2", type: "serviceCall"},
]
const editActions=[
  { name: "View", icon: "material-symbols-light:grid-view", id: "2", type: "serviceCall"},
  { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall"},
]

const generateRowActions = () => {
  const userRoleID = user?.roleID; // Assuming roleID is available in user object
  const actions = (userRoleID==1)?actualActions:(userRoleID==6)?editActions:defaultActions
  return actions;
};

const actionsBasedOnRoles = generateRowActions();
const [viewProject,setViewProject]=useState(false)
const [editProject,setEditProject] = useState(false)
const [deleteData, setDeleteData] = useState(null);
const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
const [rowData,setRowData] = useState()
const onClickActions=(rowdata,event)=>{
  setRowData(rowdata)
  if(event?.name==="Edit")
  {
    setEditProject(true)
  }
  else if(event?.name==="View")
  {
    setViewProject(true)
  }
  else if(event?.name==="Delete"){
    const deleteData = {
      projectId:JSON.stringify(rowdata?.projectID)
    };
    setDeleteData(deleteData);
    setConfirmDeleteOpen(true);
    handleDeleteConfirmed();
  }
}
const handleCancelDelete = () => {
  setDeleteData(null);
  setConfirmDeleteOpen(false);
};
const handleDeleteConfirmed = async () => {
  if (deleteData) {
    const config={
      method:'POST',
      maxBodyLength:Infinity,
      url:baseUrl + '/deleteproject',
      data:deleteData
     }
     axios.request(config).then((response)=>{
      enqueueSnackbar(response?.data?.message,{variant:'success'})
      setCount(count+1)
    })
     .catch((error)=>{
      enqueueSnackbar(error?.response?.data?.message,{variant:'error'})
    
     })
    setDeleteData(null);
    setConfirmDeleteOpen(false);
  }
};

const handleClose =()=>{
  setEditProject(false)
  setCount(count+1)
  setViewProject(false)
}

const handleCloseEmployee=()=>{
  
  setEditEmployee(false)
}
const [showAll, setShowAll] = useState(false);

const visibleItemsCount = 6

const visibleEmployees = showAll ? rowData?.employees : rowData?.employees?.slice(0, visibleItemsCount);
let employeeIDs = [];
const [selectedIds, setSelectedIds] = useState([]);
useEffect(() => {
  if (rowData) {
    employeeIDs = rowData?.employees?.map(employees => employees.employeeId);
    setSelectedIds(employeeIDs || []);
  }
}, [rowData]);
const [editEmployee,setEditEmployee] = useState(false)
const [employesListData,setEmployesListData]= useState([])
const getEmployeesList =()=>{
  const data ={
    "projectManager":rowData?.projectManager
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + '/getEmployeesForProjectManager',
    data:data
   }
   axios.request(config).then((response)=>{
    setEmployesListData(response?.data?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}
const selectedEmployees = employesListData?.filter(option => selectedIds.includes(option.employeeID));
useEffect(()=>{
   getEmployeesList()
},[rowData])

const UpdateEmployees=()=>{
  const data ={
    projectID : rowData?.projectID,
    employeeIDs:selectedIds
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + '/updateEmployeesInProject',
    // url:`https://g3nshv81-3001.inc1.devtunnels.ms/erp/updateEmployeesInProject`,
    data:data
   }
   axios.request(config).then((response)=>{
    console.log(response,"Responsee")
    enqueueSnackbar(response?.data?.message,{variant:'success'})
    handleCloseEmployee()
   })
   .catch((error)=>{
    console.log(error,"error")
    enqueueSnackbar(error?.response?.data,{variant:'error'})
    handleCloseEmployee()
   })
}

  return (
    <>
    {viewProject?
    <Grid container sx={{marginTop:2}}>
       
        <Grid container flexDirection="row" sx={{ display: 'flex' }}>
   <Button onClick={handleClose} style={{ marginRight: '8px', marginTop: 27, cursor: 'pointer' }} >
   <Iconify icon="ic:baseline-arrow-back" />
    </Button>    
        <CardHeader title="Assigned Employees" />
          
       <Grid item sx={{ flexGrow: 1 }} /> 
       {/* {(user?.roleName==="Project Manager" || user?.roleName==="Reporting Manager")? */}
       <Button onClick={(e)=>setEditEmployee(true)}>Edit Employees</Button>
       {/* :null} */}
        </Grid>
     
      <Grid container spacing={3} sx={{ p: 3 }}>
      {visibleEmployees && visibleEmployees?.length > 0 ? (
    visibleEmployees?.map((employee, index) => (
          <Grid item xs={6} key={employee.employeeId}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={employee.employeeName}>{employee.employeeName.charAt(0)}</Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{employee.employeeName}</Typography>

                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                  }}
                >
                  ID: {employee.employeeId}
                </Typography>
              </Box>
            </Stack>
          </Grid>
    ))):
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          No employees are assigned.
        </Typography>
      </Grid>
    }

        {!showAll && rowData?.employees?.length > visibleItemsCount && (
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={() => setShowAll(true)}>
              View More
            </Button>
          </Grid>
        )}
      </Grid>
        </Grid>
     :<BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="ProjectSearchFilter"
endpoint='/listProject'
bodyData='data'
onClickActions={onClickActions}
rowActions={actionsBasedOnRoles}
count={count}

/> }

<ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
        itemName="Delete Project"
        message={`Are you sure you want to delete ${rowData?.projectName}?`}
      />
      {
        editProject && 
          <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={editProject}
          PaperProps={{
             sx: { maxWidth: 770 , overflow:'auto'},
           }}
           
           >
            <AddProject title="Edit Project" rowData={rowData} handleClose={handleClose}/>
            </Dialog>
      }

      {
        editEmployee && 
       
        <Dialog
        onClose={handleCloseEmployee}
        aria-labelledby="customized-dialog-title"
        open={editEmployee}
        PaperProps={{
           sx: { maxWidth: 770},
         }}
         >
          <ModalHeader heading="Edit Assigned Employees"/>
         <Grid container>
        <FormControl fullWidth sx={{margin:0.5}}>
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
  // value={selectedIds?.filter((option) => employesListData?.includes(option.employeeID))}\
  value={selectedEmployees}
  renderInput={(params) => (
    <TextField {...params} label="Employees" placeholder="Employees" sx={{ maxHeight: 500 }} />
  )}
/>
        </FormControl>  
      
        </Grid>
        <div style={{marginBottom:16,marginTop:5}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={UpdateEmployees}>Apply</Button>
         <Button sx={{float:'right',right:10}} onClick={handleCloseEmployee} variant="outlined">Cancel</Button>
       </div>
        </Dialog>
      }
   </>
  )
}

export default Project;