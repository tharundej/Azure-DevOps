import { height } from '@mui/system';
import * as React from 'react';
import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deductions/Deduction';
import Loans from './Loans/loans';
import SalaryAdvace from './SalaryAdvace';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';
import Additions from './Additions/Additions';

export default function Requests() {
  const {user} = useContext(UserContext)
  const loandefaultPayload ={
    "count": 5,
    "page": 0,
    "search": "",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":(user?.roleID)?user?.roleID:'',
    "records":"",
    "externalFilters": {
  "requestDate": {
   
  "from": "",
   
  "to": ""
   
  },
   
  "paidDate": {
   
  "from": "",
   
  "to": ""
   
  },
   
  
      "status": "",
      "requestAmount":"",
      "paidAmount":"",
      "approverName":"",
      "interestRate" : ""
    },
    "sort": {
      "key":1,
      "orderBy": "loan_id"
    }
  }
  const deductiondefaultpayload={
   "employeeID":user?.employeeID
}

const additionDefaultPayload={
  "employeeID": user?.employeeID,
  "companyID":user?.companyID
}
      const tabLabels = ["Loans" ,"Additions", "My Deductions"]
      const tabContents = [
        <div> <Loans defaultPayload={loandefaultPayload} componentPage="MyRequests"/> </div>,
        <div><Additions defaultPayload={additionDefaultPayload} componentPage="MyRequests"/></div>,
        <div><Deduction defaultPayload={deductiondefaultpayload} componentPage="MyRequests"/>  </div>,
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"none" }}/>
    </>
  );
}