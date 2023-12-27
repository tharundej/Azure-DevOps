import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';
import UserContext from 'src/nextzen/context/user/UserConext';

const SaleInvoiceTable = () => {
  const { user } = useContext(UserContext);
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
  // const defaultPayload = {
  //   count: 5,
  //   page: 0,
  //   search: '',
  //   fcompanyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
  // };
  const defaultPayload = {
    companyId: user?.companyID ? user?.companyID : '',
    perPage: 10,
    page: 0,
    search: '',
    count: 5,
    externalFilters: {
      salesOrderNo:"",
        salesInvoiceNo:"",
        productName:"",
        salesInvoiceId:"",
        hsnCode:"",
        comments:"",
        salesInvoiceProductId:"",
        invoiceDate: {
            from: "",
            to: ""
        }

    },
    sort: {
      orderBy: "",
      order:1,
    },
  };



  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'balaceProduct', label: 'SO Number', type: 'text', minWidth: '180px' },
    { id: 'SODate', label: 'SO Date', type: 'text', minWidth: '180px' },
    { id: 'InvoiceNo', label: 'Invoice Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'Quantity', label: 'Quantity', type: 'text', minWidth: '180px' },
    { id: 'unitsOfMeasure', label: 'Unit of Measure', type: 'text', minWidth: '180px' },
    { id: 'rate', label: 'Rate', type: 'text', minWidth: '180px' },
    { id: 'gstRate', label: 'GST', type: 'text', minWidth: '180px' },
    { id: 'amount', label: 'Amount', type: 'text', minWidth: '180px' },
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
        endpoint="/listSalesInvoice"
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
