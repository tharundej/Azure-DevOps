import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';

const AssetsTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  const [filterOptions, setFilterOptions] = useState({
    dates: [
      {
        display: 'Established Date',
        field_name: 'EstablishedDate',
      },
      {
        display: 'Operational Date',
        field_name: 'OperationalDate',
      },
    ],
    dropdowns: [
      {
        display: 'Status',
        options: ['active', 'inactive'],
        field_name: 'status',
      },
    ],
  });
  const [bodyContent, setBodyContent] = useState([]);
  const defaultPayload = {
    company_id: 'comp1',
    page: 1,
    count: 5,
    search: '',
    externalFilters: {
      podate: {
        from_date: '',
        to_date: '',
      },
      invoicedate: {
        from_date: '',
        to_date: '',
      },
      asset_name: '',
      asset_type: '',
      supplier_name: 'Supplier XYZ',
    },
    sort: {
      key: 1,
      orderBy: 'a.assets_name',
    },
  };
  const ApiHit = async () => {
    try {
      const response = await getAssetsListAPI(defaultPayload);
      console.log('location success', response);
      setBodyContent(response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
    
  }, []);

  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'AssetsName', label: 'Assets Name', type: 'text', minWidth: '180px' },
    { id: 'AssetsType', label: 'Assets Type', type: 'text', minWidth: '180px' },
    { id: 'PoNumber', label: 'Po Number', type: 'text', minWidth: '180px' },
    { id: 'PoDate', label: 'Po Date', type: 'text', minWidth: '180px' },
    { id: 'PoValue', label: 'Po Value', type: 'text', minWidth: '180px' },
    { id: 'InvoiceNo', label: 'Invoice No', type: 'text', minWidth: '180px' },
    { id: 'InvoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'StartDate', label: 'Start Date', type: 'text', minWidth: '180px' },
    { id: 'SupplierName ', label: 'Supplier Name', type: 'text', minWidth: '180px' },
    { id: 'SupplierEmail ', label: 'Supplier Email', type: 'text', minWidth: '180px' },
    { id: 'SupplierContactNo', label: 'Supplier Contact No', type: 'text', minWidth: '180px' },
    { id: 'ExpiryDate', label: 'Expiry Date', type: 'text', minWidth: '180px' },
    { id: 'LapseOfWarrantyDate', label: 'Lapse Of Warranty Date', type: 'text', minWidth: '180px' },
    { id: 'OperationalDays', label: 'Operational Days', type: 'text', minWidth: '180px' },
    { id: 'Amount', label: 'Amount', type: 'text', minWidth: '180px' },
    { id: 'GstAmount', label: 'Gst Amount', type: 'text', minWidth: '180px' },
    { id: 'TotalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'AssetsCondition', label: 'Assets Condition', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Accounting: Vendor</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listassets"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="AssetsHead"
      />
    </>
  );
};
export default AssetsTable;
