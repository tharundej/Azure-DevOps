import { useEffect, useState, useCallback, useContext  } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

const SalePaymentTable = () => {
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
  const defaultPayload = {
    companyId: user?.companyID ? user?.companyID : '',
    count: 10,
    page: 0,
    search: "4500",
    // fcompanyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    externalFilters: {
      status:"",
      paymentMethod: "",
      dateSalesOrder: {
        from: "",
        to: ""
    },

        dueDate: {
            from: "",
            to: ""
        },
        PaidDate: {
            from: "",
            to: ""
        },
        InvoiceDate: {
            from: "",
            to: ""
        },
        sort: {
          key: 0,
          orderBy: ""
      }

    },


  };
  const [TABLE_HEAD, setTableHead] = useState([
    // { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'balanceAmount', label: 'balanceAmount', type: 'text', minWidth: '180px' },
    { id: 'dateSalesOrder', label: 'dateSalesOrder', type: 'text', minWidth: '180px' },
    { id: 'dueDate', label: 'dueDate', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'invoiceDate', type: 'text', minWidth: '180px' },
    { id: 'invoiceNumber', label: 'invoiceNumber', type: 'text', minWidth: '180px' },
    { id: 'numOfInstallments', label: 'numOfInstallments', type: 'text', minWidth: '180px' },
    { id: 'paidAmount', label: 'paidAmount', type: 'text', minWidth: '180px' },
    { id: 'paidDate', label: 'paidDate', type: 'text', minWidth: '180px' },
    { id: 'paymentId', label: 'paymentId', type: 'text', minWidth: '180px' },
    { id: 'paymentMethod', label: 'paymentMethod', type: 'text', minWidth: '180px' },
    { id: 'paymentStatus', label: 'paymentStatus', type: 'text', minWidth: '180px' },
    { id: 'salesOrderNo', label: 'salesOrderNo', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'totalAmount', type: 'text', minWidth: '180px' },


  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Purchase Payment</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listSalesPayment"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="SalePaymentHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default SalePaymentTable;
