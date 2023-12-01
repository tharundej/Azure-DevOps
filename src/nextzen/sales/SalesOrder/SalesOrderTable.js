import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

const SalesOrderTable = () => {
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
    fcompanyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
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
    { id: 'SONumber', label: 'SO Number', type: 'text', minWidth: '180px' },
    { id: 'SODate', label: 'SO Date', type: 'text', minWidth: '180px' },
    { id: 'InvoiceNo', label: 'Invoice No', type: 'text', minWidth: '180px' },
    { id: 'InvoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'MSME/UAMNo.', label: 'MSME/UAM No.', type: 'text', minWidth: '180px' },
    { id: 'FactoryName', label: 'Factory Name', type: 'text', minWidth: '180px' },
    { id: 'ProductName', label: 'Product Name', type: 'text', minWidth: '180px' },
    { id: 'ProductQuantity', label: 'Product Quantity', type: 'text', minWidth: '180px' },
    { id: 'DeliveredQuantity', label: 'Delivered Quantity', type: 'text', minWidth: '180px' },
    { id: 'PendingQuantity', label: 'Pending Quantity', type: 'text', minWidth: '180px' },
    { id: 'UnitOfMeasure', label: 'Unit  Of Measure', type: 'text', minWidth: '180px' },
    { id: 'SOAmount', label: 'SO Amount', type: 'text', minWidth: '180px' },
    { id: 'DeliveryDate', label: 'Delivery Date', type: 'text', minWidth: '180px' },
    { id: 'CustomerName', label: 'Customer Name', type: 'text', minWidth: '180px' },
    { id: 'CustomerAddress', label: 'Customer Address', type: 'text', minWidth: '180px' },
    { id: 'DeliveryAddress', label: 'Delivery Address', type: 'text', minWidth: '180px' },
    { id: 'CustomerContactNo', label: 'Customer Contact No', type: 'text', minWidth: '180px' },
    { id: 'CustomerPAN', label: 'Customer PAN', type: 'text', minWidth: '180px' },
    { id: 'CustomerGSTNo', label: 'Customer GST No', type: 'text', minWidth: '180px' },

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
        filterName="SaleOrderHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default SalesOrderTable;
