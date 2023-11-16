import * as React from 'react';
import {Card,CardActions,CardContent,Button,Typography,Dialog,DialogContent} from '@mui/material';
import { _userList } from 'src/_mock';
import { useState, useCallback } from 'react';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../Table/BasicTable';
import {useSnackbar} from '../../components/snackbar';
import axios from 'axios';
export default function Deduction() {
   const {enqueueSnackbar} = useSnackbar()
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
    "companyID":localStorage?.getItem('companyID'),
    "employeeID":localStorage?.getItem('employeeID'),
    "roleID":localStorage?.getItem('roleID'),
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