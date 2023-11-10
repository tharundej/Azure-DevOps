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

    { id: "requestDate", label: "Deduction Type", minWidth: "8pc", type: "text" },

    { id: "requestAmount", label: "Taken Amount", minWidth: "7pc", type: "text" },

    { id: "paidDate", label: "Paid Date", minWidth: "8pc", type: "text" },
    { id: "paidAmount", label: "paid Amount", minWidth: "7pc", type: "text" },
    { id: "noOfInstallments", label: "Installment No", minWidth: "7pc", type: "text" },
    { id: "interestRate", label: "Interest Rate", minWidth: "7pc", type: "text" },
    { id: "approverName", label: "Deducted From", minWidth: "10pc", type: "text" },
    { id: "paidDate", label: "Deducted Date", minWidth: "8pc", type: "text" },
    { id: "paidAmount", label: "Deducted Amount", minWidth: "7pc", type: "text" },
    { id: "paidAmount", label: "Balance Amount", minWidth: "7pc", type: "text" },
    { id: "employeeName", label: "Comments", minWidth: "10pc", type: "text" }

  ];

const defaultPayload={
"count": 5,
"page": 1,
"search": "",
"companyID": "COMP1",
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
  "key":null ,
  "orderBy": ""
}
}
return (
<>

<BasicTable
headerData={TABLE_HEAD}
defaultPayload={defaultPayload}
endpoint='/getLoanDetailsHr'
bodyData='data'
filterName="DeductionFilter"
/>  
</>
);
}