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
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
  const ApiHit = () => {
    const data1 = body_for_employee;
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://192.168.0.222:3001/erp/AssetsDetails',
      // headers: {
      //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo'
      // },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setBodyContent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ApiHit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    fcompanyID: 'COMP1',
    externalFilters: {
      fMaritalStatus: '',
      fBloodGroup: '',
      fPState: '',
      fPEmployementType: '',
      fPdepartmentName: '',
      fPDesignation: '',
      fPDesignationGrade: '',
      fWorkingLocation: '',
      fjoiningDate: {
        from: '',
        to: '',
      },
      fDOB: {
        from: '',
        to: '',
      },
      fofferDate: {
        from: '',
        to: '',
      },
    },
    sort: {
      key: 1,
      orderBy: 'VendorName',
    },
  };
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
        endpoint="/AssetsDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="AssetsHead"
      />
    </>
  );
};
export default AssetsTable;
