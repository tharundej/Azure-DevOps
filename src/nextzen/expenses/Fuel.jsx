import { useEffect, useState, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { _userList } from '../../_mock';
import { BasicTable } from '../Table/BasicTable';
import UserContext from '../context/user/UserConext';
import { DeleteExpensesAPI } from 'src/api/Accounts/Expenses';
import CreateExpenses from './CreateExpenses';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import { Box, Card, CardContent, Dialog, Grid, Typography } from '@mui/material';
import SnackBarComponent from '../global/SnackBarComponent';
import { update } from 'lodash';
import { baseUrl } from '../global/BaseUrl';
// import { Box, Button, Card, CardContent, Dialog, Grid, Typography } from '@mui/material';
// import { Box } from '@mui/system';

export default function Fuel({ updateTotalExpense }) {
  const { user } = useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [count, setCount] = useState(0);
  const [expenseData, setExpenseData] = useState();

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
      handleCountChange();
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
    count: 10,
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
      expenseType: '',
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
    { id: 'expenseType', label: 'Expense Type', type: 'text', minWidth: '180px' },
    { id: 'locationName', label: 'Location Name', type: 'text', minWidth: '180px' },
    { id: 'expenseDate', label: 'Expense Date', type: 'text', minWidth: '180px' },
    { id: 'vehicleRegNO', label: 'Vehicle Number', type: 'text', minWidth: '180px' },
    { id: 'vehicleType', label: 'Vehicle Type', type: 'text', minWidth: '180px' },
    { id: 'totalLiter', label: 'Total Liter', type: 'text', minWidth: '180px' },
    { id: 'fuelType', label: 'Fuel Type', type: 'text', minWidth: '180px' },
    { id: 'invoiceNO', label: 'Invoice Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'paidAmount', label: 'Paid Amount', type: 'text', minWidth: '180px' },
    { id: 'balanceAmount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
    { id: 'paymentStatus', label: 'Status', type: 'text', minWidth: '180px' },
  ]);

  console.log(user, 'user');

  const updateTotalState = (obj) => {
    updateTotalExpense(obj);
  };
  const ApiHitUpdate = async () => {
    const payload = defaultPayload;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/listExpenses',
      headers: {
        Authorization: user?.accessToken,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data;
          console.log(JSON.stringify(response.data));
          updateTotalExpense(rowsData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(result, 'resultsreults');
  };
  useEffect(() => {
    console.log('useEffect called ');
    ApiHitUpdate();
  }, []);
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
        itemName="Delete Fuel Expense"
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
        <title> Dashboard: Fuel Expenses</title>
      </Helmet>

      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listExpenses"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="FuelFilter"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
        count={count}
        updateTotalState={updateTotalState}
      />
    </>
  );
}
