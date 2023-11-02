import React from 'react';
import { BasicTable } from '../../Table/BasicTable'
import { StatouryForm } from './StatouryForm';

export const StatouryTable = () => {
  const [TABLE_HEAD, setTableHead] = React.useState([
    {
      id: 'employeeID',
      label: ' Employee id',
      type: 'text',
      containesAvatar: true,

      secondaryText: 'name',
     minWidth:'150px'
    },
   
    { id: 'employeeName', label: 'Employee name',  type: 'text', minWidth:'180px' },
    { id: 'aadharNumber', label: 'Aadhar Number',  type: 'text', minWidth:'150px' },
    { id: 'panNumber', label: 'Pan Number', type: 'text', minWidth:'150px' },
    { id: 'uan', label: 'Uan Number', type: 'text', minWidth:'150px' },

    { id: 'accountHolderName', label: 'Account holder Name',  type: 'text' },
    { id: 'passportNo', label: 'Passport Number',  type: 'text' },
    { id: 'bankName', label: 'Bank Name',  type: 'text' },
    { id: 'accountNumber', label: 'Account Number',  type: 'text' },
    { id: 'bankBranch', label: 'Bank Branch',  type: 'text' },
    { id: 'ifscCode', label: 'IFSC Code', type: 'text' },
    { id: 'pfNumber', label: 'PF Number', type: 'text' },
    { id: 'esicNumber', label: 'ESIC Number', type: 'text' },
    { id: 'ptNumber', label: 'PT Number', type: 'text' },
    { id: 'lwfNumber', label: 'LWF', type: 'text' },
    { id: 'pfType', label: 'PF Type', type: 'text' },
  ]);
  const defaultPayload ={

    "count": 5,
  
    "page": 0,
  
    "search": "",
  
      "externalFilters": {
  
      "employeeId": "",
  
      "employeeName": "",
  
      
  
      "pfType":"",
  
     
  
      "accountHolderName": "",
  
      "bankName": "",
  
      "ifscCode": "",
  
      "bankBranch": ""
  
    },
  
     "sort": {
  
     "key": 0,
  
     "orderBy": "employee_id"
  
    }
  
  }
  const actions = [
    { name: 'Approve', icon: 'hh', id: 'approve', type: 'serviceCall', endpoint: '/accept' },

    { name: 'View', icon: 'hh', id: 'view' },

    { name: 'Edit', icon: 'hh', id: 'edit' },

    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  return (
    <>
      <StatouryForm />
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getStatutoryDetails"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="statuortySearchFilter"
      />
    </>
  );
};
