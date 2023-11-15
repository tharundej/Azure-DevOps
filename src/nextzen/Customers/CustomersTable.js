import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';

const CustomersTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
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
    search: 'pr',
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
      />
    </>
  );
};
export default CustomersTable;
