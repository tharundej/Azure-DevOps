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

const defaultPayload={
    "page":1,
    "count":4,
    "companyID":"COMP1"
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