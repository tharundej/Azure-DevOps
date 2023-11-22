import React from 'react'
import { BasicTable } from 'src/nextzen/Table/BasicTable';
const Project = () => {

  const TABLE_HEAD = [

    {

      id: "projectId",

      label: "Project Id",
      minWidth: '5pc',

      type: "text",

    },
    { id: "projectManager", label: "Project Manager", minWidth: '7pc', type: "text" },
    { id: "reportingManager", label: "Reporting Manager", minWidth: '7pc', type: "text" },

    { id: "projectName", label: "Project Name",  minWidth: '8pc', type: "text" },
    { id: "employeesAssigned", label: "Employees Assigned",  minWidth: '5pc', type: "text" },
    { id: "startDate", label: "Start Date",  minWidth: '7pc', type: "text" },

    { id: "endDate", label: "End Date", minWidth: '6pc', type: "text" },
    { id: "actualstartDate", label: "Actual Start Date",  minWidth: '6pc', type: "text" },
    { id: "actualendDate", label: "Actual End Date",  minWidth: '6pc', type: "text" },
    { id: "status", label: "Status", width: 100, type: "text" },

    // { id: '', width: 88 },

  ];

  const defaultPayload={
    "page": 0,
    "count": 5,
    "search": "",
    "externalFilters": {
        "startDate": "",
        "endDate": "",
        "status": "",
    },
    "sort": {
        "key": 0,
        "orderBy": "project_id"
    }
}

const actions = [
    
  { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall", endpoint: '/approveLeave'},

  { name: "View", icon: "material-symbols-light:grid-view", id: "2", type: "serviceCall", endpoint: '/approveLeave'},

  { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "3", type: "serviceCall", endpoint: '/deleteproject'},

];

const onClickActions=(rowdata,event)=>{
  if(event?.name==="Edit"){
    handleEditAPICALL(rowdata,event)
  }
  else if(event?.name==="view"){
    handleViewAPICALL(rowdata,event)
  }
  else if(event?.name==="Delete"){
    handleDeleteAPICALL(rowdata,event)
  }
}

  return (
    <>
     <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="ProjectSearchFilter"
endpoint='/listProject'
bodyData='data'
onClickActions={onClickActions}
rowActions={actions}


/>  
      
   </>
  )
}

export default Project;