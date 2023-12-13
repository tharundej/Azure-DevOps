
import { useState, useContext } from "react";
import UserContext from "src/nextzen/context/user/UserConext";
import { BasicTable } from "src/nextzen/Table/BasicTable";
export default function History(){
  const {user} = useContext(UserContext)
        const defaultPayload = {
          "employeeId":(user?.employeeID)?user?.employeeID:'',
          "search": "",
          "page": 0,
          "count": 5,
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
            { id: "applyDate", label: "Apply Date",minWidth:"7pc", type: "date" },
            { id: "fromDate", label: "Start Date",minWidth:"7pc", type: "date" },
            {id: "toDate",label:"End Date",minWidth:"7pc",type:"date"},
            {id: "leaveDays",label:"Requested Duration",minWidth:"11pc",type:'text'},
            {id: "comments",label:"Leave Reason",minWidth:"7pc",type:"text"},
            {id:'loseOfPay',label:"Loss of Pay",minWidth:'7pc',type:"text"},
            {id:'approvedBy',label:"Approver",minWidth:'9pc',type:'text'},
            {id: 'status',label:'Status',minWidth:"5pc",type: "badge"}
       ]);
return (    
    <>
<BasicTable
 headerData={TABLE_HEAD} 
 endpoint="/getLeaveHistory"  
 defaultPayload={defaultPayload} 
 rowActions={null}
 filterName="LeaveHistoryFilter"
 />
 
  
   </>
)
   
}