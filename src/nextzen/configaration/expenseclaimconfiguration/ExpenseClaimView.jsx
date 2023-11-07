import React, { useEffect, useState } from 'react';
import { BasicTable } from '../../Table/BasicTable';
import axios from 'axios';

export default function ExpenseClaimConfiguration() {
  const TABLE_HEAD = [
    { id: 'employee_name', label: 'Employee Name', type: 'text' },
    { id: 'expense_name', label: 'Expense Name', type: 'text' },
    { id: 'department_name', label: 'Department Name', type: 'text' },
    { id: 'designation_grade_name', label: 'Designation Grade Name ', type: 'text' },
    { id: 'designation_name', label: 'Designation Name', type: 'text' },
  ];
  const actions = [
    { name: 'Delete', icon: 'hh', path: 'jjj' },
    { name: 'Edit', icon: 'hh', path: 'jjj', endpoint: '/', type: 'edit' },
  ];

  const defaultPayload = {
    company_id: 'COMP2',
    employee_id: 'ibm1',
    page: 0,
    count: 6,
    search: '',
    externalFilters: {
      department_name: '',
      designation_name: '',
      designation_grade_name: '',
    },
    sort: {
      orderby: 'expense_name',
      key: 0,
    },
  };
 

  const handleEdit = (rowData) => {
    rowData.company_id = 'COMP2';
    const {
      company_id,
      department_name,
      designation_grade_name,
      designation_name,
      expense_configuration_id,
      expense_name,
    } = rowData;
    const payload = {
      company_id,
      department_name,
      designation_grade_name,
      designation_name,
      expense_configuration_id,
      expense_name,
    };
    console.log(rowData, 'rowData');
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `http://192.168.0.123:3001/erp/updateExpenseConfig`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
      },
      data: payload,
    };

    axios.request(config).then((response) => {
      console.log(response?.data);
    });
  };

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
      buttonFunction={handleEdit}
    />
  );
}
