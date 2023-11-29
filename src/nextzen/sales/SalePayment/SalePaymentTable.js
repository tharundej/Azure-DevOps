import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

const SalePaymentTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
  const ApiHit = () => {};

  useEffect(() => {
    ApiHit();
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    fcompanyID: 'COMP1',
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'SONumber', label: 'SO Number', type: 'text', minWidth: '180px' },
    { id: 'InvoiceNo', label: 'Invoice No', type: 'text', minWidth: '180px' },
    { id: 'Invoice Date', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'E-way bill', label: 'E-way bill', type: 'text', minWidth: '180px' },
    { id: 'Number of Installments', label: 'Number of Installments', type: 'text', minWidth: '180px' },
    { id: ' Received Amount', label: 'Received Amount', type: 'text', minWidth: '180px' },
    { id: 'Due Date', label: 'Due Date', type: 'text', minWidth: '180px' },


  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Purchase Payment</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/PurchasePaymentDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="SalePaymentHead"
      />
    </>
  );
};
export default SalePaymentTable;
