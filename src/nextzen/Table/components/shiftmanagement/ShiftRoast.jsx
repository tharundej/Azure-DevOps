import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState } from 'react';
import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../../BasicTable'; 
import AddEmployeShift from './AddeployeShift';
import instance from 'src/api/BaseURL';
import { enqueueSnackbar } from 'notistack';
import EditShiftRoaster from './EditShiftRoaster';

// import ReusableTabs from '../tabs/ReusableTabs';
// import './Time.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ShiftRoast() {
   
      const TABLE_HEAD = [

        {
    
          id: "",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        
        { id: "employee_id", label: "Employe Id", width: 180, type: "text" },
        
        { id: "employee_name", label: "Employe Name", width: 180, type: "text" },
        
        { id: "shift_name", label: "Shift Name", width: 180, type: "text" },
        
        
        { id: "start_time", label: "Start Time", width: 180, type: "text" },
        
        { id: "end_time", label: "End time", width: 100, type: "text" },
        { id: "shift_term", label: "Sift Term", width: 100, type: "text" },
        { id: "shift_group", label: "Shift Group", width: 220, type: "text" },
        { id: "supervisor_name", label: "Superior Name", width: 100, type: "text" },
        
        { id: "start_date", label: " Start Date", width: 100, type: "text" },
        { id: "end_date", label: "End Date", width: 100, type: "text" },
        { id: "status", label: "Status", width: 100, type: "badge" },
        // { id: '', width: 88 },
    
      ];
    
      const defaultPayload={
        "company_id":"COMP2",
        "page":0,
        "search":"ram",
        "externalFilters":{
          "shift_name":"",
          "shift_term":"",
          "shift_group":"",
          "supervisor_name":""
        },
        "count":6,
       "sort":{
          "key":0,
          "orderBy":""
        }
      }
    
      const actions = [
    
        { name: "Edit", icon: "hh", id: "1", type: "serviceCall", endpoint: '/updateTimesheetStatus'},
        { name: "Delete", icon: "hh", id: "2", type: "serviceCall", endpoint: '/DeleteShiftRoaster'},
    

    
      ];
    
 
      const [showEdit, setShowEdit] = useState  (false);
      const handleClose = () => setShowEdit(false);
      const [editData,setEditData]=useState({})
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }

      const onClickActions=(rowdata,event)=>{
        if(event?.name==="Edit"){
          handleEditAPICALL(rowdata,event)
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
          DeleteShiftRoaster: JSON.stringify( rowdata.project_id),
           
          };
          const response = await instance.post('DeleteShiftRoaster',data);
          // setReportingManagerData(response.data.list)
          console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
          enqueueSnackbar(response.data.Message,{variant:'success'})
        }catch(error){
      console.error("Error", error);
      enqueueSnackbar(error.Message,{variant:'Error'})

      throw error;
        }
      }
      const handleEditAPICALL = async (rowdata,event)=>{
        setShowEdit(true);
        setEditData(rowdata)
      }
  return (
    <>
      {showEdit && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showEdit}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <EditShiftRoaster currentUser={{}} onClose={handleClose} editData={editData} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}> Add Employe To Shift</Button> */}
</Container>
    <BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="ShiftRoastFilter"
bodyData='data'
endpoint='/ShiftRoaster'
rowActions={actions}
onClickActions={onClickActions}

/>  
    </>
  );
}
