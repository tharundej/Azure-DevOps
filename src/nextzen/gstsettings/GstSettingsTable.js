import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import CreateGstSettings from './CreateGstSettings';
import { Dialog } from '@mui/material';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import SnackBarComponent from '../global/SnackBarComponent';
import { DeleteFactoryAPI } from 'src/api/Accounts/Factory';
import UserContext from '../context/user/UserConext';
import { DeleteAccountInformationAPI } from 'src/api/Accounts/Settings';
import { DeleteGstInformationAPI } from 'src/api/Accounts/Settings';

const GstSettingsTable = () => {
  const { user } = useContext(UserContext);
  console.log('sdsdsd', user);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [count, setCount] = useState(0);
  const handleCountChange = () => {
    setCount(count + 1);
  };
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
        locationID: rowdata?.locationID || 0,
        companyID: rowdata?.companyID || user?.companyID ? user?.companyID : '',
        title: rowdata?.locationName || '',
        gstInformationID: rowdata?.gstInformationID || 0,
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
      const response = await DeleteGstInformationAPI(deleteData);
      console.log('Delete Api Call', response);
      handleCallSnackbar(response.message, 'success');
      handleCountChange();
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({});
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyId: user?.companyID ? user?.companyID : '',

    sort: {
      key: null,
      orderBy: "",
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    // { id: 'bankName', label: 'Bank Name', type: 'text', minWidth: '190px' },
    // { id: 'bankAccountNo', label: 'Bank Account Number', type: 'text', minWidth: '200px' },
    { id: 'locationID', label: 'Location ID', type: 'text', minWidth: '180px' },
    { id: 'GSTNo', label: 'GST no.', type: 'text', minWidth: '180px' },
    { id: 'PanNo', label: 'Pan no.', type: 'text', minWidth: '180px' },
    { id: 'TanNo', label: 'Tan no.', type: 'text', minWidth: '180px' },
    // { id: 'msmeUamNo', label: 'MSME UAM Number', type: 'text', minWidth: '180px' },
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
        itemName="Delete Settings"
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
          <CreateGstSettings
            currentData={editModalData}
            handleClose={handleClose}
            handleCountChange={handleCountChange}
          />

        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: Settings</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/GetGstInformation"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="GstSettingsHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
        count={count}
      />
    </>
  );
};
export default GstSettingsTable;
