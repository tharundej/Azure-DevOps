import { height } from '@mui/system';
import * as React from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deduction';
import Loans from './loans';
import SalaryAdvace from './SalaryAdvace';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';



export default function Requests() {
  const {user} = useContext(UserContext)
  const SalarydefaultPayload={
    "count": 5,
    "page": 0,
    "search": "",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":0,
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
      "paidAmount":""
    },
    "sort": {
      "key": 1,
      "orderBy": "sa_id"
    }
  }

  const loandefaultPayload ={
    "count": 5,
    "page": 0,
    "search": "",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":0,
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
    "count":5,
    "page":0,
    "search":"",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":0,
    "externalFilters":{
        "deductionType":"",
        "noOfInstallments":"",
        "deductedDate":{
            "from":"",
            "to":""
        }
    },
    "sort":{
        "key":1,
        "orderby":"deduction_id"
    }
}
      const tabLabels = ["Salary Requests" , "Loan Requests" , "My Deductions"]
      const tabContents = [
        <div><SalaryAdvace defaultPayload={SalarydefaultPayload} componentPage="MyRequests"/> </div>,
        <div> <Loans defaultPayload={loandefaultPayload} componentPage="MyRequests"/> </div>,
        <div><Deduction defaultPayload={deductiondefaultpayload} componentPage="MyRequests"/>  </div>,
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"none" }}/>
    </>
  );
}