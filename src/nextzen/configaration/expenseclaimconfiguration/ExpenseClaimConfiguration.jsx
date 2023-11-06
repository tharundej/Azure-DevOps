import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';

export default function ExpenseClaimConfiguration() {
    const TABLE_HEAD = [
      { id: 'employee_id', label: 'Employee ID', type: 'text' },
      {id:'expense_name',label:'Expense Name',type:'text'},
      { id: 'department_name', label: 'Department Name', type: 'text' },
      { id: 'designation_grade_name', label: 'Designation Grade Name ', type: 'text' },
      { id: 'designation_name', label: 'Designation Name', type: 'text' },
    ];
    const actions = [
      { name: 'Delete', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];
    // const bodyContent = [
    //   {
    //     employeeType: 'Permanent',
    //     payscheduleType: 'Weekly',
    //     payType: 'CTC',
    //     basicPay: '40',
    //     hra: '20',
    //     da: '8',
    //     employeePf: '6',
    //     employerPf: '6',
    //     tds: '20',
    //   },
    // ];
    const defaultPayload = 
    {
      "company_id":"COMP2",
      "employee_id":"ibm1",
      "page":0,
      "count":6,
      "search":"",
      "externalFilters":{
      "department_name": "",
      "designation_name": "",
      "designation_grade_name":""
  } ,
      "sort": {
      "orderby": "expense_name",
      "key": 0
  } 
   
  }
   
     
     
    // const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
    // const tabContents = [
    //   <div>Tab 1 Content</div>,
    //   <div>Tab 2 Content</div>,
    //   <div>Tab 3 Content</div>,
    // ];
    const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth > 530);
  
    useEffect(() => {
      const handleResize = () => {
        setIsLargeDevice(window.innerWidth > 530);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="getExpenseConfig"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="ExpensiveClaimFilterSearch"

        />
      
    );
  }
