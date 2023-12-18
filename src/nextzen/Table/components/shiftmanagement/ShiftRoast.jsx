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

import EditShiftRoaster from './EditShiftRoaster';
import ShiftRoasterEmployeList from './ShiftRoasterEmployeList';
import { useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import { useSnackbar } from 'src/components/snackbar';// import ReusableTabs from '../tabs/ReusableTabs';
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
  const { enqueueSnackbar } = useSnackbar();
   const {user} = useContext(UserContext)
      const TABLE_HEAD = [

   
    
        
        { id: "shiftGroupName", label: "Shift Group Name", width: 180, type: "text" },
        
        
        { id: "shiftName", label: "Shift Name", width: 180, type: "text" },
        
        
        { id: "", label: "Employees", width: 180,eyeIcon:true, type: "text" },
        
        { id: "departmentName", label: "Department", width: 100, type: "text" },
        { id: "designationName", label: "Designation", width: 100, type: "text" },
        { id: "gradeName", label: "Grade", width: 220, type: "text" },
        // { id: "supervisor_name", label: "Supervisor Name", width: 100, type: "text" },
        
        // { id: "start_date", label: " Start Date", width: 100, type: "text" },
        // { id: "end_date", label: "End Date", width: 100, type: "text" },
        // { id: "status", label: "Status", width: 100, t ype: "badge" },
        // { id: '', width: 88 },
    
      ];
    
      const defaultPayload={
        "cid":(user?.companyID)?user?.companyID : '',
        "locationId": (user?.locationID)?user?.locationID : '',
        "search": "",
        "page": 1,
        "count": 5,
        "externalFilters": {
            "shiftName": "",
            "shiftGroupName":""
           
        },
        "sort": {
            "key": 1,
            "orderBy": ""
        }
    }
      const actions = [
    
        { name: "Edit", icon: "solar:pen-bold", id: "1", type: "serviceCall", endpoint: '/updateTimesheetStatus'},
        { name: "Delete", icon: "solar:trash-bin-trash-bold", id: "2", type: "serviceCall", endpoint: '/DeleteShiftRoaster'},
    

    
      ];
    
      const [employeListDialog,SetEmployeListDialog]=useState(false)
      const [roasterRowData,setRoasterRowData]=useState([])
      const closeEmployeList = ()=> SetEmployeListDialog(false)
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
          employee_shift_group_id:parseInt( rowdata?.shiftGroupId),
           
          };
          const response = await instance.post('/deleteShiftGroupById',data);
          // setReportingManagerData(response.data.list)
          console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
          enqueueSnackbar(response.message,{variant:'success'})
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
      const SecondoryTable = async (rowdata,event) => {
        console.log("🚀 ~ file: ShiftRoast.jsx:131 ~ SecondoryTable ~ rowdata:",rowdata)
       setRoasterRowData(rowdata.EmpList)
        SetEmployeListDialog(true)

      }
      const handleEditRowParent = async (rowdata,event) => {

   
        // alert("yes yes yes")
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
 <EditShiftRoaster currentUser={{}} handleClose={handleClose} editData={editData} />
      </Dialog>
    )}
 {employeListDialog && 
 <Dialog
 fullWidth
 maxWidth={false}
 open={employeListDialog}
 onClose={closeEmployeList}
 PaperProps={{
  sx:{maxWidth:770,overflow:"hidden"},
 }}
 className="custom-dialog"  
 >
<ShiftRoasterEmployeList onClose={closeEmployeList} roasterRowData={roasterRowData} />
 </Dialog>

 }


    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end",marginBottom:'10px ' }}>
  {/* <div>Content Here</div> */}
  {/* <Button className="button" onClick={handleTimeForm}> Add Employe To Shift</Button> */}
</Container>
    <BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
filterName="ShiftRoastFilter"
bodyData='data'
endpoint='/getAssignshift'
rowActions={actions}
onClickActions={onClickActions}
SecondoryTable={SecondoryTable}
handleEditRowParent={handleEditRowParent}
/>  
    </>
  );
}
 