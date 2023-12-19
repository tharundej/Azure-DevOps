import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';
import UserContext from 'src/nextzen/context/user/UserConext';

const PurchasePaymentTable = () => {
  const { user } = useContext(UserContext);
  const actions = [
    { name: 'Edit', icon: 'basil:edit-outline', id: 'edit', type: 'serviceCall', endpoint: '' },
    {
      name: 'Delete',
      icon: 'fluent:delete-28-regular',
      id: 'delete',
      type: 'serviceCall',
      endpoint: '',
    },
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
    companyID:user?.companyID,
    "search": "",
    "page": 1,
    "count": 5,
    "externalFilters": {
        "status": "",
        "paymentMethod": "",
        "PoDate": {
            "from": "",
            "to": ""
        },
        "DueDate": {
            "from": "",
            "to": ""
        },
        "PaidDate": {
            "from": "",
            "to": ""
        }
    },
    "sort": {
        "key": 0,
        "orderBy": ""
    }
}

  const [TABLE_HEAD, setTableHead] = useState([
   
    { id: 'poNumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'poDate', label: 'PO Date', type: 'text', minWidth: '180px' },
    
    { id: 'invoiceNumber', label: 'Invoice Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'date', minWidth: '180px' },
    { id: 'numOfInstallMents', label: 'Number of Installments', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'Amount', type: 'text', minWidth: '180px' },
    { id: 'paidAmount', label: 'Paid Amount', type: 'text', minWidth: '180px' },
    { id: 'paidDate', label: 'Paid Date', type: 'text', minWidth: '180px' },
    { id: 'paymentMethod', label: 'Payment Method', type: 'text', minWidth: '180px' },
    { id: 'paymentStatus', label: 'Payment Status', type: 'text', minWidth: '180px' },
   
    { id: 'balanceAmount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
   
    
    { id: 'dueDate', label: 'Due Date', type: 'date', minWidth: '180px' },
   
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Purchase Payment</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listPayments"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="PurchasePaymentHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default PurchasePaymentTable;
