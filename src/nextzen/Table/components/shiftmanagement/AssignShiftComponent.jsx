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
import AssignShift from './AssignShift';
import EditShiftRoaster from './EditShiftRoaster';
import { enqueueSnackbar } from 'notistack';
import UserContext from 'src/nextzen/context/user/UserConext';

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

export default function AssignShiftComponent() {
  const {user} = React.useContext(UserContext)
   
      const TABLE_HEAD = [

        {
    
          id: "",
    
          label: " SL_NO",
    
          type: "text",
    
          containesAvatar: false,
    
     
    
          secondaryText: "text",
    
        },
    
        { id: "shift_name", label: "Shift Name", width: 180, type: "text" },
    
        { id: "shift_group_name", label: "Shift Group Name", width: 220, type: "text" },
    
        { id: "start_time", label: "Start Time", width: 180, type: "text" },
    
        { id: "end_time", label: "End time", width: 100, type: "text" },
        { id: "start_date", label: "Start Date", width: 100, type: "text" },
        { id: "end_date", label: "End Date", width: 100, type: "text" },
        { id: "shift_term", label: "Sift Term", width: 100, type: "text" },
    
        // { id: '', width: 88 },
    
      ];
      const [showEdit, setShowEdit] = useState  (false);
      const handleClose = () => setShowEdit(false);
      const [editData,setEditData]=useState({})

      
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
    
      const actions = [
    
        { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall", endpoint: '/approveLeave'},    
        { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "2", type: "serviceCall", endpoint: '/deleteproject'},
    
      ];
    
      const defaultPayload ={
        "cid": (user?.companyID)?user?.companyID : '',
        "locationId": (user?.locationID)?user?.locationID : '',
        "search": "",
        "page": 1,
        "count": 10,
        "externalFilters": {
            "shiftName": "",
            "shiftTerm": "",
            "startDate": {
                "from": "",
                "to": ""
            },
            "endDate": {
                "from": "",
                "to": ""
            }
        },
        "sort": {
           "key": 1,
            "orderBy": ""
        }
    }
      const [showForm, setShowForm] = useState  (false);
      // const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    
  return (
    <>
      {showEdit && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={open}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 770 , overflow:'hidden'},
 }}
 className="custom-dialog"  
>
 <EditShiftRoaster currentUser={{}} editData={editData}  onClose={handleClose} />
      </Dialog>
    )}

    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}>Assign Shift</Button> */}
{/* <Button className="button">Filter</Button>
<Button className="button">Report</Button> */}
</Container>
    <BasicTable

headerData={TABLE_HEAD}
endpoint="/getAssignshift"
bodyData='data'
defaultPayload={defaultPayload}

filterName='AssignShiftFilter'
rowActions={actions}
onClickActions={onClickActions}

/>  
    </>
  );
}