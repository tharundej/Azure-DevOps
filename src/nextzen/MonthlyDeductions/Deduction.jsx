import * as React from 'react';
import { _userList } from 'src/_mock';
import { useState, useCallback } from 'react';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../Table/BasicTable';
import {useSnackbar} from '../../components/snackbar';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';
export default function Deduction({defaultPayload,componentPage}) {
   const {enqueueSnackbar} = useSnackbar()
   const {user} = useContext(UserContext)
  const TABLE_HEAD = [
    {

      id: "employeeID",

      label: "Employee Id",
      minWidth:"8pc",
      type: "text",

    },

    { id: "employeeName", label: "Employee Name", minWidth: "9pc", type: "text" },

    { id:"deductionType", label: "Deduction Type", minWidth: "9pc", type: "text" },

    { id: "takenAmount", label: "Approved Loan Amount", minWidth: "12pc", type: "text" },

    { id: "noOfInstallments", label: "Installment", minWidth: "6pc", type: "text" },
    { id: "deductedDate", label: "Deducted Date", minWidth: "9pc", type: "date" },
    { id: "deductedAmount", label: "Deducted Amount", minWidth: "10pc", type: "text" },
    { id: "balanceAmount", label: "Balance Amount", minWidth: "9pc", type: "text" },
    { id: "comments", label: "HR Remarks", minWidth: "10pc", type: "text" }

  ];
const roleID = localStorage?.getItem('roleID')
const defaultPayloadValue=(defaultPayload)?defaultPayload:{
    "count":5,
    "page":0,
    "search":"",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":(user?.roleID)?user?.roleID:'',
    "records":"All Records",
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
return (
<>

<BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayloadValue}
endpoint='/getLoanDeductionDetailsHR'
bodyData='data'
filterName="DeductionFilter"
componentPage={componentPage}
/>  
</>
);
}