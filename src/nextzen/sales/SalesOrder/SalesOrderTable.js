import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';

import { getSalesOrderAPI } from 'src/api/Accounts/SalesOrder';
import UserContext from 'src/nextzen/context/user/UserConext';
import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import CreateSaleOrder from './CreateSaleOrder';
import { Dialog } from '@mui/material';

const SalesOrderTable = () => {
  const { user } = useContext(UserContext);
  // const actions = [
  //   { name: 'Edit', icon: 'hh', id: 'edit' },
  //   { name: 'Delete', icon: 'hh', id: 'delete' },
  // ];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
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
  const [editShowForm, setEditShowForm] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditShowForm(true);
      setEditModalData(rowdata);
      console.log({ rowdata });
    }
    // else if (event?.name === 'Delete') {
    //   const deleteData = {
    //     locationID: rowdata?.locationID || 0,
    //     companyID: rowdata?.companyID || user?.companyID ? user?.companyID : '',
    //     title: rowdata?.locationName || '',
    //   };
      // setDeleteData(deleteData);
      // setConfirmDeleteOpen(true);
      // handleDeleteConfirmed();
    }
    const handleCountChange = () => {
      setCount(count + 1);
    };

  const handleClose = () => {
    setEditShowForm(false);
  };
  // const ApiHit = () => {
  //   const data1 = body_for_employee;
  //   const config = {
  //     method: 'POST',
  //     maxBodyLength: Infinity,
  //     url: 'http://192.168.0.222:3001/erp/PurchaseOrderDetails',
  //     // headers: {
  //     //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo'
  //     // },
  //     data: data1,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data.data));
  //       setBodyContent(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };


  // const defaultPayload = {
  //   count: 5,
  //   page: 0,
  //   search: '',
  //   fcompanyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
  //   externalFilters: {
  //     fMaritalStatus: '',
  //     fBloodGroup: '',
  //     fPState: '',
  //     fPEmployementType: '',
  //     fPdepartmentName: '',
  //     fPDesignation: '',
  //     fPDesignationGrade: '',
  //     fWorkingLocation: '',
  //     fjoiningDate: {
  //       from: '',
  //       to: '',
  //     },
  //     fDOB: {
  //       from: '',
  //       to: '',
  //     },
  //     fofferDate: {
  //       from: '',
  //       to: '',
  //     },
  //   },
  //   sort: {
  //     key: 1,
  //     orderBy: 'PONumber',
  //   },
  // };
  const defaultPayload = {
    companyId: user?.companyID ? user?.companyID : '',
    soNumber:'',
    count: 10,
    page: 0,
    search: '',
    externalFilters: {
      dateOfSalesOrder:{
        fromDateOfSalesOrder:"",
        toDateOfSalesOrder:""
    },
    billToState:"",
    billToCity:"",
    shipToState:"",
    ShipToCity:"",
    paymentTerm:""
    },
    sort: {
      key: 0,
      order:"",
    },
  };


  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'soNumber', label: 'SO Number', type: 'text', minWidth: '180px' },
    { id: 'billToAddress', label: 'Billing Address', type: 'text', minWidth: '180px' },
    { id: 'billToCity', label: 'Billing City', type: 'text', minWidth: '180px' },
    { id: 'billToGst', label: 'Billing GST', type: 'text', minWidth: '180px' },
    { id: 'billToName', label: 'billToName', type: 'text', minWidth: '180px' },
    { id: 'billToPincode', label: 'Billing Pincode', type: 'text', minWidth: '180px' },
    { id: 'billToState', label: 'Billing State', type: 'text', minWidth: '180px' },
    { id: 'billToStateCode', label: 'Billing State Code', type: 'text', minWidth: '180px' },
    { id: 'cgst', label: 'CGST', type: 'text', minWidth: '180px' },
    { id: 'shipToAddress', label: 'Shipping Address', type: 'text', minWidth: '180px' },
    { id: 'shipToCity', label: 'Shipping City', type: 'text', minWidth: '180px' },
    { id: 'shipToGst', label: 'SHipping GST', type: 'text', minWidth: '180px' },
    { id: 'shipToName', label: 'Shipping Name', type: 'text', minWidth: '180px' },
    { id: 'shipToPincode', label: 'Shipping Pincode', type: 'text', minWidth: '180px' },
    { id: 'shipToState', label: 'Shipping State', type: 'text', minWidth: '180px' },
    { id: 'shipToStateCode', label: 'Shipping State Code', type: 'text', minWidth: '180px' },
    { id: 'paymentTerm', label: 'Payment Term', type: 'text', minWidth: '180px' },
    { id: 'netTotalAmount', label: 'Net Total Amount', type: 'text', minWidth: '180px' },
    { id: 'CustomerGSTNo', label: 'Customer GST Number', type: 'text', minWidth: '180px' },

  ]);
  return (
    <>
     {editShowForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={editShowForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 1000 },
          }}
          className="custom-dialog"
        >
          <CreateSaleOrder
            currentData={editModalData}
            handleClose={handleClose}
            handleCountChange={handleCountChange}
          />
        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: PurchaseOrder</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getSalesOrder"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="SaleOrderHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default SalesOrderTable;
