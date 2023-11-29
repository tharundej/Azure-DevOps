import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

const PurchaseInvoiceTable = () => {
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
    { id: 'PONumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'PODate', label: 'PO Date', type: 'text', minWidth: '180px' },
    { id: 'InvoiceNo', label: 'Invoice No', type: 'text', minWidth: '180px' },
    { id: 'Invoice Date', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'ItemName', label: 'Item Name', type: 'text', minWidth: '180px' },
    { id: 'Total Weight', label: 'Total Weight', type: 'text', minWidth: '180px' },
    { id: 'Vehicle Weight', label: 'Vehicle Weight', type: 'text', minWidth: '180px' },
    {
      id: 'Recieved Material Weight',
      label: 'Recieved Material Weight',
      type: 'text',
      minWidth: '180px',
    },
    {
      id: 'Balance Material Weight',
      label: 'Balance Material Weight',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'Rate', label: 'Rate', type: 'text', minWidth: '180px' },
    { id: ' Unit of Measure', label: ' Unit of Measure', type: 'text', minWidth: '180px' },
    { id: ' Amount', label: ' Amount', type: 'text', minWidth: '180px' },
    { id: 'Paid Date', label: 'Paid Date', type: 'text', minWidth: '180px' },
    { id: 'No of Installments', label: 'No of Installments', type: 'text', minWidth: '180px' },
    { id: 'Due Date', label: 'Due Date', type: 'text', minWidth: '180px' },
    { id: 'Payment Method', label: 'Payment Method', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Purchase Invoice</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/PurchaseOrderDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="PurchaseInvoiceHead"
      />
    </>
  );
};
export default PurchaseInvoiceTable;
