import { useEffect, useState, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { _userList } from '../../_mock';
import { BasicTable } from '../Table/BasicTable';
import UserContext from '../context/user/UserConext';
import CreateExpenses from './CreateExpenses';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import { Dialog } from '@mui/material';
import SnackBarComponent from '../global/SnackBarComponent';
import { DeleteExpensesAPI } from 'src/api/Accounts/Expenses';

export default function OtherExpenses() {
  const { user } = useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [count, setCount] = useState(0);
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
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditShowForm(true);
      setEditModalData(rowdata);
      console.log({ rowdata });
    } else if (event?.name === 'Delete') {
      const deleteData = {
        expensesID: rowdata?.expenseID || 0,
        companyID: rowdata?.companyID || user?.companyID ? user?.companyID : '',
        title: rowdata?.locationName || '',
      };
      setDeleteData(deleteData);
      setConfirmDeleteOpen(true);
      handleDeleteConfirmed();
    }
  };
  const handleCancelDelete = () => {
    setDeleteData(null);
    setConfirmDeleteOpen(false);
  };
  const handleDeleteConfirmed = async () => {
    if (deleteData) {
      await handleDeleteApiCall(deleteData);
      setDeleteData(null);
      setConfirmDeleteOpen(false);
    }
  };
  const handleClose = () => {
    setEditShowForm(false);
  };
  const handleDeleteApiCall = async (deleteData) => {
    try {
      const response = await DeleteExpensesAPI(deleteData);
      console.log('Delete Api Call', response);
      handleCountChange()
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const handleCountChange = () => {
    setCount(count + 1);
  };
  const [filterOptions, setFilterOptions] = useState({});
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: user?.companyID ? user?.companyID : '',
    externalFilters: {
      expenseDate: {
        fromDate: '',
        toDate: '',
      },
      invoiceDate: {
        fromDate: '',
        toDate: '',
      },
      expenseType: 'Others',
      locationName: '',
      invoiceNO: '',
      paymentStatus: '',
    },
    sort: {
      orderBy: 'expenseDate',
      order: -1,
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'locationName', label: 'Location Name', type: 'text', minWidth: '180px' },
    { id: 'expenseDate', label: 'Expense Date', type: 'text', minWidth: '180px' },
    { id: 'itemName', label: 'Item Name', type: 'text', minWidth: '180px' },
    { id: 'invoiceNO', label: 'Invoice Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'paidAmount', label: 'Paid Amount', type: 'text', minWidth: '180px' },
    { id: 'balanceAmount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
    { id: 'paymentStatus', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <SnackBarComponent
        open={openSnackbar}
        severity={severity}
        onHandleCloseSnackbar={HandleCloseSnackbar}
        snacbarMessage={snacbarMessage}
      />
      <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
        itemName="Delete Other Expenses"
        message={`Are you sure you want to delete ${deleteData?.title}?`}
      />
      {editShowForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={editShowForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 1000, overflow: 'hidden' },
          }}
          className="custom-dialog"
        >
          <CreateExpenses
            currentData={editModalData}
            handleClose={handleClose}
            handleCountChange={handleCountChange}
          />
        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: Other Expenses</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listExpenses"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="OtherExpensesHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
        count={count}
      />
    </>
  );
}
