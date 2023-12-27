import { useEffect, useState, useCallback, useContext } from 'react';
import { Dialog } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
// import { async } from '@firebase/util';
import SnackBarComponent from '../global/SnackBarComponent';
import CreateAssets from './CreateAssets';
import { DeleteAssetsAPI } from 'src/api/Accounts/Assets';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import UserContext from 'src/nextzen/context/user/UserConext';

const AssetsTable = () => {
  const { user } = useContext(UserContext);
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
    } else if (event?.name === 'Delete') {
      const deleteData = { asset_id: rowdata.assetId || 0, assetsName: rowdata.assetsName || '' };
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
      const response = await DeleteAssetsAPI(deleteData);
      console.log('Delete success', response);
      handleCallSnackbar(response.message, 'success');
      handleCountChange();
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({
    dates: [
      {
        display: 'Established Date',
        field_name: 'EstablishedDate',
      },
      {
        display: 'Operational Date',
        field_name: 'OperationalDate',
      },
    ],
    dropdowns: [
      {
        display: 'Status',
        options: ['active', 'inactive'],
        field_name: 'status',
      },
    ],
  });
  const [bodyContent, setBodyContent] = useState([]);
  const defaultPayload = {
    company_id: user?.companyID ? user?.companyID : '',
    page: 0,
    count: 5,
    search: '',
    externalFilters: {
      podate: {
        from_date: '',
        to_date: '',
      },
      invoicedate: {
        from_date: '',
        to_date: '',
      },
      asset_name: '',
      asset_type: '',
      supplier_name: '',
      location_name: '',
    },
    sort: {
      key: 1,
      orderBy: 'a.assets_name',
    },
  };
  const ApiHit = async () => {
    try {
      const response = await getAssetsListAPI(defaultPayload);
      console.log('location success', response);
      setBodyContent(response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
  }, []);

  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'assetsName', label: 'Assets Name', type: 'text', minWidth: '180px' },
    { id: 'assetsType', label: 'Assets Type', type: 'text', minWidth: '180px' },
    { id: 'modelName', label: 'Model Name', type: 'text', minWidth: '180px' },
    { id: 'poNumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'poDate', label: 'PO Date', type: 'text', minWidth: '180px' },
    { id: 'poValue', label: 'PO Value', type: 'text', minWidth: '180px' },
    { id: 'invoiceNumber', label: 'Invoice Number', type: 'text', minWidth: '180px' },
    { id: 'invoiceDate', label: 'Invoice Date', type: 'text', minWidth: '180px' },
    { id: 'startDate', label: 'Start Date', type: 'text', minWidth: '180px' },
    { id: 'warrantyDate', label: 'Warranty Date', type: 'text', minWidth: '180px' },
    { id: 'supplierName', label: 'Supplier Name', type: 'text', minWidth: '180px' },
    { id: 'supplierEmailId', label: 'Supplier Email', type: 'text', minWidth: '180px' },
    { id: 'supplierContactNumber', label: 'Supplier Contact Number', type: 'text', minWidth: '180px' },
    { id: 'expiryDate', label: 'Expiry Date', type: 'text', minWidth: '180px' },
    { id: 'lapseOfWarrantyDate', label: 'Lapse Of Warranty Date', type: 'text', minWidth: '180px' },
    { id: 'operationalDays', label: 'Operational Days', type: 'text', minWidth: '180px' },
    { id: 'price', label: 'Price', type: 'text', minWidth: '180px' },
    { id: 'amount', label: 'Amount', type: 'text', minWidth: '180px' },
    { id: 'gstRate', label: 'GST Rate', type: 'text', minWidth: '180px' },
    { id: 'quantity', label: 'Quantity', type: 'text', minWidth: '180px' },
    { id: 'gstAmount', label: 'GST Amount', type: 'text', minWidth: '180px' },
    { id: 'totalAmount', label: 'Total Amount', type: 'text', minWidth: '180px' },
    { id: 'assetsCondition', label: 'Assets Condition', type: 'text', minWidth: '180px' },
    { id: 'updatedDate', label: 'Updated Date', type: 'text', minWidth: '180px' },
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
        itemName="Delete Assets"
        message={`Are you sure you want to delete ${deleteData?.assetsName}?`}
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
          <CreateAssets
            currentData={editModalData}
            handleClose={handleClose}
            handleCountChange={handleCountChange}
          />
        </Dialog>
      )}
      <Helmet>
        <title> Accounting: Vendor</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listassets"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="AssetsHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
        count={count}
      />
    </>
  );
};
export default AssetsTable;
