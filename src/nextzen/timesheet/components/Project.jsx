import React from 'react'
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { useState } from 'react';
import { Card,Grid,Typography ,Dialog,CardHeader,Box,Avatar,Stack,Button,IconButton} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useContext } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import UserContext from 'src/nextzen/context/user/UserConext';
import {useSnackbar} from 'src/components/snackbar';
import AddProject from './AddProject';
const Project = () => {

  const {user} = useContext(UserContext)
  const {enqueueSnackbar} = useSnackbar()
  const TABLE_HEAD = [

    { id: "projectID", label: "Project Id", minWidth: '6pc', type: "text" },
    { id: "projectManagerName", label: "Project Manager", minWidth: '9pc', type: "text" },
    { id: "reportingManagerName", label: "Reporting Manager", minWidth: '10pc', type: "text" },
    { id: "projectName", label: "Project Name", minWidth: '8pc', type: "text" },
    // { id: "employeesAssigned", label: "Assigned Employees Count", minWidth: '5pc', type: "text" },
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
          "dueDate": {
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

const actions = [
    
  { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall", endpoint: '/approveLeave'},

  { name: "View", icon: "material-symbols-light:grid-view", id: "2", type: "serviceCall", endpoint: '/approveLeave'},

  { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "3", type: "serviceCall", endpoint: '/deleteproject'},

];
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
      console.log(response,"responseee")
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
}
const [showAll, setShowAll] = useState(false);

const visibleItemsCount = 6

const visibleEmployees = showAll ? rowData?.employee : rowData?.employee.slice(0, visibleItemsCount);

  return (
    <>
    {viewProject?
    <Grid container sx={{marginTop:2}}>
        <Grid>
         <div style={{ display: 'flex' }}>
  <Iconify icon="ic:baseline-arrow-back"  onClick={()=>setViewProject(false)} style={{ marginRight: '8px' ,marginTop:27,cursor:'pointer'}} />
  <CardHeader title="Assigned Employees" />
</div>
      <Grid container spacing={3} sx={{ p: 3 }}>
      {visibleEmployees && visibleEmployees.length > 0 ? (
    visibleEmployees.map((employee, index) => (
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

        {!showAll && rowData?.employee.length > visibleItemsCount && (
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={() => setShowAll(true)}>
              View More
            </Button>
          </Grid>
        )}
      </Grid>
        </Grid>
      </Grid>
     :<BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="ProjectSearchFilter"
endpoint='/listProject'
bodyData='data'
onClickActions={onClickActions}
rowActions={actions}


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
   </>
  )
}

export default Project;