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
    search: '',
    page: 0,
    perPage: 10,
    companyId: 'COMP1',
    externalFilters: {
      invoiceDate: {
        fromDate: '',
        toDate: '',
      },
      dueDate: {
        fromDate: '',
        toDate: '',
      },
      poDate: {
        fromDate: '',
        toDate: '',
      },
      paymentMode: '',
      status: '',
    },
    sort: {
      orderBy: 'invoiceDate',
      order: 1,
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'poNumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceNo', label: 'Invoice No', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'paymentMode', label: 'paymentMode', type: 'text', minWidth: '180px' },
    { id: 'netTotalAmount', label: 'netTotalAmount', type: 'text', minWidth: '180px' },
    { id: 'gstAmount', label: 'gstAmount', type: 'text', minWidth: '180px' },
    {
      id: 'totalAmount',
      label: 'totalAmount',
      type: 'text',
      minWidth: '180px',
    },
    {
      id: 'status',
      label: 'status',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'totalWeight', label: 'totalWeight', type: 'text', minWidth: '180px' },
    { id: 'vehicleWeight', label: 'vehicleWeight', type: 'text', minWidth: '180px' },
    { id: 'comments', label: 'comments', type: 'text', minWidth: '180px' },
    {
      id: 'receivedMaterialWeight',
      label: 'receivedMaterialWeight',
      type: 'text',
      minWidth: '180px',
    },
    {
      id: 'balanceMaterialWeight',
      label: 'balanceMaterialWeight',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'quantity', label: 'quantity', type: 'text', minWidth: '180px' },
    { id: 'rate', label: 'rate', type: 'text', minWidth: '180px' },
    { id: 'unitOfMeasure', label: 'unitOfMeasure', type: 'text', minWidth: '180px' },
    { id: 'amount', label: 'amount', type: 'text', minWidth: '180px' },
    { id: 'dueDate', label: 'dueDate', type: 'text', minWidth: '180px' },
    { id: 'PoDate', label: 'PoDate', type: 'text', minWidth: '180px' },
    { id: 'materialName', label: 'materialName', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Purchase Invoice</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listPurchaseInvoice"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="PurchaseInvoiceHead"
      />
    </>
  );
};
export default PurchaseInvoiceTable;
