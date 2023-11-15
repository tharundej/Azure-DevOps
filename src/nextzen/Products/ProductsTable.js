import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import { getProductListAPI } from 'src/api/Accounts/Product';

const ProductsTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultPayload = {
    count: 2,
    page: 1,
    search: '',
    companyID: 'COMP2',
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
      <Helmet>
        <title> Dashboard: Products</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getProductDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="ProductsHead"
      />
    </>
  );
};
export default ProductsTable;
