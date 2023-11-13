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
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "project_id", label: "Project Id", width: 180, type: "text" },
    
        { id: "project_name", label: "Project Name", width: 220, type: "text" },
    
        { id: "start_date", label: "Start Date", width: 180, type: "text" },
    
        { id: "end_date", label: "End Date", width: 100, type: "text" },
        { id: "due_date", label: "Due Date", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "text" },
        { id: "activity_name", label: "Activity Name", width: 100, type: "text" },
    
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
          project_id: JSON.stringify( rowdata.project_id),
           
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
    
        { name: "Edit", icon: "hh", id: "1", type: "serviceCall", endpoint: '/approveLeave'},
    
        { name: "view", icon: "hh", id: "1", type: "serviceCall", endpoint: '/approveLeave'},
    
        { name: "Delete", icon: "hh", id: "1", type: "serviceCall", endpoint: '/deleteproject'},
    
      ];
    
      const bodyContent = [
    
        {
    
          SL_NO: "1",
    
          project_id: "Aswin!23",
    
          project_name: "BellErp",
    
          start_date: "12/12/2023",
    
          end_date: "Coding",
    
          due_date: "2hour 40minutes",

          activity_name: "122hour 40minutes",

          status: "Approved",
         
    
        },
    
      ];
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      } 
      
    
      const[tableData,SetTableData] = useState({})
      console.log("🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:", tableData)

  const defaultPayload={
    "page": 1,

    "count": 10,

    "search": "",

    "externalFilters": {

        "start_date": "",

        "end_date": "",

        "project_name": "",

        "status": "",

        "activity_name": ""

    },

    "sort": {

        "key": 0,

        "orderBy": "project_id"

    }
  }
      
  return (
    <>
      {/* {showForm && (
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
 <AddTimeProject currentUser={{}}handleClose={handleClose} />
      </Dialog>
    )} */}
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