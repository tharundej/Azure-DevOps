import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../Table/BasicTable';
import TimeForm from './TimeForm';
import ReusableTabs from '../tabs/ReusableTabs';
import './Time.css';
import AddTimeProject from './AddTimeProject';
import EditTimeProject from './EditTimeProject';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TimeProject() {
   
      const TABLE_HEAD = [

        {
    
          id: "",
    
          label: "Manager Id",
          minWidth: '7pc',
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
        { id: "managerName", label: "Project Manager", minWidth: '8pc', type: "text" },
    
        { id: "projectID", label: "Project Id", minWidth: '5pc', type: "text" },
    
        { id: "projectName", label: "Project Name",  minWidth: '8pc', type: "text" },
        { id: "employeesAssigned", label: "Employees Assigned",  minWidth: '5pc', type: "text" },
        { id: "startDate", label: "Start Date",  minWidth: '7pc', type: "text" },
    
        { id: "endDate", label: "End Date", minWidth: '7pc', type: "text" },
        { id: "dueDate", label: "Due Date",  minWidth: '7pc', type: "text" },
        { id: "status", label: "Status", width: 100, type: "text" },
        { id: "activityName", label: "Activity Name", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
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

      const handleDeleteAPICALL = async (rowdata,event)=>{
        console.log("iam here ")
        try{
          console.log(rowdata,"rowData:::::")
        const  data= {
          projectId: JSON.stringify( rowdata.projectID),
           
          };
          const response = await instance.post('deleteproject',data);
          // setReportingManagerData(response.data.list)
          console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
        }catch(error){
      console.error("Error", error);
      throw error;
        }
      }

      const [showEdit , setShowEdit] = useState(false)
      const [tableEDitData , SetTableEditData] = useState({})
      const handleEditClose = ()=> setShowEdit(false)
      const handleEditAPICALL = async (rowdata,event) => {
        console.log("🚀 ~ file: TimeProject.jsx:97 ~ handleEditAPICALL ~ rowdata:", rowdata)
        setShowEdit(true)
        SetTableEditData(rowdata)
        console.log("iam here ")
        try{
          console.log(rowdata,"rowData:::::")
        const  data= {
          projectId: JSON.stringify( rowdata.projectId),
           
          };
          const response = await instance.post('deleteproject',data);
          // setReportingManagerData(response.data.list)
          console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
        }catch(error){
      console.error("Error", error);
      throw error;
        }
      }
    

      const actions = [
    
        { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall", endpoint: '/approveLeave'},
    
        { name: "View", icon: "material-symbols-light:grid-view", id: "2", type: "serviceCall", endpoint: '/approveLeave'},
    
        { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "3", type: "serviceCall", endpoint: '/deleteproject'},
    
      ];
    
 
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
      } 
      

  const defaultPayload={
    "page": 1,
    "count": 10,
    "search": "",
    "externalFilters": {
        "startDate": "",
        "endDate": "",
        "projectName": "",
        "status": "",
        // "activityName": ""
    },
    "sort": {
        "key": 0,
        "orderBy": "project_id"
    }
}
      
  return (
    <>
      {showEdit && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showEdit}
 onClose={handleEditClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <EditTimeProject currentUser={{}}handleClose={handleEditClose} tableEDitData={tableEDitData} />
      </Dialog>
    )}
{/* <hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/> */}
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}>Add Project</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable

headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="TimeProjectFilter"
endpoint='/listProject'
bodyData='data'
onClickActions={onClickActions}
rowActions={actions}


/>  
    </>
  );
}