import React from 'react'
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { useState } from 'react';
import { Card,Grid,Typography ,CardHeader,Box,Avatar,Stack,Button,IconButton} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
const Project = () => {

  const TABLE_HEAD = [

    { id: "projectID", label: "Project Id", minWidth: '5pc', type: "text" },
    { id: "projectManagerName", label: "Project Manager", minWidth: '7pc', type: "text" },
    { id: "reportingManagerName", label: "Reporting Manager", minWidth: '7pc', type: "text" },
    { id: "projectName", label: "Project Name", minWidth: '8pc', type: "text" },
    // { id: "employeesAssigned", label: "Assigned Employees Count", minWidth: '5pc', type: "text" },
    { id: "startDate", label: "Start Date", minWidth: '7pc', type: "text" },
    { id: "endDate", label: "End Date", minWidth: '6pc', type: "text" },
    { id: "actualStartDate", label: "Actual Start Date", minWidth: '6pc', type: "text" },
    { id: "actualEndDate", label: "Actual End Date", minWidth: '6pc', type: "text" },
    { id: "status", label: "Status", width: 100, type: "text" },

  ];

  const defaultPayload={
      "page": 0,
      "count": 5,
      "search": "",
      "companyId":"COMP1",
      "roleId": 1,
      "employeeId": "",
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
const [rowData,setRowData] = useState()
const onClickActions=(rowdata,event)=>{
  if(event?.name==="Edit"){
    handleEditAPICALL(rowdata,event)
  }
  else if(event?.name==="View")
  {
    setViewProject(true)
    setRowData(rowdata)
  
  }
  else if(event?.name==="Delete"){
    handleDeleteAPICALL(rowdata,event)
  }
}
const [showAll, setShowAll] = useState(false);
const visibleItemsCount = 6

const visibleEmployees = showAll ? rowData?.employee : rowData?.employee.slice(0, visibleItemsCount);

  return (
    <>
    {viewProject?
    <Grid container sx={{marginTop:2}}>
      {/* <Grid xs={12} md={6} lg={6}>
        <Card>
          <CardHeader title="Project Details"/>
            <Stack spacing={3} sx={{p:3}}>
           <Box sx={{ flexGrow: 1 }}>
           Project Name<Typography variant="subtitle2">{rowData?.projectName}</Typography>
           </Box>
            </Stack>
          
        </Card>
      </Grid> */}
        <Grid>
          {/* <Iconify icon="solar:pen-bold"/> */}
         <CardHeader title="Assigned Employees" />
      <Grid container spacing={3} sx={{ p: 3 }}>
        {visibleEmployees.map((employee, index) => (
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
        ))}

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
      
   </>
  )
}

export default Project;