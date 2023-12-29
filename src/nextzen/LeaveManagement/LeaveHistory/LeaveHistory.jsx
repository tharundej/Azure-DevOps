
import { useState, useContext } from "react";
import { deleteEvent } from "src/api/calendar";
import UserContext from "src/nextzen/context/user/UserConext";
import { BasicTable } from "src/nextzen/Table/BasicTable";
import ConfirmationDialog from "src/components/Model/ConfirmationDialog";
import {useSnackbar} from 'src/components/snackbar';
export default function History(){
  const {user} = useContext(UserContext)
  const {enqueueSnackbar} = useSnackbar()
  const [confirmDeleteOpen,setConfirmDeleteOpen]=useState(false);
  const [deleteData,setDeleteData]=useState()
  const [count,setCount] = useState(0)
  const defaultPayload = {
          "employeeId":(user?.employeeID)?user?.employeeID:'',
          "search": "",
          "page": 0,
          "count": 10,
       "externalFilters":{
        "status":"",
        "leaveTypeName":"",
           "applyDate":{
               "from":"",
               "to":""
           },
    
           "fromDate":{
               "from":"",
               "to":"",
           },
           "toDate":{
                "from":"",
               "to":""
           }
          }
        }
        
      const [TABLE_HEAD,setTableHead] =useState( [
       
         
            {id : "leaveTypeName",label:"Leave Type",minWidth:"8pc",type:"text"},
            { id: "applyDate", label: "Apply Date",minWidth:"8pc", type: "date" },
            { id: "fromDate", label: "Start Date",minWidth:"8pc", type: "date" },
            {id: "toDate",label:"End Date",minWidth:"8pc",type:"date"},
            {id: "leaveDays",label:"Requested Duration",minWidth:"11pc",type:'text'},
            {id: "comments",label:"Leave Reason",minWidth:"8pc",type:"text"},
            {id:'loseOfPay',label:"Loss of Pay",minWidth:'7pc',type:"text"},
            {id:'approvedBy',label:"Approver",minWidth:'9pc',type:'text'},
            {id: 'status',label:'Status',minWidth:"5pc",type: "badge"}
       ]);

       const rowActions=[
        { name: "delete", id: "1", type: "serviceCall",icon:"charm:circle-tick"},
       ];

       const onClickActions=async (rowdata,event)=>{
        const deletePayload = {
          "leaveID":rowdata?.leaveId,
          "employeeID":rowdata?.employeeId
        }
        setDeleteData(deletePayload)
        setConfirmDeleteOpen(true);
        
       }  
      
       
       const handleDeleteConfirmed = async () => {
        if (deleteData) {
           try{
          const response = await deleteEvent(deleteData?.leaveID,deleteData?.employeeID,user)
          setCount(count+1)
          enqueueSnackbar(response.message,{variant:'success'})
        }
        catch(error){
          enqueueSnackbar(error.response.data.message,{variant:'error'})
        }
        setDeleteData(null);
        setConfirmDeleteOpen(false)
        }
      }
      const handleCancelDelete = () => {
            setDeleteData(null);
            setConfirmDeleteOpen(false);
      };

return (    
    <>
<BasicTable
 headerData={TABLE_HEAD} 
 endpoint="/getLeaveHistory"  
 defaultPayload={defaultPayload} 
 rowActions={rowActions}
 filterName="LeaveHistoryFilter"
  onClickActions={onClickActions}
  count={count}
 />
 
 <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
        itemName="Delete Request"
        confirmButtonText="Delete"
        message="Are you sure you want to Delete Leave?"
      />
  
   </>
)
   
}