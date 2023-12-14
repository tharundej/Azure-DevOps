import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';
import UserContext from 'src/nextzen/context/user/UserConext';

const PurchaseInvoiceTable = () => {
  const { user } = useContext(UserContext);
  console.log('sdsdsdsd', user);
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

  const defaultPayload = {
    page: 0,
    count: 10,
    search: '',
    companyId: user?.companyID ? user?.companyID : '',
    externalFilters: {
      invoiceDate: {
        from: '',
        to: '',
      },
      dueDate: {
        from: '',
        to: '',
      },
      poDate: {
        from: '',
        to: '',
      },
      paymentMode: '',
      status: '',
    },
    sort: {
      orderBy: '',
      key: 1,
    },
  };

  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'poNumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceNo', label: 'Invoice Number', type: 'text', minWidth: '180px' },
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

  const handleEditRowParent = () => {};

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
        handleEditRowParent={handleEditRowParent}
      />
    </>
  );
};
export default PurchaseInvoiceTable;
