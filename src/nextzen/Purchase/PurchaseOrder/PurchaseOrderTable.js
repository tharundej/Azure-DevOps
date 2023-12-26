import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../../_mock';

import { BasicTable } from '../../Table/BasicTable';
import { getPurchaseOrderAPI } from 'src/api/Accounts/PurchaseOrder';
import { Dialog } from '@mui/material';
import ViewPurchaseOrder from './ViewPurchaseOrder';
import UserContext from 'src/nextzen/context/user/UserConext';
import OrderPreview from './OrderPreview';

const PurchaseOrderTable = () => {
  const { user } = useContext(UserContext);
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
    {
      name: 'View',
      icon: 'carbon:view',
      id: 'view',
      type: 'serviceCall',
      endpoint: '',
    },
    {
      name: 'Preview',
      icon: 'gridicons:print',
      id: 'view',
      type: 'serviceCall',
      endpoint: '',
    },
  ];
  const [editShowForm, setEditShowForm] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [viewShowForm, setViewShowForm] = useState(false);
  const [previewShowForm, setPreviewShowForm] = useState(false);
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditShowForm(true);
      setEditModalData(rowdata);
    } else if (event?.name === 'Delete') {
      const deleteData = { asset_id: rowdata.assetId || 0, assetsName: rowdata.assetsName || '' };
      setDeleteData(deleteData);
      setConfirmDeleteOpen(true);
      handleDeleteConfirmed();
    } else if (event?.name === 'View') {
      setViewShowForm(true);
      setEditModalData(rowdata);
    } else if (event?.name === 'Preview') {
      setPreviewShowForm(true);
      setEditModalData(rowdata);
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
    setViewShowForm(false);
    setPreviewShowForm(false);
  };
  const handleDeleteApiCall = async (deleteData) => {
    try {
      console.log(deleteData, 'deleteData');
      const response = await DeleteAssetsAPI(deleteData);
      console.log('Delete success', response);
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({});
  const ApiHit = async () => {
    try {
      const response = await getPurchaseOrderAPI(defaultPayload);
      console.log('success', response);
      setBodyContent(response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    roleid: 1,
    companyId: user?.companyID ? user?.companyID : '',
    externalFilters: {
      poDate: {
        from: '',
        to: '',
      },
      fPODate: '',
      fItemName: '',
      fUnitOfMeasure: '',
      expectedDeliveryDate: {
        from: '',
        to: '',
      },
      fExpectedDeliveryDate: '',
      fPaymentTerm: '',
      fVendorName: '',
      fCompanyName: '',
    },
    sort: {
      key: 1,
      orderBy: 'po.purchase_order_id',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'poNumber', label: 'PO Number', type: 'text', minWidth: '180px' },
    { id: 'poDate', label: 'PO Date', type: 'text', minWidth: '180px' },
    {
      id: 'expectedDeliveryDate',
      label: 'Expected Delivery Date',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'paymentTerm', label: 'Payment Term', type: 'text', minWidth: '180px' },
    { id: 'vendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'vendorAddress', label: 'Vendor Address', type: 'text', minWidth: '180px' },
    { id: 'vendorPAN', label: 'Vendor PAN', type: 'text', minWidth: '180px' },
    { id: 'emailID', label: 'Email ID', type: 'text', minWidth: '180px' },
    { id: 'contactNo', label: 'Contact Number', type: 'text', minWidth: '180px' },
    { id: 'vendorLocation', label: 'Vendor Location', type: 'text', minWidth: '180px' },
    { id: 'companyName', label: 'Company Name', type: 'text', minWidth: '180px' },
    {
      id: 'companyBillingAddress',
      label: 'Company Billing Address',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'companyBillingGST', label: 'Company Billing GST', type: 'text', minWidth: '180px' },
    { id: 'companyBillingPAN', label: 'Company Billing PAN', type: 'text', minWidth: '180px' },
    {
      id: 'factoryShippingAddress',
      label: 'Factory Shipping Address',
      type: 'text',
      minWidth: '180px',
    },
    { id: 'CGST', label: 'CGST', type: 'text', minWidth: '180px' },
    { id: 'SGST', label: 'SGST', type: 'text', minWidth: '180px' },
    { id: 'IGST', label: 'IGST', type: 'text', minWidth: '180px' },
    { id: 'gstAmount', label: 'gstAmount', type: 'text', minWidth: '180px' },
    { id: 'grandTotalAmount', label: 'Grand Total', type: 'text', minWidth: '180px' },
    { id: 'advanceAmount', label: 'Advance Amount', type: 'text', minWidth: '180px' },
    { id: 'balanceAmount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
  ]);
  const handleEditRowParent = (rowdata, event) => {
    setViewShowForm(true);
    setEditModalData(rowdata);
  };
  return (
    <>
      {viewShowForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={viewShowForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 1000 },
          }}
          className="custom-dialog"
        >
          <ViewPurchaseOrder currentData={editModalData} handleClose={handleClose} />
        </Dialog>
      )}
      {previewShowForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={previewShowForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 1000 },
          }}
          className="custom-dialog"
        >
          <OrderPreview currentData={editModalData} handleClose={handleClose} />
        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: PurchaseOrder</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listPurchaseOrder"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="PurchaseOrderHead"
        onClickActions={onClickActions}
        handleEditRowParent={handleEditRowParent}
      />
    </>
  );
};
export default PurchaseOrderTable;


