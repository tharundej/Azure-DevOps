import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

const PurchaseOrderTable = () => {
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
  const ApiHit = () => {
    const data1 = body_for_employee;
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://192.168.0.222:3001/erp/PurchaseOrderDetails',
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
      orderBy: 'PONumber',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'PONumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'PODate', label: 'PO Date', type: 'text', minWidth: '180px' },
    { id: 'ItemName', label: 'Item Name', type: 'text', minWidth: '180px' },
    { id: 'Quantity', label: 'Quantity', type: 'text', minWidth: '180px' },
    { id: 'UnitOfMeasure', label: 'Unit  Of Measure', type: 'text', minWidth: '180px' },
    { id: 'Rate', label: 'Rate', type: 'text', minWidth: '180px' },
    { id: 'Discount', label: 'Discount', type: 'text', minWidth: '180px' },
    { id: 'GSTAmount', label: 'GST Amount', type: 'text', minWidth: '180px' },
    { id: 'TotalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'AdvanceAmount', label: 'Advance Amount', type: 'text', minWidth: '180px' },
    { id: 'BalanceAmount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
    { id: 'ExpectedDeliveryDate', label: 'Expected Delivery Date', type: 'text', minWidth: '180px' },
    { id: 'PaymentTerm', label: 'Payment Term', type: 'text', minWidth: '180px' },
    { id: 'VendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'VendorAddress', label: 'Vendor Address', type: 'text', minWidth: '180px' },
    { id: 'VendorPAN', label: 'Vendor PAN', type: 'text', minWidth: '180px' },
    { id: 'EmailID', label: 'Email ID', type: 'text', minWidth: '180px' },
    { id: 'ContactNo', label: 'Contact No', type: 'text', minWidth: '180px' },
    { id: 'VendorLocation', label: 'Vendor Location', type: 'text', minWidth: '180px' },
    { id: 'CompanyName', label: 'Company Name', type: 'text', minWidth: '180px' },
    { id: 'CompanyBillingAddress', label: 'Company Billing Address', type: 'text', minWidth: '180px' },
    { id: 'CompanyBillingGST', label: 'Company Billing GST', type: 'text', minWidth: '180px' },
    { id: 'CompanyBillingPAN', label: 'Company Billing PAN', type: 'text', minWidth: '180px' },
    { id: 'FactoryShippingAddress', label: 'Factory Shipping Address', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: PurchaseOrder</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/PurchaseOrderDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="PurchaseOrderHead"
      />
    </>
  );
};
export default PurchaseOrderTable;
