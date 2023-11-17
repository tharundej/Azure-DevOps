import { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import { getProductListAPI, DeleteProductAPI } from 'src/api/Accounts/Product';
import SnackBarComponent from '../global/SnackBarComponent';
import CreateProducts from './CreateProducts';

const ProductsTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit', type: 'serviceCall', endpoint: '' },
    { name: 'Delete', icon: 'hh', id: 'delete', type: 'serviceCall', endpoint: '' },
  ];
  const [editShowForm, seteditShowForm] = useState(false);
  const [editModalData, setEditModalData] = useState({});

  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      seteditShowForm(true);
      setEditModalData(rowdata);
    } else if (event?.name === 'Delete') {
      const deleteData = {
        product_id: rowdata?.productID || 0,
      };
      handleDeleteAPICALL(deleteData);
    }
  };
  const handleClose = () => {
    seteditShowForm(false);
  };
  const handleDeleteAPICALL = async (deleteData) => {
    try {
      console.log(deleteData, 'deleteData');
      const response = await DeleteProductAPI(deleteData);
      console.log('Delete success', response);
      handleCallSnackbar(response.message, 'success');
    } catch (error) {
      handleCallSnackbar(error.message, 'warning');
      console.log('API request failed:', error.message);
    }
  };
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

  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const ApiHit = async () => {
    try {
      const response = await getProductListAPI(defaultPayload);
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
    count: 5,
    page: 1,
    search: '',
    companyID: 'COMP1',
  };
  const [TABLE_HEAD, setTableHead] = useState([
    // { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'productCategory', label: 'Product Category', type: 'text', minWidth: '180px' },
    { id: 'productName', label: 'Product Name', type: 'text', minWidth: '180px' },
    { id: 'hsnID', label: 'HSN ID', type: 'text', minWidth: '180px' },
    { id: 'gstRate', label: 'GST Rate', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <SnackBarComponent
        open={openSnackbar}
        onHandleCloseSnackbar={HandleCloseSnackbar}
        snacbarMessage={snacbarMessage}
        severity={severity}
      />
      {editShowForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={editShowForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 770, overflow: 'hidden' },
          }}
          className="custom-dialog"
        >
          <CreateProducts currentData={editModalData} handleClose={handleClose} />
        </Dialog>
      )}
      <Helmet>
        <title> Dashboard: Products</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getProductDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        onClickActions={onClickActions}
        filterName="ProductsHead"
      />
    </>
  );
};
export default ProductsTable;
