import React from 'react';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { StatouryForm } from './StatouryForm';

export const StatouryTable = () => {
  const [TABLE_HEAD, setTableHead] = React.useState([
    {
      id: 'employee_id',
      label: ' Employee id',
      type: 'text',
      containesAvatar: true,

      secondaryText: 'name',
    },
    { id: 'state', label: 'State', width: 250, type: 'text' },
    { id: 'employee_name', label: 'Employee name', width: 220, type: 'text' },
    { id: 'aadhar_number', label: 'Aadhar Number', width: 300, type: 'text' },
    { id: 'pan_number', label: 'Pan Number', width: 100, type: 'text' },

    { id: 'accountholder_name', label: 'Account holder Name', width: 280, type: 'text' },
    { id: 'bank_name', label: 'Bank Name', width: 220, type: 'text' },
    { id: 'account_number', label: 'Account Number', width: 180, type: 'text' },
    { id: 'bank_branch', label: 'Bank Branch', width: 180, type: 'text' },
    { id: 'ifsc_code', label: 'IFSC Code', width: 180, type: 'text' },
    { id: 'pf_no', label: 'PF Number', width: 180, type: 'text' },
    { id: 'esic_number', label: 'ESIC Number', width: 180, type: 'text' },
    { id: 'pt', label: 'PT', width: 180, type: 'text' },
    { id: 'LWF', label: 'UAN Number', width: 180, type: 'text' },
  ]);
  const defaultPayload = {
    Page: 1,

    Count: 5,
  };
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
        endpoint="/listLeave"
        defaultPayload={defaultPayload}
        rowActions={actions}
      />
    </>
  );
};
