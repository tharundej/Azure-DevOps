import * as React from 'react';
import { _userList } from 'src/_mock';
import { useState, useCallback } from 'react';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../Table/BasicTable';
import {useSnackbar} from '../../components/snackbar';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';
export default function Deduction() {
   const {enqueueSnackbar} = useSnackbar()
   const {user} = useContext(UserContext)
  const TABLE_HEAD = [
    {

      id: "employeeID",

      label: "Employee Id",
      minWidth:"8pc",
      type: "text",

    },

    { id: "employeeName", label: "Employee Name", minWidth: "10pc", type: "text" },

    { id:"deductionType", label: "Deduction Type", minWidth: "8pc", type: "text" },

    { id: "takenAmount", label: "Taken Amount", minWidth: "7pc", type: "text" },

    { id: "noOfInstallments", label: "Installment No", minWidth: "7pc", type: "text" },
    { id: "deductedDate", label: "Deducted Date", minWidth: "8pc", type: "text" },
    { id: "deductedAmount", label: "Deducted Amount", minWidth: "7pc", type: "text" },
    { id: "balanceAmount", label: "Balance Amount", minWidth: "7pc", type: "text" },
    { id: "comments", label: "Comments", minWidth: "10pc", type: "text" }

  ];
const roleID = localStorage?.getItem('roleID')
const defaultPayload={
    "count":5,
    "page":0,
    "search":"",
    "companyID":(user?.companyID)?user?.companyID:'',
    "employeeID":(user?.employeeID)?user?.employeeID:'',
    "roleID":(user?.roleID)?user?.roleID:'',
    "externalFilters":{
        "deductionType":"",
        "noOfInstallments":"",
        "deductedDate":{
            "from":"",
            "to":""
        }
    },
    "sort":{
        "key":0,
        "orderby":""
    }
}
return (
<>

<BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
endpoint='/getLoanDeductionDetailsHR'
bodyData='data'
filterName="DeductionFilter"
/>  
</>
);
}