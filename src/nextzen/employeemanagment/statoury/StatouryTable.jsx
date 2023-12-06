import React from 'react';
import { BasicTable } from '../../Table/BasicTable'
// import { StatouryForm } from './StatouryForm';

export const StatouryTable = () => {
  const [TABLE_HEAD, setTableHead] = React.useState([
    {
      id: 'employeeId',
      label: ' Employee ID',
      type: 'text',
      containesAvatar: true,

      secondaryText: 'name',
     minWidth:'150px'
    },
   
    { id: 'employeeName', label: 'Employee Name',  type: 'text', minWidth:'180px' },
    { id: 'aadharNo', label: 'Aadhaar Number',  type: 'text', minWidth:'150px' },
    { id: 'panNo', label: 'PAN Number', type: 'text', minWidth:'180px' },
    { id: 'uan', label: 'UAN Number', type: 'text', minWidth:'180px' },

    { id: 'accountHolderName', label: 'Account Holder Name',  type: 'text',minWidth:'180px' },
    { id: 'passportNo', label: 'Passport Number',  type: 'text',minWidth:'180px' },
    { id: 'bankName', label: 'Bank Name',  type: 'text' },
    { id: 'bankAccountNo', label: 'Account Number',  type: 'text',minWidth:'180px' },
    { id: 'bankBranch', label: 'Bank Branch',  type: 'text',minWidth:'180px' },
    { id: 'ifscCode', label: 'IFSC Code', type: 'text',minWidth:'180px' },
    { id: 'pfNumber', label: 'PF Number', type: 'text',minWidth:'180px' },
    { id: 'esicNo', label: 'ESIC Number', type: 'text',minWidth:'180px' },
    { id: 'ptNo', label: 'PT Number', type: 'text',minWidth:'180px' },
    { id: 'lwfNo', label: 'LWF', type: 'text',minWidth:'180px' },
    { id: 'pfType', label: 'PF Type', type: 'text',minWidth:'180px' },
   
  ]);
  const defaultPayload ={

    "count": 5,
  
    "page": 0,
    "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
  
    "search": "",
  
      "externalFilters": {
  
     
  
      
  
      "pfType":"",
  
     
  
    
  
    },
  
     "sort": {
  
     "key": 0,
  
     "orderBy": "employee_id"
  
    }
  
  }
  const actions = [
  
  ];
  return (
    <>
      {/* <StatouryForm /> */}
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
