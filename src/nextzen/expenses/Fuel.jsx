import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { _userList } from '../../_mock';
import { BasicTable } from '../Table/BasicTable';

export default function Fuel() {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  const [filterOptions, setFilterOptions] = useState({});

  const defaultPayload = {
    count: 5,
    page: 1,
    search: '',
    companyId: 'COMP1',
    externalFilters: {
      expenseDate: {
        fromDate: '',
        toDate: '',
      },
      invoiceDate: {
        fromDate: '',
        toDate: '',
      },
      expenseType: 'Fuel',
      locationName: '',
      invoiceNO: '',
      paymentStatus: '',
    },
    sort: {
      orderBy: 'expenseDate',
      order: 1,
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'locationName', label: 'Location Name', type: 'text', minWidth: '180px' },
    { id: 'expenseDate', label: 'Expense Date', type: 'text', minWidth: '180px' },
    { id: 'vehicleRegNO', label: 'Vehicle NO', type: 'text', minWidth: '180px' },
    { id: 'vehicleType', label: 'Vehicle Type', type: 'text', minWidth: '180px' },
    { id: 'totalLiter', label: 'Total Liter', type: 'text', minWidth: '180px' },
    { id: 'invoiceNO', label: 'Invoice NO', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'paidAmount', label: 'Paid Amount', type: 'text', minWidth: '180px' },
    { id: 'balanceAmount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
    { id: 'paymentStatus', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Fuel Expenses</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listExpenses"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="FuelHead"
      />
    </>
  );
}
