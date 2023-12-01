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
    count: 5,
    page: 0,
    search: '',
    fcompanyID: user?.companyID ? user?.companyID : '',
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'PONumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'PODate', label: 'PO Date', type: 'text', minWidth: '180px' },
    { id: ' Amount', label: ' Amount', type: 'text', minWidth: '180px' },
    { id: 'Paid Date', label: 'Paid Date', type: 'text', minWidth: '180px' },
    { id: 'No of Installments', label: 'No of Installments', type: 'text', minWidth: '180px' },
    { id: 'Balance Amount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
    { id: 'Due Date', label: 'Due Date', type: 'text', minWidth: '180px' },
    { id: 'Payment Method', label: 'Payment Method', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
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
        filterName="PurchasePaymentHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default PurchasePaymentTable;
