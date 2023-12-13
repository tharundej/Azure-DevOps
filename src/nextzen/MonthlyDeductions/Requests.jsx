import { height } from '@mui/system';
import * as React from 'react';
import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deduction';
import Loans from './Loans/loans';
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
    "count":5,
    "page":0,
    "search":"",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":(user?.roleID)?user?.roleID:'',
    "records":"",
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
      const tabLabels = ["Loans" , "My Deductions"]
      const tabContents = [
        // <div><SalaryAdvace defaultPayload={SalarydefaultPayload} componentPage="MyRequests"/> </div>,
        <div> <Loans defaultPayload={loandefaultPayload} componentPage="MyRequests"/> </div>,
        <div><Deduction defaultPayload={deductiondefaultpayload} componentPage="MyRequests"/>  </div>,
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"none" }}/>
    </>
  );
}