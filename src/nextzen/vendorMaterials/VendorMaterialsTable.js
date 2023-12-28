import { useEffect, useState, useCallback, useContext } from 'react';
import { Dialog } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import {
  DeleteVendorMaterialAPI,
  getVendorMaterialListAPI,
} from 'src/api/Accounts/VendorMaterials';
import SnackBarComponent from '../global/SnackBarComponent';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import CreateVendorMaterials from './CreateVendorMaterials';
import UserContext from '../context/user/UserConext';

const VendorMaterialsTable = () => {
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
      console.log(rowdata, 'rorrrrrr');
    } else if (event?.name === 'Delete') {
      const deleteData = { id: rowdata.id || 0, title: rowdata.materialName || '' };
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
      const response = await DeleteVendorMaterialAPI(deleteData);
      console.log('Delete success', response);
      handleCountChange();
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 10,
    page: 1,
  });

  const ApiHit = async () => {
    try {
      const response = await getVendorMaterialListAPI(defaultPayload);
      console.log('location success', response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
  }, []);
  const defaultPayload = {
    companyId: user?.companyID ? user?.companyID : '',
    search: '',
    externalFilters: {
      materialName: '',
      hsnId: '',
      gstRate: 0,
      vendorId: 0,
      vendorName: '',
      materialPrice: 0,
    },
    sort: {
      key: 1,
      orderBy: 'hsnId',
    },
    page: 0,
    count: 10,
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'vendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'materialName', label: 'Material Name', type: 'text', minWidth: '180px' },
    { id: 'hsnId', label: 'HSN ID', type: 'text', minWidth: '180px' },
    { id: 'materialType', label: 'Material Type', type: 'text', minWidth: '180px' },
    { id: 'gstRate', label: 'GST Rate', type: 'text', minWidth: '180px' },
    { id: 'materialPrice', label: 'Material Price', type: 'text', minWidth: '180px' },
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
        itemName="Delete Vendor Material"
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
          <CreateVendorMaterials
            currentData={editModalData}
            handleClose={handleClose}
            handleCountChange={handleCountChange}
          />
        </Dialog>
      )}
      <Helmet>
        <title> Accounting: Vendor Material</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getMaterials"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="VendorMaterialsHead"
        onClickActions={onClickActions}
        handleEditRowParent={() => {}}
        count={count}
      />
    </>
  );
};
export default VendorMaterialsTable;
