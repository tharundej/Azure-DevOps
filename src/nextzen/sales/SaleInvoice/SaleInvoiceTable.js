import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

const SaleInvoiceTable = () => {
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
    { id: 'SODate', label: 'SO Date', type: 'text', minWidth: '180px' },
    { id: 'InvoiceNo', label: 'Invoice No', type: 'text', minWidth: '180px' },
    { id: 'Invoice Date', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'Quantity', label: 'Quantity', type: 'text', minWidth: '180px' },
    { id: 'Unit of measure', label: 'Unit of Measure', type: 'text', minWidth: '180px' },
    { id: 'Rate', label: 'Rate', type: 'text', minWidth: '180px' },
    { id: ' SGST', label: 'SGST', type: 'text', minWidth: '180px' },
    { id: 'CGST', label: 'CGST', type: 'text', minWidth: '180px' },
    { id: 'IGST', label: 'IGST', type: 'text', minWidth: '180px' },
    { id: 'Discount', label: 'Discount', type: 'text', minWidth: '180px' },
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
        filterName="SaleInvoiceHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default SaleInvoiceTable;
