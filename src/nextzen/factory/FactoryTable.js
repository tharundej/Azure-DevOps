import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import CreateFactory from './CreateFactory';
import { Dialog } from '@mui/material';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import SnackBarComponent from '../global/SnackBarComponent';
import { DeleteFactoryAPI } from 'src/api/Accounts/Factory';
import UserContext from '../context/user/UserConext';

const FactoryTable = () => {
  const { user } = useContext(UserContext);
  console.log('sdsdsd', user);
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
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditShowForm(true);
      setEditModalData(rowdata);
    } else if (event?.name === 'Delete') {
      const deleteData = {
        locationID: rowdata?.locationID || 0,
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
      const response = await DeleteFactoryAPI(deleteData);
      console.log('Delete Api Call', response);
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: user?.companyID ? user?.companyID : '',
    externalFilters: {
      locationName: '',
      locationPhone: '',
      locationEmailid: '',
      locationCity: '',
      locationPincode: '',
      locationState: '',
      locationStateCode: '',
      locationCountry: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'locationName', label: 'Factory Name', type: 'text', minWidth: '180px' },
    { id: 'locationEmailid', label: 'Email ID', type: 'text', minWidth: '180px' },
    { id: 'locationPhone', label: 'Phone No', type: 'text', minWidth: '180px' },
    { id: 'address', label: 'Address', type: 'text', minWidth: '180px' },
    { id: 'locationCity', label: 'City', type: 'text', minWidth: '180px' },
    { id: 'locationPincode', label: 'Pincode', type: 'text', minWidth: '180px' },
    { id: 'locationState', label: 'State', type: 'text', minWidth: '180px' },
    { id: 'locationStateCode', label: 'State Code', type: 'text', minWidth: '180px' },
    { id: 'locationCountry', label: 'Country', type: 'text', minWidth: '180px' },
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
      <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
        itemName="Delete Factory"
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
          <CreateFactory currentData={editModalData} handleClose={handleClose} />
        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: Factory</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getallLocation"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="FactoryHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default FactoryTable;
