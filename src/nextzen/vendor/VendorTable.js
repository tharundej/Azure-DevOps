import { useEffect, useState, useCallback } from 'react';
import { Dialog } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import { DeleteVendorAPI, getVendorListAPI } from 'src/api/Accounts/Vendor';
import SnackBarComponent from '../global/SnackBarComponent';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import CreateVendor from './CreateVendor';

const VendorTable = () => {
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
      const deleteData = { vendorID: rowdata.vendorID || 0, title: rowdata.vendorName || '' };
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
      console.log(deleteData, 'deleteData');
      const response = await DeleteVendorAPI(deleteData);
      console.log('Delete success', response);
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

  const ApiHit = async () => {
    try {
      const response = await getVendorListAPI(defaultPayload);
      console.log('location success', response);
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
    search: '',
    count: 5,
    sort: {
      key: 1,
      orderBy: 'vendor_name',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'vendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'vendorEmailID', label: 'Vendor  Email ID', type: 'text', minWidth: '180px' },
    { id: 'vendorPhoneNo', label: 'Vendor Phone No', type: 'text', minWidth: '180px' },
    { id: 'city', label: 'City', type: 'text', minWidth: '180px' },
    { id: 'state', label: 'State', type: 'text', minWidth: '180px' },
    { id: 'vendorPANNo', label: 'PAN No', type: 'text', minWidth: '180px' },
    { id: 'vendorGSTNo', label: 'GST No', type: 'text', minWidth: '180px' },
    { id: 'vendorTANNo', label: 'TAN No', type: 'text', minWidth: '180px' },
    { id: 'vendorBankName', label: 'Bank Name', type: 'text', minWidth: '180px' },
    { id: 'vendorAccountHolderName', label: 'Account Holder name', type: 'text', minWidth: '180px' },
    { id: 'vendorBankAccountNo', label: 'Account No', type: 'text', minWidth: '180px' },
    { id: 'vendorBankIFSCCode', label: 'IFSC Code', type: 'text', minWidth: '180px' },
    { id: 'bankBranchName', label: 'Bank Branch', type: 'text', minWidth: '180px' },
    { id: 'onboardingDate', label: 'Onboard Date', type: 'text', minWidth: '180px' },
    { id: 'offboardingDate', label: 'Offboard Date', type: 'text', minWidth: '180px' },
    { id: 'status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <SnackBarComponent
        open={openSnackbar}
        onHandleCloseSnackbar={HandleCloseSnackbar}
        snacbarMessage={snacbarMessage}
        severity={severity}
      />
      <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
        itemName="Delete Vendor"
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
          <CreateVendor currentData={editModalData} handleClose={handleClose} />
        </Dialog>
      )}
      <Helmet>
        <title> Accounting: Vendor</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/ListVendorDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="VendorHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default VendorTable;
