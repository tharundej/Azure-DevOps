import { BasicTable } from "src/nextzen/Table/BasicTable";
import AdditionAddEdit from "./AdditionAddEdit";
export default function Additions(){
    const TABLE_HEAD = [
        { id: "expenseClaimId", label: "Expense Claim ID", minWidth: "7pc", type: "text" },
        { id: "claimType", label: "Claim Type", minWidth: "7pc", type: "text" },
        { id: "claimDate", label: "Claim Date", minWidth: "8pc", type: "text" },
        { id: "currency", label: "Currency", minWidth: "7pc", type: "text" },
        { id: "claimAmount", label: "Claim Amount", minWidth: "9pc", type: "text" },
      
        // { id: '', width: 88 },
      ]
      const actions = [
        { name: "Edit", icon: "solar:pen-bold", id: 'edit', type: "edit", },
        { name: "Delete", icon: "solar:trash-bin-trash-bold", path: "jjj", type: "delete" },
        // { name: "Delete", icon: "hh", id: 'delete' },
      ];
      const managerID = localStorage.getItem('reportingManagerID');
  const employeeID = localStorage.getItem('employeeID');
  const companyID = localStorage.getItem('companyID');
      const defaultPayload = {
        "companyId": companyID,
        "employeeId": employeeID,
        "page": 0,
        "count": 5,
        "search": "",
        "externalFilters": {
          "claimStartDate": "",
          "claimEndDate": "",
          "status": "",
          "claimType": ""
        },
        "sort": {
          "key": 1,
          "orderBy": ""
    
        }
    
    
      }
      const onclickActions = async (rowData, eventData) => {
        await getProjectName(claimTypePayLoad);
        console.log(rowData, eventData, "CompoffAprrove from to basic table")
        if (rowData && eventData) {
    
          console.log(rowData, claimTypeOptions, 'rowDatarowData')
          // hit api for options return the resposnse.data.data
          // const arr= await ApiHitClaimTypeOptions()
          // getProjectName(claimTypePayLoad);
          const updatedRowData = {
            ...rowData,
            companyId: companyID,
            employeeId: employeeID,
            claimType: { expenseConfigurationId: rowData?.expenseConfigurationId, expenseName: rowData?.claimType },
          };
    
          console.log("updatedRowData", updatedRowData)
          setEditData(updatedRowData);
    
          if (eventData?.type === 'edit') {
    
            handleOpenEdit()
            console.log("kl")
    
          }
          else if (eventData?.type === 'delete') {
            console.log("delete")
            setDel(prevState => ({
              ...prevState,
              expenseClaimId: rowData?.expenseClaimId
              ,
            }));
            setConfirmDeleteOpen(true);
            // handle(del);
            // handle({...del, ...{
            //  expenseClaimId:rowData?.expenseClaimId
            // ,}});
    
    
          }
    
    
          else {
    
    
          }
        }
    
    
        else {
          // navigate[event.eventData.route]
    
        }
      }
    return (
        <>
      {/* <AdditionAddEdit/> */}

        <BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 rowActions={actions}

 endpoint="/GetMyClaims"
 bodyData='data'
 filterName="AdditionsFilterSearch"
 onClickActions={onclickActions}
 />
        </>
    )
}