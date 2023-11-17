import { useEffect, useState, useCallback } from 'react';
import { Dialog } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import SnackBarComponent from '../global/SnackBarComponent';
import { deleteCutomerApi } from 'src/api/Accounts/Customers';
import CreateCustomers from './CreateCustomers';

const CustomersTable = () => {
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
    { name: 'Edit', icon: 'hh', id: 'edit', type: 'serviceCall', endpoint: '' },
    { name: 'Delete', icon: 'hh', id: 'delete', type: 'serviceCall', endpoint: '' },
  ];
  const [editShowForm, setEditShowForm] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditShowForm(true);
      setEditModalData(rowdata);
    } else if (event?.name === 'Delete') {
      const deleteData = { customerId: rowdata?.customerId };
      handleDeleteApiCall(deleteData);
    }
  };
  const handleClose = () => {
    setEditShowForm(false);
  };
  const handleDeleteApiCall = async (deleteData) => {
    try {
      const response = await deleteCutomerApi(deleteData);
      console.log('Delete Api Call', response);
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const ApiHit = async () => {
    try {
      const response = await getCustomerListAPI(defaultPayload);
      console.log('location success', response);
      setBodyContent(response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
  }, []);
  const defaultPayload = {
    companyId: 'COMP1',
    page: 0,
    count: 10,
    search: '',
    sort: {
      orderby: '',
      key: 0,
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    // { id: 'id', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'customerName', label: 'Customer Name', type: 'text', minWidth: '180px' },
    { id: 'customerCompanyName', label: 'Customer Company Name', type: 'text', minWidth: '180px' },
    { id: 'customerEmailId', label: ' Email Id', type: 'text', minWidth: '180px' },
    { id: 'customerPhoneNo', label: ' Phone No', type: 'text', minWidth: '180px' },
    { id: 'customerAddress', label: 'Customer Address', type: 'text', minWidth: '180px' },
    { id: 'customerGstNo', label: 'GST No', type: 'text', minWidth: '180px' },
    { id: 'customerPanNo', label: 'PAN No', type: 'text', minWidth: '180px' },
    { id: 'customerTanNo', label: 'Customer TAN No', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <SnackBarComponent
        open={openSnackbar}
        severity={severity}
        onHandleCloseSnackbar={HandleCloseSnackbar}
        snacbarMessage={snacbarMessage}
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
          <CreateCustomers currentData={editModalData} handleClose={handleClose} />
        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: Customers</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listcustomers"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="CustomersHead"
        onClickActions={onClickActions}
      />
    </>
  );
};
export default CustomersTable;
